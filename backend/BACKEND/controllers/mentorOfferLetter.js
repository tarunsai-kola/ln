require("dotenv").config();
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const { operationsTransporter } = require("../utils/emailService");

const createMentorOfferLetterPDF = async ({ fullname, domain, date, perSessionRate }) => {
  const pdfDoc = await PDFDocument.create();

  // Load and embed background image
  const imagePath = path.join(__dirname, "image.png");
  let pngImage = null;
  if (fs.existsSync(imagePath)) {
    const imageBytes = fs.readFileSync(imagePath);
    pngImage = await pdfDoc.embedPng(imageBytes);
  }

  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const boldTimes = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const a4Width = 595.28;
  const a4Height = 841.89;

  // ── PAGE 1 ──
  const page1 = pdfDoc.addPage([a4Width, a4Height]);
  if (pngImage) {
    page1.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: a4Width,
      height: a4Height,
    });
  }

  const titleText = "FREELANCE MENTOR ENGAGEMENT LETTER";
  page1.drawText(titleText, {
    x: (a4Width - boldFont.widthOfTextAtSize(titleText, 13)) / 2,
    y: 730,
    size: 13,
    font: boldFont,
    color: rgb(0.08, 0.12, 0.2),
  });

  const page1Text = `Date: ${date}

To,
${fullname}

Subject: Offer of Engagement as Freelance Domain Mentor (${domain})

Dear ${fullname},

With reference to your profile and subsequent discussions with our Academic and Operations teams, Accenlearn Solutions is pleased to offer you an engagement as a Freelance Domain Mentor for "${domain}".

We are thrilled to welcome you to our expert mentor fraternity. This engagement is governed by the following terms and conditions:

1. Role & Scope of Engagement:
You are engaged as a Freelance Domain Mentor for ${domain}. Your core responsibilities include delivering comprehensive live interactive sessions, hands-on lab mentoring, code walkthroughs, real-world project reviews, and evaluating student mock interviews.

2. Engagement Model & Flexibility:
This engagement is strictly on a freelance / independent professional consultant basis. You retain complete flexibility with respect to scheduled class timings, mutually agreed in advance with our Operations Department.

3. Professional Compensation & Payouts:
You will be compensated at an agreed freelance rate${perSessionRate ? ` of INR ${perSessionRate} per verified session` : ' on a per-session basis'}. All payments will be disbursed directly to your registered bank account / UPI on a monthly clearance cycle post verification of class delivery.

4. Operational Coordination & Session Verification:
You will collaborate with your designated Operations Executive for cohort schedules, class links, and student attendance logs. Following the completion of each session, class drive recordings must be submitted via the Mentor Portal for quality assurance.`;

  page1.drawText(page1Text, {
    x: 50,
    y: 690,
    size: 11,
    font: regularFont,
    color: rgb(0.1, 0.1, 0.1),
    maxWidth: 495,
    lineHeight: 14,
  });

  // ── PAGE 2 ──
  const page2 = pdfDoc.addPage([a4Width, a4Height]);
  if (pngImage) {
    page2.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: a4Width,
      height: a4Height,
    });
  }

  const page2Text = `5. Confidentiality & Intellectual Property:
During your engagement, you may have access to proprietary curriculum, student details, and internal systems. You agree to treat all such information strictly confidential and refrain from unauthorized dissemination or commercial use outside Accenlearn.

6. Non-Exclusivity:
This agreement does not restrict you from engaging in other professional employment, consulting, or educational activities, provided they do not conflict with your agreed live session commitments at Accenlearn.

7. Term & Termination:
This engagement is effective from the date of acceptance. Either party may terminate this freelance arrangement by providing a 14-day written notice. Any completed and verified sessions prior to termination will be paid in full.

8. Entire Agreement:
This letter constitutes the complete understanding between you and Accenlearn Solutions with respect to your freelance mentorship and supersedes all prior verbal or written discussions.

Please confirm your acceptance of this freelance engagement by signing below and returning a scanned copy to operations@accenlearn.com.

We look forward to an impactful and fruitful partnership empowering aspiring professionals together.

Warm regards,

Authorized Signatory
Operations & Academic Partnerships
Accenlearn Solutions
operations@accenlearn.com`;

  page2.drawText(page2Text, {
    x: 50,
    y: 710,
    size: 11,
    font: regularFont,
    color: rgb(0.1, 0.1, 0.1),
    maxWidth: 495,
    lineHeight: 14,
  });

  // Acceptance block on page 2
  const acceptanceBoxY = 220;
  page2.drawText("ACCEPTANCE AND ACKNOWLEDGEMENT", {
    x: 50,
    y: acceptanceBoxY,
    size: 11,
    font: boldTimes,
    color: rgb(0.08, 0.12, 0.2),
  });

  page2.drawText(
    `I have read, understood, and accept the terms and conditions of this Freelance Mentor Engagement Letter.\n\nFull Name: ${fullname}\nDate: ${date}\nSignature: __________________________`,
    {
      x: 50,
      y: acceptanceBoxY - 20,
      size: 11,
      font: regularFont,
      color: rgb(0.1, 0.1, 0.1),
      maxWidth: 495,
      lineHeight: 15,
    }
  );

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

const sendMentorFreelanceOfferLetter = async ({
  email,
  fullname,
  domain,
  perSessionRate = 0,
  accenEmail,
  defaultPassword = "Accenlearn@123",
  date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
}) => {
  const subject = `Offer Letter - Freelance Domain Mentor (${domain}) | Accenlearn Solutions`;

  // Fallback accen email if not provided
  const resolvedAccenEmail = accenEmail || (() => {
    const clean = (fullname || "")
      .replace(/^(dr|prof|mr|mrs|ms)\.?\s+/i, "")
      .trim()
      .toLowerCase();
    const parts = clean.split(/[^a-z0-9]+/).filter(Boolean);
    return `${parts[0] || "mentor"}@accenlearn.com`;
  })();

  const body = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Accenlearn Solutions</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #c7d2fe; font-weight: 500;">Academic & Industry Mentorship Program</p>
    </div>

    <div style="padding: 32px 24px; color: #1e293b; line-height: 1.6;">
      <p style="font-size: 16px; margin: 0 0 16px 0;">Dear <strong>${fullname}</strong>,</p>

      <p style="font-size: 14px; margin: 0 0 16px 0;">
        We are thrilled to officially welcome you to the <strong>Accenlearn Mentorship Community</strong>! Based on your distinguished industry experience and profile review, we are pleased to offer you the role of:
      </p>

      <div style="background: #f8fafc; border-left: 4px solid #4f46e5; padding: 16px 20px; border-radius: 6px; margin: 24px 0;">
        <p style="margin: 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Role & Specialization</p>
        <p style="margin: 4px 0 0 0; font-size: 18px; color: #1e293b; font-weight: 700;">Freelance Domain Mentor &mdash; ${domain}</p>
        ${perSessionRate ? `<p style="margin: 6px 0 0 0; font-size: 14px; color: #059669; font-weight: 600;">Remuneration: ₹${perSessionRate} per verified session</p>` : ''}
      </div>

      <p style="font-size: 14px; margin: 0 0 16px 0;">
        Attached to this email is your formal <strong>Freelance Mentor Engagement Offer Letter</strong> detailing the scope of training, session delivery, and payout terms.
      </p>

      <!-- ── PORTAL ACCESS CREDENTIALS BOX ── -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 20px; margin: 24px 0;">
        <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #1e1b4b; font-weight: 700;">
          🔑 Mentor Portal Access Credentials
        </h3>
        <p style="margin: 0 0 14px 0; font-size: 13px; color: #475569;">
          Your mentor dashboard is active. You can log into the portal to review your cohort schedules, curriculum modules, and submit class drive recordings:
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 7px 0; color: #64748b; width: 140px;"><strong>Portal Route:</strong></td>
            <td style="padding: 7px 0;">
              <a href="https://accenlearn-main.vercel.app/mentor-login" style="color: #4f46e5; font-weight: bold; text-decoration: none;">
                /mentor-login
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #64748b;"><strong>User ID (Email):</strong></td>
            <td style="padding: 7px 0;">
              <code style="background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 14px;">${resolvedAccenEmail}</code>
            </td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #64748b;"><strong>Default Password:</strong></td>
            <td style="padding: 7px 0;">
              <code style="background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 14px;">${defaultPassword}</code>
            </td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <a href="https://accenlearn-main.vercel.app/mentor-login" style="display: inline-block; background: #4f46e5; color: #ffffff; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">
            Log In to Mentor Portal &rarr;
          </a>
        </div>
      </div>

      <h3 style="font-size: 15px; color: #0f172a; margin: 24px 0 12px 0;">Next Steps:</h3>
      <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155;">
        <li style="margin-bottom: 8px;">Review and sign the attached Offer Letter.</li>
        <li style="margin-bottom: 8px;">Reply to this email or send the signed copy back to <a href="mailto:operations@accenlearn.com" style="color: #4f46e5; text-decoration: none; font-weight: 600;">operations@accenlearn.com</a>.</li>
        <li style="margin-bottom: 8px;">Log into <a href="https://accenlearn-main.vercel.app/mentor-login" style="color: #4f46e5; font-weight: bold;">/mentor-login</a> using the credentials above to explore your mentor dashboard.</li>
      </ol>

      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 14px; margin: 0; color: #475569;">Warm regards,</p>
        <p style="font-size: 15px; font-weight: 700; margin: 4px 0 0 0; color: #0f172a;">Operations Department</p>
        <p style="font-size: 13px; color: #64748b; margin: 2px 0 0 0;">Accenlearn Solutions</p>
      </div>
    </div>

    <div style="background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
      &copy; ${new Date().getFullYear()} Accenlearn Solutions. All rights reserved.
    </div>
  </div>
  `;

  const pdfBuffer = await createMentorOfferLetterPDF({ fullname, domain, date, perSessionRate });

  const mailOptions = {
    from: `"Accenlearn Operations" <${process.env.SMTP_OPERATIONS_EMAIL}>`,
    replyTo: process.env.SMTP_OPERATIONS_EMAIL,
    to: email,
    cc: "aravind@accenlearn.com",
    subject,
    html: body,
    priority: "normal",
    headers: {
      "X-Mailer": "Accenlearn",
      "X-Priority": "3",
      Importance: "Normal",
    },
    attachments: [
      {
        filename: `Freelance_Mentor_Offer_Letter_${fullname.replace(/\s+/g, "_")}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  return new Promise((resolve, reject) => {
    operationsTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending mentor freelance offer letter:", error);
        reject(error);
      } else {
        console.log("Mentor offer letter sent successfully!", info.response);
        resolve(info.response);
      }
    });
  });
};

module.exports = {
  sendMentorFreelanceOfferLetter,
  createMentorOfferLetterPDF,
};
