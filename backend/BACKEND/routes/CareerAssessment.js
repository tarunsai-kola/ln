const express = require("express");
const router = express.Router();
const CareerAssessment = require("../models/CareerAssessment");
const AssessmentSlot = require("../models/AssessmentSlot");
const Razorpay = require('razorpay');
const AdvLead = require("../models/AdvLead");
const AdvUser = require("../models/AdvUser");
const {
  sendSkillEvaluationWelcomeEmail,
  sendSkillEvaluationAdminNotification,
  sendSkillEvaluationExecutiveNotification
} = require("../utils/emailService");

// POST: Create a new career assessment (payment-gated)
router.post("/careerassessment", async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: "Payment ID is required to submit assessment." });
    }

    // 1. Check if this payment ID was already used (Prevent Replay Attacks)
    const existingAssessment = await CareerAssessment.findOne({ paymentId });
    if (existingAssessment) {
      return res.status(400).json({ error: "This payment has already been used for an assessment." });
    }

    // 2. Verify with Razorpay Servers directly (Prevent Spoofing)
    if (paymentId.startsWith('dev_bypass_payment_') && process.env.NODE_ENV !== 'production') {
      console.log("Development mode: Bypassing Razorpay verification for testing.");
    } else {
      const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });

      try {
        const payment = await razorpayInstance.payments.fetch(paymentId);

        if (payment.status !== 'captured' && payment.status !== 'authorized') {
          return res.status(400).json({ error: "Payment was not successful on Razorpay's end." });
        }

        if (Number(payment.amount) < 10100) { // ₹101 in paise
          console.error(`Amount mismatch: Received ${payment.amount}`);
          return res.status(400).json({ error: `Payment amount mismatch. Expected at least ₹101, but got ₹${payment.amount / 100}.` });
        }
      } catch (rzpErr) {
        console.error("Razorpay Fetch Error:", rzpErr);
        return res.status(400).json({ error: "Invalid or fake Payment ID provided." });
      }
    }

    // 3. Payment is verified. Attempt to lock the slot.
    const { bookedDate, bookedTimeSlot } = req.body;
    if (!bookedDate || !bookedTimeSlot) {
      return res.status(400).json({ error: "Date and Time Slot are required." });
    }

    let slot;
    try {
      slot = await AssessmentSlot.create({
        date: bookedDate,
        timeSlot: bookedTimeSlot,
        isBooked: true
      });
    } catch (slotErr) {
      if (slotErr.code === 11000) {
        return res.status(409).json({ error: "SLOT_TAKEN", message: "This slot was just taken by someone else. Please select another slot." });
      }
      throw slotErr;
    }

    // 4. Slot locked. Save the assessment to DB.
    try {
      const newAssessment = new CareerAssessment(req.body);

      // ATTEMPT TO MATCH WITH EXISTING LEAD IN ADV TEAM
      try {
        const matchedLead = await AdvLead.findOne({
          $or: [
            { email: req.body.email },
            { phone_number: req.body.mobileNumber }
          ]
        });

        const executiveId = matchedLead ? (matchedLead.current_owner_id || matchedLead.owner_id) : null;

        if (executiveId) {
          newAssessment.assignedExecutiveId = executiveId;

          let executive = await AdvUser.findById(executiveId);
          if (!executive) {
            const AdvTeam = require("../models/CreateAdvTeam");
            executive = await AdvTeam.findById(executiveId);
          }

          if (executive) {
            newAssessment.assignedExecutiveEmail = executive.email;
            newAssessment.assignedExecutiveName = executive.fullname || executive.name;
            newAssessment.managerId = executive.manager_id || matchedLead.manager_id;

            if (newAssessment.managerId) {
              let manager = await AdvUser.findById(newAssessment.managerId);
              if (!manager) {
                const AdvTeam = require("../models/CreateAdvTeam");
                manager = await AdvTeam.findById(newAssessment.managerId);
              }
              if (manager) {
                newAssessment.managerEmail = manager.email;
              }
            }
          }
        }
      } catch (matchErr) {
        console.error("Error matching lead for career assessment:", matchErr);
        // Non-fatal, proceed with saving
      }

      const savedAssessment = await newAssessment.save();

      // Tie the slot to the assessment
      slot.bookedBy = savedAssessment._id;
      await slot.save();

      // FIRE AUTOMATED EMAILS ASYNCHRONOUSLY
      sendSkillEvaluationWelcomeEmail(savedAssessment.email, savedAssessment.fullName, savedAssessment.bookedDate, savedAssessment.bookedTimeSlot);
      sendSkillEvaluationAdminNotification(savedAssessment);

      if (savedAssessment.assignedExecutiveEmail) {
        sendSkillEvaluationExecutiveNotification(savedAssessment.assignedExecutiveEmail, savedAssessment);
      }

      if (savedAssessment.managerEmail) {
        sendSkillEvaluationExecutiveNotification(savedAssessment.managerEmail, savedAssessment);
      }

      res.status(201).json({ message: "Assessment submitted successfully", data: savedAssessment });
    } catch (dbError) {
      // ROLLBACK: If form fails to save, unlock the slot
      await AssessmentSlot.findByIdAndDelete(slot._id);
      console.error("Error saving career assessment. Slot rolled back.", dbError);
      res.status(500).json({ error: "Failed to submit assessment due to invalid form data." });
    }
  } catch (error) {
    console.error("Error saving career assessment:", error);
    res.status(500).json({ error: "Failed to submit assessment" });
  }
});

// GET: Fetch career assessments (for AdvTeam dashboard) with role-based filtering
router.get("/careerassessment", async (req, res) => {
  try {
    const { userId, role, page, limit: limitParam } = req.query;
    let query = {};

    if (role && userId) {
      const normalizedRole = role.toLowerCase().replace(/ /g, "_");

      if (
        normalizedRole === "sr_inside_sales_specialist" ||
        normalizedRole === "inside_sales_specialist" ||
        normalizedRole === "adv_member" ||
        normalizedRole === "member" ||
        normalizedRole === "sr._inside_sales_specialist"
      ) {
        query = { assignedExecutiveId: userId };
      } else if (
        normalizedRole === "manager" ||
        normalizedRole === "leader" ||
        normalizedRole === "adv_manager" ||
        normalizedRole === "adv_leader"
      ) {
        query = {
          $or: [
            { assignedExecutiveId: userId },
            { managerId: userId }
          ]
        };
      }
      // Admin / undefined role sees everything
    }

    // Pagination support
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limitParam) || 30;
    const skip = (pageNum - 1) * limitNum;

    const assessments = await CareerAssessment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await CareerAssessment.countDocuments(query);

    res.status(200).json({
      data: assessments,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalItems: total
    });
  } catch (error) {
    console.error("Error fetching career assessments:", error);
    res.status(500).json({ error: "Failed to fetch assessments" });
  }
});

module.exports = router;
