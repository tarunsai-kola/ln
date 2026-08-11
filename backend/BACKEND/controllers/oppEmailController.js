const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const { operationsTransporter } = require("../utils/emailService");

// Function to send email via Transporter 
const oppsendEmail = async ({ email, subject, message }) => {
  const mailOptions = {
    from: `"Operations Team" <${process.env.SMTP_OPERATIONS_EMAIL}>`, // Force the correct sender
    sender: process.env.SMTP_OPERATIONS_EMAIL, // Ensure the sender is set
    to: email,
    cc: "help@Accenlearn.com",
    subject: subject,
    html: message,
    priority: "high",
  };

  return new Promise((resolve, reject) => {
    operationsTransporter.sendMail(mailOptions, (error, info) => {
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
