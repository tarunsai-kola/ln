const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/UserAuth");
const CreateAdvOperation = require("../models/CreateAdvOperation");
const AdvEnroll = require("../models/AdvEnroll");
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail, SVGS, COMPANY_NAME } = require("../utils/emailTemplate");
const { sendOfferLetter } = require("../controllers/offerLetter");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const crypto = require("crypto");
const verifyAdminCookie = require("../middleware/verifyAdminCookie");

// POST to create a new ADV operation account
router.post("/createadvoperation", verifyAdminCookie, async (req, res) => {
  const { fullname, email, password, languages } = req.body;
  try {
    const newAdvOperation = new CreateAdvOperation({
      fullname: fullname,
      email: email,
      password: password,
      languages: languages,
    });
    await newAdvOperation
      .save()
      .then(() => {
        res.status(201).json(newAdvOperation);
      })
      .catch((saveError) => {
        console.error("Error saving data:", saveError);
        res.status(400).json({ message: saveError.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to retrieve all ADV operation accounts
router.get("/getadvoperation", async (req, res) => {
  const { operationId } = req.query;
  try {
    let operation;
    if (operationId) {
      operation = await CreateAdvOperation.findById(operationId);
      if (!operation) {
        return res
          .status(404)
          .json({ message: "ADV Operation not found for the given userId" });
      }
    } else {
      operation = await CreateAdvOperation.find().sort({ _id: -1 }).lean();
    }
    res.status(200).json(operation);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching data",
        error: error.message,
      });
  }
});

// PUT request to edit the ADV operations details
router.put("/updateadvoperation/:id", verifyAdminCookie, async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, password, languages } = req.body;
    const updatedOperation = await CreateAdvOperation.findByIdAndUpdate(
      id,
      { fullname, email, password, languages },
      { new: true }
    );
    if (!updatedOperation) {
      return res.status(404).json({ error: "ADV Operation not found" });
    }
    res.status(200).json(updatedOperation);
  } catch (error) {
    res.status(400).json({ error: "Error updating ADV operation" });
  }
});

// Toggle Online/Offline status
router.put("/toggleadvonlinestatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const operation = await CreateAdvOperation.findById(id);
    if (!operation) {
      return res.status(404).json({ error: "ADV Operation not found" });
    }
    operation.isOnline = !operation.isOnline;
    await operation.save();

    res.status(200).json({ message: "Status updated", isOnline: operation.isOnline });
  } catch (error) {
    res.status(500).json({ error: "Error updating status", details: error.message });
  }
});

// Update Active/Inactive status
router.put("/updateadvoperationstatus/:id", verifyAdminCookie, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const operation = await CreateAdvOperation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!operation) {
      return res.status(404).json({ error: "ADV Operation not found" });
    }
    res.status(200).json(operation);
  } catch (error) {
    res.status(500).json({ error: "Error updating status", details: error.message });
  }
});

// DELETE request to delete the ADV operation account
router.delete("/deleteadvoperation/:id", verifyAdminCookie, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOperation = await CreateAdvOperation.findByIdAndDelete(id);
    if (!deletedOperation) {
      return res.status(404).json({ error: "ADV Operation not found" });
    }
    res.status(200).json({ message: "ADV Operation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting ADV operation" });
  }
});

/*
// Direct Login for Admin Panel Bypass
router.post("/checkadvoperation", async (req, res) => {
  const { email, password } = req.body;
  try {
    const operation = await CreateAdvOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "ADV Operation user not found" });
    }
    if (operation.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { _id: operation._id, email: operation.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({
      token,
      _id: operation._id,
      operationName: operation.fullname,
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Failed to login directly:", error);
    res
      .status(500)
      .json({ message: "Failed to login directly", error: error.message });
  }
});
*/

// Send OTP for ADV operation login
router.post("/advoperationsendotp", async (req, res) => {
  const { email } = req.body;
  try {
    const operation = await CreateAdvOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "ADV Operation user not found" });
    }

    const otp = crypto.randomInt(100000, 1000000);

    const content = `
      <p style="font-size: 18px; color: #0f172a; font-weight: 600;">Welcome back, ${operation.fullname}!</p>
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
      <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.Accenlearn Campus.com/AdvOperationLogin" target="_blank" style="background-color: #4f46e5; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Login Here</a>
      </div>
    `;
    const emailMessage = buildPremiumEmail({ title: 'Team Login OTP', content });

    operation.otp = otp;
    await Promise.all([
      operation.save(),
      sendEmail({
        email,
        subject: "ADV Operation Login Credentials",
        message: emailMessage,
      }),
    ]);

    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
});

// Verify OTP and Login for ADV operation
router.post("/advoperationverifyotp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const operation = await CreateAdvOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "ADV Operation user not found" });
    }
    if (operation.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    operation.otp = null;
    await operation.save();
    const token = jwt.sign(
      { _id: operation._id, email: operation.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({
      token,
      _id: operation._id,
      operationName: operation.fullname,
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
});

// ADV Operation Dashboard
router.get("/AdvOperationDashboard", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

// Assign target to ADV operation
router.post("/assigntargettoadvoperation/:id", verifyAdminCookie, async (req, res) => {
  try {
    const { id } = req.params;
    const { target } = req.body;

    const operation = await CreateAdvOperation.findById(id);
    if (!operation) {
      return res.status(404).json({ error: "ADV Operation not found" });
    }

    operation.target.push(target);
    await operation.save();

    res.status(200).json({ message: "Target assigned successfully", operation });
  } catch (error) {
    res.status(500).json({ error: "Error assigning target", details: error.message });
  }
});

// Send email to ADV operation with credentials
router.post("/sendmailtoadvoperation", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600;">Hello ${fullname},</p>
      <p>Your ADV Operation account has been created at <strong>${COMPANY_NAME}</strong>. Here are your official login credentials:</p>
      
      <div style="background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Email:</strong> <span style="color: #3b82f6;">${email}</span></p>
        <p style="margin: 5px 0;"><strong>Password:</strong> <span style="font-family: monospace; font-size: 16px;">${password}</span></p>
      </div>

      <div class="highlight-box" style="background: #fefce8; border-left-color: #eab308; margin-bottom: 25px;">
        <p style="margin: 0;  color: #854d0e;">
            ${SVGS.warning} <span style="margin-left: 5px;">Please keep these credentials secure and do not share them with anyone.</span>
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.Accenlearn Campus.com/AdvOperationLogin" target="_blank" style="background-color: #4f46e5; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Login to Dashboard</a>
      </div>
    `;
    const emailMessage = buildPremiumEmail({ title: 'Account Created', content });

    await sendEmail({
      email: email,
      subject: "ADV Operation Login Credentials",
      message: emailMessage,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email", details: error.message });
  }
});

// Send OTP for ADV Operation Login
router.post("/advoperationsendotp", async (req, res) => {
  const { email } = req.body;
  try {
    const operation = await CreateAdvOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "ADV Operation user not found" });
    }

    const otp = crypto.randomInt(100000, 1000000);

    const content = `
      <p style="font-size: 18px; color: #0f172a; font-weight: 600;">Welcome back, ${operation.fullname}!</p>
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

    // Save OTP in database and send email simultaneously
    operation.otp = otp;
    await Promise.all([
      operation.save(),
      sendEmail({
        email,
        subject: "ADV Operation Login Credentials",
        message: emailMessage,
      }),
    ]);

    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
});

// Verify OTP and Login for ADV Operation
router.post("/advoperationverifyotp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const operation = await CreateAdvOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "ADV Operation user not found" });
    }
    if (operation.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    operation.otp = null;
    await operation.save();
    const token = jwt.sign(
      { _id: operation._id, email: operation.email },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );
    res.status(200).json({
      token,
      _id: operation._id,
      operationName: operation.fullname,
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    res
      .status(500)
      .json({ message: "OTP verification failed", error: error.message });
  }
});

router.get("/AdvOperationDashboard", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to the ADV Operation dashboard!" });
});

module.exports = router;
