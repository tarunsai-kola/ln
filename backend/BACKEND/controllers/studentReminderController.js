const nodemailer = require("nodemailer");

// Create dedicated HR Transporter using credentials specified in backend/.env:
// SMTP_HR_EMAIL=hr@accenlearn.com
// SMTP_HR_PASS="cgzx nzax gkhn pwyu"
function getHrTransporter() {
  const user = (process.env.SMTP_HR_EMAIL || "hr@accenlearn.com").trim();
  const rawPass = process.env.SMTP_HR_PASS || "cgzx nzax gkhn pwyu";
  const pass = rawPass.replace(/^["']|["']$/g, "").trim();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Format date nicely for email display if needed
 */
function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Replace placeholders {name}, {date}, {time}, {link}, {role}, {email}
 */
function interpolate(template, data) {
  if (!template) return "";
  let text = template;
  for (const [key, val] of Object.entries(data)) {
    const regex = new RegExp(`\\{${key}\\}|\\{\\{${key}\\}\\}`, "gi");
    text = text.replace(regex, val || "");
  }
  return text;
}

/**
 * Generate official Accenlearn branded HTML email
 */
function buildHtmlEmail({ name, email, date, time, link, role, bodyText }) {
  const formattedDate = formatDisplayDate(date);
  const formattedParagraphs = (bodyText || "")
    .split("\n\n")
    .map((p) => `<p style="margin: 0 0 16px 0; line-height: 1.65; color: #334155; font-size: 15px;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accenlearn Interview Scheduled</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 36px; text-align: left; border-bottom: 3px solid #f97316;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      ACCEN<span style="color: #f97316;">LEARN</span>
                    </div>
                    <div style="font-size: 12px; color: #94a3b8; font-weight: 500; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">
                      Human Resources & Talent Acquisition
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background: rgba(249, 115, 22, 0.15); border: 1px solid rgba(249, 115, 22, 0.4); color: #fb923c; font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px;">
                      Interview Schedule
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Email Body Content -->
          <tr>
            <td style="padding: 36px 36px 20px 36px;">
              <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 18px;">
                Dear ${name || "Candidate"},
              </div>

              ${formattedParagraphs}

              <!-- Highlighted Schedule Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 28px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
                <tr>
                  <td style="background: #f1f5f9; padding: 12px 20px; font-weight: 700; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0;">
                    📌 Interview Details
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      ${date
      ? `<tr>
                              <td width="35%" style="padding: 8px 0; font-size: 14px; color: #64748b; font-weight: 600;">📅 Date:</td>
                              <td style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 700;">${formattedDate} (${date})</td>
                            </tr>`
      : ""
    }
                      ${time
      ? `<tr>
                              <td width="35%" style="padding: 8px 0; font-size: 14px; color: #64748b; font-weight: 600;">⏰ Time:</td>
                              <td style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 700;">${time}</td>
                            </tr>`
      : ""
    }
                      ${role
      ? `<tr>
                              <td width="35%" style="padding: 8px 0; font-size: 14px; color: #64748b; font-weight: 600;">💼 Position / Role:</td>
                              <td style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${role}</td>
                            </tr>`
      : ""
    }
                      ${link
      ? `<tr>
                              <td width="35%" style="padding: 8px 0; font-size: 14px; color: #64748b; font-weight: 600;">🔗 Meeting Link / Venue:</td>
                              <td style="padding: 8px 0; font-size: 14px; color: #2563eb; font-weight: 600; word-break: break-all;">
                                <a href="${link}" target="_blank" style="color: #2563eb; text-decoration: underline;">${link}</a>
                              </td>
                            </tr>`
      : ""
    }
                    </table>
                  </td>
                </tr>
              </table>

              ${link
      ? `
              <div style="text-align: center; margin: 30px 0 20px 0;">
                <a href="${link}" target="_blank" style="display: inline-block; background: #f97316; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 13px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.35);">
                  Join Interview Session
                </a>
              </div>`
      : ""
    }

              <!-- Guidelines Card -->
              <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 6px; margin: 24px 0;">
                <div style="font-size: 13px; font-weight: 700; color: #b45309; margin-bottom: 4px;">Important Instructions:</div>
                <div style="font-size: 13px; color: #92400e; line-height: 1.5;">
                  • Please join at least 5 minutes prior to your scheduled time.<br/>
                  • Ensure you are in a quiet room with a working camera, microphone, and stable internet connection.<br/>
                  • Have your updated resume ready for quick reference.
                </div>
              </div>

              <!-- Sign-off -->
              <div style="margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 14px; color: #475569; line-height: 1.6;">
                Warm regards,<br/>
                <strong style="color: #0f172a; font-size: 15px;">HR Team | Accenlearn</strong><br/>
                <span style="color: #64748b; font-size: 13px;">Email: hr@accenlearn.com</span><br/>
                <span style="color: #64748b; font-size: 13px;">Website: <a href="https://accenlearn.com" style="color: #f97316; text-decoration: none;">accenlearn.com</a></span>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 18px 36px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              This is an official communication from Accenlearn Talent Acquisition Team.<br/>
              If you did not apply or feel you received this email in error, please reply to hr@accenlearn.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/**
 * Controller: Send single test email
 */
exports.sendSingleTestEmail = async (req, res) => {
  try {
    const {
      email,
      name = "Candidate Name",
      subject = "HR Accenlearn - Interview Scheduled",
      messageContent,
      interviewDate,
      interviewTime,
      meetingLink,
      role = "Candidate",
    } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: "Recipient email is required" });
    }

    const data = {
      name,
      email,
      date: interviewDate || "",
      time: interviewTime || "",
      link: meetingLink || "",
      role: role || "",
    };

    const finalSubject = interpolate(subject, data);
    const finalBodyText = interpolate(
      messageContent ||
      "You have your interview scheduled with HR Accenlearn. Please review the details below and ensure you are available on time.",
      data
    );

    const html = buildHtmlEmail({
      name,
      email,
      date: interviewDate,
      time: interviewTime,
      link: meetingLink,
      role,
      bodyText: finalBodyText,
    });

    const transporter = getHrTransporter();
    const mailOptions = {
      from: '"HR Accenlearn" <hr@accenlearn.com>',
      to: email,
      replyTo: "hr@accenlearn.com",
      subject: finalSubject,
      text: finalBodyText,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: `Test email sent successfully to ${email}`,
      messageId: info.messageId,
    });
  } catch (err) {
    console.error("Error sending single test reminder email:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to send test email",
    });
  }
};

/**
 * Controller: Bulk send interview reminders
 */
exports.sendBulkInterviewReminders = async (req, res) => {
  try {
    const {
      recipients = [],
      subject = "HR Accenlearn - Interview Scheduled",
      messageContent,
      defaultDate = "",
      defaultTime = "",
      defaultLink = "",
      defaultRole = "",
    } = req.body;

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No recipients provided. Please upload an Excel/CSV file or add candidates.",
      });
    }

    const transporter = getHrTransporter();

    const results = [];
    let sentCount = 0;
    let failedCount = 0;

    for (let i = 0; i < recipients.length; i++) {
      const item = recipients[i];
      const targetEmail = (item.email || "").trim();
      const targetName = (item.name || item.candidateName || item.fullName || "Candidate").trim();
      const targetDate = item.date || defaultDate || "";
      const targetTime = item.time || defaultTime || "";
      const targetLink = item.link || defaultLink || "";
      const targetRole = item.role || defaultRole || "";

      if (!targetEmail || !targetEmail.includes("@")) {
        results.push({
          index: i,
          name: targetName,
          email: targetEmail,
          status: "failed",
          error: "Invalid email address",
        });
        failedCount++;
        continue;
      }

      const candidateData = {
        name: targetName,
        email: targetEmail,
        date: targetDate,
        time: targetTime,
        link: targetLink,
        role: targetRole,
      };

      const personalizedSubject = interpolate(subject, candidateData);
      const personalizedBody = interpolate(
        messageContent ||
        "We are pleased to inform you that your interview with HR Accenlearn has been scheduled for tomorrow. Please be prepared and join on time.",
        candidateData
      );

      const html = buildHtmlEmail({
        name: targetName,
        email: targetEmail,
        date: targetDate,
        time: targetTime,
        link: targetLink,
        role: targetRole,
        bodyText: personalizedBody,
      });

      const mailOptions = {
        from: '"HR Accenlearn" <hr@accenlearn.com>',
        to: targetEmail,
        replyTo: "hr@accenlearn.com",
        subject: personalizedSubject,
        text: personalizedBody,
        html: html,
      };

      try {
        await transporter.sendMail(mailOptions);
        results.push({
          index: i,
          name: targetName,
          email: targetEmail,
          status: "sent",
        });
        sentCount++;
      } catch (sendErr) {
        console.error(`Failed to send email to ${targetEmail}:`, sendErr.message);
        results.push({
          index: i,
          name: targetName,
          email: targetEmail,
          status: "failed",
          error: sendErr.message,
        });
        failedCount++;
      }

      // Small throttle delay between sends to prevent rate limits
      if (i < recipients.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    return res.json({
      success: true,
      total: recipients.length,
      sentCount,
      failedCount,
      results,
    });
  } catch (err) {
    console.error("Bulk reminder send failed:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process bulk interview reminders",
    });
  }
};
