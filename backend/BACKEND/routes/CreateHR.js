const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const CreateHR = require("../models/CreateHR");
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail, SVGS, COMPANY_NAME } = require("../utils/emailTemplate");
const verifyAnyAuth = require("../middleware/verifyAnyAuth");
const crypto = require('crypto');

// POST request to create a new hr account
router.post("/createhr", verifyAnyAuth, async (req, res) => {
  const { fullname, email, designation, password } = req.body;
  try {
    const newHR = new CreateHR({
      fullname,
      email,
      designation: designation || "HR Manager",
      password
    });
    await newHR.save();
    res.status(201).json(newHR);
  } catch (error) {
    console.error("Error creating HR:", error);
    res.status(400).json({ message: error.message });
  }
});

// GET request to retrieve all hr accounts
router.get("/gethr", verifyAnyAuth, async (req, res) => {
  const { hrId } = req.query;
  try {
    let hr;
    if (hrId) {
      hr = await CreateHR.findById(hrId);
      if (!hr) return res.status(404).json({ message: "HR not found for the given hrId" });
    } else {
      hr = await CreateHR.find().sort({ _id: -1 });
    }
    res.status(200).json(hr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT request to edit the hr details
router.put("/updatehr/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, password, designation } = req.body;
    const updatedHR = await CreateHR.findByIdAndUpdate(
      id,
      { fullname, email, password, designation },
      { new: true }
    );
    if (!updatedHR) return res.status(404).json({ error: "HR not found" });
    res.status(200).json(updatedHR);
  } catch (error) {
    res.status(400).json({ error: "Error updating HR" });
  }
});

// PUT request to update the hr status
router.put("/updatehrstatus/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedStatus = await CreateHR.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    if (!updatedStatus) return res.status(404).json({ error: "HR not found" });
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(400).json({ error: "Error updating HR status" });
  }
});

// DELETE request to delete the hr account
router.delete("/deletehr/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHR = await CreateHR.findByIdAndDelete(id);
    if (!deletedHR) return res.status(404).json({ error: "HR not found" });
    res.status(200).json({ message: "HR deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting HR" });
  }
});

// --- HR LOGIN ENDPOINTS ---

// Send OTP to HR Email
router.post("/hrsendotp", async (req, res) => {
  const { email } = req.body;
  try {
    const hr = await CreateHR.findOne({ email });
    if (!hr) return res.status(404).json({ message: "HR account not found" });
    if (hr.status === "Inactive") return res.status(403).json({ message: "Access denied. Your account is inactive." });

    const otp = crypto.randomInt(100000, 1000000);

    const content = `
      <p style="font-size: 18px; color: #0f172a; font-weight: 600;">Welcome back, ${hr.fullname}!</p>
      <p>Your One-Time Password (OTP) for secure verification is:</p>
      
      <div style="background: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
          <p style="font-size: 32px; font-weight: 800; color: #4f46e5; margin: 0; letter-spacing: 4px;">${otp}</p>
      </div>

      <div class="highlight-box" style="background: #fef2f2; border-left-color: #ef4444; margin-bottom: 25px;">
          <p style="margin: 0;  color: #b91c1c;">
              ${SVGS.warning} <span style="margin-top: 2px;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</span>
          </p>
      </div>
      <p style="font-size: 13px; color: #64748b;">If you didn't request this OTP, please ignore this email or contact our IT team immediately.</p>
    `;
    const emailMessage = buildPremiumEmail({ title: 'Team Login OTP', content });

    hr.otp = otp;
    await Promise.all([
      hr.save(),
      sendEmail({ email, subject: "HR Portal Login OTP", message: emailMessage }),
    ]);
    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

// Verify OTP and Login
router.post("/hrverifyotp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const hr = await CreateHR.findOne({ email });
    if (!hr) return res.status(404).json({ message: "HR account not found" });
    if (hr.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (hr.status === "Inactive") return res.status(403).json({ message: "Access denied. Your account is inactive." });

    // Clear OTP after successful login
    hr.otp = null;
    await hr.save();

    // Sign payload indicating HR scope
    const token = jwt.sign(
      { id: hr._id, email: hr.email, role: "HR" },
      process.env.JWT_SECRET,
      { expiresIn: "10h" } // Session for 10 hours
    );

    res.status(200).json({
      token,
      hrId: hr._id,
      hrName: hr.fullname,
      message: "Login successful!",
    });
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
});

module.exports = router;
