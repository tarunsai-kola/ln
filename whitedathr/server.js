const path = require("path");
const fs = require("fs");

// Auto-resolve workspace node_modules so dependencies work seamlessly
const candidateNodePaths = [
  path.join(__dirname, "node_modules"),
  path.join(__dirname, "..", "backend", "BACKEND", "node_modules"),
  path.join(__dirname, "..", "frontend", "node_modules"),
  path.join(__dirname, "..", "node_modules"),
];
process.env.NODE_PATH =
  candidateNodePaths.filter((p) => fs.existsSync(p)).join(path.delimiter) +
  (process.env.NODE_PATH ? path.delimiter + process.env.NODE_PATH : "");
require("module").Module._initPaths();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const JSZip = require("jszip");

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// History file path for local persistence without database
const HISTORY_FILE = path.join(__dirname, "sent_history.json");
if (!fs.existsSync(HISTORY_FILE)) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify([], null, 2));
}

function readHistory() {
  try {
    const data = fs.readFileSync(HISTORY_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (e) {
    return [];
  }
}

function writeHistory(list) {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(list, null, 2));
  } catch (e) {
    console.error("Failed to write history:", e);
  }
}

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
  return `GrowMore_Offer_Letter_${clean}.${ext}`;
}

/**
 * Configure Nodemailer Transporter
 */
function getTransporter() {
  const emailUser = (
    process.env.EMAIL_USER ||
    process.env.GMAIL_USER ||
    process.env.SMTP_HR_EMAIL ||
    ""
  ).trim();

  const emailPass = (
    process.env.EMAIL_PASS ||
    process.env.GMAIL_PASS ||
    process.env.SMTP_HR_PASS ||
    ""
  ).replace(/^["']|["']$/g, "").trim();

  if (!emailUser || !emailPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
}

/**
 * Generate official PDF with A4 letterhead background
 */
async function generateOfferLetterPDFBuffer(details) {
  const {
    letterType = "intern",
    candidateName = "Candidate",
    offerDate = "",
    dateOfJoining = "",
    department = "Inside Sales",
    designation = letterType === "full_time"
      ? "Business Development Associate"
      : "Business Development Intern",
    workLocation = "Grow More Solutions at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.",
    fixedCompensation = letterType === "full_time" ? "15,000" : "12,500",
    incentive = "10,000",
    monthlyTargets = "target to be confirmed by management",
    internshipDuration = "four (4) months",
    probationPeriod = "four (4) months",
    ojtDays = "10 working days",
    postProbationCtc = "",
    includePostProbationCtc = false,
  } = details;

  const pdfDoc = await PDFDocument.create();

  // Load A4 letterhead image background
  const letterheadPath = path.join(__dirname, "letterhead_a4.png");
  let pngImage = null;
  if (fs.existsSync(letterheadPath)) {
    try {
      const imageBytes = fs.readFileSync(letterheadPath);
      pngImage = await pdfDoc.embedPng(imageBytes);
    } catch (e) {
      console.warn("Could not load letterhead_a4.png:", e.message);
    }
  }

  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const a4Width = 595.28;
  const a4Height = 841.89;
  const margin = 48;
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

  let currentPage = createNewPage();
  // Header clearance: top ~108 pt
  let cursorY = a4Height - 110;

  const ensureSpace = (needed) => {
    // Footer clearance: bottom ~65 pt
    if (cursorY - needed < 65) {
      currentPage = createNewPage();
      cursorY = a4Height - 110;
    }
  };

  const drawHeading = (text, size = 10.5) => {
    ensureSpace(22);
    currentPage.drawText(text, {
      x: margin,
      y: cursorY,
      size,
      font: timesBold,
      color: rgb(0.05, 0.15, 0.35),
    });
    cursorY -= size + 5;
  };

  const drawParagraph = (
    text,
    size = 8.8,
    font = timesRoman,
    color = rgb(0.1, 0.1, 0.1),
    indent = 0
  ) => {
    const lines = wrapText(text, contentWidth - indent, font, size);
    for (const line of lines) {
      ensureSpace(size + 3.8);
      if (line === "") {
        cursorY -= 4;
        continue;
      }
      currentPage.drawText(line, {
        x: margin + indent,
        y: cursorY,
        size,
        font,
        color,
      });
      cursorY -= size + 3.2;
    }
    cursorY -= 3.5;
  };

  // Title
  currentPage.drawText("OFFER LETTER", {
    x: (a4Width - helveticaBold.widthOfTextAtSize("OFFER LETTER", 13.5)) / 2,
    y: cursorY,
    size: 13.5,
    font: helveticaBold,
    color: rgb(0.08, 0.14, 0.25),
  });
  cursorY -= 22;

  // Dear Candidate & Date
  currentPage.drawText(`Dear ${candidateName}`, {
    x: margin,
    y: cursorY,
    size: 10,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  const dateStr = `Date: ${offerDate}`;
  currentPage.drawText(dateStr, {
    x: a4Width - margin - timesBold.widthOfTextAtSize(dateStr, 10),
    y: cursorY,
    size: 10,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 17;

  drawParagraph(
    "Kindly go through the below details and let us know if you have any queries and/or acknowledge your agreement to the same.",
    8.8,
    timesRoman,
    rgb(0.25, 0.25, 0.25)
  );

  drawHeading("Employment Details");
  const isFullTimeWithLpa =
    letterType === "full_time" &&
    (postProbationCtc || includePostProbationCtc) &&
    postProbationCtc;

  const detailsTable = [
    ["Designation:", designation],
    ["Date of Joining:", dateOfJoining],
    [
      "Type of Employment:",
      letterType === "full_time"
        ? isFullTimeWithLpa
          ? `Full Time (${probationPeriod || "4-Month"} Probation)`
          : "Full Time"
        : "Internship",
    ],
    ["Department:", department],
    ["Work Location:", workLocation],
  ];

  if (isFullTimeWithLpa) {
    detailsTable.push([
      "Probation Remuneration:",
      `INR ${fixedCompensation} (Fixed Base) + INR ${incentive} (Incentive) / month`,
    ]);
    detailsTable.push([
      "Annual CTC:",
      `Up to ${postProbationCtc} (Subject to performance review post-probation)`,
    ]);
  }

  for (const [k, v] of detailsTable) {
    ensureSpace(15);
    currentPage.drawText(k, {
      x: margin + 8,
      y: cursorY,
      size: 8.8,
      font: timesBold,
      color: rgb(0, 0, 0),
    });
    const vLines = wrapText(v, contentWidth - 130, timesRoman, 8.8);
    for (let i = 0; i < vLines.length; i++) {
      if (i > 0) ensureSpace(12);
      currentPage.drawText(vLines[i], {
        x: margin + 130,
        y: cursorY,
        size: 8.8,
        font: timesRoman,
        color: rgb(0.1, 0.1, 0.1),
      });
      if (i < vLines.length - 1) cursorY -= 11;
    }
    cursorY -= 13;
  }
  cursorY -= 3;

  drawHeading("Engagement");
  drawParagraph(
    `You are ${letterType === "full_time" ? "employed" : "engaged"} by the Company in the role of ${designation} in the ${department} department with Grow More Solutions at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.`
  );

  drawHeading("Period of Service");
  drawParagraph(
    letterType === "full_time"
      ? isFullTimeWithLpa
        ? `You shall be on a probationary period of ${probationPeriod || "four (4) months"} from the date of your joining, which includes the job training period. Upon successful completion of probation and based on performance evaluation and management discretion, you may be considered for confirmation with an annual package of up to ${postProbationCtc}.`
        : `You shall be on a probationary period of ${probationPeriod || "four (4) months"} from the date of your joining, which includes the job training period. Upon successful completion of probation and based on performance assessment, your employment will be confirmed.`
      : `The internship is for a period of ${internshipDuration} from the date of joining, inclusive of the job training period. The Company may, at its discretion, consider you for further opportunities based on your performance.`
  );

  drawHeading("On Job Training Period (OJT)");
  drawParagraph(
    `Please be advised that the training period will be of ${ojtDays}, which will be UNPAID. In the event of taking any leave during the On Job Training (OJT) period, it will be necessary to recommence the training from the initial day upon return. This policy ensures the comprehensive acquisition of the skills and knowledge essential for optimal performance in the designated role.`
  );

  drawHeading("Remuneration");
  drawParagraph(
    isFullTimeWithLpa
      ? `After ${ojtDays} of OJT, during the probationary period of ${probationPeriod || "four (4) months"}, you will be offered a monthly compensation of INR ${fixedCompensation} (Fixed Base) + INR ${incentive} (Performance-Based Incentive). Upon successful completion of the ${probationPeriod || "four (4) months"} probation period, subject to satisfactory performance evaluation, target achievements, and management discretion, you may be considered for an annual compensation package of up to ${postProbationCtc}. All benefits and allowances will be governed as per company policy.\nNote: ${probationPeriod || "4-Month"} Probation period.\nFor detailed terms of the contract, kindly refer to the Terms of Employment (Annexure-A) for your review and acceptance. If you choose to accept this offer of employment, please revert to our mail confirming your acceptance and also submit the hard copy to the HR Department.`
      : `After ${ojtDays} of OJT, you will be offered a total compensation of INR ${fixedCompensation} per month + INR ${incentive} ${
          letterType === "full_time" ? "performance-based incentive" : "based on performance incentive"
        }. All benefits and allowances will be governed as per company policy.\nNote: ${
          letterType === "full_time" ? "4-Month Probation period." : "4-Month Intern period."
        }\nFor detailed terms of the contract, kindly refer to the Terms of Employment (Annexure-A) for your review and acceptance. If you choose to accept this offer of employment, please revert to our mail confirming your acceptance and also submit the hard copy to the HR Department.`
  );

  drawHeading("Deductions");
  drawParagraph(
    "The remuneration for any calendar month shall be subject to deduction under the following conditions:\n• Unexcused leaves (without prior notice and/or no notice whatsoever).\n• Destruction of company property.\n• Loss and/or theft of company data, which includes but is not limited to leads, raw data, and information of clients/prospects; and misappropriation of company resources."
  );

  drawHeading("Working Hours Policy");
  drawParagraph(
    "Login Time: Employees are required to log in by 11:00 AM, with a grace period of 5 minutes allowed for unavoidable delays.\nLate Arrivals: Repeated late logins may be treated as leave or loss of pay as per company policy.\nBreak Schedule:\n• Lunch Break: 1:30 PM – 2:30 PM\n• Tea Break: 5:45 PM – 6:00 PM\nLogout Time: The official logout time is 8:00 PM. Employees may be required to extend working hours based on business requirements, including meetings, celebrations, or critical work for teams requiring additional presence."
  );

  drawHeading("Performance Expectation (Target-Based)");
  drawParagraph(
    `You are required to meet assigned performance targets and carry out your responsibilities diligently. Your performance will be reviewed periodically based on quality of work, productivity, and target achievement. Continuous failure to meet expectations may lead to performance improvement plans or further action as per company policy.${
      letterType === "full_time"
        ? ` Failing to meet the minimum monthly targets [${monthlyTargets}] during the probation period.`
        : ""
    }`
  );

  drawHeading("Confidentiality");
  drawParagraph(
    "You are required to maintain strict confidentiality of all company and client information during and after your employment. Your individual remuneration is purely between yourself and the company, and you are expected to preserve it and any changes made to it from time to time as personal and confidential."
  );

  drawHeading("Company Property");
  drawParagraph(
    "All company property must be used responsibly and returned in good condition upon separation from the organization."
  );

  drawHeading("Termination");
  drawParagraph(
    "The company reserves the right to terminate employment in accordance with company policies and applicable laws. Termination may occur in cases of misconduct, policy violations, or performance-related concerns."
  );

  // Acknowledgment section
  ensureSpace(115);
  drawHeading("ACKNOWLEDGMENT & ACCEPTANCE", 9.8);
  drawParagraph(
    "ALL EMPLOYEES MUST READ THIS LETTER, THEN FILL OUT AND RETURN THIS PORTION TO THE HUMAN RESOURCES DEPARTMENT WITHIN ONE WEEK OF JOINING\nThis is to acknowledge that I have received a copy of this Offer Letter and understand that it contains important information on the Company’s general policies and on my obligations. I am expected to read, understand, and adhere to Company policies and I am governed by the contents of this letter. I understand that the Company may change, rescind, or add to any policies described herein from time to time, and that the most recent policies shall prevail.",
    8.2
  );

  ensureSpace(45);
  currentPage.drawText("Employee Signature: _______________________", {
    x: margin,
    y: cursorY,
    size: 8.2,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  currentPage.drawText(`Date: ${offerDate}`, {
    x: a4Width - margin - 150,
    y: cursorY,
    size: 8.2,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 14;
  currentPage.drawText(`Employee Name: ${candidateName}`, {
    x: margin,
    y: cursorY,
    size: 8.2,
    font: timesRoman,
    color: rgb(0, 0, 0),
  });
  cursorY -= 22;

  // ── ANNEXURE-A ──
  currentPage = createNewPage();
  cursorY = a4Height - 110;

  currentPage.drawText("“ANNEXURE-A”", {
    x: (a4Width - helveticaBold.widthOfTextAtSize("“ANNEXURE-A”", 12.5)) / 2,
    y: cursorY,
    size: 12.5,
    font: helveticaBold,
    color: rgb(0.05, 0.15, 0.35),
  });
  cursorY -= 17;
  currentPage.drawText("TERMS OF EMPLOYMENT", {
    x: (a4Width - helveticaBold.widthOfTextAtSize("TERMS OF EMPLOYMENT", 10.5)) / 2,
    y: cursorY,
    size: 10.5,
    font: helveticaBold,
    color: rgb(0.08, 0.14, 0.25),
  });
  cursorY -= 20;

  const annexureSections = [
    [
      "1. Employment",
      "Your employment with the Company will commence from the date of joining mentioned in this letter and will be governed by Company policies.",
    ],
    [
      "2. Roles & Responsibilities",
      "You are expected to perform your duties diligently, meet assigned targets, and follow instructions from your reporting manager.",
    ],
    [
      "3. Working Hours",
      "You are required to adhere to the Company’s working hours and attendance policies as communicated. Given your role, you may need to work beyond standard hours when necessary; the Company will strive to provide advance notice, but this may not always be feasible.",
    ],
    [
      "4. Policy Compliance",
      "You are expected to comply with all Company policies, rules, and regulations as updated from time to time.",
    ],
    [
      "Effectiveness",
      "Your employment with Grow More Solutions will be governed by the Company’s policies, as modified from time to time at the Company’s discretion. These Terms of Employment must be read as part of all of the Company’s current policies. This agreement becomes effective on the commencement of your service. The Company reserves the right to withdraw the offer even after acceptance if it becomes aware of any material information that was concealed or misrepresented by you. You are requested to abide by the guidelines and regulations of the office and to maintain the code of conduct and disciplinary rules, which may be framed or modified from time to time.",
    ],
    [
      "Employee Conduct",
      "The success of our organization hinges on how we treat each other. All managers and employees are expected to engage with our clients, vendors, guests, and fellow team members with respect and consideration. Behaviours such as rudeness, gossiping, use of profanity, yelling, or employing vulgar or offensive language, along with suggestive or sarcastic gestures, are unacceptable and may result in disciplinary measures, which could include immediate termination.\nTo uphold a professional atmosphere, employees are prohibited from engaging in personal relationships with clients or guests if such relationships are deemed by the Company to create conflicts of interest, disrupt the workplace, or contribute to a negative environment.",
    ],
    [
      "Reassignment",
      "The Company reserves the right to reassign you at any time to a comparable position for which you are deemed qualified, either within the Company or as a secondment to an affiliated entity. Unless a different agreement is made in writing, any reassignment will be governed by the terms and conditions outlined in this contract and will not be considered a termination of this contract.",
    ],
    [
      "Termination of Employment",
      "The Company may terminate your employment immediately, with or without notice, under the following circumstances:\n• Serious Offences: Embezzlement, intoxication, illegal drug abuse, unauthorized absences that exceed Company leave policies, unauthorized disclosure or misuse of the Company’s confidential information, gross insubordination, or receipt of any improper rebate or compensation.\n• Misconduct: Willful or intentional misconduct in connection with your duties, or being arrested, charged, or convicted of a criminal offence.\n• Acts of Moral Turpitude: Crimes characterized by baseness or depravity.\n• Sexual Harassment: Being found guilty under Company policy and local laws.\n• Reputational Threats: Any action likely to harm the Company’s reputation.\n• Breach of Contract: Any misconduct or violation of the terms of this contract, including Company policies.\n• Incompetence: Prolonged failure to perform duties effectively, as assessed by the Company.",
    ],
    [
      "Return of Company Property",
      "Employees are required to return all Company property in their possession or control immediately upon termination of employment, regardless of the reason. The Company reserves the right to take necessary actions to protect or recover its property.",
    ],
    [
      "Recreational, Social or Athletic Disclaimer Notice",
      "Your employer and its insurance provider will not be responsible for any compensation or benefits for injuries sustained during your voluntary participation in off-duty recreational, social, or athletic activities.",
    ],
    [
      "Code of Ethics Policy",
      "The integrity of the Company is its most valuable asset, closely tied to the behaviour of its employees. All employees are expected to fully commit their efforts and attention to their roles, exercise sound judgment, uphold high ethical standards, and steer clear of situations that could create an actual or potential conflict between their personal interests and those of the Company.",
    ],
    [
      "Non-Disclosure",
      "During your employment with the Company, you may gain access to certain “Confidential Information.” You agree to maintain strict confidentiality at all times; use it solely for fulfilling authorized tasks; refrain from unauthorized disclosure; return all information upon conclusion of employment; and permanently destroy copies upon termination.",
    ],
    [
      "Non-Compete Agreement",
      "The Employee agrees that for a period of four (4) months following the termination or expiration of this agreement (the “Non-Compete Period”), they will not, either directly or indirectly, engage in any employment or activity with any company, association, firm, or individual within India that competes, or is likely to compete, with the Company’s business.",
    ],
    [
      "Non-Solicitation Agreement",
      "During the term of this agreement and for a period of four (4) months following its termination or expiration, you agree not to induce or attempt to induce any employee of Grow More Solutions to terminate employment; interfere with employee relationships; hire former employees; or solicit any customer of the Company.",
    ],
    [
      "Intellectual Property",
      "All work products created during your employment shall be considered “works made for hire” under applicable copyright laws. You irrevocably assign all worldwide rights, title, and interest in such work product to Grow More Solutions and its affiliates.",
    ],
  ];

  for (const [secTitle, secText] of annexureSections) {
    drawHeading(secTitle, 9.2);
    drawParagraph(secText, 8.2);
  }

  ensureSpace(75);
  drawParagraph(
    "“We sincerely hope you have a rewarding experience with us and that you grow in your role.”\nKindly confirm your acceptance by signing below.",
    8.2,
    timesBold,
    rgb(0.05, 0.15, 0.35)
  );
  cursorY -= 4;

  ensureSpace(40);
  currentPage.drawText("Employee Signature: _______________________", {
    x: margin,
    y: cursorY,
    size: 8.2,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  currentPage.drawText("HR Authorized Signatory: _______________________", {
    x: a4Width - margin - 200,
    y: cursorY,
    size: 8.2,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 13;
  currentPage.drawText(`Date: ${offerDate}`, {
    x: margin,
    y: cursorY,
    size: 8.2,
    font: timesRoman,
    color: rgb(0, 0, 0),
  });
  currentPage.drawText(`Date: ${offerDate}`, {
    x: a4Width - margin - 200,
    y: cursorY,
    size: 8.2,
    font: timesRoman,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
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
    probationPeriod = "four (4) months",
    ojtDays = "10 working days",
    postProbationCtc = "",
    includePostProbationCtc = false,
  } = details;

  const templateName =
    letterType === "full_time"
      ? "GrowMore_Offer_Letter_Full_Time.docx"
      : "GrowMore_Offer_Letter_Intern.docx";

  const templatePathCandidates = [
    path.join(__dirname, "templates", templateName),
    path.join(
      __dirname,
      "templates",
      letterType === "full_time"
        ? "WhiteDart_Offer_Letter_Full_Time.docx"
        : "WhiteDart_Offer_Letter_Intern.docx"
    ),
  ];
  const templatePath = templatePathCandidates.find((p) => fs.existsSync(p));
  if (!templatePath) {
    throw new Error(`Template file ${templateName} not found`);
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
    const probation = probationPeriod || "four (4) months";

    xml = xml.replace(/\[15,000\]/g, xmlEscape(fixed));
    xml = xml.replace(/\[10,000\]/g, xmlEscape(inc));
    xml = xml.replace(
      /\[target to be confirmed by management\]/g,
      xmlEscape(target)
    );
    xml = xml.replace(/three \(3\) months of probation/g, xmlEscape(`${probation} of probation`));
    xml = xml.replace(/3-Month Probation period/g, xmlEscape("4-Month Probation period"));
    xml = xml.replace(/six \(6\) months/g, xmlEscape(probation));
    xml = xml.replace(/six \(4\) months/g, xmlEscape(probation));

    if (designation && designation !== "Business Development Associate") {
      xml = xml.replace(/Business Development Associate/g, xmlEscape(designation));
    }

    if ((postProbationCtc || includePostProbationCtc) && postProbationCtc) {
      const oldSnippet = `After 10 working days of OJT, you will be working on probation for the aforesaid period. Your total compensation will be INR ${fixed} per month + INR ${inc} performance-based incentive. All benefits and allowances will be governed as per company policy.`;
      const newSnippet = `After 10 working days of OJT, during the probationary period of ${probation}, your monthly compensation will be INR ${fixed} (Fixed Base) + INR ${inc} performance-based incentive. Upon successful completion of the ${probation} probation period, subject to satisfactory performance evaluation, target achievements, and management discretion, you may be considered for an annual compensation package of up to ${postProbationCtc}. All benefits and allowances will be governed as per company policy.`;
      if (xml.includes(oldSnippet)) {
        xml = xml.replace(oldSnippet, xmlEscape(newSnippet));
      } else {
        xml = xml.replace(
          /Your total compensation will be INR [^.]+ performance-based incentive\. All benefits and allowances will be governed as per company policy\./,
          xmlEscape(newSnippet)
        );
      }
    }
  }

  // Remove highlight tags
  xml = xml.replace(/<w:highlight[^>]*\/>/g, "");

  zip.file("word/document.xml", xml);
  return await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

// ─────────────────────────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────────────────────────

// Status check: shows if Gmail is configured
app.get("/api/config-status", (req, res) => {
  const emailUser = (
    process.env.EMAIL_USER ||
    process.env.GMAIL_USER ||
    process.env.SMTP_HR_EMAIL ||
    ""
  ).trim();

  const emailPass = (
    process.env.EMAIL_PASS ||
    process.env.GMAIL_PASS ||
    process.env.SMTP_HR_PASS ||
    ""
  ).trim();

  const configured = Boolean(emailUser && emailPass);
  let masked = "";
  if (configured) {
    const parts = emailUser.split("@");
    if (parts.length === 2) {
      const userPart = parts[0];
      const maskedUser =
        userPart.length > 3
          ? userPart.slice(0, 2) + "***" + userPart.slice(-1)
          : userPart + "***";
      masked = `${maskedUser}@${parts[1]}`;
    } else {
      masked = emailUser;
    }
  }

  res.json({
    emailConfigured: configured,
    emailUser: masked,
    company: "Grow More Solutions",
    phone: "+91 88923 30514",
    website: "https://www.growmoresolutions.net/#home",
    letterheadReady: fs.existsSync(path.join(__dirname, "letterhead_a4.png")),
  });
});

// Download PDF
app.post("/api/download-pdf", async (req, res) => {
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
});

// Download DOCX
app.post("/api/download-docx", async (req, res) => {
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
});

// Send Offer Letter Email
app.post("/api/send-offer-letter", async (req, res) => {
  try {
    const details = req.body;
    const {
      candidateName,
      candidateEmail,
      candidatePhone = "",
      letterType = "intern",
      designation = letterType === "full_time"
        ? "Business Development Associate"
        : "Business Development Intern",
      department = "Inside Sales",
      offerDate = "",
      dateOfJoining = "",
      fixedCompensation = letterType === "full_time" ? "15,000" : "12,500",
      incentive = "10,000",
      postProbationCtc = "",
      includePostProbationCtc = false,
      ccEmail = process.env.CC_EMAIL || "hr@growmoresolutions.net",
      customNotes = "",
      sentBy = "Grow More HR Team",
    } = details;

    if (!candidateName || !candidateEmail) {
      return res.status(400).json({
        success: false,
        error: "Candidate Name and Email are required.",
      });
    }

    const transporter = getTransporter();
    if (!transporter) {
      return res.status(500).json({
        success: false,
        error:
          "Gmail is not configured yet. Please open the .env file in the whitedathr folder and set EMAIL_USER (your Gmail) and EMAIL_PASS (your 16-character Google App Password).",
      });
    }

    // 1. Generate PDF buffer
    const pdfBuffer = await generateOfferLetterPDFBuffer(details);
    const pdfFilename = getSafeFilename(candidateName, "pdf");

    const effectiveSubject =
      details.emailSubject ||
      `Offer Letter - ${candidateName} - ${designation} | Grow More Solutions`;

    const typeLabel =
      letterType === "full_time" ? "Full Time Employment" : "Internship";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: linear-gradient(135deg, #0b1e36 0%, #16a34a 100%); color: #ffffff; padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0 0 6px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 0; font-size: 13px; opacity: 0.9; color: #bbf7d0; }
          .content { padding: 30px 24px; line-height: 1.6; font-size: 14px; }
          .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
          .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 20px 0; }
          .card-row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px dashed #e2e8f0; font-size: 13px; }
          .card-row:last-child { border-bottom: none; }
          .card-label { font-weight: 600; color: #64748b; }
          .card-value { font-weight: 700; color: #0f172a; text-align: right; }
          .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 800; border-radius: 9999px; background: #dcfce7; color: #166534; }
          .custom-notes { background-color: #fefce8; border-left: 4px solid #facc15; padding: 12px 16px; margin: 18px 0; border-radius: 4px; font-size: 13px; color: #713f12; }
          .action-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; color: #166534; }
          .footer { background-color: #f1f5f9; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GROW MORE SOLUTIONS</h1>
            <p>Official Offer of Employment • Accelerating Growth & Success</p>
          </div>
          <div class="content">
            <div class="greeting">Dear ${candidateName},</div>
            <p>
              We are pleased to extend this formal offer of engagement for the position of 
              <strong>${designation}</strong> with <strong>Grow More Solutions</strong>.
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
                <span class="card-value">${designation}</span>
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
              ${
                letterType === "full_time" &&
                (postProbationCtc || includePostProbationCtc) &&
                postProbationCtc
                  ? `
              <div class="card-row">
                <span class="card-label">Probation Remuneration:</span>
                <span class="card-value">INR ${fixedCompensation} / mo (Fixed Base) + INR ${incentive} Incentive</span>
              </div>
              <div class="card-row">
                <span class="card-label">Annual CTC:</span>
                <span class="card-value" style="color: #2563eb; font-size: 14px;"><strong>Up to ${postProbationCtc}</strong> (Subject to review post-probation)</span>
              </div>
              `
                  : `
              <div class="card-row">
                <span class="card-label">Compensation:</span>
                <span class="card-value">INR ${fixedCompensation} / month + INR ${incentive} Incentive</span>
              </div>
              `
              }
            </div>

            ${
              customNotes
                ? `<div class="custom-notes"><strong>Note from HR:</strong><br/>${customNotes.replace(
                    /\n/g,
                    "<br/>"
                  )}</div>`
                : ""
            }

            <div class="action-box">
              <strong>Next Steps:</strong>
              <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                <li>Please review the attached official Offer Letter document (<strong>${pdfFilename}</strong>).</li>
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
              Grow More Solutions<br/>
              <span style="color: #64748b; font-size: 12px;">5th floor, Primehub Building, JP Nagar 2nd Phase, Bengaluru – 560041</span>
            </p>
          </div>

          <div class="footer">
            This is an official communication from Grow More HR Portal. Contact us at hr@growmoresolutions.net or +91 88923 30514 for any questions.
          </div>
        </div>
      </body>
      </html>
    `;

    const senderEmail =
      process.env.EMAIL_USER ||
      process.env.GMAIL_USER ||
      process.env.SMTP_HR_EMAIL ||
      "hr@growmoresolutions.net";

    const mailOptions = {
      from: `"Grow More HR Team" <${senderEmail}>`,
      replyTo: senderEmail,
      to: candidateEmail,
      cc: ccEmail || undefined,
      subject: effectiveSubject,
      html: emailHtml,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Offer letter email sent successfully:", info.response);

    // Save in local sent history
    const record = {
      id: "gm_" + Date.now(),
      sentAt: new Date().toISOString(),
      candidateName,
      candidateEmail,
      candidatePhone,
      letterType,
      designation,
      department,
      offerDate,
      dateOfJoining,
      fixedCompensation,
      incentive,
      postProbationCtc: isFullTimeWithLpa ? postProbationCtc : "",
      emailSubject: effectiveSubject,
      sentBy,
      status: "Delivered",
      messageId: info.messageId,
    };

    const history = readHistory();
    history.unshift(record);
    writeHistory(history.slice(0, 200)); // retain last 200 items

    res.status(200).json({
      success: true,
      message: `Offer letter successfully sent to ${candidateEmail}`,
      record,
    });
  } catch (error) {
    console.error("Error sending offer letter email:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to dispatch email",
    });
  }
});

// History Endpoints
app.get("/api/history", (req, res) => {
  res.json(readHistory());
});

app.delete("/api/history/:id", (req, res) => {
  const { id } = req.params;
  const history = readHistory().filter((item) => item.id !== id);
  writeHistory(history);
  res.json({ success: true });
});

// Serve frontend if built
const clientDist = path.join(__dirname, "client", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` Grow More Solutions HR Offer Letter Portal Server`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`===============================================`);
});
