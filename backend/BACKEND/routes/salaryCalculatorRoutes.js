const express = require("express");
const router = express.Router();
const SalaryFormula = require("../models/SalaryFormula");
const AdvTeam = require("../models/CreateAdvTeam");
const AdvEnroll = require("../models/AdvEnroll");
const Attendance = require("../models/Attendance");
const AtdUser = require("../models/AtdUser");
const GlobalConfig = require("../models/GlobalConfig");
const AbsentRequest = require("../models/AbsentRequest");
const Holiday = require("../models/Holiday");
const { sendEmail } = require("../controllers/emailController");

// 1. GET ALL SALARY FORMULAS
router.get("/formulas", async (req, res) => {
  try {
    let formulas = await SalaryFormula.find().sort({ createdAt: -1 });

    // Auto-seed default salary structure if none exists
    if (formulas.length === 0) {
      const defaultPlan = new SalaryFormula({
        name: "Standard Target & Salary Structure",
        description: "Official monthly base salary and target structure based on fullPaid revenue.",
        metricType: "revenue",
        baseSalary: 25000,
        baseTarget: 200000,
        payoutModel: "target_prorata",
        isDefault: true
      });
      await defaultPlan.save();
      formulas = [defaultPlan];
    }

    res.status(200).json({ success: true, count: formulas.length, data: formulas });
  } catch (error) {
    console.error("Error fetching salary formulas:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. GET SINGLE FORMULA BY ID
router.get("/formulas/:id", async (req, res) => {
  try {
    const formula = await SalaryFormula.findById(req.params.id);
    if (!formula) {
      return res.status(404).json({ success: false, message: "Formula not found" });
    }
    res.status(200).json({ success: true, data: formula });
  } catch (error) {
    console.error("Error fetching formula:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. CREATE NEW SALARY FORMULA
router.post("/formulas", async (req, res) => {
  try {
    const {
      name,
      description,
      metricType,
      baseSalary,
      baseTarget,
      payoutModel,
      assignedMembers,
      isDefault
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Formula name is required" });
    }

    if (isDefault) {
      await SalaryFormula.updateMany({}, { isDefault: false });
    }

    const newFormula = new SalaryFormula({
      name,
      description: description || "",
      metricType: metricType || "revenue",
      baseSalary: Number(baseSalary) || 25000,
      baseTarget: Number(baseTarget) || 200000,
      payoutModel: payoutModel || "target_prorata",
      assignedMembers: Array.isArray(assignedMembers) ? assignedMembers : [],
      isDefault: !!isDefault
    });

    await newFormula.save();

    // If members were assigned, remove them from previous formulas
    if (assignedMembers && assignedMembers.length > 0) {
      const memberEmails = assignedMembers.map((m) => m.email?.toLowerCase()).filter(Boolean);
      await SalaryFormula.updateMany(
        { _id: { $ne: newFormula._id } },
        { $pull: { assignedMembers: { email: { $in: memberEmails } } } }
      );
    }

    res.status(201).json({ success: true, message: "Salary formula created successfully", data: newFormula });
  } catch (error) {
    console.error("Error creating formula:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. UPDATE SALARY FORMULA
router.put("/formulas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      metricType,
      baseSalary,
      baseTarget,
      payoutModel,
      assignedMembers,
      isActive,
      isDefault
    } = req.body;

    if (isDefault) {
      await SalaryFormula.updateMany({ _id: { $ne: id } }, { isDefault: false });
    }

    const updated = await SalaryFormula.findByIdAndUpdate(
      id,
      {
        name,
        description,
        metricType,
        baseSalary: Number(baseSalary),
        baseTarget: Number(baseTarget),
        payoutModel: payoutModel || "target_prorata",
        ...(assignedMembers ? { assignedMembers } : {}),
        isActive: isActive != null ? isActive : true,
        isDefault: !!isDefault
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Formula not found" });
    }

    res.status(200).json({ success: true, message: "Salary formula updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating formula:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. DELETE FORMULA
router.delete("/formulas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SalaryFormula.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Formula not found" });
    }
    res.status(200).json({ success: true, message: "Formula deleted successfully" });
  } catch (error) {
    console.error("Error deleting formula:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. ASSIGN MEMBERS TO FORMULA
router.post("/assign", async (req, res) => {
  try {
    const { formulaId, members } = req.body;
    if (!formulaId || !Array.isArray(members)) {
      return res.status(400).json({ success: false, message: "formulaId and members array are required" });
    }

    const formula = await SalaryFormula.findById(formulaId);
    if (!formula) {
      return res.status(404).json({ success: false, message: "Formula not found" });
    }

    const memberEmails = members.map((m) => m.email?.toLowerCase()).filter(Boolean);

    // Remove from other formulas
    await SalaryFormula.updateMany(
      {},
      { $pull: { assignedMembers: { email: { $in: memberEmails } } } }
    );

    const targetFormula = await SalaryFormula.findById(formulaId);

    const formattedMembers = members.map((m) => ({
      memberId: m.memberId || m._id,
      fullname: m.fullname || m.name || "",
      email: (m.email || "").toLowerCase().trim(),
      team: m.team || "",
      designation: m.designation || "",
      customBaseSalary: m.customBaseSalary != null ? Number(m.customBaseSalary) : undefined,
      customBaseTarget: m.customBaseTarget != null ? Number(m.customBaseTarget) : undefined,
      assignedAt: new Date()
    }));

    targetFormula.assignedMembers.push(...formattedMembers);
    await targetFormula.save();

    res.status(200).json({
      success: true,
      message: `Assigned ${members.length} member(s) to ${formula.name}`,
      data: targetFormula
    });
  } catch (error) {
    console.error("Error assigning members:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. UNASSIGN A MEMBER FROM A FORMULA
router.post("/unassign", async (req, res) => {
  try {
    const { formulaId, email, memberId } = req.body;
    const query = {};
    if (email) query.email = email.toLowerCase().trim();
    if (memberId) query.memberId = memberId;

    if (formulaId) {
      await SalaryFormula.findByIdAndUpdate(
        formulaId,
        { $pull: { assignedMembers: query } },
        { new: true }
      );
    } else {
      await SalaryFormula.updateMany(
        {},
        { $pull: { assignedMembers: query } }
      );
    }

    res.status(200).json({ success: true, message: "Member unassigned successfully" });
  } catch (error) {
    console.error("Error unassigning member:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 8. GET FORMULA ASSIGNED TO A SALESPERSON
router.get("/my-formula", async (req, res) => {
  try {
    const { email, memberId } = req.query;

    let formula = null;
    let memberAssignment = null;

    if (email) {
      const cleanEmail = email.toLowerCase().trim();
      formula = await SalaryFormula.findOne({
        "assignedMembers.email": cleanEmail,
        isActive: true
      });
      if (formula) {
        memberAssignment = formula.assignedMembers.find(
          (m) => m.email && m.email.toLowerCase() === cleanEmail
        );
      }
    }

    if (!formula && memberId) {
      formula = await SalaryFormula.findOne({
        "assignedMembers.memberId": memberId,
        isActive: true
      });
      if (formula) {
        memberAssignment = formula.assignedMembers.find(
          (m) => String(m.memberId) === String(memberId)
        );
      }
    }

    let isFallback = false;
    if (!formula) {
      formula = await SalaryFormula.findOne({ isDefault: true, isActive: true }) ||
        await SalaryFormula.findOne({ isActive: true }).sort({ createdAt: -1 });
      isFallback = true;
    }

    if (!formula) {
      return res.status(200).json({
        success: true,
        isCustomAssigned: false,
        isFallback: true,
        data: {
          name: "Standard Target & Salary Structure",
          description: "Default target and salary structure based strictly on fullPaid revenue.",
          metricType: "revenue",
          baseSalary: 25000,
          baseTarget: 200000,
          payoutModel: "target_prorata"
        },
        memberAssignment: null
      });
    }

    res.status(200).json({
      success: true,
      isCustomAssigned: !isFallback && !!memberAssignment,
      isFallback,
      data: formula,
      memberAssignment
    });
  } catch (error) {
    console.error("Error retrieving salesperson formula:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 9. CALCULATE PAYOUT
router.post("/calculate", async (req, res) => {
  try {
    const { formulaId, formulaData, achievement, customBaseSalary, customBaseTarget } = req.body;

    let formula = null;
    if (formulaId) {
      formula = await SalaryFormula.findById(formulaId);
    }
    if (!formula && formulaData) {
      formula = new SalaryFormula(formulaData);
    }
    if (!formula) {
      return res.status(400).json({ success: false, message: "Valid formulaId or formulaData required" });
    }

    const result = formula.calculatePayout(achievement, customBaseSalary, customBaseTarget);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error calculating payout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 10. GET LIVE SALESPERSON SUMMARY (REVENUE CALCULATED STRICTLY IF STATUS === 'fullPaid')
router.get("/salesperson-summary", async (req, res) => {
  try {
    const { counselorName, email, month } = req.query;
    const now = new Date();
    const targetMonthStr = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // 1. Find assigned formula
    let formula = null;
    let memberAssignment = null;
    if (email) {
      formula = await SalaryFormula.findOne({
        "assignedMembers.email": email.toLowerCase().trim(),
        isActive: true
      });
      if (formula) {
        memberAssignment = formula.assignedMembers.find(
          (m) => m.email && m.email.toLowerCase() === email.toLowerCase().trim()
        );
      }
    }

    if (!formula) {
      formula = await SalaryFormula.findOne({ isDefault: true, isActive: true }) ||
        await SalaryFormula.findOne({ isActive: true }).sort({ createdAt: -1 });
    }

    // 2. Fetch enrollments for this counselor
    let enrollQuery = {};
    if (counselorName) {
      enrollQuery.counselor = { $regex: new RegExp(`^${counselorName.trim()}$`, "i") };
    }

    const enrollments = await AdvEnroll.find(enrollQuery);

    // Filter enrollments for the selected month:
    // IMPORTANT: REVENUE IS ONLY CALCULATED IF student.status === "fullPaid"!
    let fullPaidRevenue = 0;
    let fullPaidDeals = 0;
    let fullPaidStudents = [];

    // Also track booked for secondary reference
    let bookedRevenue = 0;
    let totalAllDeals = 0;

    enrollments.forEach((student) => {
      const createdDate = new Date(student.createdAt);
      const studentMonthYyyyMm = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, "0")}`;
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const studentMonthName = `${monthNames[createdDate.getMonth()]} ${createdDate.getFullYear()}`;

      const isSelectedMonth =
        studentMonthYyyyMm === targetMonthStr ||
        studentMonthName.toLowerCase() === targetMonthStr.toLowerCase();

      if (isSelectedMonth) {
        totalAllDeals += 1;
        const paidAmount = Number(student.paidAmount) || 0;
        bookedRevenue += paidAmount;

        // STRICT REVENUE CALCULATION: ONLY FULLPAID STATUS!
        if (student.status === "fullPaid") {
          fullPaidRevenue += paidAmount;
          fullPaidDeals += 1;
          fullPaidStudents.push({
            id: student._id,
            fullname: student.fullname,
            email: student.email,
            phone: student.phone,
            program: student.program || student.domain,
            paidAmount,
            status: student.status,
            createdAt: student.createdAt
          });
        }
      }
    });

    const metricType = formula?.metricType || "revenue";
    const achievementValue = metricType === "deals" ? fullPaidDeals : fullPaidRevenue;

    const customBase = memberAssignment?.customBaseSalary;
    const customTarget = memberAssignment?.customBaseTarget;

    let calculationResult = null;
    if (formula) {
      calculationResult = formula.calculatePayout(achievementValue, customBase, customTarget);
    }

    res.status(200).json({
      success: true,
      month: targetMonthStr,
      metrics: {
        fullPaidRevenue, // ONLY fullPaid
        fullPaidDeals,   // ONLY fullPaid
        bookedRevenue,
        totalAllDeals
      },
      fullPaidStudents, // Detailed list for sales person transparency
      formula: formula || null,
      memberAssignment,
      calculation: calculationResult
    });
  } catch (error) {
    console.error("Error generating salesperson summary:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 11. ADMIN VIEW: ALL MEMBERS PAYOUTS (ONLY FULLPAID REVENUE)
router.get("/all-members-payouts", async (req, res) => {
  try {
    const { month } = req.query;
    const now = new Date();
    const targetMonthStr = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const allAdvTeam = await AdvTeam.find({ status: { $ne: "Inactive" } }).sort({ fullname: 1 });
    const allFormulas = await SalaryFormula.find({ isActive: true });
    const defaultFormula = allFormulas.find((f) => f.isDefault) || allFormulas[0];

    const allEnrollments = await AdvEnroll.find();

    const results = allAdvTeam.map((member) => {
      let assignedFormula = null;
      let memberConfig = null;

      for (const formula of allFormulas) {
        const found = formula.assignedMembers.find(
          (m) =>
            (m.email && m.email.toLowerCase() === member.email?.toLowerCase()) ||
            String(m.memberId) === String(member._id)
        );
        if (found) {
          assignedFormula = formula;
          memberConfig = found;
          break;
        }
      }

      if (!assignedFormula) {
        assignedFormula = defaultFormula;
      }

      const counselorName = member.fullname || "";
      let fullPaidRevenue = 0;
      let fullPaidDeals = 0;
      let bookedRevenue = 0;

      allEnrollments.forEach((student) => {
        if (!student.counselor) return;
        if (student.counselor.trim().toLowerCase() !== counselorName.trim().toLowerCase()) return;

        const createdDate = new Date(student.createdAt);
        const studentMonthYyyyMm = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, "0")}`;
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const studentMonthName = `${monthNames[createdDate.getMonth()]} ${createdDate.getFullYear()}`;

        if (
          studentMonthYyyyMm === targetMonthStr ||
          studentMonthName.toLowerCase() === targetMonthStr.toLowerCase()
        ) {
          const paidAmount = Number(student.paidAmount) || 0;
          bookedRevenue += paidAmount;

          // STRICTLY FULLPAID
          if (student.status === "fullPaid") {
            fullPaidRevenue += paidAmount;
            fullPaidDeals += 1;
          }
        }
      });

      const metric = assignedFormula?.metricType === "deals" ? fullPaidDeals : fullPaidRevenue;
      const customBase = memberConfig?.customBaseSalary;
      const customTarget = memberConfig?.customBaseTarget;

      const payout = assignedFormula
        ? assignedFormula.calculatePayout(metric, customBase, customTarget)
        : null;

      return {
        memberId: member._id,
        fullname: member.fullname,
        email: member.email,
        team: member.team || (member.teams && member.teams[0]) || "General",
        designation: member.designation || "Sales Specialist",
        assignedFormulaName: assignedFormula?.name || "Standard",
        assignedFormulaId: assignedFormula?._id || null,
        isCustomAssigned: !!memberConfig,
        performance: {
          fullPaidRevenue,
          fullPaidDeals,
          bookedRevenue
        },
        payout
      };
    });

    res.status(200).json({ success: true, month: targetMonthStr, data: results });
  } catch (error) {
    console.error("Error fetching all members payouts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// =========================================================
// ATTENDANCE-BASED SALARY CALCULATION ENDPOINTS
// =========================================================

// 12. GET SAVED ATTENDANCE DEDUCTION CONFIG
router.get("/attendance-config", async (req, res) => {
  try {
    const doc = await GlobalConfig.findOne({ key: "attendance_salary_formula" });
    const defaultConfig = {
      workingDays: 26,
      leaveDeductionType: "fixed",
      leaveDeductionAmount: 500,
      halfDayDeductionType: "fixed",
      halfDayDeductionAmount: 250,
      lateDeductionAmount: 100,
      graceLateDays: 2
    };
    res.status(200).json({ success: true, data: doc ? doc.value : defaultConfig });
  } catch (error) {
    console.error("Error fetching attendance config:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 13. SAVE ATTENDANCE DEDUCTION CONFIG
router.post("/attendance-config", async (req, res) => {
  try {
    const configData = req.body;
    await GlobalConfig.findOneAndUpdate(
      { key: "attendance_salary_formula" },
      { value: configData },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, message: "Attendance formula configuration saved", data: configData });
  } catch (error) {
    console.error("Error saving attendance config:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 14. CALCULATE ATTENDANCE-BASED SALARIES (SUBTRACT DEDUCTIONS FROM BASE SALARY)
router.post("/calculate-attendance-salaries", async (req, res) => {
  try {
    const {
      month, // 0-11 or YYYY-MM
      year,  // e.g. 2026
      workingDays = 26,
      leaveDeductionType = "fixed", // "fixed" | "pro_rata"
      leaveDeductionAmount = 500,
      halfDayDeductionType = "fixed", // "fixed" | "half_of_leave"
      halfDayDeductionAmount = 250,
      lateDeductionAmount = 100,
      graceLateDays = 2
    } = req.body;

    const numYear = year ? parseInt(year) : new Date().getFullYear();
    let numMonth = 0;
    let datePrefix = "";
    if (typeof month === "string" && month.includes("-")) {
      const parts = month.split("-");
      datePrefix = `${parts[0]}-${parts[1].padStart(2, "0")}-`;
      numMonth = parseInt(parts[1]) - 1;
    } else {
      numMonth = month !== undefined ? parseInt(month) : new Date().getMonth();
      const monthStr = (numMonth + 1).toString().padStart(2, "0");
      datePrefix = `${numYear}-${monthStr}-`;
    }

    // Fetch all users and plans
    const [atdUsers, advTeamMembers, formulas, allEnrollments] = await Promise.all([
      AtdUser.find({ status: { $ne: "inactive" } }),
      AdvTeam.find({ status: { $ne: "Inactive" } }),
      SalaryFormula.find({ isActive: true }),
      AdvEnroll.find()
    ]);

    const advMapByEmail = {};
    advTeamMembers.forEach((m) => {
      if (m.email) advMapByEmail[m.email.toLowerCase().trim()] = m;
    });

    const formulaAssignmentMap = {};
    formulas.forEach((f) => {
      (f.assignedMembers || []).forEach((m) => {
        if (m.email) formulaAssignmentMap[m.email.toLowerCase().trim()] = { formula: f, config: m };
      });
    });

    // Unified list of team members
    const unifiedUsers = [];
    const seenEmails = new Set();

    atdUsers.forEach((u) => {
      const emailKey = (u.email || "").toLowerCase().trim();
      seenEmails.add(emailKey);
      const advMatch = advMapByEmail[emailKey];
      const formulaMatch = formulaAssignmentMap[emailKey];

      const baseSalary = formulaMatch?.config?.customBaseSalary || formulaMatch?.formula?.baseSalary || 10000;
      const target = formulaMatch?.config?.customBaseTarget || formulaMatch?.formula?.baseTarget || 80000;

      unifiedUsers.push({
        atdUserId: u._id,
        name: u.name || advMatch?.fullname || "Employee",
        email: u.email,
        role: u.role || advMatch?.designation || "Sales Specialist",
        team: advMatch?.team || (advMatch?.teams && advMatch?.teams[0]) || "General",
        baseSalary: Number(baseSalary),
        target: Number(target),
        planName: formulaMatch?.formula?.name || "Standard Plan"
      });
    });

    advTeamMembers.forEach((m) => {
      const emailKey = (m.email || "").toLowerCase().trim();
      if (!seenEmails.has(emailKey)) {
        seenEmails.add(emailKey);
        const formulaMatch = formulaAssignmentMap[emailKey];
        const baseSalary = formulaMatch?.config?.customBaseSalary || formulaMatch?.formula?.baseSalary || 10000;
        const target = formulaMatch?.config?.customBaseTarget || formulaMatch?.formula?.baseTarget || 80000;

        unifiedUsers.push({
          atdUserId: null,
          name: m.fullname,
          email: m.email,
          role: m.designation || "Sales Specialist",
          team: m.team || (m.teams && m.teams[0]) || "General",
          baseSalary: Number(baseSalary),
          target: Number(target),
          planName: formulaMatch?.formula?.name || "Standard Plan"
        });
      }
    });

    // Determine Calendar Days, Sundays, and Holidays in target month
    const daysInMonth = new Date(numYear, numMonth + 1, 0).getDate();
    const [allAttendance, holidaysInMonth, approvedAbsentRequests] = await Promise.all([
      Attendance.find({
        date: { $regex: new RegExp(`^${datePrefix}`) }
      }).select("userId date timestamp isHalfDayOverride"),
      Holiday.find({
        date: { $regex: new RegExp(`^${datePrefix}`) }
      }),
      AbsentRequest.find({
        date: { $regex: new RegExp(`^${datePrefix}`) },
        status: "approved"
      })
    ]);

    const holidayMap = {};
    holidaysInMonth.forEach((h) => {
      holidayMap[h.date] = h;
    });

    const sundayDates = new Set();
    const nonWorkingDates = new Set(); // Sundays + National/Company Holidays
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const dObj = new Date(numYear, numMonth, dayNum);
      const dStr = `${numYear}-${String(numMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      if (dObj.getDay() === 0) {
        // 0 = Sunday
        sundayDates.add(dStr);
        nonWorkingDates.add(dStr);
      } else if (holidayMap[dStr]) {
        nonWorkingDates.add(dStr);
      }
    }

    const calendarWorkingDays = Math.max(1, daysInMonth - nonWorkingDates.size);

    // Calculate working days elapsed so far up to current day (for ongoing month)
    const now = new Date();
    const isCurrentMonth = (numYear === now.getFullYear() && numMonth === now.getMonth());
    const currentDayOfMonth = isCurrentMonth ? now.getDate() : daysInMonth;

    let elapsedWorkingDays = 0;
    for (let dayNum = 1; dayNum <= currentDayOfMonth; dayNum++) {
      const dObj = new Date(numYear, numMonth, dayNum);
      const dStr = `${numYear}-${String(numMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      if (dObj.getDay() !== 0 && !holidayMap[dStr]) {
        elapsedWorkingDays++;
      }
    }
    elapsedWorkingDays = Math.max(1, elapsedWorkingDays);

    // Determine evaluation mode:
    // If admin explicitly set evaluationMode="full_month", evaluate full month.
    // Otherwise default to elapsed working days for the current ongoing month so future days are NOT marked as absences!
    const effectiveEvaluationMode =
      req.body.evaluationMode === "full_month"
        ? "full_month"
        : req.body.evaluationMode === "elapsed"
        ? "elapsed"
        : isCurrentMonth
        ? "elapsed"
        : "full_month";

    const fullMonthWorkingDays = Number(workingDays) > 0 ? Number(workingDays) : calendarWorkingDays;
    const workingDaysForEvaluation =
      effectiveEvaluationMode === "elapsed" ? elapsedWorkingDays : fullMonthWorkingDays;

    // Group attendance by user
    const attendanceByUser = {};
    allAttendance.forEach((rec) => {
      const uId = String(rec.userId);
      if (!attendanceByUser[uId]) attendanceByUser[uId] = [];
      attendanceByUser[uId].push(rec);
    });

    // Group approved absent requests by user (email & userId)
    const approvedAbsentByUser = {};
    approvedAbsentRequests.forEach((req) => {
      const emailKey = (req.userEmail || "").toLowerCase().trim();
      const uId = req.userId ? String(req.userId) : null;
      if (!approvedAbsentByUser[emailKey]) approvedAbsentByUser[emailKey] = [];
      approvedAbsentByUser[emailKey].push(req);
      if (uId && !approvedAbsentByUser[uId]) approvedAbsentByUser[uId] = [];
      if (uId) approvedAbsentByUser[uId].push(req);
    });

    // Calculate sales achieved for reference (though salary is attendance-based)
    const targetMonthStr = `${numYear}-${String(numMonth + 1).padStart(2, "0")}`;
    const salesByCounselor = {};
    allEnrollments.forEach((student) => {
      if (!student.counselor) return;
      const cKey = student.counselor.trim().toLowerCase();
      const createdDate = new Date(student.createdAt);
      const studentMonthYyyyMm = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, "0")}`;
      if (studentMonthYyyyMm === targetMonthStr && student.status === "fullPaid") {
        salesByCounselor[cKey] = (salesByCounselor[cKey] || 0) + (Number(student.paidAmount) || 0);
      }
    });

    const results = unifiedUsers.map((user) => {
      const records = user.atdUserId ? (attendanceByUser[String(user.atdUserId)] || []) : [];

      let lateCount = 0;
      let halfDayCount = 0;
      let onTimeCount = 0;
      const detailedRecords = [];

      records.forEach((r) => {
        const d = new Date(r.timestamp);
        const istTime = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
        const hours = istTime.getUTCHours();
        const mins = istTime.getUTCMinutes();
        const totalMinutes = hours * 60 + mins;

        let status = "Present";
        if (r.isHalfDayOverride || totalMinutes > 14 * 60) {
          halfDayCount++;
          status = "Half Day";
        } else if (totalMinutes > 11 * 60 + 5) {
          lateCount++;
          status = "Late";
        } else {
          onTimeCount++;
          status = "Present";
        }

        detailedRecords.push({
          date: r.date,
          status,
          time: `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
        });
      });

      const daysPresent = records.length;

      // Approved leaves lookup
      const userEmailKey = (user.email || "").toLowerCase().trim();
      const userApprovedLeaves = approvedAbsentByUser[userEmailKey] || (user.atdUserId ? approvedAbsentByUser[String(user.atdUserId)] : []) || [];
      const uniqueApprovedDates = Array.from(new Set(userApprovedLeaves.map((l) => l.date)));
      const approvedCount = uniqueApprovedDates.length;

      // Total absences on working days evaluated
      const totalAbsences = Math.max(0, workingDaysForEvaluation - daysPresent);

      // Approved absences vs unexcused absences
      const approvedAbsenceDays = Math.min(totalAbsences, approvedCount);
      const unexcusedAbsentDays = Math.max(0, totalAbsences - approvedAbsenceDays);

      // 2-DAY PAID LEAVE RULE:
      // First 2 approved leaves per month are PAID (Rs 0 deduction).
      // From the 3rd approved leave onwards, it is UNPAID (deducted).
      // Unexcused absence (without approved request) is ALWAYS UNPAID.
      const paidApprovedLeaves = Math.min(2, approvedAbsenceDays);
      const unpaidApprovedLeaves = Math.max(0, approvedAbsenceDays - paidApprovedLeaves);
      const totalUnpaidLeaves = unpaidApprovedLeaves + unexcusedAbsentDays;

      // 1. Leave Deduction (applied strictly to totalUnpaidLeaves)
      let leaveDeduction = 0;
      if (leaveDeductionType === "pro_rata") {
        const dailyRate = user.baseSalary / fullMonthWorkingDays;
        leaveDeduction = Math.round(totalUnpaidLeaves * dailyRate);
      } else {
        leaveDeduction = Math.round(totalUnpaidLeaves * Number(leaveDeductionAmount));
      }

      // 2. Half Day Deduction
      let halfDayDeduction = 0;
      if (halfDayDeductionType === "half_of_leave") {
        const halfRate = (leaveDeductionType === "pro_rata" ? (user.baseSalary / fullMonthWorkingDays) : Number(leaveDeductionAmount)) / 2;
        halfDayDeduction = Math.round(halfDayCount * halfRate);
      } else {
        halfDayDeduction = Math.round(halfDayCount * Number(halfDayDeductionAmount));
      }

      // 3. Late Deduction
      const billableLate = Math.max(0, lateCount - Number(graceLateDays));
      const lateDeduction = Math.round(billableLate * Number(lateDeductionAmount));

      // Capped Deductions: Deductions can never exceed Base Salary!
      const totalDeductionsRaw = leaveDeduction + halfDayDeduction + lateDeduction;
      const totalDeductions = Math.min(user.baseSalary, totalDeductionsRaw);
      const effectiveLeaveDeduction = Math.min(
        leaveDeduction,
        Math.max(0, user.baseSalary - (halfDayDeduction + lateDeduction))
      );

      // ATTENDANCE-BASED SALARY: Full Base Salary - Deductions (independent of credit/target!)
      const netSalary = Math.max(0, Math.round(user.baseSalary - totalDeductions));

      const achievedSales = salesByCounselor[(user.name || "").trim().toLowerCase()] || 0;

      return {
        userId: user.atdUserId,
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team,
        baseSalary: user.baseSalary,
        target: user.target,
        achievedSales,
        planName: user.planName,
        attendance: {
          calendarDays: daysInMonth,
          sundaysCount: sundayDates.size,
          holidaysCount: Object.keys(holidayMap).length,
          workingDays: workingDaysForEvaluation,
          fullMonthWorkingDays,
          elapsedWorkingDays,
          evaluationMode: effectiveEvaluationMode,
          daysPresent,
          onTimeCount,
          halfDayCount,
          lateCount,
          billableLate,
          totalAbsences,
          approvedPaidLeaves: paidApprovedLeaves,
          approvedUnpaidLeaves: unpaidApprovedLeaves,
          unexcusedAbsentDays,
          totalUnpaidLeaves
        },
        deductions: {
          leaveDeduction: effectiveLeaveDeduction,
          rawLeaveDeduction: leaveDeduction,
          halfDayDeduction,
          lateDeduction,
          totalDeductions
        },
        netSalary,
        detailedRecords
      };
    });

    res.status(200).json({
      success: true,
      month: targetMonthStr,
      calendar: {
        daysInMonth,
        sundaysCount: sundayDates.size,
        holidaysCount: Object.keys(holidayMap).length,
        calendarWorkingDays,
        elapsedWorkingDays,
        isCurrentMonth
      },
      config: {
        workingDays: workingDaysForEvaluation,
        fullMonthWorkingDays,
        elapsedWorkingDays,
        evaluationMode: effectiveEvaluationMode,
        leaveDeductionType,
        leaveDeductionAmount,
        halfDayDeductionType,
        halfDayDeductionAmount,
        lateDeductionAmount,
        graceLateDays
      },
      data: results
    });
  } catch (error) {
    console.error("Error calculating attendance salaries:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 15. SEND TARGET & BASE SALARY DETAILS VIA EMAIL TO SALES SPECIALISTS
router.post("/send-target-salary-mail", async (req, res) => {
  try {
    const { memberId, memberEmail, month } = req.body;

    const [advTeamMembers, formulas] = await Promise.all([
      AdvTeam.find({ status: { $ne: "Inactive" } }),
      SalaryFormula.find({ isActive: true })
    ]);

    const defaultFormula = formulas.find((f) => f.isDefault) || formulas[0] || {
      name: "Standard Sales Plan",
      baseSalary: 25000,
      baseTarget: 200000,
      metricType: "revenue"
    };

    const targetMonthStr = month || new Date().toISOString().slice(0, 7);
    const monthDate = new Date(`${targetMonthStr}-01`);
    const monthName = monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    // Determine target members
    let targetMembers = advTeamMembers;
    if (memberId) {
      targetMembers = advTeamMembers.filter((m) => String(m._id) === String(memberId));
    } else if (memberEmail) {
      targetMembers = advTeamMembers.filter(
        (m) => m.email?.toLowerCase().trim() === memberEmail.toLowerCase().trim()
      );
    }

    if (targetMembers.length === 0) {
      return res.status(404).json({ success: false, message: "No matching sales specialist found." });
    }

    const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").split(",")[0].trim();
    const portalUrl = `${frontendUrl}/advteam/salary-calculator`;

    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (const member of targetMembers) {
      if (!member.email) continue;

      // Find member's assigned formula
      let assignedFormula = null;
      let memberConfig = null;

      for (const f of formulas) {
        const found = (f.assignedMembers || []).find(
          (m) =>
            String(m.memberId) === String(member._id) ||
            m.email?.toLowerCase().trim() === member.email?.toLowerCase().trim()
        );
        if (found) {
          assignedFormula = f;
          memberConfig = found;
          break;
        }
      }

      if (!assignedFormula) {
        assignedFormula = defaultFormula;
      }

      const effectiveBaseSalary = memberConfig?.customBaseSalary ?? assignedFormula.baseSalary ?? 25000;
      const effectiveTarget = memberConfig?.customBaseTarget ?? assignedFormula.baseTarget ?? 200000;
      const metricType = assignedFormula.metricType || "revenue";
      const targetDisplay =
        metricType === "deals"
          ? `${effectiveTarget} Deals`
          : `₹${Number(effectiveTarget).toLocaleString("en-IN")}`;
      const baseSalaryDisplay = `₹${Number(effectiveBaseSalary).toLocaleString("en-IN")}`;

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Monthly Target & Salary Details</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); padding: 35px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">Accenlearn Operations</h1>
              <p style="color: #c7d2fe; font-size: 13px; margin: 6px 0 0; font-weight: 500;">Sales Specialist Target & Base Compensation Plan</p>
              <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.15); color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 20px; margin-top: 15px; letter-spacing: 0.5px; text-transform: uppercase;">
                ${monthName}
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 15px; line-height: 1.5; color: #334155; margin-top: 0;">
                Dear <strong>${member.fullname || "Sales Specialist"}</strong>,
              </p>
              <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin-bottom: 25px;">
                Your official monthly sales target and base salary structure for <strong>${monthName}</strong> have been configured by the Admin team. Below are your assigned plan and target details:
              </p>

              <!-- Compensation Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 25px; overflow: hidden;">
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <table width="100%">
                      <tr>
                        <td style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Assigned Plan</td>
                        <td align="right" style="font-size: 13px; font-weight: 800; color: #4338ca;">${assignedFormula.name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <table width="100%">
                      <tr>
                        <td style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Monthly Base Salary</td>
                        <td align="right" style="font-size: 18px; font-weight: 900; color: #0f172a;">${baseSalaryDisplay}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <table width="100%">
                      <tr>
                        <td style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Monthly Sales Target</td>
                        <td align="right" style="font-size: 18px; font-weight: 900; color: #4f46e5;">${targetDisplay}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px;">
                    <table width="100%">
                      <tr>
                        <td style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Team / Department</td>
                        <td align="right" style="font-size: 12px; font-weight: 700; color: #334155;">${member.team || (member.teams && member.teams[0]) || "Sales Team"} (${member.designation || "Specialist"})</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Revenue Guidelines Callout -->
              <div style="background-color: #eef2ff; border-left: 4px solid #6366f1; padding: 14px 18px; border-radius: 8px; margin-bottom: 25px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #312e81;">
                  <strong>Important Revenue Policy:</strong> Target achievement is recognized strictly from candidate payments marked as <strong>fullPaid</strong>. Partial or defaulted payments are not counted towards target milestones.
                </p>
              </div>

              <!-- Button CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 10px; margin-bottom: 20px;">
                <tr>
                  <td align="center">
                    <a href="${portalUrl}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%); color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 800; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);">
                      Open Sales Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 15px; margin-bottom: 0;">
                You can track your real-time candidate payments, target progress, and live calculations in your dashboard.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 30px; text-align: center;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0;">
                Accenlearn • Confidential Compensation Communication<br>
                For any queries regarding your target, please reach out to operations.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      try {
        await sendEmail({
          email: member.email,
          subject: `Monthly Sales Target & Salary Structure - ${monthName}`,
          message: emailHtml
        });
        successCount++;
        results.push({ email: member.email, name: member.fullname, status: "sent" });
      } catch (err) {
        failCount++;
        results.push({ email: member.email, name: member.fullname, status: "failed", error: err.message });
      }
    }

    res.status(200).json({
      success: true,
      message: `Sent target & salary details to ${successCount} specialist(s)${failCount > 0 ? ` (${failCount} failed)` : ""}.`,
      sentCount: successCount,
      failCount,
      results
    });
  } catch (error) {
    console.error("Error sending target salary emails:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
