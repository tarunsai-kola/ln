const mongoose = require("mongoose");
const AbsentRequest = require("../models/AbsentRequest");
const Holiday = require("../models/Holiday");
const AtdUser = require("../models/AtdUser");
const AdvTeam = require("../models/CreateAdvTeam");

// Default National & Common Holidays for India
const DEFAULT_HOLIDAYS = [
  { date: "2025-01-01", name: "New Year's Day", type: "national" },
  { date: "2025-01-14", name: "Makar Sankranti / Pongal", type: "national" },
  { date: "2025-01-26", name: "Republic Day", type: "national" },
  { date: "2025-03-14", name: "Holi", type: "national" },
  { date: "2025-04-14", name: "Dr. B.R. Ambedkar Jayanti", type: "national" },
  { date: "2025-05-01", name: "Labour Day / May Day", type: "national" },
  { date: "2025-08-15", name: "Independence Day", type: "national" },
  { date: "2025-10-02", name: "Gandhi Jayanti", type: "national" },
  { date: "2025-10-20", name: "Diwali / Deepavali", type: "national" },
  { date: "2025-12-25", name: "Christmas Day", type: "national" },
  { date: "2026-01-01", name: "New Year's Day", type: "national" },
  { date: "2026-01-14", name: "Makar Sankranti / Pongal", type: "national" },
  { date: "2026-01-26", name: "Republic Day", type: "national" },
  { date: "2026-03-04", name: "Holi", type: "national" },
  { date: "2026-05-01", name: "Labour Day", type: "national" },
  { date: "2026-08-15", name: "Independence Day", type: "national" },
  { date: "2026-10-02", name: "Gandhi Jayanti", type: "national" },
  { date: "2026-11-08", name: "Diwali / Deepavali", type: "national" },
  { date: "2026-12-25", name: "Christmas Day", type: "national" }
];

// Seed default holidays if empty
const seedDefaultHolidays = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await new Promise((resolve) => mongoose.connection.once("open", resolve));
    }
    const count = await Holiday.countDocuments();
    if (count === 0) {
      await Holiday.insertMany(DEFAULT_HOLIDAYS);
      console.log("✅ Seeded default national holidays");
    }
  } catch (err) {
    console.error("Error seeding holidays:", err.message);
  }
};
seedDefaultHolidays();

// 1. SUBMIT ABSENT REQUEST (USER)
exports.submitAbsentRequest = async (req, res) => {
  try {
    const { date, reason } = req.body;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required" });
    }
    if (!reason || !reason.trim()) {
      return res.status(400).json({ success: false, message: "Reason/message is strictly required for absent validation" });
    }

    const userId = req.userId || req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "User authentication missing" });
    }

    // Lookup user in AtdUser or AdvTeam
    let user = await AtdUser.findById(userId);
    let userEmail = user?.email;
    let userName = user?.name || "Employee";

    if (!user) {
      const advUser = await AdvTeam.findById(userId);
      if (advUser) {
        userEmail = advUser.email;
        userName = advUser.fullname || "Employee";
      }
    }

    if (!userEmail) {
      return res.status(404).json({ success: false, message: "User record not found" });
    }

    // Check if Sunday
    const reqDate = new Date(date);
    if (reqDate.getUTCDay() === 0 || reqDate.getDay() === 0) {
      return res.status(400).json({
        success: false,
        message: "The selected date is a Sunday. Sundays are already weekly holidays and do not require leave requests."
      });
    }

    // Check if duplicate request
    const existing = await AbsentRequest.findOne({ userId, date });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `An absent request for ${date} has already been submitted (Status: ${existing.status})`
      });
    }

    const newRequest = new AbsentRequest({
      userId,
      userEmail,
      userName,
      date,
      reason: reason.trim(),
      status: "pending"
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Absent request submitted successfully. Pending admin approval.",
      data: newRequest
    });
  } catch (error) {
    console.error("Error in submitAbsentRequest:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. GET LOGGED IN USER'S ABSENT REQUESTS
exports.getMyAbsentRequests = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { month, year } = req.query; // optional filters

    const query = { userId };
    if (month && year) {
      const mStr = String(parseInt(month) + 1).padStart(2, "0");
      query.date = { $regex: new RegExp(`^${year}-${mStr}`) };
    } else if (month && typeof month === "string" && month.includes("-")) {
      query.date = { $regex: new RegExp(`^${month}`) };
    }

    const requests = await AbsentRequest.find(query).sort({ date: -1 });

    // Calculate this month's approved leaves for this user to check 2-day paid quota
    const now = new Date();
    const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const approvedThisMonth = await AbsentRequest.countDocuments({
      userId,
      status: "approved",
      date: { $regex: new RegExp(`^${currentMonthPrefix}`) }
    });

    const paidLeavesUsed = Math.min(2, approvedThisMonth);
    const paidLeavesRemaining = Math.max(0, 2 - approvedThisMonth);

    res.status(200).json({
      success: true,
      data: requests,
      quota: {
        totalPaidQuota: 2,
        paidLeavesUsed,
        paidLeavesRemaining,
        approvedThisMonth,
        unpaidApprovedThisMonth: Math.max(0, approvedThisMonth - 2)
      }
    });
  } catch (error) {
    console.error("Error in getMyAbsentRequests:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. CANCEL USER'S PENDING ABSENT REQUEST
exports.cancelAbsentRequest = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { id } = req.params;

    const request = await AbsentRequest.findOne({ _id: id, userId });
    if (!request) {
      return res.status(404).json({ success: false, message: "Absent request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel a request that has already been ${request.status}`
      });
    }

    await AbsentRequest.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Absent request cancelled successfully" });
  } catch (error) {
    console.error("Error in cancelAbsentRequest:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. GET ALL ABSENT REQUESTS (ADMIN)
exports.getAdminAbsentRequests = async (req, res) => {
  try {
    const { month, year, status, search } = req.query;

    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (month && year) {
      const mStr = String(parseInt(month) + 1).padStart(2, "0");
      query.date = { $regex: new RegExp(`^${year}-${mStr}`) };
    } else if (month && typeof month === "string" && month.includes("-")) {
      query.date = { $regex: new RegExp(`^${month}`) };
    }

    let requests = await AbsentRequest.find(query).sort({ date: -1, createdAt: -1 });

    if (search && search.trim()) {
      const term = search.toLowerCase().trim();
      requests = requests.filter(
        (r) =>
          (r.userName && r.userName.toLowerCase().includes(term)) ||
          (r.userEmail && r.userEmail.toLowerCase().includes(term)) ||
          (r.reason && r.reason.toLowerCase().includes(term))
      );
    }

    // Counts for summary metrics
    const baseQuery = {};
    if (query.date) baseQuery.date = query.date;

    const [totalPending, totalApproved, totalRejected, totalCount] = await Promise.all([
      AbsentRequest.countDocuments({ ...baseQuery, status: "pending" }),
      AbsentRequest.countDocuments({ ...baseQuery, status: "approved" }),
      AbsentRequest.countDocuments({ ...baseQuery, status: "rejected" }),
      AbsentRequest.countDocuments(baseQuery)
    ]);

    res.status(200).json({
      success: true,
      data: requests,
      stats: {
        totalPending,
        totalApproved,
        totalRejected,
        totalCount
      }
    });
  } catch (error) {
    console.error("Error in getAdminAbsentRequests:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. REVIEW ABSENT REQUEST (ADMIN / HR APPROVE / REJECT / REACTIVATE)
exports.reviewAbsentRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewNote, reviewedBy } = req.body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'approved', 'rejected', or 'pending'"
      });
    }

    const request = await AbsentRequest.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Absent request not found" });
    }

    request.status = status;
    request.reviewNote = reviewNote || request.reviewNote || "";
    request.reviewedBy = reviewedBy || (req.user?.role === "HR" ? "HR Manager" : "Admin");
    request.reviewedAt = new Date();

    await request.save();

    res.status(200).json({
      success: true,
      message: `Absent request ${status === "pending" ? "reactivated to pending" : status} successfully`,
      data: request
    });
  } catch (error) {
    console.error("Error in reviewAbsentRequest:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. HOLIDAY MANAGEMENT ENDPOINTS
exports.getHolidays = async (req, res) => {
  try {
    const { year } = req.query;
    const query = {};
    if (year) {
      query.date = { $regex: new RegExp(`^${year}`) };
    }
    const holidays = await Holiday.find(query).sort({ date: 1 });
    res.status(200).json({ success: true, data: holidays });
  } catch (error) {
    console.error("Error in getHolidays:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addHoliday = async (req, res) => {
  try {
    const { date, name, type = "national", description = "" } = req.body;
    if (!date || !name) {
      return res.status(400).json({ success: false, message: "Date and name are required" });
    }

    const existing = await Holiday.findOne({ date });
    if (existing) {
      return res.status(400).json({ success: false, message: `Holiday for ${date} already exists (${existing.name})` });
    }

    const newHoliday = new Holiday({ date, name, type, description });
    await newHoliday.save();

    res.status(201).json({ success: true, message: "Holiday added successfully", data: newHoliday });
  } catch (error) {
    console.error("Error in addHoliday:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    await Holiday.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Holiday removed successfully" });
  } catch (error) {
    console.error("Error in deleteHoliday:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
