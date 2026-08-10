require("dotenv").config();
const cron = require("node-cron");
const AtdUser = require("../models/AtdUser");
const Attendance = require("../models/Attendance");
const { sendEmail } = require("../controllers/emailController");

/**
 * Helper to get the current date/time adjusted to IST (UTC+5:30)
 * regardless of the server's local timezone.
 */
const getISTDate = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 5.5));
};

const { buildPremiumEmail, SVGS, COMPANY_NAME } = require("../utils/emailTemplate");

/**
 * Generate a professional HTML attendance report for the employee
 */
const generateAttendanceReportEmail = (user, monthName, year, stats) => {
  const { total, full, late, half, lateDates, halfDates } = stats;

  const lateList = lateDates.length > 0 ? `
    <div style="margin-top: 25px;">
        <h3 style="color: #0f172a; font-size: 15px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">Late Login Details</h3>
        ${lateDates.map(item => `
        <div class="data-row">
            <span class="data-label">${item.date}</span>
            <span style="font-size: 12px; font-weight: 700; color: #dc2626; background: #fef2f2; padding: 4px 8px; border-radius: 6px;">LATE (${item.time})</span>
        </div>
        `).join('')}
    </div>
  ` : '';

  const halfList = halfDates.length > 0 ? `
    <div style="margin-top: 25px;">
        <h3 style="color: #0f172a; font-size: 15px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">Half Day Details</h3>
        ${halfDates.map(item => `
        <div class="data-row">
            <span class="data-label">${item.date}</span>
            <span style="font-size: 12px; font-weight: 700; color: #b91c1c; background: #fef2f2; padding: 4px 8px; border-radius: 6px;">HALF DAY (${item.time})</span>
        </div>
        `).join('')}
    </div>
  ` : '';

  const content = `
    <p style="font-size: 18px; color: #0f172a; font-weight: 600;">Hello, ${user.name}</p>
    <p>Here is your attendance summary for the month of <strong>${monthName} ${year}</strong>. Please review your check-in performance below.</p>
    
    <div style="display: flex; flex-wrap: wrap; gap: 15px; margin: 30px 0;">
        <div style="flex: 1 1 calc(50% - 15px); background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center;">
            <span style="display: block; font-size: 32px; font-weight: 800; color: #0f172a;">${total}</span>
            <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Total Logins</span>
        </div>
        <div style="flex: 1 1 calc(50% - 15px); background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center;">
            <span style="display: block; font-size: 32px; font-weight: 800; color: #10b981;">${full}</span>
            <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Full Present</span>
        </div>
        <div style="flex: 1 1 calc(50% - 15px); background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 20px; text-align: center;">
            <span style="display: block; font-size: 32px; font-weight: 800; color: #f59e0b;">${late}</span>
            <span style="font-size: 11px; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 1px;">Late Logins</span>
        </div>
        <div style="flex: 1 1 calc(50% - 15px); background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 20px; text-align: center;">
            <span style="display: block; font-size: 32px; font-weight: 800; color: #ef4444;">${half}</span>
            <span style="font-size: 11px; font-weight: 700; color: #b91c1c; text-transform: uppercase; letter-spacing: 1px;">Half Days</span>
        </div>
    </div>

    ${lateList}
    ${halfList}

    <div class="highlight-box" style="background: #f8fafc; border-left-color: #cbd5e1; font-size: 13px; margin-top: 35px;">
        <strong style="display: block; margin-bottom: 10px; color: #475569;">Note: Attendance Calculation Rules (IST)</strong>
        <p style="margin: 0 0 4px 0; color: #64748b; display: flex; align-items: center;">${SVGS.check} <span>Before 11:05 AM: Full Present</span></p>
        <p style="margin: 0 0 4px 0; color: #64748b; display: flex; align-items: center;">${SVGS.warning} <span>11:05 AM - 02:00 PM: Late Login</span></p>
        <p style="margin: 0; color: #64748b; display: flex; align-items: center;">${SVGS.info} <span>After 02:00 PM: Half Day</span></p>
    </div>
  `;

  return buildPremiumEmail({ title: `${monthName} ${year} Attendance`, content });
};

/**
 * Generate a warning email for late logins
 */
const generateLateWarningEmail = (user, lateCount) => {
  const content = `
    <p style="font-size: 18px; color: #0f172a; font-weight: 600;">Hello, ${user.name}</p>
    <p>This is an automated notification regarding your attendance for today.</p>
    
    <div class="highlight-box danger" style="display: flex; align-items: flex-start; margin: 30px 0;">
        <div style="margin-top: 2px;">${SVGS.warning}</div>
        <div style="margin-left: 10px;">Our records show that you logged in after <strong>11:05 AM</strong> today.</div>
    </div>

    <p style="font-size: 16px;">Currently, you have accumulated <strong style="color: #ef4444; font-size: 18px;">${lateCount} late logins</strong> in this month.</p>
    
    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
        <p style="margin: 0; color: #b91c1c; font-weight: 700; font-size: 15px; display: flex; align-items: center; justify-content: center;">
            ${SVGS.warning} <span style="margin-left: 8px;">IMPORTANT: 3 late logins in a month will lead to a 1-day Loss of Pay (LOP).</span>
        </p>
    </div>

    <p style="text-align: center; color: #475569; font-size: 15px;">Please ensure you check in before 11:05 AM to avoid any salary deductions.</p>
  `;

  return buildPremiumEmail({ title: 'Attendance Warning', content });
};

/**
 * Main function to generate and send reports to employees
 * If userId is provided, it sends only to that user for the specified month/year.
 * Otherwise, it sends to all for the previous month.
 */
const sendMonthlyAttendanceReports = async (targetUserId = null, targetMonth = null, targetYear = null) => {
  try {
    const istNow = getISTDate();
    let lastMonth, lastYear, monthName;

    if (targetMonth !== null && targetYear !== null) {
      lastMonth = parseInt(targetMonth);
      lastYear = parseInt(targetYear);
      const d = new Date(lastYear, lastMonth, 1);
      monthName = d.toLocaleString('default', { month: 'long' });
    } else {
      // Logic for "Previous Month" based on IST
      const lastMonthDate = new Date(istNow.getFullYear(), istNow.getMonth() - 1, 1);
      lastMonth = lastMonthDate.getMonth();
      lastYear = lastMonthDate.getFullYear();
      monthName = lastMonthDate.toLocaleString('default', { month: 'long' });
    }

    const query = targetUserId ? { _id: targetUserId } : {};
    const users = await AtdUser.find(query);
    
    console.log(`[${new Date().toLocaleString()}] Triggering reports for ${users.length} employee(s) for ${monthName} ${lastYear}...`);

    let sent = 0;
    const nextMonthDate = new Date(lastYear, lastMonth + 1, 1);
    const totalUsers = users.length;
    
    for (let i = 0; i < totalUsers; i++) {
      const user = users[i];
      if (!user.email) continue;

      const records = await Attendance.find({
        userId: user._id,
        timestamp: {
          $gte: new Date(lastYear, lastMonth, 1),
          $lt: nextMonthDate
        }
      }).sort({ timestamp: 1 });

      if (records.length === 0 && !targetUserId) continue; // Skip bulk if no data

      try {
        const stats = {
          total: records.length,
          full: 0,
          late: 0,
          half: 0,
          lateDates: [],
          halfDates: []
        };
        records.forEach(r => {
          // Convert to IST (UTC + 5:30)
          const d = new Date(r.timestamp);
          const istTime = new Date(d.getTime() + (5.5 * 60 * 60 * 1000));
          const hours = istTime.getUTCHours();
          const mins = istTime.getUTCMinutes();
          const totalMinutes = hours * 60 + mins;
          
          const dateStr = istTime.getUTCDate() + ' ' + istTime.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
          const timeStr = istTime.getUTCHours().toString().padStart(2, '0') + ':' + istTime.getUTCMinutes().toString().padStart(2, '0');

          if (totalMinutes > 14 * 60) {
            stats.half++;
            stats.halfDates.push({ date: dateStr, time: timeStr });
          } else if (totalMinutes > 11 * 60 + 5) {
            stats.late++;
            stats.lateDates.push({ date: dateStr, time: timeStr });
          } else {
            stats.full++;
          }
        });

        const html = generateAttendanceReportEmail(user, monthName, lastYear, stats);
        await sendEmail({
          email: user.email,
          subject: `${monthName} ${lastYear} Attendance Report - ${COMPANY_NAME}`,
          message: html
        });
        
        sent++;
        if (sent % 10 === 0 || sent === totalUsers) {
          console.log(`[Progress] ${sent}/${totalUsers} reports dispatched...`);
        }
        
        // Increase delay to 1000ms to be safer in production
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error(`❌ Failed to send report to ${user.email}:`, err.message);
      }
    }

    console.log(`Monthly attendance reports completed. ${sent} reports sent.`);
  } catch (error) {
    console.error("Error in sendMonthlyAttendanceReports:", error);
  }
};

/**
 * Daily check for late logins (Run at 12:00 AM IST)
 * Checks people who logged in late YESTERDAY and sends warning if count >= 2
 */
const checkDailyLateLogins = async () => {
  try {
    const istNow = getISTDate();
    // Yesterday's date in IST
    const yesterday = new Date(istNow);
    yesterday.setDate(yesterday.getDate() - 1);
    const datePrefix = `${yesterday.getFullYear()}-${(yesterday.getMonth() + 1).toString().padStart(2, '0')}-${yesterday.getDate().toString().padStart(2, '0')}`;
    
    // Find all logins from yesterday
    const yesterdayRecords = await Attendance.find({
      date: datePrefix
    });

    console.log(`[Daily Check] Scanning ${yesterdayRecords.length} records for ${datePrefix}...`);

    for (const record of yesterdayRecords) {
      const d = new Date(record.timestamp);
      const istTime = new Date(d.getTime() + (5.5 * 60 * 60 * 1000));
      const hours = istTime.getUTCHours();
      const mins = istTime.getUTCMinutes();
      const totalMinutes = hours * 60 + mins;

      // If logged in after 11:05 AM
      if (totalMinutes > 11 * 60 + 5) {
        const user = await AtdUser.findById(record.userId);
        if (!user || !user.email) continue;

        // Calculate TOTAL late logins for THIS month
        const currentMonthPrefix = `${istNow.getFullYear()}-${(istNow.getMonth() + 1).toString().padStart(2, '0')}-`;
        const monthRecords = await Attendance.find({
          userId: user._id,
          date: { $regex: new RegExp(`^${currentMonthPrefix}`) }
        });

        let lateCount = 0;
        monthRecords.forEach(r => {
          const rd = new Date(r.timestamp);
          const rist = new Date(rd.getTime() + (5.5 * 60 * 60 * 1000));
          if ((rist.getUTCHours() * 60 + rist.getUTCMinutes()) > (11 * 60 + 5)) {
            lateCount++;
          }
        });

        // Send mail if 2 or more late logins
        if (lateCount >= 2) {
          console.log(`[Alert] Sending late warning to ${user.email} (Count: ${lateCount})`);
          await sendEmail({
            email: user.email,
            subject: `Action Required: Attendance Warning (Late Logins: ${lateCount})`,
            message: generateLateWarningEmail(user, lateCount)
          });
        }
      }
    }
  } catch (error) {
    console.error("Error in checkDailyLateLogins:", error);
  }
};

/**
 * Initialize the monthly scheduler
 */
const initializeAttendanceReportScheduler = () => {
    // Schedule on 1st day of every month at 9:00 PM IST
    // Cron: 0 21 1 * *
    cron.schedule("0 21 1 * *", async () => {
        console.log(`📧 Triggering monthly attendance reports...`);
        await sendMonthlyAttendanceReports();
    }, {
        timezone: "Asia/Kolkata"
    });

    // Schedule daily late login check at 12:00 AM IST
    // Cron: 0 0 * * *
    cron.schedule("0 0 * * *", async () => {
        console.log(`📧 Checking for daily late login alerts...`);
        await checkDailyLateLogins();
    }, {
        timezone: "Asia/Kolkata"
    });

    console.log("✅ Attendance Schedulers initialized: Monthly (1st, 9PM) & Daily Late Login Alert (Daily, 12AM)");
};

module.exports = {
  sendMonthlyAttendanceReports,
  initializeAttendanceReportScheduler
};
