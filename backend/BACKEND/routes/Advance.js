const express = require("express");
const router = express.Router();
const Advance = require("../models/Advance");
const AdvLead = require("../models/AdvLead");
const verifyAnyAuth = require("../middleware/verifyAnyAuth");
const crypto = require("crypto");
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail, SVGS, COMPANY_NAME } = require("../utils/emailTemplate");


router.get("/advancequeries", verifyAnyAuth, async (req, res) => {
  const { limit, all } = req.query;
  try {
    // If all=true or limit=0, fetch all records (for dashboard)
    const queryLimit = all === 'true' || limit === '0' ? 0 : (parseInt(limit) || 0);

    let queries;
    if (queryLimit > 0) {
      queries = await Advance.find()
        .sort({ _id: -1 })
        .limit(queryLimit)
        .lean();
    } else {
      // No limit - fetch all
      queries = await Advance.find()
        .sort({ _id: -1 })
        .lean();
    }
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

router.post("/advance/register", async (req, res) => {
  const { name, email, phone, currentRole, experience, goal, goalOther, domain, domainOther, interestedDomain, reason, passedOutYear } = req.body;
  // console.log(req.body);
  try {
    const newRegistration = new Advance({
      name,
      email,
      phone,
      currentRole,
      experience,
      goal,
      goalOther: goal === "Other" ? goalOther : undefined,
      domain,
      domainOther: domain === "Other" ? domainOther : undefined,
      interestedDomain: interestedDomain,
      passedOutYear: passedOutYear || undefined,
      reason: reason
    });
    
    await newRegistration.save();
    
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

//put request to update the mentorship data in admin
router.put("/advancequery/:id", verifyAnyAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { action } = req.body;
    const query = await Advance.findById(id);
    if (query) {
      if (action === "Share to CRM" || action === "Shared to CRM") {
        query.action = "Shared to CRM";
        
        // -- MANUAL CRM INTEGRATION --
        try {
          await AdvLead.findOneAndUpdate(
            { email: query.email.toLowerCase() },
            {
              $set: {
                full_name: query.name,
                phone_number: query.phone,
                opted_domain: query.interestedDomain,
                education_background: query.passedOutYear || "",
                current_status: query.currentRole,
                source: "Website Lead",
                last_interaction_at: new Date(),
                extra_fields: {
                  "what_best_describes_your_current_situation?": query.currentRole,
                  "what_is_your_primary_goal_right_now?": query.goal === "Other" ? query.goalOther : query.goal,
                  "what_is_your_biggest_career_challenge?": query.reason,
                  "experience": query.experience,
                  "domain": query.domain === "Other" ? query.domainOther : query.domain,
                  "passed_out_year": query.passedOutYear || ""
                }
              },
              $setOnInsert: {
                status: "fresh",
                created_at: new Date()
              }
            },
            { upsert: true, new: true }
          );
        } catch (leadError) {
          console.error("Failed to share query to CRM:", leadError);
          // Non-blocking
        }
      } else {
        query.action = action;
      }
      
      await query.save();
      res.status(200).json({ message: "Query updated successfully" });
    } else {
      res.status(404).json({ message: "Query not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating data", error: error.message });
  }
});

const AdvanceOtp = require("../models/AdvanceOtp");

// ✅ Send OTP
router.post("/advance-send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const otp = crypto.randomInt(100000, 999999);

    await AdvanceOtp.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600;">Hello,</p>
      <p>To complete your Advanced Program application, please use the OTP below to verify your email address:</p>
      
      <div style="background: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
          <p style="font-size: 32px; font-weight: 800; color: #4f46e5; margin: 0; letter-spacing: 4px;">${otp}</p>
      </div>

      <div class="highlight-box" style="background: #fef2f2; border-left-color: #ef4444; margin-bottom: 25px;">
          <p style="margin: 0;  color: #b91c1c;">
              ${SVGS.warning} <span style="margin-top: 2px;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</span>
          </p>
      </div>
      <p style="font-size: 13px; color: #64748b;">If you did not request this OTP, please ignore this email.</p>
    `;
    const EmailMessage = buildPremiumEmail({ title: 'Application OTP', content });

    await sendEmail({ email, subject: "Your OTP for Advanced Program Application", message: EmailMessage });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Error sending OTP. Please try again later." });
  }
});

// ✅ Verify OTP
router.post("/advance-verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await AdvanceOtp.findOne({ email });

    if (!record) {
      return res.status(400).json({ success: false, message: "OTP expired or not sent." });
    }

    if (record.otp !== parseInt(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
    }

    await AdvanceOtp.deleteOne({ email });
    res.status(200).json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ success: false, message: "Server error during OTP verification." });
  }
});

module.exports = router;
