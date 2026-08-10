require("dotenv").config();
const cron = require("node-cron");
const NewEnroll = require("../models/NewStudentEnroll");
const { sendPaymentReminderEmail } = require("../controllers/emailController");

// Note: Using NewEnroll model for payment reminders (students with pending payments)

// Schedule configuration: Days and times for sending payment reminders (UTC - for Vercel Cron)
// Note: Vercel Cron uses UTC timezone. IST = UTC + 5:30
const REMINDER_SCHEDULE = [
  { day: 1, time: "2:30 AM UTC (8:00 AM IST)", cron: "30 2 * * 1" },    // Monday
  { day: 2, time: "5:30 AM UTC (11:00 AM IST)", cron: "30 5 * * 2" },  // Tuesday
  { day: 3, time: "7:30 AM UTC (1:00 PM IST)", cron: "30 7 * * 3" },   // Wednesday
  { day: 4, time: "10:30 AM UTC (4:00 PM IST)", cron: "30 10 * * 4" }, // Thursday
  { day: 5, time: "12:30 PM UTC (6:00 PM IST)", cron: "30 12 * * 5" }, // Friday
  { day: 6, time: "5:30 AM UTC (11:00 AM IST)", cron: "30 5 * * 6" },  // Saturday
  { day: 0, time: "7:30 AM UTC (1:00 PM IST)", cron: "30 7 * * 0" },   // Sunday
];

const { buildPremiumEmail, SVGS, COMPANY_NAME, COMPANY_SUPPORT_EMAIL } = require("../utils/emailTemplate");

/**
 * Generate payment reminder email HTML
 */
const generateReminderEmail = (student) => {
  const pendingAmount = ((student.programPrice || 0) - (student.paidAmount || 0)).toLocaleString('en-IN');
  const content = `
    <p>Dear <strong>${student.fullname}</strong>,</p>
    
    <p>We hope you are doing well and enjoying your learning journey with us at <strong>${COMPANY_NAME}</strong>.</p>
    
    <p>This is a friendly reminder regarding the pending payment for your enrolled program:</p>
    
    <div class="highlight-box" style="margin-top: 10px; margin-bottom: 30px;">
        <div class="data-row">
            <span class="data-label">Program</span>
            <span class="data-value">${student.program || "N/A"}</span>
        </div>
        <div class="data-row">
            <span class="data-label">Domain</span>
            <span class="data-value">${student.domain || "N/A"}</span>
        </div>
        <div class="data-row">
            <span class="data-label">Total Fee</span>
            <span class="data-value">₹${student.programPrice?.toLocaleString('en-IN') || 0}</span>
        </div>
        <div class="data-row">
            <span class="data-label">Amount Paid</span>
            <span class="data-value">₹${student.paidAmount?.toLocaleString('en-IN') || 0}</span>
        </div>
        <div class="data-row">
            <span class="data-label">Start Month</span>
            <span class="data-value">${student.internshipstartsmonth || 'N/A'}</span>
        </div>
    </div>
    
    <div style="text-align: center; background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 25px; margin: 30px 0;">
        <p style="margin: 0; color: #dc2626; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Remaining Amount Due</p>
        <h2 style="margin: 10px 0 0 0; color: #b91c1c; font-size: 36px; font-weight: 800;">₹${pendingAmount}</h2>
    </div>
    
    <div style="text-align: center; color: #dc2626; font-weight: 500; font-size: 15px; display: flex; align-items: center; justify-content: center;">
        ${SVGS.warning} <span>Please clear your pending dues at the earliest to avoid any disruption in your learning experience.</span>
    </div>
    
    <div class="cta-container">
        <a href="https://smartpay.easebuzz.in/219610/Accenlearn Campus" target="_blank" class="cta-button">
            Proceed to Payment
        </a>
        <a href="https://wa.me/917829102936?text=Hi%2C%20I%20need%20help%20with%20payment%20for%20${encodeURIComponent(student.fullname)}" target="_blank" class="cta-button secondary">
            Contact Support
        </a>
    </div>
    
    <div class="highlight-box" style="background: #f8fafc; border-left-color: #94a3b8; font-size: 14px;">
        <strong style="display: block; margin-bottom: 10px; color: #334155;">Payment Instructions</strong>
        <p style="margin: 0 0 8px 0; color: #475569; display: flex; align-items: flex-start;">${SVGS.pin} <span>Click the "Proceed to Payment" button above to make your payment securely.</span></p>
        <p style="margin: 0 0 8px 0; color: #475569; display: flex; align-items: flex-start;">${SVGS.check} <span>Share the successful transaction receipt via WhatsApp to <strong>+91 7829102936</strong>.</span></p>
        <p style="margin: 0; color: #475569; display: flex; align-items: flex-start;">${SVGS.info} <span>If you have already completed the payment, please share the receipt and kindly ignore this message.</span></p>
    </div>
  `;
  return buildPremiumEmail({ title: 'Payment Reminder', content });
};

/**
 * Delay function to add gap between emails
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Send payment reminder emails to students with pending amounts
 */
const sendPaymentReminders = async () => {
  try {
    // Only send emails in production environment
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[${new Date().toLocaleString()}] Payment reminders skipped - Not in production environment (NODE_ENV: ${process.env.NODE_ENV || 'not set'})`);
      return { success: false, message: 'Reminders only sent in production environment' };
    }

    console.log(`[${new Date().toLocaleString()}] Starting payment reminder process...`);

    // Calculate date 4 months ago (120 days)
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setDate(fourMonthsAgo.getDate() - 120);

    // Get all pending payment reminders from NewEnroll collection
    // Students who enrolled within the last 4 months and haven't fully paid
    const pendingReminders = await NewEnroll.find({
      status: { $ne: "fullPaid" }, // Exclude students who have fully paid
      createdAt: { $gte: fourMonthsAgo }, // Enrolled within the last 4 months
    });

    console.log(`Found ${pendingReminders.length} students with pending payments (enrolled in last 4 months)`);

    let sentCount = 0;
    let failedCount = 0;

    for (const reminder of pendingReminders) {
      // Skip if no pending amount
      const pendingAmount = (reminder.programPrice || 0) - (reminder.paidAmount || 0);
      if (pendingAmount <= 0) {
        continue;
      }
      try {
        const emailHTML = generateReminderEmail(reminder);

        await sendPaymentReminderEmail({
          email: reminder.email,
          subject: `Payment Reminder - Pending Amount ₹${pendingAmount.toLocaleString('en-IN')} - ${COMPANY_NAME}`,
          message: emailHTML,
          
        });

        // Update reminder record
        reminder.lastReminderSent = new Date();
        reminder.reminderCount += 1;
        reminder.status = "reminded";
        reminder.remarks.push({
          message: `Reminder email sent - Count: ${reminder.reminderCount}`,
          sentAt: new Date(),
          sentBy: "System",
        });

        await reminder.save();
        sentCount++;

        console.log(`✓ Reminder sent to ${reminder.email} (${reminder.fullname})`);

        // Add 1-second delay between emails to avoid rate limiting
        if (sentCount < pendingReminders.length) {
          console.log(`⏳ Waiting 1 second before next email...`);
          await sleep(1000);
        }
      } catch (emailError) {
        failedCount++;
        console.error(`❌ Failed to send reminder to ${reminder.email}`);

        // Still wait 1 second even on error to maintain rate limiting
        if ((sentCount + failedCount) < pendingReminders.length) {
          await sleep(1000);
        }
      }
    }

    console.log(`Payment reminder process completed: ${sentCount} sent, ${failedCount} failed`);
    return { success: true, sent: sentCount, failed: failedCount };
  } catch (error) {
    console.error("Error in sendPaymentReminders:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Initialize scheduled payment reminder jobs
 */
const initializePaymentReminderScheduler = () => {
  // Only initialize scheduler in production environment
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  console.log("🚀 Initializing Payment Reminder Scheduler...");
  console.log("⏰ Timezone: Asia/Kolkata (IST - Indian Standard Time)");

  // Schedule reminder emails based on the defined schedule
  REMINDER_SCHEDULE.forEach((schedule) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    cron.schedule(schedule.cron, async () => {
      console.log(`📧 Triggering scheduled payment reminders - ${dayNames[schedule.day]} at ${schedule.time}`);
      await sendPaymentReminders();
    }, {
      timezone: "Asia/Kolkata"
    });

    console.log(`✓ Scheduled payment reminders for ${dayNames[schedule.day]} at ${schedule.time}`);
  });

  console.log("✅ Payment Reminder Scheduler initialized successfully!");
};

module.exports = {
  sendPaymentReminders,
  initializePaymentReminderScheduler,
  generateReminderEmail,
};
