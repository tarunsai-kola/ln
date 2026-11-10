const JSZip = require("jszip");
const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const OfferLetter = require("../models/OfferLetter");
const { transporter, operationsTransporter } = require("../utils/emailService");

function xmlEscape(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getSafeFilename(name, ext) {
  const clean = (name || "Candidate").replace(/[^a-zA-Z0-9_-]/g, "_");
  return `Accenlearn_Offer_Letter_${clean}.${ext}`;
}

/**
 * Generate official customized DOCX from template
 */
async function generateOfferLetterDocxBuffer(details) {
  const {
    letterType = "intern",
    candidateName = "Candidate",
    offerDate = "",
    dateOfJoining = "",
    department = "Inside Sales",
    designation = "",
    fixedCompensation = "",
    incentive = "",
    monthlyTargets = "target to be confirmed by management",
    internshipDuration = "four (4) months",
    probationPeriod = "six (6) months",
    ojtDays = "10 working days"
  } = details;

  // Resolve template path
  const templateName =
    letterType === "full_time"
      ? "Accenlearn_Offer_Letter_Full_Time.docx"
      : "Accenlearn_Offer_Letter_Intern.docx";

  const candidatesPaths = [
    path.join(__dirname, "..", "templates", templateName),
    path.join(__dirname, "..", "..", "..", templateName),
    path.join(process.cwd(), templateName),
    path.join(process.cwd(), "templates", templateName)
  ];

  let templatePath = candidatesPaths.find((p) => fs.existsSync(p));
  if (!templatePath) {
    throw new Error(`Template file ${templateName} not found.`);
  }

  const fileData = fs.readFileSync(templatePath);
  const zip = await JSZip.loadAsync(fileData);
  let xml = await zip.file("word/document.xml").async("text");

  // 1. Candidate Name
  xml = xml.replace(/\[Candidate Name\]/g, xmlEscape(candidateName));
  if (candidateName) {
    xml = xml.replace(/Employee Name:\t/g, `Employee Name:\t${xmlEscape(candidateName)}`);
  }

  // 2. Offer Date & Date of Joining
  let dateCounter = 0;
  xml = xml.replace(/\[DD-\s*MMM-\s*2026\]/g, () => {
    dateCounter++;
    return dateCounter === 1 ? xmlEscape(offerDate) : xmlEscape(dateOfJoining);
  });

  // 3. Department
  if (department) {
    xml = xml.replace(/\[Inside Sales\]/g, xmlEscape(department));
  }

  // 4. Type specific replacements
  if (letterType === "intern") {
    const fixed = fixedCompensation || "12,500";
    const inc = incentive || "10,000";
    xml = xml.replace(/\[12,500\]/g, xmlEscape(fixed));
    xml = xml.replace(/\[10,000\]/g, xmlEscape(inc));

    if (designation && designation !== "Business Development Intern") {
      xml = xml.replace(/Business Development Intern/g, xmlEscape(designation));
    }
    if (internshipDuration && internshipDuration !== "four (4) months") {
      xml = xml.replace(/four \(4\) months/g, xmlEscape(internshipDuration));
    }
    if (ojtDays && ojtDays !== "10 working days") {
      xml = xml.replace(/10 working days/g, xmlEscape(ojtDays));
    }
  } else {
    // Full Time
    const fixed = fixedCompensation || "15,000";
    const inc = incentive || "10,000";
    const target = monthlyTargets || "target to be confirmed by management";

    xml = xml.replace(/\[15,000\]/g, xmlEscape(fixed));
    xml = xml.replace(/\[10,000\]/g, xmlEscape(inc));
    xml = xml.replace(
      /\[target to be confirmed by management\]/g,
      xmlEscape(target)
    );

    if (designation && designation !== "Business Development Associate") {
      xml = xml.replace(/Business Development Associate/g, xmlEscape(designation));
    }
    if (probationPeriod && probationPeriod !== "six (6) months") {
      xml = xml.replace(/six \(6\) months/g, xmlEscape(probationPeriod));
    }
  }

  // 5. Remove all yellow highlight tags to render crisp & clean
  xml = xml.replace(/<w:highlight[^>]*\/>/g, "");

  zip.file("word/document.xml", xml);
  return await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

/**
 * Generate official PDF copy from details
 */
async function generateOfferLetterPDFBuffer(details) {
  const {
    letterType = "intern",
    candidateName = "Candidate",
    offerDate = "",
    dateOfJoining = "",
    department = "Inside Sales",
    designation = letterType === "full_time" ? "Business Development Associate" : "Business Development Intern",
    workLocation = "Accenlearn at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.",
    fixedCompensation = letterType === "full_time" ? "15,000" : "12,500",
    incentive = "10,000",
    monthlyTargets = "target to be confirmed by management",
    internshipDuration = "four (4) months",
    probationPeriod = "six (6) months",
    ojtDays = "10 working days"
  } = details;

  const pdfDoc = await PDFDocument.create();

  // Background letterhead image if present
  const imagePath = path.join(__dirname, "image.png");
  let pngImage = null;
  if (fs.existsSync(imagePath)) {
    try {
      const imageBytes = fs.readFileSync(imagePath);
      pngImage = await pdfDoc.embedPng(imageBytes);
    } catch (e) {
      console.warn("Could not load image.png:", e.message);
    }
  }

  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const a4Width = 595.28;
  const a4Height = 841.89;
  const margin = 50;
  const contentWidth = a4Width - margin * 2;

  const wrapText = (text, maxWidth, font, fontSize) => {
    const lines = [];
    const paragraphs = text.split("\n");
    for (const paragraph of paragraphs) {
      if (paragraph.trim() === "") {
        lines.push("");
        continue;
      }
      const words = paragraph.split(" ");
      let currentLine = "";
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);
    }
    return lines;
  };

  // Helper to add a page
  const createNewPage = () => {
    const page = pdfDoc.addPage([a4Width, a4Height]);
    if (pngImage) {
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: a4Width,
        height: a4Height,
      });
    }
    return page;
  };

  // ───────── PAGE 1 ─────────
  let currentPage = createNewPage();
  let cursorY = a4Height - 110;

  // Title
  const title = "OFFER LETTER";
  currentPage.drawText(title, {
    x: (a4Width - helveticaBold.widthOfTextAtSize(title, 14)) / 2,
    y: cursorY,
    size: 14,
    font: helveticaBold,
    color: rgb(0.12, 0.16, 0.24),
  });
  cursorY -= 25;

  // Salutation & Date
  currentPage.drawText(`Dear ${candidateName}`, {
    x: margin,
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  const dateStr = `Date: ${offerDate}`;
  currentPage.drawText(dateStr, {
    x: a4Width - margin - timesBold.widthOfTextAtSize(dateStr, 11),
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 20;

  // Intro text
  const intro = "Kindly go through the below details and let us know if you have any queries and/or acknowledge your agreement to the same.";
  currentPage.drawText(intro, {
    x: margin,
    y: cursorY,
    size: 9.5,
    font: timesRoman,
    color: rgb(0.1, 0.1, 0.1),
  });
  cursorY -= 22;

  // Section: Employment Details
  currentPage.drawText("Employment Details", {
    x: margin,
    y: cursorY,
    size: 11.5,
    font: timesBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 16;

  const empDetails = [
    ["Designation:", designation],
    ["Date of Joining:", dateOfJoining],
    ["Type of Employment:", letterType === "full_time" ? "Full Time Permanent" : "Internship"],
    ["Department:", department],
    ["Work Location:", workLocation],
  ];

  for (const [label, val] of empDetails) {
    currentPage.drawText(label, {
      x: margin + 10,
      y: cursorY,
      size: 9.5,
      font: timesBold,
      color: rgb(0, 0, 0),
    });
    const wrappedVal = wrapText(val, contentWidth - 140, timesRoman, 9.5);
    for (let i = 0; i < wrappedVal.length; i++) {
      currentPage.drawText(wrappedVal[i], {
        x: margin + 140,
        y: cursorY - (i * 12),
        size: 9.5,
        font: timesRoman,
        color: rgb(0.1, 0.1, 0.1),
      });
    }
    cursorY -= Math.max(16, wrappedVal.length * 12 + 4);
  }

  cursorY -= 8;

  // Engagement paragraph
  currentPage.drawText("Engagement", {
    x: margin,
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 14;

  const engagementText = letterType === "full_time"
    ? `You are employed by the Company in the role of ${designation} in the ${department} department with Accenlearn at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.`
    : `You are engaged by the Company in the role of ${designation} in the ${department} department with Accenlearn at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.`;

  for (const line of wrapText(engagementText, contentWidth, timesRoman, 9.5)) {
    currentPage.drawText(line, {
      x: margin,
      y: cursorY,
      size: 9.5,
      font: timesRoman,
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 13;
  }
  cursorY -= 8;

  // Period of Service
  currentPage.drawText("Period of Service", {
    x: margin,
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 14;

  const periodText = letterType === "full_time"
    ? `You shall be on a probationary period of ${probationPeriod} from the date of your joining, which includes the job training period. Upon successful completion of probation and based on performance assessment, your employment will be confirmed.`
    : `The internship is for a period of ${internshipDuration} from the date of joining, inclusive of the job training period. The Company may, at its discretion, consider you for further opportunities based on your performance.`;

  for (const line of wrapText(periodText, contentWidth, timesRoman, 9.5)) {
    currentPage.drawText(line, {
      x: margin,
      y: cursorY,
      size: 9.5,
      font: timesRoman,
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 13;
  }
  cursorY -= 8;

  // OJT Period
  currentPage.drawText("On Job Training Period (OJT)", {
    x: margin,
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 14;

  const ojtText = `Please be advised that the training period will be of ${ojtDays}, which will be UNPAID. In the event of taking any leave during the On Job Training (OJT) period, it will be necessary to recommence the training from the initial day upon return. This policy ensures the comprehensive acquisition of the skills and knowledge essential for optimal performance in the designated role.`;
  for (const line of wrapText(ojtText, contentWidth, timesRoman, 9.5)) {
    currentPage.drawText(line, {
      x: margin,
      y: cursorY,
      size: 9.5,
      font: timesRoman,
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 13;
  }
  cursorY -= 8;

  // Remuneration
  currentPage.drawText("Remuneration", {
    x: margin,
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 14;

  const remText = letterType === "full_time"
    ? `After ${ojtDays} of OJT, you will be working on probation for the aforesaid period. Your total compensation will be INR ${fixedCompensation} per month + INR ${incentive} performance-based incentive. All benefits and allowances will be governed as per company policy.`
    : `After ${ojtDays} of OJT, you will be offered a total compensation of INR ${fixedCompensation} per month + INR ${incentive} based on performance incentive. All benefits and allowances will be governed as per company policy.`;

  for (const line of wrapText(remText, contentWidth, timesRoman, 9.5)) {
    currentPage.drawText(line, {
      x: margin,
      y: cursorY,
      size: 9.5,
      font: timesRoman,
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 13;
  }

  // ───────── PAGE 2 ─────────
  currentPage = createNewPage();
  cursorY = a4Height - 110;

  // Terms & Deductions
  currentPage.drawText("Deductions & Policies", {
    x: margin,
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 14;

  const deductions = [
    "The remuneration for any calendar month shall be subject to deduction under the following conditions:",
    "• Unexcused leaves (without prior notice and/or no notice whatsoever).",
    "• Destruction of company property.",
    "• Loss and/or theft of company data, leads, raw data, and client/prospects information.",
  ];
  for (const item of deductions) {
    currentPage.drawText(item, {
      x: margin,
      y: cursorY,
      size: 9,
      font: timesRoman,
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 13;
  }
  cursorY -= 6;

  // Working hours
  currentPage.drawText("Working Hours Policy", {
    x: margin,
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 14;

  const hours = [
    "• Login Time: 11:00 AM (grace period of 5 minutes allowed for unavoidable delays).",
    "• Lunch Break: 1:30 PM – 2:30 PM | Tea Break: 5:45 PM – 6:00 PM",
    "• Logout Time: Official logout time is 8:00 PM.",
  ];
  for (const item of hours) {
    currentPage.drawText(item, {
      x: margin,
      y: cursorY,
      size: 9,
      font: timesRoman,
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 13;
  }
  cursorY -= 6;

  // Target clause
  if (letterType === "full_time") {
    currentPage.drawText("Performance Expectations & Monthly Targets", {
      x: margin,
      y: cursorY,
      size: 11,
      font: timesBold,
      color: rgb(0.1, 0.2, 0.5),
    });
    cursorY -= 14;
    const targetClause = `Employees are required to maintain consistent productivity. Failing to meet the minimum monthly targets [${monthlyTargets}] during the probation period may result in an extension of probation or separation in accordance with company policy.`;
    for (const line of wrapText(targetClause, contentWidth, timesRoman, 9)) {
      currentPage.drawText(line, {
        x: margin,
        y: cursorY,
        size: 9,
        font: timesRoman,
        color: rgb(0.1, 0.1, 0.1),
      });
      cursorY -= 13;
    }
    cursorY -= 6;
  }

  // Confidentiality
  currentPage.drawText("Confidentiality & Non-Compete", {
    x: margin,
    y: cursorY,
    size: 11,
    font: timesBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 14;

  const confText = "You are required to maintain strict confidentiality of all company, student, and client data during and after your employment. Remuneration is strictly confidential. You also agree not to engage in competing business activities or solicit employees/clients during and for six (6) months following the termination of employment.";
  for (const line of wrapText(confText, contentWidth, timesRoman, 9)) {
    currentPage.drawText(line, {
      x: margin,
      y: cursorY,
      size: 9,
      font: timesRoman,
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 13;
  }
  cursorY -= 15;

  // Acknowledgment section
  currentPage.drawText("ACKNOWLEDGMENT & ACCEPTANCE", {
    x: margin,
    y: cursorY,
    size: 10,
    font: helveticaBold,
    color: rgb(0.1, 0.2, 0.5),
  });
  cursorY -= 14;

  const ackText = "This is to acknowledge that I have received a copy of this Offer Letter and understand that it contains important information on Company general policies and my obligations. I agree to read, understand, and adhere to Company policies.";
  for (const line of wrapText(ackText, contentWidth, timesRoman, 8.5)) {
    currentPage.drawText(line, {
      x: margin,
      y: cursorY,
      size: 8.5,
      font: timesRoman,
      color: rgb(0.1, 0.1, 0.1),
    });
    cursorY -= 12;
  }
  cursorY -= 25;

  // Signature lines
  currentPage.drawText("Employee Signature: _______________________", {
    x: margin,
    y: cursorY,
    size: 9,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  currentPage.drawText("HR Authorized Signatory: _______________________", {
    x: a4Width - margin - 220,
    y: cursorY,
    size: 9,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 18;

  currentPage.drawText(`Candidate Name: ${candidateName}`, {
    x: margin,
    y: cursorY,
    size: 9,
    font: timesRoman,
    color: rgb(0, 0, 0),
  });
  currentPage.drawText("Company: Accenlearn Solutions", {
    x: a4Width - margin - 220,
    y: cursorY,
    size: 9,
    font: timesRoman,
    color: rgb(0, 0, 0),
  });
  cursorY -= 16;

  currentPage.drawText(`Date: ${offerDate}`, {
    x: margin,
    y: cursorY,
    size: 9,
    font: timesRoman,
    color: rgb(0, 0, 0),
  });
  currentPage.drawText(`Date: ${offerDate}`, {
    x: a4Width - margin - 220,
    y: cursorY,
    size: 9,
    font: timesRoman,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * Send Offer Letter Email with attachments
 */
async function sendOfferLetterEmail(details) {
  const {
    letterType = "intern",
    candidateName,
    candidateEmail,
    candidatePhone,
    offerDate,
    dateOfJoining,
    department = "Inside Sales",
    designation,
    workLocation,
    fixedCompensation,
    incentive,
    monthlyTargets,
    internshipDuration = "four (4) months",
    probationPeriod = "six (6) months",
    ojtDays = "10 working days",
    emailSubject,
    ccEmail = "aravind@accenlearn.com",
    customNotes = "",
    sentBy = "HR Manager"
  } = details;

  if (!candidateEmail || !candidateName) {
    throw new Error("Candidate name and email are required.");
  }

  // 1. Generate DOCX buffer (Word document only)
  const docxBuffer = await generateOfferLetterDocxBuffer(details);
  const docxFilename = getSafeFilename(candidateName, "docx");

  const effectiveSubject =
    emailSubject ||
    `Offer Letter - ${candidateName} - ${designation || (letterType === "full_time" ? "Business Development Associate" : "Business Development Intern")} | Accenlearn`;

  const typeLabel = letterType === "full_time" ? "Full Time Employment" : "Internship";
  const roleLabel = designation || (letterType === "full_time" ? "Business Development Associate" : "Business Development Intern");
  const fixedLabel = fixedCompensation || (letterType === "full_time" ? "15,000" : "12,500");
  const incLabel = incentive || "10,000";

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); color: #ffffff; padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 0; font-size: 13px; opacity: 0.9; }
        .content { padding: 30px 24px; line-height: 1.6; font-size: 14px; }
        .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
        .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 20px 0; }
        .card-row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px dashed #e2e8f0; font-size: 13px; }
        .card-row:last-child { border-bottom: none; }
        .card-label { font-weight: 600; color: #64748b; }
        .card-value { font-weight: 700; color: #0f172a; text-align: right; }
        .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 800; border-radius: 9999px; background: #e0e7ff; color: #3730a3; }
        .custom-notes { background-color: #fefce8; border-left: 4px solid #facc15; padding: 12px 16px; margin: 18px 0; border-radius: 4px; font-size: 13px; color: #713f12; }
        .action-box { background-color: #eef2ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; color: #312e81; }
        .footer { background-color: #f1f5f9; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ACCENLEARN</h1>
          <p>Official Offer of Employment</p>
        </div>
        <div class="content">
          <div class="greeting">Dear ${candidateName},</div>
          <p>
            We are pleased to extend this formal offer of engagement for the position of 
            <strong>${roleLabel}</strong> with <strong>Accenlearn Solutions</strong>.
          </p>
          <p>
            Based on your application and subsequent discussions, we believe your skills and passion will be a valuable addition to our team.
          </p>

          <div class="card">
            <div class="card-row">
              <span class="card-label">Candidate Name:</span>
              <span class="card-value">${candidateName}</span>
            </div>
            <div class="card-row">
              <span class="card-label">Designation:</span>
              <span class="card-value">${roleLabel}</span>
            </div>
            <div class="card-row">
              <span class="card-label">Employment Type:</span>
              <span class="card-value"><span class="badge">${typeLabel}</span></span>
            </div>
            <div class="card-row">
              <span class="card-label">Department:</span>
              <span class="card-value">${department}</span>
            </div>
            <div class="card-row">
              <span class="card-label">Date of Joining:</span>
              <span class="card-value">${dateOfJoining}</span>
            </div>
            <div class="card-row">
              <span class="card-label">Compensation:</span>
              <span class="card-value">INR ${fixedLabel} / month + INR ${incLabel} Incentive</span>
            </div>
          </div>

          ${
            customNotes
              ? `<div class="custom-notes"><strong>Note from HR:</strong><br/>${customNotes.replace(/\n/g, "<br/>")}</div>`
              : ""
          }

          <div class="action-box">
            <strong>Next Steps:</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
              <li>Please review the attached official Offer Letter Word document (<strong>.docx</strong>).</li>
              <li>Acknowledge and accept by replying to this email within <strong>48 hours</strong>.</li>
              <li>Submit a signed copy of the letter to the HR department on your date of joining.</li>
            </ul>
          </div>

          <p>
            We are excited about the prospect of you joining our team and look forward to a successful and rewarding journey together.
          </p>

          <p style="margin-top: 24px;">
            Warm regards,<br/>
            <strong>Human Resources Department</strong><br/>
            Accenlearn Solutions<br/>
            <span style="color: #64748b; font-size: 12px;">5th floor, Primehub Building, JP Nagar 2nd Phase, Bengaluru – 560041</span>
          </p>
        </div>

        <div class="footer">
          This is an official communication from Accenlearn HR Portal. Please do not hesitate to contact us at operation@accenlearn.com for any queries.
        </div>
      </div>
    </body>
    </html>
  `;

  const attachments = [
    {
      filename: docxFilename,
      content: docxBuffer,
      contentType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
  ];

  const senderEmail = process.env.SMTP_OPERATIONS_EMAIL || "operation@accenlearn.com";

  const mailOptions = {
    from: `"Accenlearn HR Team" <${senderEmail}>`,
    replyTo: senderEmail,
    to: candidateEmail,
    cc: ccEmail || "aravind@accenlearn.com",
    subject: effectiveSubject,
    html: emailHtml,
    priority: "normal",
    headers: {
      "X-Mailer": "Accenlearn HR Portal",
      Importance: "Normal",
    },
    attachments,
  };

  const activeTransporter = operationsTransporter || transporter;
  let emailResponse = "";

  try {
    const info = await activeTransporter.sendMail(mailOptions);
    emailResponse = info.response || "Email sent successfully";
    console.log("Offer letter email sent successfully:", emailResponse);
  } catch (err) {
    console.error("Failed to send email:", err);
    throw new Error(`Email delivery failed: ${err.message}`);
  }

  // Save record in MongoDB
  const savedRecord = await OfferLetter.create({
    letterType,
    candidateName,
    candidateEmail,
    candidatePhone,
    offerDate,
    dateOfJoining,
    department,
    designation: roleLabel,
    workLocation:
      workLocation ||
      details.workLocation ||
      "Accenlearn at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.",
    fixedCompensation: fixedLabel,
    incentive: incLabel,
    internshipDuration,
    ojtDays,
    monthlyTargets,
    probationPeriod,
    emailSubject: effectiveSubject,
    ccEmail,
    customNotes,
    sentBy,
    status: "Sent",
    emailResponse,
  });

  return savedRecord;
}

// ─────────────────────────────────────────────────────────────
// Express Controller Handlers
// ─────────────────────────────────────────────────────────────

const handleGenerateDocx = async (req, res) => {
  try {
    const details = req.body;
    const buffer = await generateOfferLetterDocxBuffer(details);
    const filename = getSafeFilename(details.candidateName, "docx");

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    console.error("Error generating DOCX:", error);
    res.status(500).json({ error: error.message });
  }
};

const handleGeneratePdf = async (req, res) => {
  try {
    const details = req.body;
    const buffer = await generateOfferLetterPDFBuffer(details);
    const filename = getSafeFilename(details.candidateName, "pdf");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: error.message });
  }
};

const handleSendOfferLetter = async (req, res) => {
  try {
    const details = req.body;
    if (req.user && req.user.fullname) {
      details.sentBy = req.user.fullname;
    } else if (req.headers["x-hr-name"]) {
      details.sentBy = req.headers["x-hr-name"];
    }

    const record = await sendOfferLetterEmail(details);
    res.status(200).json({
      success: true,
      message: `Offer letter successfully sent to ${details.candidateEmail}`,
      record,
    });
  } catch (error) {
    console.error("Error sending offer letter:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetOfferLetterHistory = async (req, res) => {
  try {
    const list = await OfferLetter.find().sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching offer letters history:", error);
    res.status(500).json({ error: error.message });
  }
};

const handleDownloadHistoryDocx = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await OfferLetter.findById(id);
    if (!record) return res.status(404).json({ error: "Offer letter not found" });

    const buffer = await generateOfferLetterDocxBuffer(record);
    const filename = getSafeFilename(record.candidateName, "docx");

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleDownloadHistoryPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await OfferLetter.findById(id);
    if (!record) return res.status(404).json({ error: "Offer letter not found" });

    const buffer = await generateOfferLetterPDFBuffer(record);
    const filename = getSafeFilename(record.candidateName, "pdf");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleDeleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await OfferLetter.findByIdAndDelete(id);
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateOfferLetterDocxBuffer,
  generateOfferLetterPDFBuffer,
  sendOfferLetterEmail,
  handleGenerateDocx,
  handleGeneratePdf,
  handleSendOfferLetter,
  handleGetOfferLetterHistory,
  handleDownloadHistoryDocx,
  handleDownloadHistoryPdf,
  handleDeleteHistory,
};

