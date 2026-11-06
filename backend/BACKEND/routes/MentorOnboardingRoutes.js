const express = require("express");
const router = express.Router();
const MentorOnboarding = require("../models/MentorOnboarding");
const Interviewer = require("../models/Interviewer");
const CreateAdvCourse = require("../models/CreateAdvCourse");
const CreateCourse = require("../models/CreateCourse");
const { sendMentorFreelanceOfferLetter } = require("../controllers/mentorOfferLetter");
const { operationsTransporter } = require("../utils/emailService");

// ── 1. PUBLIC: Submit Mentor Onboarding Form ──
router.post("/submit", async (req, res) => {
  try {
    const {
      fullname,
      email,
      companyEmail,
      phone,
      whatsAppNumber,
      companyName,
      role,
      experience,
      optedDomain,
      optedCourseId,
      resumeLink,
      photoLink,
      linkedin,
      github,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      upiNumber,
    } = req.body;

    if (
      !fullname ||
      !email ||
      !phone ||
      !whatsAppNumber ||
      !companyName ||
      !role ||
      !experience ||
      !optedDomain ||
      !resumeLink ||
      !accountNumber ||
      !ifscCode ||
      !bankName ||
      !branchName
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (personal, professional, domain, resume, and bank details).",
      });
    }

    // Check for existing application with same email
    let application = await MentorOnboarding.findOne({ email: email.toLowerCase().trim() });

    if (application) {
      // Update existing application
      Object.assign(application, {
        fullname,
        companyEmail: companyEmail || "",
        phone,
        whatsAppNumber,
        companyName,
        role,
        experience,
        optedDomain,
        optedCourseId: optedCourseId || null,
        resumeLink,
        photoLink: photoLink || "",
        linkedin: linkedin || "",
        github: github || "",
        accountNumber,
        ifscCode: ifscCode.toUpperCase().trim(),
        bankName,
        branchName,
        upiNumber: upiNumber || "",
        status: "pending",
      });
      await application.save();
    } else {
      application = new MentorOnboarding({
        fullname,
        email: email.toLowerCase().trim(),
        companyEmail: companyEmail ? companyEmail.toLowerCase().trim() : "",
        phone,
        whatsAppNumber,
        companyName,
        role,
        experience,
        optedDomain,
        optedCourseId: optedCourseId || null,
        resumeLink,
        photoLink: photoLink || "",
        linkedin: linkedin || "",
        github: github || "",
        accountNumber,
        ifscCode: ifscCode.toUpperCase().trim(),
        bankName,
        branchName,
        upiNumber: upiNumber || "",
        status: "pending",
      });
      await application.save();
    }

    // Send confirmation email to applicant
    try {
      const confirmMailOptions = {
        from: `"Accenlearn Operations" <${process.env.SMTP_OPERATIONS_EMAIL}>`,
        to: email,
        cc: "aravind@accenlearn.com",
        subject: `Application Received: Freelance Mentor (${optedDomain}) - Accenlearn Solutions`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 10px;">
            <h2 style="color: #312e81; margin-top: 0;">Application Received!</h2>
            <p>Dear <strong>${fullname}</strong>,</p>
            <p>Thank you for submitting your onboarding details for the <strong>Freelance Domain Mentor</strong> role for <strong>${optedDomain}</strong> at Accenlearn Solutions.</p>
            <p>Our Academic & Operations panel is currently reviewing your credentials, domain background, and banking details. Once reviewed, you will receive your formal <strong>Freelance Mentor Engagement Offer Letter</strong>.</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5;">
              <p style="margin: 0;"><strong>Domain Applied:</strong> ${optedDomain}</p>
              <p style="margin: 5px 0 0 0;"><strong>Current Company:</strong> ${companyName} (${role})</p>
              <p style="margin: 5px 0 0 0;"><strong>Registered Email:</strong> ${email}</p>
            </div>
            <p>If you have any questions, feel free to write to us at <a href="mailto:operations@accenlearn.com">operations@accenlearn.com</a>.</p>
            <p style="margin-top: 24px; color: #475569;">Best regards,<br><strong>Operations & Academic Partnerships</strong><br>Accenlearn Solutions</p>
          </div>
        `,
      };
      operationsTransporter.sendMail(confirmMailOptions, () => {});
    } catch (mailErr) {
      console.warn("Could not dispatch confirmation email:", mailErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Your Mentor Onboarding Form has been submitted successfully! We have sent a confirmation email.",
      data: application,
    });
  } catch (error) {
    console.error("Error submitting mentor onboarding form:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while submitting the form. Please try again.",
      error: error.message,
    });
  }
});

// ── 2. ADMIN: Get All Mentor Applications ──
router.get("/all", async (req, res) => {
  try {
    const applications = await MentorOnboarding.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching mentor onboarding applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
});

// ── 3. ADMIN: Update Status / Rate ──
router.put("/status/:id", async (req, res) => {
  try {
    const { status, perSessionRate, notes } = req.body;
    const application = await MentorOnboarding.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    if (status) application.status = status;
    if (perSessionRate !== undefined) application.perSessionRate = Number(perSessionRate) || 0;
    if (notes !== undefined) application.notes = notes;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error: error.message });
  }
});

// Helper to generate mentor accenlearn email: name@accenlearn.com
function generateMentorAccenEmail(fullname) {
  const clean = (fullname || "")
    .replace(/^(dr|prof|mr|mrs|ms)\.?\s+/i, "")
    .trim()
    .toLowerCase();
  const parts = clean.split(/[^a-z0-9]+/).filter(Boolean);
  const handle = parts[0] || "mentor";
  return `${handle}@accenlearn.com`;
}

// ── 4. ADMIN: Send Freelance Offer Letter & Create Credentials ──
router.post("/send-offer-letter/:id", async (req, res) => {
  try {
    const { perSessionRate } = req.body;
    const application = await MentorOnboarding.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const rate = perSessionRate !== undefined ? Number(perSessionRate) : application.perSessionRate || 0;
    const defaultPassword = "Accenlearn@123";
    const accenEmail = generateMentorAccenEmail(application.fullname);

    // Automatically create or update the mentor in Interviewer collection with default password
    let mentor = await Interviewer.findOne({
      $or: [
        { email: accenEmail },
        { email: application.email },
        { companyEmail: application.email },
      ],
    });

    if (!mentor) {
      mentor = new Interviewer({
        fullname: application.fullname,
        email: accenEmail,
        companyEmail: application.email,
        phone: application.phone,
        whatsAppNumber: application.whatsAppNumber || application.phone,
        password: defaultPassword,
        subjects: [application.optedDomain],
        assignedCourseId: application.optedCourseId || null,
        companyName: application.companyName || "",
        role: application.role || "",
        experience: application.experience || "",
        resumeLink: application.resumeLink || "",
        photoLink: application.photoLink || "",
        linkedin: application.linkedin || "",
        github: application.github || "",
        accountNumber: application.accountNumber || "",
        ifscCode: application.ifscCode || "",
        bankName: application.bankName || "",
        branchName: application.branchName || "",
        upiNumber: application.upiNumber || "",
        perSessionRate: rate,
      });
      await mentor.save();
    } else {
      mentor.fullname = application.fullname;
      mentor.email = accenEmail;
      mentor.companyEmail = application.email;
      mentor.password = defaultPassword;
      mentor.phone = application.phone;
      mentor.whatsAppNumber = application.whatsAppNumber || application.phone;
      if (!mentor.subjects.includes(application.optedDomain)) {
        mentor.subjects.push(application.optedDomain);
      }
      if (application.optedCourseId) mentor.assignedCourseId = application.optedCourseId;
      if (rate) mentor.perSessionRate = rate;
      await mentor.save();
    }

    application.interviewerId = mentor._id;

    // Send PDF offer letter via email with credentials (/mentor-login, name@accenlearn.com, Accenlearn@123)
    await sendMentorFreelanceOfferLetter({
      email: application.email,
      fullname: application.fullname,
      domain: application.optedDomain,
      perSessionRate: rate,
      accenEmail,
      defaultPassword,
    });

    application.offerLetterSent = true;
    application.offerLetterSentDate = new Date();
    application.status = "approved";
    if (rate) application.perSessionRate = rate;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Freelance Offer Letter & Portal Access (${accenEmail}) successfully sent to ${application.email}!`,
      data: application,
      accenEmail,
    });
  } catch (error) {
    console.error("Error sending freelance offer letter:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send freelance offer letter",
      error: error.message,
    });
  }
});

// ── 5. ADMIN: Approve and Create Mentor Login Account (Interviewer) ──
router.post("/create-account/:id", async (req, res) => {
  try {
    const { password, assignedCourseId } = req.body;
    const application = await MentorOnboarding.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const tempPassword = password || `Mentor@${Math.floor(1000 + Math.random() * 9000)}`;

    // Check if Interviewer already exists
    let mentor = await Interviewer.findOne({ email: application.email });
    if (!mentor) {
      mentor = new Interviewer({
        fullname: application.fullname,
        email: application.email,
        companyEmail: application.companyEmail || "",
        phone: application.phone,
        whatsAppNumber: application.whatsAppNumber || application.phone,
        password: tempPassword,
        subjects: [application.optedDomain],
        assignedCourseId: assignedCourseId || application.optedCourseId || null,
        companyName: application.companyName || "",
        role: application.role || "",
        experience: application.experience || "",
        resumeLink: application.resumeLink || "",
        photoLink: application.photoLink || "",
        linkedin: application.linkedin || "",
        github: application.github || "",
        accountNumber: application.accountNumber || "",
        ifscCode: application.ifscCode || "",
        bankName: application.bankName || "",
        branchName: application.branchName || "",
        upiNumber: application.upiNumber || "",
        perSessionRate: application.perSessionRate || 0,
      });
      await mentor.save();
    } else {
      // Update existing mentor with onboarding details
      mentor.fullname = application.fullname;
      mentor.companyEmail = application.companyEmail || mentor.companyEmail;
      mentor.phone = application.phone;
      mentor.whatsAppNumber = application.whatsAppNumber || mentor.whatsAppNumber;
      if (password) mentor.password = password;
      if (!mentor.subjects.includes(application.optedDomain)) {
        mentor.subjects.push(application.optedDomain);
      }
      if (assignedCourseId) mentor.assignedCourseId = assignedCourseId;
      mentor.companyName = application.companyName;
      mentor.role = application.role;
      mentor.experience = application.experience;
      mentor.accountNumber = application.accountNumber;
      mentor.ifscCode = application.ifscCode;
      mentor.bankName = application.bankName;
      mentor.branchName = application.branchName;
      mentor.upiNumber = application.upiNumber;
      if (application.perSessionRate) mentor.perSessionRate = application.perSessionRate;
      await mentor.save();
    }

    application.interviewerId = mentor._id;
    application.status = "approved";
    await application.save();

    // Send credentials email
    try {
      const credsMailOptions = {
        from: `"Accenlearn Operations" <${process.env.SMTP_OPERATIONS_EMAIL}>`,
        to: application.email,
        cc: "aravind@accenlearn.com",
        subject: "Your Accenlearn Mentor Portal Login Credentials",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 10px;">
            <h2 style="color: #312e81; margin-top: 0;">Welcome to Accenlearn Mentor Portal!</h2>
            <p>Dear <strong>${application.fullname}</strong>,</p>
            <p>Your mentor account has been activated. You can now log in to the <strong>Accenlearn Mentor Portal</strong> to manage your sessions, view batch schedules, and submit session drive recordings.</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #cbd5e1;">
              <p style="margin: 0; font-size: 14px;"><strong>Portal URL:</strong> <a href="https://accenlearn-main.vercel.app/mentor-login" style="color: #4f46e5;">Accenlearn Mentor Login</a></p>
              <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Email:</strong> ${application.email}</p>
              <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${tempPassword}</code></p>
            </div>
            <p>Please change your password after logging in for the first time.</p>
            <p style="margin-top: 24px; color: #475569;">Best regards,<br><strong>Operations Department</strong><br>Accenlearn Solutions</p>
          </div>
        `,
      };
      operationsTransporter.sendMail(credsMailOptions, () => {});
    } catch (mailErr) {
      console.warn("Could not dispatch credentials email:", mailErr.message);
    }

    res.status(200).json({
      success: true,
      message: `Mentor account created successfully for ${application.email}! Login credentials dispatched.`,
      interviewer: mentor,
    });
  } catch (error) {
    console.error("Error creating mentor account:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create mentor account",
      error: error.message,
    });
  }
});

// ── 6. ADMIN: Delete Application ──
router.delete("/:id", async (req, res) => {
  try {
    await MentorOnboarding.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete application", error: error.message });
  }
});

module.exports = router;

