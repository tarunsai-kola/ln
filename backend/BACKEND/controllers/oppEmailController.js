const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const nodemailer = require("nodemailer");

// Transporter 2
let transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

// Function to send email via Transporter 
const oppsendEmail = async ({ email, subject, message }) => {
  const mailOptions = {
    from: `"Operations Team" <${process.env.RESEND_FROM_EMAIL}>`, // Force the correct sender
    sender: process.env.RESEND_FROM_EMAIL, // Ensure the sender is set
    to: email,
    cc: "help@Accenlearn Campus.com",
    subject: subject,
    html: message,
    priority: "high",
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("SMTP 2 Error:", error);
        reject(error);
      } else {
        console.log("Email sent successfully from SMTP 2!", info.response);
        resolve(info.response);
      }
    });
  });
};

module.exports = {oppsendEmail};
