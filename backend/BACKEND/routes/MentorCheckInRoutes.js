const express = require("express");
const router = express.Router();
const MentorCheckIn = require("../models/MentorCheckIn");
const Interviewer = require("../models/Interviewer");
const MentorOnboarding = require("../models/MentorOnboarding");
const Operation = require("../models/CreateOperation");
const AdvOperation = require("../models/CreateAdvOperation");
const CreateCourse = require("../models/CreateCourse");
const CreateAdvCourse = require("../models/CreateAdvCourse");

// Helper to extract Google Drive file ID from URL
function extractDriveId(url) {
    if (!url || typeof url !== "string") return "";
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
    const matchId = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (matchId) return matchId[1];
    return "";
}

// Helper to resolve mentor phone with comprehensive fallbacks across collections
async function resolveMentorPhone(m, checkIn = null) {
    if (!m) return "";
    let phone =
        m.phone ||
        m.whatsAppNumber ||
        m.phoneNumber ||
        m.mobileNumber ||
        m.mobile ||
        m.contactNumber ||
        m.contact ||
        "";
    if (phone && String(phone).trim() !== "") return String(phone).trim();

    // 1. Check current checkIn object
    if (checkIn && checkIn.mentorPhone && String(checkIn.mentorPhone).trim() !== "") {
        return String(checkIn.mentorPhone).trim();
    }

    // 2. Check any previous check-in for this mentor
    try {
        if (m._id) {
            const anyCheckIn = await MentorCheckIn.findOne({
                mentorId: m._id,
                mentorPhone: { $exists: true, $ne: "" },
            }).lean();
            if (anyCheckIn && anyCheckIn.mentorPhone && String(anyCheckIn.mentorPhone).trim() !== "") {
                phone = String(anyCheckIn.mentorPhone).trim();
                Interviewer.updateOne({ _id: m._id }, { $set: { phone } }).exec().catch(() => {});
                return phone;
            }
        }
    } catch (e) {}

    // 3. Check MentorOnboarding application
    try {
        const query = [];
        if (m.email) {
            query.push({ email: m.email.toLowerCase().trim() });
            query.push({ companyEmail: m.email.toLowerCase().trim() });
        }
        if (m.companyEmail) {
            query.push({ email: m.companyEmail.toLowerCase().trim() });
            query.push({ companyEmail: m.companyEmail.toLowerCase().trim() });
        }
        if (m.fullname) {
            query.push({ fullname: new RegExp(`^${m.fullname.trim()}$`, "i") });
        }

        if (query.length > 0) {
            const onboarding = await MentorOnboarding.findOne({ $or: query }).lean();
            if (onboarding) {
                phone = onboarding.phone || onboarding.whatsAppNumber || "";
                if (phone && String(phone).trim() !== "") {
                    phone = String(phone).trim();
                    if (m._id) {
                        Interviewer.updateOne(
                            { _id: m._id },
                            { $set: { phone, whatsAppNumber: onboarding.whatsAppNumber || phone } }
                        ).exec().catch(() => {});
                    }
                    return phone;
                }
            }
        }
    } catch (e) {}

    return "";
}

// 1. GET ALL CHECK-INS WITH RICH FILTERS
router.get("/all", async (req, res) => {
    try {
        const {
            operationId,
            operationName,
            mentorId,
            status,
            paymentStatus,
            startDate,
            endDate,
            search,
            limit = 100,
            page = 1,
        } = req.query;

        const query = {};

        if (operationId) {
            query.assignedOperationId = operationId;
        } else if (operationName && operationName !== "all") {
            query.assignedOperationName = new RegExp(`^${operationName.trim()}$`, "i");
        }

        if (mentorId) {
            query.mentorId = mentorId;
        }

        if (status && status !== "all") {
            query.status = status;
        }

        if (paymentStatus && paymentStatus !== "all") {
            query.paymentStatus = paymentStatus;
        }

        if (startDate || endDate) {
            query.sessionDate = {};
            if (startDate) {
                const sDate = new Date(startDate);
                sDate.setHours(0, 0, 0, 0);
                query.sessionDate.$gte = sDate;
            }
            if (endDate) {
                const eDate = new Date(endDate);
                eDate.setHours(23, 59, 59, 999);
                query.sessionDate.$lte = eDate;
            }
        }

        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            query.$or = [
                { mentorName: regex },
                { mentorEmail: regex },
                { sessionTitle: regex },
                { courseTitle: regex },
                { assignedOperationName: regex },
            ];
        }

        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const total = await MentorCheckIn.countDocuments(query);
        const checkins = await MentorCheckIn.find(query)
            .sort({ sessionDate: -1, createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit, 10))
            .lean();

        const enrichedCheckins = await Promise.all(
            checkins.map(async (c) => {
                if (c.mentorPhone && c.mentorPhone.trim() !== "") {
                    return c;
                }
                const mentor = await Interviewer.findById(c.mentorId).lean();
                const phone = await resolveMentorPhone(mentor, c);
                return {
                    ...c,
                    mentorPhone: phone || "",
                };
            })
        );

        res.status(200).json({
            total,
            page: parseInt(page, 10),
            totalPages: Math.ceil(total / parseInt(limit, 10)),
            checkins: enrichedCheckins,
        });
    } catch (error) {
        console.error("Error fetching mentor check-ins:", error);
        res.status(500).json({ message: "Server error fetching check-ins", error: error.message });
    }
});

// 2. GET METRICS / STATS
router.get("/stats", async (req, res) => {
    try {
        const { operationId, operationName } = req.query;
        const query = {};
        if (operationId) {
            query.assignedOperationId = operationId;
        } else if (operationName && operationName !== "all") {
            query.assignedOperationName = new RegExp(`^${operationName.trim()}$`, "i");
        }

        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

        const totalCheckIns = await MentorCheckIn.countDocuments(query);
        const pendingCount = await MentorCheckIn.countDocuments({ ...query, status: "pending" });
        const verifiedCount = await MentorCheckIn.countDocuments({ ...query, status: "verified" });
        const rejectedCount = await MentorCheckIn.countDocuments({ ...query, status: "rejected" });

        const todayCheckIns = await MentorCheckIn.countDocuments({
            ...query,
            sessionDate: { $gte: startOfToday, $lte: endOfToday },
        });

        const paymentAgg = await MentorCheckIn.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$paymentStatus",
                    totalAmount: { $sum: "$sessionFee" },
                    count: { $sum: 1 },
                },
            },
        ]);

        const paymentStats = {
            unpaid: 0,
            approved: 0,
            paid: 0,
            hold: 0,
            totalFeeApprovedOrPaid: 0,
        };

        paymentAgg.forEach((item) => {
            if (paymentStats.hasOwnProperty(item._id)) {
                paymentStats[item._id] = item.count;
            }
            if (item._id === "approved" || item._id === "paid") {
                paymentStats.totalFeeApprovedOrPaid += item.totalAmount;
            }
        });

        res.status(200).json({
            totalCheckIns,
            todayCheckIns,
            pendingCount,
            verifiedCount,
            rejectedCount,
            paymentStats,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Server error fetching stats", error: error.message });
    }
});

// 3. TODAY'S MENTOR ACTIVITY / COMPLIANCE STATUS
// Answers: Did each mentor take today's class and upload recording or not?
router.get("/today-mentor-status", async (req, res) => {
    try {
        const { operationId, operationName } = req.query;

        // Fetch mentors
        const mentorQuery = {};
        if (operationId) {
            mentorQuery.assignedOperationId = operationId;
        } else if (operationName && operationName !== "all") {
            mentorQuery.assignedOperationName = new RegExp(`^${operationName.trim()}$`, "i");
        }

        const mentors = await Interviewer.find(mentorQuery).lean();

        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

        // Get all check-ins for today
        const todayCheckIns = await MentorCheckIn.find({
            sessionDate: { $gte: startOfToday, $lte: endOfToday },
        }).lean();

        const todayCheckInMap = {};
        todayCheckIns.forEach((c) => {
            todayCheckInMap[c.mentorId.toString()] = c;
        });

        // Get latest check-in for each mentor overall
        const statusList = await Promise.all(
            mentors.map(async (m) => {
                const todayUpload = todayCheckInMap[m._id.toString()] || null;
                const lastCheckIn = todayUpload
                    ? todayUpload
                    : await MentorCheckIn.findOne({ mentorId: m._id })
                          .sort({ sessionDate: -1, createdAt: -1 })
                          .lean();

                const phone = await resolveMentorPhone(m, todayUpload || lastCheckIn);

                return {
                    mentorId: m._id,
                    mentorName: m.fullname,
                    mentorEmail: m.email,
                    mentorPhone: phone || m.phone || m.whatsAppNumber || "",
                    phone: phone || m.phone || m.whatsAppNumber || "",
                    whatsAppNumber: m.whatsAppNumber || phone || "",
                    assignedOperationId: m.assignedOperationId,
                    assignedOperationName: m.assignedOperationName,
                    assignedOperationType: m.assignedOperationType,
                    perSessionRate: m.perSessionRate || 0,
                    uploadedToday: !!todayUpload,
                    todayCheckIn: todayUpload,
                    lastCheckIn: lastCheckIn
                        ? {
                              sessionTitle: lastCheckIn.sessionTitle,
                              sessionDate: lastCheckIn.sessionDate,
                              status: lastCheckIn.status,
                              paymentStatus: lastCheckIn.paymentStatus,
                              driveLink: lastCheckIn.driveLink,
                          }
                        : null,
                };
            })
        );

        res.status(200).json(statusList);
    } catch (error) {
        console.error("Error fetching today's mentor status:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 4. CREATE MENTOR CHECK-IN (From Mentor Portal or Operation on their behalf)
router.post("/create", async (req, res) => {
    try {
        const {
            mentorId,
            mentorName,
            mentorEmail,
            mentorPhone,
            assignedOperationId,
            assignedOperationName,
            courseId,
            courseTitle,
            sessionTitle,
            sessionDate,
            sessionStartTime,
            sessionEndTime,
            duration,
            driveLink,
            notes,
            learnerCount,
            sessionFee,
        } = req.body;

        if (!mentorId || !sessionTitle || !driveLink) {
            return res.status(400).json({ message: "Mentor ID, Session Title, and Drive Link are required." });
        }

        // Fetch mentor to fill in any missing details like assigned operation
        const mentor = await Interviewer.findById(mentorId);
        let finalOpId = assignedOperationId || (mentor ? mentor.assignedOperationId : null);
        let finalOpName = assignedOperationName || (mentor ? mentor.assignedOperationName : "");
        let finalOpEmail = mentor ? mentor.assignedOperationEmail : "";
        let finalFee = sessionFee || (mentor ? mentor.perSessionRate : 0) || 0;

        const resolvedPhone = mentorPhone || (await resolveMentorPhone(mentor));
        const driveId = extractDriveId(driveLink);

        const newCheckIn = new MentorCheckIn({
            mentorId,
            mentorName: mentorName || (mentor ? mentor.fullname : "Mentor"),
            mentorEmail: mentorEmail || (mentor ? mentor.email : ""),
            mentorPhone: resolvedPhone || "",
            assignedOperationId: finalOpId,
            assignedOperationName: finalOpName,
            assignedOperationEmail: finalOpEmail,
            courseId: courseId || (mentor ? mentor.assignedCourseId : null),
            courseTitle: courseTitle || "",
            sessionTitle,
            sessionDate: sessionDate ? new Date(sessionDate) : new Date(),
            sessionStartTime: sessionStartTime || "",
            sessionEndTime: sessionEndTime || "",
            duration: duration || "",
            driveLink,
            driveId,
            notes: notes || "",
            learnerCount: Number(learnerCount) || 0,
            sessionFee: Number(finalFee) || 0,
            status: "pending",
            paymentStatus: "unpaid",
        });

        await newCheckIn.save();

        // Optional: Also sync to course sessions if courseId is available
        const targetCourseId = newCheckIn.courseId;
        if (targetCourseId) {
            try {
                let course = await CreateCourse.findById(targetCourseId);
                if (!course) {
                    course = await CreateAdvCourse.findById(targetCourseId);
                }
                if (course) {
                    let courseObj = course.toObject();
                    let currentSession = courseObj.session || {};
                    if (typeof currentSession !== "object" || Array.isArray(currentSession)) {
                        currentSession = {};
                    }
                    let maxIndex = 0;
                    Object.keys(currentSession).forEach((key) => {
                        if (key.startsWith("session")) {
                            const num = parseInt(key.replace("session", ""), 10);
                            if (!isNaN(num) && num > maxIndex) {
                                maxIndex = num;
                            }
                        }
                    });
                    const newSessionKey = `session${maxIndex + 1}`;
                    const updatedSession = {
                        ...currentSession,
                        [newSessionKey]: {
                            title: sessionTitle,
                            driveLink,
                            description: driveId,
                            type: "mentor_video",
                            checkInId: newCheckIn._id,
                            createdAt: new Date(),
                        },
                    };
                    course.set("session", updatedSession);
                    course.markModified("session");
                    await course.save();
                }
            } catch (courseSyncErr) {
                console.warn("Could not sync check-in to course session:", courseSyncErr.message);
            }
        }

        res.status(201).json({ message: "Check-in submitted successfully!", checkin: newCheckIn });
    } catch (error) {
        console.error("Error creating check-in:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 5. OPERATION VERIFIES / REJECTS A CHECK-IN
router.put("/verify/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus, operationRemarks, sessionFee, verifiedBy } = req.body;

        if (!status || !["pending", "verified", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Valid status ('pending', 'verified', 'rejected') is required." });
        }

        const updateData = {
            status,
            verifiedAt: status === "verified" ? new Date() : null,
            verifiedBy: verifiedBy || "Operation Executive",
        };

        if (operationRemarks !== undefined) updateData.operationRemarks = operationRemarks;
        if (sessionFee !== undefined) updateData.sessionFee = Number(sessionFee) || 0;

        if (paymentStatus) {
            updateData.paymentStatus = paymentStatus;
        } else if (status === "verified") {
            // Auto approve payment on class verification if not rejected
            updateData.paymentStatus = "approved";
        } else if (status === "rejected") {
            updateData.paymentStatus = "hold";
        }

        const updated = await MentorCheckIn.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Check-in not found." });
        }

        res.status(200).json({ message: "Check-in status updated successfully!", checkin: updated });
    } catch (error) {
        console.error("Error verifying check-in:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 6. UPDATE PAYMENT STATUS
router.put("/payment-status/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus, sessionFee, operationRemarks } = req.body;

        const updateData = {};
        if (paymentStatus) updateData.paymentStatus = paymentStatus;
        if (sessionFee !== undefined) updateData.sessionFee = Number(sessionFee);
        if (operationRemarks !== undefined) updateData.operationRemarks = operationRemarks;

        const updated = await MentorCheckIn.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Check-in record not found." });
        }

        res.status(200).json({ message: "Payment status updated!", checkin: updated });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 7. DELETE A CHECK-IN
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await MentorCheckIn.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Check-in not found." });
        }
        res.status(200).json({ message: "Check-in deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 8. ASSIGN MENTOR TO OPERATION (Admin action)
router.post("/assign-operation", async (req, res) => {
    try {
        const { mentorId, operationId, operationName, operationEmail, operationType, perSessionRate } = req.body;

        if (!mentorId) {
            return res.status(400).json({ message: "Mentor ID is required." });
        }

        const updateData = {
            assignedOperationId: operationId || null,
            assignedOperationName: operationName || "",
            assignedOperationEmail: operationEmail || "",
            assignedOperationType: operationType || "",
        };

        if (perSessionRate !== undefined) {
            updateData.perSessionRate = Number(perSessionRate) || 0;
        }

        const updatedMentor = await Interviewer.findByIdAndUpdate(mentorId, updateData, { new: true });
        if (!updatedMentor) {
            return res.status(404).json({ message: "Mentor not found." });
        }

        // Also update any pending check-ins for this mentor with the new operation assignee
        if (operationId) {
            await MentorCheckIn.updateMany(
                { mentorId, status: "pending" },
                {
                    assignedOperationId: operationId,
                    assignedOperationName: operationName || "",
                    assignedOperationEmail: operationEmail || "",
                }
            );
        }

        res.status(200).json({ message: "Mentor assigned to Operation successfully!", mentor: updatedMentor });
    } catch (error) {
        console.error("Error assigning mentor to operation:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 9. BULK ASSIGN MENTORS TO OPERATION (Admin action)
router.post("/bulk-assign-operation", async (req, res) => {
    try {
        const { mentorIds, operationId, operationName, operationEmail, operationType } = req.body;

        if (!mentorIds || !Array.isArray(mentorIds) || mentorIds.length === 0) {
            return res.status(400).json({ message: "Array of mentorIds is required." });
        }

        await Interviewer.updateMany(
            { _id: { $in: mentorIds } },
            {
                assignedOperationId: operationId || null,
                assignedOperationName: operationName || "",
                assignedOperationEmail: operationEmail || "",
                assignedOperationType: operationType || "",
            }
        );

        if (operationId) {
            await MentorCheckIn.updateMany(
                { mentorId: { $in: mentorIds }, status: "pending" },
                {
                    assignedOperationId: operationId,
                    assignedOperationName: operationName || "",
                    assignedOperationEmail: operationEmail || "",
                }
            );
        }

        res.status(200).json({ message: `Assigned ${mentorIds.length} mentors successfully!` });
    } catch (error) {
        console.error("Error in bulk assignment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 10. GET UNIFIED LIST OF OPERATION MEMBERS (From both Operation and AdvOperation)
router.get("/operations-list", async (req, res) => {
    try {
        const ops = await Operation.find({}, "fullname email languages isOnline").lean();
        const advOps = await AdvOperation.find({}, "fullname email languages status isOnline").lean();

        const formattedOps = (ops || []).map((o) => ({
            _id: o._id,
            fullname: o.fullname,
            email: o.email,
            languages: o.languages || [],
            type: "Operation",
            isOnline: o.isOnline,
        }));

        const formattedAdvOps = (advOps || []).map((o) => ({
            _id: o._id,
            fullname: o.fullname,
            email: o.email,
            languages: o.languages || [],
            type: "AdvOperation",
            isOnline: o.isOnline,
        }));

        res.status(200).json([...formattedOps, ...formattedAdvOps]);
    } catch (error) {
        console.error("Error fetching operations list:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 11. GET ALL MENTORS WITH THEIR OPERATION ASSIGNMENTS & STATS
router.get("/mentors-with-ops", async (req, res) => {
    try {
        const mentors = await Interviewer.find().sort({ createdAt: -1 }).lean();

        // Get total check-ins count per mentor
        const checkInCounts = await MentorCheckIn.aggregate([
            {
                $group: {
                    _id: "$mentorId",
                    total: { $sum: 1 },
                    verified: { $sum: { $cond: [{ $eq: ["$status", "verified"] }, 1, 0] } },
                    pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
                },
            },
        ]);

        const countMap = {};
        checkInCounts.forEach((c) => {
            countMap[c._id.toString()] = c;
        });

        // Resolve assigned course titles
        const enrichedMentors = await Promise.all(
            mentors.map(async (m) => {
                let courseTitle = "";
                if (m.assignedCourseId) {
                    const c1 = await CreateCourse.findById(m.assignedCourseId, "title");
                    if (c1) {
                        courseTitle = c1.title;
                    } else {
                        const c2 = await CreateAdvCourse.findById(m.assignedCourseId, "title");
                        if (c2) courseTitle = c2.title;
                    }
                }
                const counts = countMap[m._id.toString()] || { total: 0, verified: 0, pending: 0 };
                const phone = await resolveMentorPhone(m);
                return {
                    ...m,
                    phone: phone || m.phone || m.whatsAppNumber || "",
                    mentorPhone: phone || m.phone || m.whatsAppNumber || "",
                    whatsAppNumber: m.whatsAppNumber || phone || "",
                    courseTitle,
                    stats: counts,
                };
            })
        );

        res.status(200).json(enrichedMentors);
    } catch (error) {
        console.error("Error fetching mentors with ops:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;

