
require("dotenv").config();
const { transporter, operationsTransporter } = require("../utils/emailService");

// Aliases for backwards compatibility in this file
let dikshanntOtpTransporter = transporter;
let eventsTransporter = transporter;

// General email function (for OTP, etc.) - uses SMTP_NOREPLY_EMAIL
const sendEmail = async ({ email, subject, message, bcc }) => {
  const mailOptions = {
    from: process.env.SMTP_NOREPLY_EMAIL,
    to: email,
    cc: "help@Accenlearn.com",
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
  const fromEmail = process.env.SMTP_NOREPLY_EMAIL;
  const adminBcc = process.env.DIKSHANNT_ADMIN_MAIL || process.env.SMTP_OPERATIONS_EMAIL;

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

// Payment reminder email function - uses SMTP_NOREPLY_EMAIL
const sendPaymentReminderEmail = async ({ email, subject, message, bcc }) => {
  const mailOptions = {
    from: process.env.SMTP_NOREPLY_EMAIL,
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

// Event reminder email function - uses SMTP_NOREPLY_EMAIL
const sendEventReminderEmail = async ({ email, subject, message, bcc, textVersion }) => {
  const mailOptions = {
    from: `Accenlearn Events <${process.env.SMTP_NOREPLY_EMAIL}>`,
    to: email,
    cc: "help@Accenlearn.com",
    bcc: bcc,
    subject: subject,
    text: textVersion || 'Please enable HTML to view this email.',
    html: message,
    priority: "normal",
    headers: {
      'X-Entity-Ref-ID': `EVENT-${Date.now()}`,
      'X-Mailer': 'Accenlearn Event System',
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
