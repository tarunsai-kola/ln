const express = require("express");
const router = express.Router();
const {
  sendSingleTestEmail,
  sendBulkInterviewReminders,
} = require("../controllers/studentReminderController");

// Public routes - accessible without authentication
router.post("/send-test", sendSingleTestEmail);
router.post("/send-bulk", sendBulkInterviewReminders);

module.exports = router;
