
require("dotenv").config();
const nodemailer = require("nodemailer");

// Resend transporter for all emails
let transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

let dikshanntOtpTransporter = transporter;
let operationsTransporter = transporter;
let eventsTransporter = transporter;

// General email function (for OTP, etc.) - uses RESEND_FROM_EMAIL
const sendEmail = async ({ email, subject, message, bcc }) => {
  const mailOptions = {
    from: process.env.RESEND_FROM_EMAIL,
    to: email,
    cc: "help@Accenlearn Campus.com",
    bcc: bcc,
    subject: subject,
    html: message,
    priority: "high",
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent successfully!", info.response);
        resolve(info.response);
      }
    });
  });
};

// OTP sender for new-project admin login
const sendDikshanntOtpEmail = async ({ email, subject, message, bcc }) => {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const adminBcc = process.env.DIKSHANNT_ADMIN_MAIL;

  const mailOptions = {
    from: fromEmail,
    to: email,
    bcc: bcc || adminBcc,
    subject: subject,
    html: message,
    priority: "high",
  };

  return new Promise((resolve, reject) => {
    dikshanntOtpTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending Dikshannt OTP email:", error);
        reject(error);
      } else {
        console.log("Dikshannt OTP email sent successfully!", info.response);
        resolve(info.response);
      }
    });
  });
};

// Payment reminder email function - uses RESEND_FROM_EMAIL
const sendPaymentReminderEmail = async ({ email, subject, message, bcc }) => {
  const mailOptions = {
    from: process.env.RESEND_FROM_EMAIL,
    to: email,
    bcc: bcc,
    subject: subject,
    html: message,
    priority: "high",
  };

  return new Promise((resolve, reject) => {
    operationsTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending payment reminder email:", error);
        reject(error);
      } else {
        console.log("Payment reminder email sent successfully!", info.response);
        resolve(info.response);
      }
    });
  });
};

// Event reminder email function - uses RESEND_FROM_EMAIL
const sendEventReminderEmail = async ({ email, subject, message, bcc, textVersion }) => {
  const mailOptions = {
    from: `Accenlearn Campus Events <${process.env.RESEND_FROM_EMAIL}>`,
    to: email,
    cc: "help@Accenlearn Campus.com",
    bcc: bcc,
    subject: subject,
    text: textVersion || 'Please enable HTML to view this email.',
    html: message,
    priority: "normal",
    headers: {
      'X-Entity-Ref-ID': `EVENT-${Date.now()}`,
      'X-Mailer': 'Accenlearn Campus Event System',
      'List-Unsubscribe': '<mailto:?subject=Unsubscribe>',
    },
  };

  return new Promise((resolve, reject) => {
    eventsTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending event reminder email:", error);
        reject(error);
      } else {
        console.log("Event reminder email sent successfully!", info.response);
        resolve(info.response);
      }
    });
  });
};

module.exports = { sendEmail, sendDikshanntOtpEmail, sendPaymentReminderEmail, sendEventReminderEmail };
