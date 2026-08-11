const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/UserAuth");
const CreateOperation = require("../models/CreateOperation");

const NewEnrollStudent = require("../models/NewStudentEnroll");
const AdvEnroll = require("../models/AdvEnroll");
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail, SVGS, COMPANY_NAME, COMPANY_SUPPORT_EMAIL } = require("../utils/emailTemplate");
const { sendOfferLetter } = require("../controllers/offerLetter")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const crypto = require("crypto");
const verifyAnyAuth = require("../middleware/verifyAnyAuth");
// const { ObjectId } = mongoose.Types;

//post to create a new operation account
router.post("/createoperation", verifyAnyAuth, async (req, res) => {
  const { fullname, email, password, languages } = req.body;
  try {
    const newoperation = new CreateOperation({
      fullname: fullname,
      email: email,
      password: password,
      languages: languages,
    });
    await newoperation
      .save()
      .then(() => {
        // ✅ Invalidate operations cache when new operation is created


        res.status(201).json(newoperation);
      })
      .catch((saveError) => {
        console.error("Error saving data:", saveError);
        res.status(400).json({ message: saveError.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to retrieve all operation accounts (WITH CACHING)
router.get("/getoperation", verifyAnyAuth, async (req, res) => {
  const { operationId } = req.query;
  try {
    let operation;
    if (operationId) {
      // Don't cache individual lookups
      operation = await CreateOperation.findById(operationId);
      if (!operation) {
        return res
          .status(404)
          .json({ message: "Operation not found for the given userId" });
      }
    } else {
      // Direct DB query (No Cache)
      operation = await CreateOperation.find().sort({ _id: -1 }).lean();
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

// put request to edit the opertions details
router.put("/updateoperation/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, password, languages } = req.body;
    const updatedOperation = await CreateOperation.findByIdAndUpdate(
      id,
      { fullname, email, password, languages },
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

// Toggle Online/Offline status
router.put("/toggleonlinestatus/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const operation = await CreateOperation.findById(id);
    if (!operation) {
      return res.status(404).json({ error: "Operation not found" });
    }
    operation.isOnline = !operation.isOnline;
    await operation.save();

    // Invalidate cache so updated list is fetched


    res.status(200).json({ message: "Status updated", isOnline: operation.isOnline });
  } catch (error) {
    res.status(500).json({ error: "Error updating status", details: error.message });
  }
});

//delete request to delete the operation account
router.delete("/deleteoperation/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOperation = await CreateOperation.findByIdAndDelete(id);
    if (!deletedOperation) {
      return res.status(404).json({ error: "Operation not found" });
    }
    res.status(200).json({ message: "Operation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting operation" });
  }
});

router.post("/operationsendotp", async (req, res) => {
  const { email } = req.body;
  try {
    const operation = await CreateOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "Operation user not found" });
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
          <a href="https://www.Accenlearn.com/OperationLogin" target="_blank" style="background-color: #4f46e5; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Login Here</a>
      </div>
    `;
    const emailMessage = buildPremiumEmail({ title: 'Team Login OTP', content });

    // Save OTP in database and send email simultaneously
    operation.otp = otp;
    await Promise.all([
      operation.save(),
      sendEmail({
        email,
        subject: "Operation Login Credentials",
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

// Verify OTP and Login
router.post("/operationverifyotp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const operation = await CreateOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "Operation user not found" });
    }
    if (operation.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    operation.otp = null;
    await operation.save();
    const token = jwt.sign(
      { _id: operation._id, email: operation.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
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

router.get("/OperationDashboard", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to the dashboard!" });
});

//send course details and login details to user
router.post("/send-email", async (req, res) => {
  const {
    fullname,
    email,
    program,
    phone,
    counselor,
    domain,
    clearPaymentMonth,
    monthOpted,
  } = req.body;
  const defaultPassword = "Accenlearn@123";
  const content = `
      <p style="font-size: 16px; color: #0f172a; font-weight: 600; text-transform: capitalize;">Dear ${fullname},</p>
      <p>Thank you for joining us at <strong>${COMPANY_NAME}</strong>! Here are your program details:</p>
      
      <div class="highlight-box" style="margin: 20px 0; background: #f8fafc;">
          <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
              <li><strong>Mode of Program:</strong> <span style="text-transform: capitalize;">${program}</span></li>
              <li><strong>Duration:</strong> <span style="text-transform: capitalize;">${monthOpted} month</span></li>
              <li><strong>Domain:</strong> <span style="text-transform: capitalize;">${domain}</span></li>
              <li><strong>Clear Due Payment Date:</strong> <span style="text-transform: capitalize;">${clearPaymentMonth}</span></li>
              <li><strong>Counselor:</strong> <span style="text-transform: capitalize;">${counselor}</span></li>
          </ul>
      </div>

      <p style="font-weight: 600; color: #0f172a;">Your Login Details:</p>
      <p>Use your email (<strong>${email}</strong>) and the default password below to log in:</p>
      
      <div style="background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0;">
          <p style="font-size: 24px; font-weight: bold; color: #3b82f6; margin: 0; letter-spacing: 2px;">${defaultPassword}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.Accenlearn.com/login" target="_blank" class="cta-button">Access Your Dashboard</a>
      </div>

      <div class="highlight-box" style="background: #fefce8; border-left-color: #eab308; margin-top: 25px;">
          <p style="margin: 0;  color: #854d0e;">
              ${SVGS.info} <span style="margin-left: 5px; margin-top: 2px;">Please set a new password after logging in. Note: Access to your course materials will be granted once any pending dues are cleared.</span>
          </p>
      </div>

      <p style="margin-top: 25px;">If you need assistance, please contact <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a>.</p>
  `;
  const emailMessage = buildPremiumEmail({ title: `Welcome to ${program} Program`, content });
  try {
    await sendEmail({
      email,
      subject: `Welcome to Our ${program} Program`,
      message: emailMessage,
    });
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email.", error: error.message });
  }
});

//store a value after send a login details
router.put("/mailsendedchange/:id", async (req, res) => {
  const { id } = req.params;
  const { mailSended, onboardingSended, userCreated } = req.body;
  // console.log("true",userCreated);
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    let student = await NewEnrollStudent.findById({ _id: objectId });
    if (!student) {
      student = await AdvEnroll.findById({ _id: objectId });
    }
    // console.log("found", student);
    if (!student) {
      return res.status(404).send({ message: "Student not found." });
    }
    if (mailSended !== undefined) {
      student.mailSended = mailSended;
    }
    if (onboardingSended !== undefined) {
      student.onboardingSended = onboardingSended;
    }
    if (userCreated !== undefined) {
      student.userCreated = userCreated;
    }
    await student.save();
    res
      .status(200)
      .send({ message: "Student record updated successfully!", student });
  } catch (error) {
    console.error("Error updating student record:", error);
    res.status(500).send({ message: "Failed to update student record." });
  }
});

/*
// if in case operation login with email and password
router.post("/checkoperation", async (req, res) => {
  const { email, password } = req.body;
  try {
    const operation = await CreateOperation.findOne({ email });
    if (!operation) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (password !== operation.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: operation._id, email: operation.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ token, _id: operation._id, operationName: operation.fullname });
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ message: "Server error" });
  }
});
*/

// ----------------------------------------------------
router.post("/sendedOnboardingMail", async (req, res) => {
  const {
    fullname,
    email,
    domain,
    monthOpted,
    programPrice,
    paidAmount
  } = req.body;
  const price = Number(programPrice);
  const paid = Number(paidAmount);
  const pendingAmount = price - paid;
  // console.log("pending", pendingAmount);

  const content = `
    <p style="font-size: 16px; color: #0f172a; font-weight: 600;">Dear ${fullname},</p>
    
    <p>Warm greetings from <strong>${COMPANY_NAME}</strong>! We're excited to have you on board for our <strong>${domain}</strong>, commencing on the 5th of ${monthOpted}. Your journey with us promises to be an enriching experience.</p>
    
    <div class="highlight-box" style="margin: 25px 0;">
      <p style="margin: 0; ">
        ${SVGS.info} <span style="margin-left: 5px;">To ensure a seamless start, we kindly request you to log into our LMS by visiting <a href="https://www.Accenlearn.com">Accenlearn.com</a> and selecting "Login". Doing this promptly will help prevent any delays. Training sessions will be available on the start date.</span>
      </p>
    </div>

    <p>If you wish to clear your pending amount of <strong style="color: #0f172a;">${pendingAmount} INR</strong> in advance to expedite your participation in projects, please use the button below:</p>
    
    <div style="text-align: center; margin: 35px 0;">
        <a href="https://smartpay.easebuzz.in/219610/Accenlearn" target="_blank" class="cta-button" style="background-color: #10b981; border: none; font-weight: 600; padding: 12px 24px;">Pay Pending Amount</a>
    </div>

    <p style="margin-top: 25px;">Once again, welcome to ${COMPANY_NAME}'s ${domain}. We look forward to embarking on this learning journey with you! For any questions, contact us at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a>.</p>
  `;
  const emailMessage = buildPremiumEmail({ title: `Welcome to ${COMPANY_NAME} ${domain}`, content });
  try {
    await sendEmail({
      email,
      subject: `Welcome to Accenlearn's ${domain} Program!`,
      message: emailMessage,
    });
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email.", error: error.message });
  }
});

router.post("/sendofferletter", async (req, res) => {
  try {
    const { id, fullname, domain, email, date, duration, start, end, location } = req.body;

    const formattedName = fullname
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    await sendOfferLetter({ email, fullname: formattedName, date, start, end, domain, duration, location });

    let updatedStudent = await NewEnrollStudent.findByIdAndUpdate(id, { offerlettersended: true }, { new: true });

    if (!updatedStudent) {
      updatedStudent = await AdvEnroll.findByIdAndUpdate(id, { offerlettersended: true }, { new: true });
    }

    if (!updatedStudent) { return res.status(404).json({ error: "Student not found" }); }

    res.status(200).json({ message: "Offer letter sent and status updated.!" });

  } catch (error) {
    console.error("Error in /sendofferletter:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//put request to asign a target to all bda accounts
router.post("/assigntargettooperation/:id", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { target } = req.body;
    const updatedOperation = await CreateOperation.findByIdAndUpdate(
      id,
      { $push: { target } },
      { new: true }
    );
    if (!updatedOperation) {
      return res.status(404).json({ error: "operation not found" });
    }
    res.status(200).json(updatedOperation);
  } catch (error) {
    res.status(400).json({ error: "Error updating operation %" });
  }
});


module.exports = router;
