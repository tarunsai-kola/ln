const express = require("express");
const router = express.Router();
const Mentorship = require("../models/Mentorship");
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail, SVGS, COMPANY_NAME } = require("../utils/emailTemplate");
const crypto = require('crypto');
const verifyAnyAuth = require("../middleware/verifyAnyAuth");
// post request to add new mentorship enqueries
router.post("/mentorship/register", async (req, res) => {
  const { name, email, collegeEmail, phone, collegeName, domain, passingyear, reason } = req.body;
  try {
    const existingUser = await Mentorship.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "You have already registered with this email." });
    }
    const newRegistration = new Mentorship({
      name,
      email,
      collegeEmail,
      phone,
      collegeName,
      domain,
      passingyear,
      reason

    });
    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

//get request to retrieve all the mentorship data in admin 
router.get("/mentorqueries", verifyAnyAuth, async (req, res) => {
  try {
    queries = await Mentorship.find().sort({ _id: -1 });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

//put request to update the action data in admin
router.put("/queriesaction/:id", verifyAnyAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { action } = req.body;
    const query = await Mentorship.findById(id);
    if (query) {
      if (action === "Shared") {
        query.action = "Shared";
      }
      if (action === "Not Interested") {
        query.action = "Not Interested";
      }
      if (action === "Already Paid") {
        query.action = "Already Paid";
      }
      if (action === "Unseen") {
        query.action = "Unseen";
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

//put request to asign bda into lead
router.put("/bdaasign/:id", verifyAnyAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { bda, action } = req.body;
    const query = await Mentorship.findById(id);
    query.bda = bda;
    query.action = action;
    await query.save();

    res.status(200).json({ message: "Query updated successfully" });
    console.log("done")
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating data", error: error.message });
  }
});

let otpStore = {};

// ✅ Send OTP
router.post("/mentorship-send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    // 1️⃣ Generate OTP & Expiry Time
    const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes validity

    // 2️⃣ Store OTP in Memory
    otpStore[email] = { otp, otpExpires };

    // 3️⃣ Email Content (Updated for PDF download)
    const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600;">Hello,</p>
      <p>To securely download the mentorship course brochure, please use the OTP below:</p>
      
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
    const EmailMessage = buildPremiumEmail({ title: 'Brochure Download OTP', content });

    // 4️⃣ Send Email
    await sendEmail({ email, subject: "Your OTP for Mentorship Brochure", message: EmailMessage });

    // 5️⃣ Send Response
    res.status(200).json({ message: "OTP sent successfully", otpExpires });

  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Error sending OTP. Please try again later." });
  }
});

// ✅ Verify OTP
router.post("/mentorship-verify-otp", (req, res) => {
  const { email, otp } = req.body;

  // 1️⃣ Check if OTP exists
  if (!otpStore[email]) {
    return res.status(400).json({ success: false, message: "OTP expired or not sent." });
  }

  const { otp: storedOtp, otpExpires } = otpStore[email];

  // 2️⃣ Check if OTP is correct and not expired
  if (Date.now() > otpExpires) {
    delete otpStore[email]; // Remove expired OTP
    return res.status(400).json({ success: false, message: "OTP has expired. Request a new one." });
  }

  if (storedOtp !== parseInt(otp)) {
    return res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
  }

  // 3️⃣ OTP Verified, Delete from Store
  delete otpStore[email];

  res.status(200).json({ success: true, message: "OTP verified successfully!" });
});

module.exports = router;
