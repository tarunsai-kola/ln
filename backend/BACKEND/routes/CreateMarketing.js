const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail, SVGS, COMPANY_NAME } = require("../utils/emailTemplate");
const MarketingTeamName = require("../models/MarketingTeamName");
const CreateMarketing = require("../models/CreateMarketing");
const NewEnrollStudent = require("../models/NewStudentEnroll");

require("dotenv").config();
const verifyAdminCookie = require("../middleware/verifyAdminCookie");
const verifyAnyAuth = require("../middleware/verifyAnyAuth");

router.post("/marketingverifyotp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await CreateMarketing.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user user not found" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.otp = null;
    await user.save();
    const token = jwt.sign({ _id: user._id, email: user.email, designation: user.designation, team: user.team }, process.env.JWT_SECRET, { expiresIn: "10m" });
    res.status(200).json({ token, user: user.fullname, message: "Login successful!", });
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    res
      .status(500)
      .json({ message: "OTP verification failed", error: error.message });
  }
});

router.post("/marketingsendotp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await CreateMarketing.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Marketing user not found" });
    }

    const otp = crypto.randomInt(100000, 1000000);

    // Email message
    const content = `
      <p style="font-size: 18px; color: #0f172a; font-weight: 600;">Welcome back, ${user.fullname}!</p>
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
    user.otp = otp;
    await Promise.all([
      user.save(),
      sendEmail({
        email,
        subject: "Marketing Login Credentials",
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

//add team name from create marketing page 
router.post("/addmarketingteamname", verifyAnyAuth, async (req, res) => {
  const { teamname } = req.body;
  try {
    const newTeam = new MarketingTeamName({ teamname, });
    await newTeam.save();
    res.status(200).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to retrieve all marketing team names
router.get("/getmarketingteamname", verifyAnyAuth, async (req, res) => {
  try {
    const teamname = await MarketingTeamName.find();
    res.status(200).json(teamname);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//post to create a new marketing account
router.post("/createmarketing", verifyAnyAuth, async (req, res) => {
  const { fullname, email, designation, team, password } = req.body;
  try {
    const newmarketingdets = new CreateMarketing({
      fullname: fullname,
      designation: designation,
      team: team,
      email: email,
      password: password,
    });
    await newmarketingdets
      .save()
      .then(() => {
        res.status(201).json(newmarketingdets);
      })
      .catch((saveError) => {
        console.error("Error saving data:", saveError);
        res.status(400).json({ message: saveError.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
// Direct login for marketing (without OTP)
router.post("/checkmarketingauth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await CreateMarketing.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, designation: user.designation, team: user.team },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ token, marketingId: user._id, marketingName: user.fullname });
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ message: "Server error" });
  }
});
*/

// GET request to retrieve all masrketing accounts
router.get("/getmarketing", verifyAnyAuth, async (req, res) => {
  const { operationId } = req.query;
  try {
    let operation;
    if (operationId) {
      operation = await CreateMarketing.findById(operationId);
      if (!operation) {
        return res
          .status(404)
          .json({ message: "Operation not found for the given userId" });
      }
    } else {
      operation = await CreateMarketing.find().sort({ _id: -1 });
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


// ferch single marketing user by token with team name
router.get("/getmarketingexecutive", async (req, res) => {
  const { marketingToken } = req.query;

  if (!marketingToken) {
    return res.status(400).json({ message: "Marketing token is required" });
  }

  try {
    const decoded = jwt.verify(marketingToken, process.env.JWT_SECRET);
    const executive = await CreateMarketing.find({ team: decoded.team }).select("fullname designation team");
    res.status(200).json(executive);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch marketing executive detals", error: error.message });
  }
});

// put request to edit the marketing details
router.put("/updatemarketing/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, designation, team, password } = req.body;
    const updatedOperation = await CreateMarketing.findByIdAndUpdate(
      id,
      { fullname, email, designation, team, password },
      { new: true }
    );
    if (!updatedOperation) {
      return res.status(404).json({ error: "Operation not found" });
    }
    res.status(200).json(updatedOperation);
  } catch (error) {
    res.status(400).json({ error: "Error updating operation" });
  }
});

//delete request to delete the masrketing account
router.delete("/deletemarketing/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOperation = await CreateMarketing.findByIdAndDelete(id);
    if (!deletedOperation) {
      return res.status(404).json({ error: "Operation not found" });
    }
    res.status(200).json({ message: "Operation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting operation" });
  }
});

//send login details to operation team
router.post('/sendmailtomarketing', async (req, res) => {
  const { fullname, email } = req.body;
  const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600; text-transform: capitalize;">Dear ${fullname},</p>
      <p>Welcome to the Marketing Team at <strong>${COMPANY_NAME}</strong>!</p>
      
      <p>Here are your official login instructions:</p>
      <div class="highlight-box" style="background: #f8fafc; border-left-color: #6366f1;">
          <p style="margin: 0 0 10px 0; ">${SVGS.info} <span style="margin-left: 5px;">Use your official company email: <strong>${email}</strong></span></p>
          <p style="margin: 0; ">${SVGS.warning} <span style="margin-left: 5px;">An OTP will be provided to log in securely.</span></p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
          <a href="https://www.Accenlearn.com/marketing/login" target="_blank" class="cta-button">Access Your Portal</a>
      </div>

      <p>If you need further assistance with your account setup, feel free to reach out to the IT support team.</p>
  `;
  const emailMessage = buildPremiumEmail({ title: 'Welcome to the Team', content });
  try {
    await sendEmail({
      email,
      subject: 'Welcome to Accenlearn - Marketing Team Login',
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

// store a value after sending a login details to marketing team
router.put('/mailsendedmarketing/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const opData = await CreateMarketing.findById({ _id: objectId });
    if (!opData) {
      return res.status(404).send({ message: 'Operation not found.' });
    }
    opData.mailSended = mailSended;
    await opData.save();
    res.status(200).send({ message: 'Operaton record updated successfully!', opData });
  } catch (error) {
    console.error('Error updating operation data record:', error);
    res.status(500).send({ message: 'Failed to update updating operation record.' });
  }
});


//fetch single marketing user by token
router.get("/getmarketinguser", async (req, res) => {
  const { marketingToken } = req.query;

  if (!marketingToken) {
    return res.status(400).json({ message: "Marketing token is required" });
  }

  try {
    const decoded = jwt.verify(marketingToken, process.env.JWT_SECRET);
    const marketingUser = await CreateMarketing.findById(decoded._id).select("fullname email designation team");

    if (!marketingUser) {
      return res.status(404).json({ message: "Marketing user not found" });
    }

    res.status(200).json(marketingUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch marketing user", error: error.message });
  }
});

// new enroll lead for marketing executive current month
router.get("/getmarketingcurrentleads", async (req, res) => {
  const { marketingToken } = req.query;

  if (!marketingToken) {
    return res.status(400).json({ message: "Marketing token is required" });
  }

  try {
    const decoded = jwt.verify(marketingToken, process.env.JWT_SECRET);

    console.log('=== EXECUTIVE DASHBOARD QUERY DEBUG ===');
    console.log('Decoded JWT _id:', decoded._id);
    console.log('Type of decoded._id:', typeof decoded._id);

    const offset = parseInt(req.query.monthOffset) || 0;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() - offset + 1, 0, 23, 59, 59, 999);

    console.log('--- DEBUG: getmarketingcurrentleads ---');
    console.log('Query monthOffset:', req.query.monthOffset);
    console.log('Parsed Offset:', offset);
    console.log('Start Date:', startOfMonth.toISOString());
    console.log('End Date:', endOfMonth.toISOString());

    const allpayments = await NewEnrollStudent.find({ executiveId: decoded._id, createdAt: { $gte: startOfMonth, $lte: endOfMonth }, });

    // console.log('Query executiveId:', decoded._id);
    // console.log('Found students:', allpayments.length);
    // if (allpayments.length > 0) {
    //   console.log('Sample student executiveId:', allpayments[0].executiveId, 'Type:', typeof allpayments[0].executiveId);
    // }

    res.status(200).json(allpayments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user payment detals user", error: error.message });
  }
});

// new enroll lead for marketing executive previous month
router.get("/getmarketingpreviousleads", async (req, res) => {
  const { marketingToken } = req.query;

  if (!marketingToken) {
    return res.status(400).json({ message: "Marketing token is required" });
  }

  try {
    const decoded = jwt.verify(marketingToken, process.env.JWT_SECRET);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const allpayments = await NewEnrollStudent.find({ executiveId: decoded._id, createdAt: { $gte: startOfMonth, $lte: endOfMonth }, });
    res.status(200).json(allpayments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user payment detals user", error: error.message });
  }
});


// marketing lead new enroll in leader or manager for assigning leads to marketing agents
router.get("/getmarketingleadsall", async (req, res) => {
  const { marketingToken } = req.query;

  if (!marketingToken) {
    return res.status(400).json({ message: "Marketing token is required" });
  }

  try {
    const decoded = jwt.verify(marketingToken, process.env.JWT_SECRET);
    // select("fullname email designation team")
    const allpayments = await NewEnrollStudent.find({ lead: decoded.team });
    res.status(200).json(allpayments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user payment detals user", error: error.message });
  }
});

// PUT marketing executive name and id in new enroll student collection
router.put("/marketingUpdateExecutive/:leadId", async (req, res) => {
  try {
    const { leadId } = req.params;
    const { executiveid, executivename } = req.body;

    const updatedLead = await NewEnrollStudent.findByIdAndUpdate(
      leadId,
      { executiveId: executiveid, executive: executivename },
      { new: true }
    );

    if (!updatedLead)
      return res.status(404).json({ success: false, message: "Lead not found" });

    res.status(200).json({ success: true, message: "Executive updated", data: updatedLead });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// Admin routes for marketing leads management
// GET all marketing leads for admin
router.get("/admin/getallmarketingleads", verifyAnyAuth, async (req, res) => {
  try {
    const allLeads = await NewEnrollStudent.find()
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(allLeads);
  } catch (error) {
    console.error("Error fetching all marketing leads:", error);
    res.status(500).json({ message: "Failed to fetch marketing leads", error: error.message });
  }
});

// GET all marketing executives for admin
router.get("/admin/getallmarketingexecutives", verifyAnyAuth, async (req, res) => {
  try {
    const allExecutives = await CreateMarketing.find()
      .select("fullname email designation team")
      .sort({ fullname: 1 })
      .lean();
    res.status(200).json(allExecutives);
  } catch (error) {
    console.error("Error fetching all marketing executives:", error);
    res.status(500).json({ message: "Failed to fetch executives", error: error.message });
  }
});



module.exports = router;
