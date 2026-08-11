const express = require("express");
const router = express.Router();
const adminMail = require("../models/AdminMail");
const Operation = require("../models/CreateOperation");
const bda = require("../models/CreateBDA");
const advTeam = require("../models/CreateAdvTeam");
const HrModel = require("../models/CreateHR");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail, SVGS, COMPANY_NAME } = require("../utils/emailTemplate");
const crypto = require('crypto');
// const PlacementCoordinator = require("../models/PlacementCoordinator");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Alumni = require("../models/Alumni");
const verifyAdminCookie = require("../middleware/verifyAdminCookie");


// Route to save admin email
router.post("/admin", verifyAdminCookie, expressAsyncHandler(async (req, res) => {
  const { email, password, otp, fullname } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const newAdmin = new adminMail({ email, password, otp, fullname });
    await newAdmin.save();
    res.status(200).json({ message: "Admin email saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save admin email", error: error.message });
  }
})
);


// Route to send OTP
router.post("/otpsend", expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const admin = await adminMail.findOne({ email });
    if (!admin) {
      return res.status(500).json({ error: "Admin email not found" });
    }

    if (email !== admin.email) { 
      return res.status(401).json({ error: "You are not authorized as admin" });
    }

    const otp = crypto.randomInt(100000, 1000000);

    const content = `
      <p style="font-size: 18px; color: #0f172a; font-weight: 600;">Welcome back, ${admin.fullname || "Admin"}!</p>
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
    const EmailMessage = buildPremiumEmail({ title: 'Admin Verification', content });
    admin.otp = otp;
    await Promise.all([
      admin.save(),
      sendEmail({ email, subject: `${COMPANY_NAME} Admin Login Credentials`, message: EmailMessage }),
    ]);
    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
})
);

// Route to verify OTP
router.post("/otpverify", expressAsyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }
  try {
    const admin = await adminMail.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (admin.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // Clear OTP after verification
    admin.otp = null;
    await admin.save();

    // Generate JWT
    const token = jwt.sign(
      { email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    res.status(200).json({ 
      message: "OTP verified successfully", 
      token,
      adminId: admin._id,
      adminName: admin.fullname || "Admin"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP", error: error.message });
  }
})
);



/*
//if in case login with password so cheack email and password 
router.post("/checkadmin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminMail.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "login faild , please try again" });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: "server issue , or invalid details" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );



    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ message: "Server error" });
  }
});
*/

//-------------------------operation
//send login details to operation team
router.post('/sendmailtooperation', async (req, res) => {
  const { fullname, email } = req.body;
  const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600; text-transform: capitalize;">Dear ${fullname},</p>
      <p>Welcome to the Operations Team at <strong>${COMPANY_NAME}</strong>!</p>
      
      <p>Here are your official login instructions:</p>
      <div class="highlight-box" style="background: #f8fafc; border-left-color: #6366f1;">
          <p style="margin: 0 0 10px 0; ">${SVGS.info} <span style="margin-left: 5px;">Use your official company email: <strong>${email}</strong></span></p>
          <p style="margin: 0; ">${SVGS.warning} <span style="margin-left: 5px;">An OTP will be provided to log in securely.</span></p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
          <a href="https://www.Accenlearn.com/operationLogin" target="_blank" class="cta-button">Access Your Portal</a>
      </div>

      <p>If you need further assistance with your account setup, feel free to reach out to the IT support team.</p>
  `;
  const emailMessage = buildPremiumEmail({ title: 'Welcome to the Team', content });
  try {
    await sendEmail({
      email,
      subject: `Welcome to ${COMPANY_NAME} - Operations Team Login`,
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

// store a value after sending a login details to operation team
router.put('/mailsendedoperation/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const opData = await Operation.findById({ _id: objectId });
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
// -------------------------bda
//send login details to sales team
router.post('/sendmailtobda', async (req, res) => {
  const { fullname, email } = req.body;
  const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600; text-transform: capitalize;">Dear ${fullname},</p>
      <p>Welcome to the Sales Team at <strong>${COMPANY_NAME}</strong>!</p>
      
      <p>Here are your official login instructions:</p>
      <div class="highlight-box" style="background: #f8fafc; border-left-color: #6366f1;">
          <p style="margin: 0 0 10px 0; ">${SVGS.info} <span style="margin-left: 5px;">Use your official company email: <strong>${email}</strong></span></p>
          <p style="margin: 0; ">${SVGS.warning} <span style="margin-left: 5px;">An OTP will be provided to log in securely.</span></p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
          <a href="https://www.Accenlearn.com/teamlogin" target="_blank" class="cta-button">Access Your Portal</a>
      </div>

      <p>If you need further assistance with your account setup, feel free to reach out to the IT support team.</p>
  `;
  const emailMessage = buildPremiumEmail({ title: 'Welcome to the Team', content });
  try {
    await sendEmail({
      email,
      subject: `Welcome to ${COMPANY_NAME} - Sales Team Login`,
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

// store a value after sending a login details to sales team 
router.put('/mailsendedbda/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const bdaData = await bda.findById({ _id: objectId });
    if (!bdaData) {
      return res.status(404).send({ message: 'Bda not found.' });
    }
    bdaData.mailSended = mailSended;
    await bdaData.save();
    res.status(200).send({ message: 'Bda record updated successfully!', bdaData });
  } catch (error) {
    console.error('Error updating  Bda data record:', error);
    res.status(500).send({ message: 'Failed to update updating  Bda record.' });
  }
});

// -------------------------Advanced Team--------------------------------
//send login details to advanced team
router.post('/sendmailtoadvteam', async (req, res) => {
  const { fullname, email } = req.body;
  const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600; text-transform: capitalize;">Dear ${fullname},</p>
      <p>Welcome to the Advanced Team at <strong>${COMPANY_NAME}</strong>!</p>
      
      <p>Here are your official login instructions:</p>
      <div class="highlight-box" style="background: #f8fafc; border-left-color: #6366f1;">
          <p style="margin: 0 0 10px 0; ">${SVGS.info} <span style="margin-left: 5px;">Use your official company email: <strong>${email}</strong></span></p>
          <p style="margin: 0; ">${SVGS.warning} <span style="margin-left: 5px;">An OTP will be provided to log in securely.</span></p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
          <a href="https://www.Accenlearn.com/advteamlogin" target="_blank" class="cta-button">Access Your Portal</a>
      </div>

      <p>If you need further assistance with your account setup, feel free to reach out to the IT support team.</p>
  `;
  const emailMessage = buildPremiumEmail({ title: 'Welcome to the Team', content });
  try {
    await sendEmail({
      email,
      subject: `Welcome to ${COMPANY_NAME} - Advanced Team Login`,
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

// store a value after sending a login details to advanced team 
router.put('/mailsendedadvteam/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const advTeamData = await advTeam.findById({ _id: objectId });
    if (!advTeamData) {
      return res.status(404).send({ message: 'Adv Team member not found.' });
    }
    advTeamData.mailSended = mailSended;
    await advTeamData.save();
    res.status(200).send({ message: 'Adv Team record updated successfully!', advTeamData });
  } catch (error) {
    console.error('Error updating Adv Team data record:', error);
    res.status(500).send({ message: 'Failed to update Adv Team record.' });
  }
});

// -------------------------HR Team--------------------------------
//send login details to hr team
router.post('/sendmailtohr', async (req, res) => {
  const { fullname, email } = req.body;
  const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600; text-transform: capitalize;">Dear ${fullname},</p>
      <p>Welcome to the HR Team at <strong>${COMPANY_NAME}</strong>!</p>
      
      <p>Here are your official login instructions:</p>
      <div class="highlight-box" style="background: #f8fafc; border-left-color: #6366f1;">
          <p style="margin: 0 0 10px 0; ">${SVGS.info} <span style="margin-left: 5px;">Use your official company email: <strong>${email}</strong></span></p>
          <p style="margin: 0; ">${SVGS.warning} <span style="margin-left: 5px;">An OTP will be provided to log in securely.</span></p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
          <a href="https://www.Accenlearn.com/hrlogin" target="_blank" class="cta-button">Access Your Portal</a>
      </div>

      <p>If you need further assistance with your account setup, feel free to reach out to the IT support team.</p>
  `;
  const emailMessage = buildPremiumEmail({ title: 'Welcome to the Team', content });
  try {
    await sendEmail({
      email,
      subject: `Welcome to ${COMPANY_NAME} - HR Team Login`,
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

// store a value after sending a login details to hr team 
router.put('/mailsendedhr/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const hrData = await HrModel.findById({ _id: objectId });
    if (!hrData) {
      return res.status(404).send({ message: 'HR member not found.' });
    }
    hrData.mailSended = mailSended;
    await hrData.save();
    res.status(200).send({ message: 'HR record updated successfully!', hrData });
  } catch (error) {
    console.error('Error updating HR data record:', error);
    res.status(500).send({ message: 'Failed to update HR record.' });
  }
});

router.post("/sendmailtoplacementcoordinator", async (req, res) => {
  const { fullname, email } = req.body;
  const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600; text-transform: capitalize;">Dear ${fullname},</p>
      <p>Welcome to the Placement Team at <strong>${COMPANY_NAME}</strong>!</p>
      
      <p>Here are your official login instructions:</p>
      <div class="highlight-box" style="background: #f8fafc; border-left-color: #6366f1;">
          <p style="margin: 0 0 10px 0; ">${SVGS.info} <span style="margin-left: 5px;">Use your official company email: <strong>${email}</strong></span></p>
          <p style="margin: 0; ">${SVGS.warning} <span style="margin-left: 5px;">An OTP will be provided to log in securely.</span></p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
          <a href="https://www.Accenlearn.com/pclogin" target="_blank" class="cta-button">Access Your Portal</a>
      </div>

      <p>If you need further assistance with your account setup, feel free to reach out to the IT support team.</p>
  `;
  const emailMessage = buildPremiumEmail({ title: 'Welcome to the Team', content });

  try {
    // Send email to the Placement Coordinator
    await sendEmail({
      email,
      subject: `Welcome to ${COMPANY_NAME} - Placement Team Login`,
      message: emailMessage,
    });

    // Mark email as sent (mailSended)
    const coordinator = await PlacementCoordinator.findOne({ email });
    if (coordinator) {
      coordinator.mailSended = true;
      await coordinator.save();
    }

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email.", error: error.message });
  }
});


// user component access 
router.get('/user-components', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await User.findById(userId).select(
      'atschecker jobboard myjob mockinterview exercise'
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      components: {
        atschecker: user.atschecker,
        jobboard: user.jobboard,
        myjob: user.myjob,
        mockinterview: user.mockinterview,
        exercise: user.exercise
      }
    });
  } catch (error) {
    console.error('Error fetching user components:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// PUT: Update user component status (enable/disable)
router.put('/user-components/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { component, status } = req.body;

    if (!userId || !component || typeof status !== 'boolean') {
      return res.status(400).json({ message: 'User ID, component, and status are required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update the specified component status
    if (component in user) {
      user[component] = status;
      await user.save();
      res.json({ message: `Component ${component} updated to ${status}` });
    } else {
      res.status(400).json({ message: 'Invalid component name' });
    }
  } catch (error) {
    console.error('Error updating user component:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW GET: Fetch components for all active users
router.get('/all-user-components', async (req, res) => {
  try {
    const users = await User.find({ status: 'active' }).select(
      '_id atschecker jobboard myjob mockinterview exercise'
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No active users found' });
    }

    const componentsData = users.map((user) => ({
      userId: user._id,
      components: {
        atschecker: user.atschecker,
        jobboard: user.jobboard,
        myjob: user.myjob,
        mockinterview: user.mockinterview,
        exercise: user.exercise,
      },
    }));

    res.json(componentsData);
  } catch (error) {
    console.error('Error fetching all user components:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW POST: Fetch components for a batch of users
router.post('/batch-user-components', async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'Array of user IDs is required' });
    }

    const users = await User.find({
      _id: { $in: userIds },
      status: 'active',
    }).select(' _id atschecker jobboard myjob mockinterview exercise');

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No active users found for provided IDs' });
    }

    const componentsData = users.map((user) => ({
      userId: user._id,
      components: {
        atschecker: user.atschecker,
        jobboard: user.jobboard,
        myjob: user.myjob,
        mockinterview: user.mockinterview,
        exercise: user.exercise,
      },
    }));

    res.json(componentsData);
  } catch (error) {
    console.error('Error fetching batch user components:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// alumni data and retreive route 


router.post("/alumni-data", async (req, res) => {
  try {
    const alumni = new Alumni(req.body);
    await alumni.save();
    res.status(201).json({
      success: true,
      message: "Alumni data submitted successfully",
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit alumni data",
    });
  }
});

router.get("/alumni-data", async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve alumni data",
    });
  }
});

// Route to check if admin is authenticated
router.get("/admin/is-authenticated", verifyAdminCookie, (req, res) => {
  res.status(200).json({ isAuthenticated: true, admin: req.admin });
});

// Route to logout admin
router.post("/admin/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
  });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
