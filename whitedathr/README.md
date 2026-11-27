# White Dart HR Offer Letter Portal
> **Your Trust Our Responsibility** • Public, Standalone HR Offer Letter Generator & Email Dispatcher

This portal allows HR teams and managers to customize, generate official A4 letterhead offer letters, download high-resolution PDFs and DOCX documents, and deliver them directly to candidates' inboxes via Gmail SMTP.

---

## 🌟 Key Features

1. **No Authentication Required (Public Link Sharing)**
   - Open and share the portal URL directly with anyone on the team.
   - Zero login or password barrier on the landing page.

2. **Official White Dart A4 Letterhead**
   - High-resolution A4 letterhead (`letterhead_a4.png`) embedded on every page of generated PDFs.
   - Interactive on-screen A4 sheet preview with realistic paper rendering and exact document fidelity.

3. **Complete Accenlearn Template Fidelity**
   - **Internship**: 4-Month duration, 10-day unpaid OJT, INR 12,500 base + INR 10,000 performance incentive.
   - **Full Time**: 4-Month probation, INR 15,000 base + INR 10,000 incentive, post-probation package up to 4.0 LPA.
   - Full legal clauses: Working Hours, Code of Ethics, Non-Disclosure, Non-Compete (4 months), Non-Solicitation (4 months), Intellectual Property, Annexure-A.

4. **Multi-Format Export & Emailing**
   - 📄 **Download PDF**: Formatted with White Dart letterhead.
   - 📝 **Download DOCX**: Microsoft Word format customized for candidate.
   - 🚀 **Send via Gmail**: Dispatches an executive HTML email with the PDF attached directly to the candidate.
   - 📋 **Sent History**: Persists all generated offer letters locally in `sent_history.json`.

---

## 🚀 How to Run

### Method 1: One-Click Launch (Windows)
Double-click `start.bat` in the `whitedathr` folder. It will start the server and automatically launch `http://localhost:5000` in your browser.

### Method 2: Command Line
Open a terminal inside this `whitedathr` folder and run:
```bash
npm start
```
Then open [http://localhost:5000](http://localhost:5000) in your browser.

---

## 📧 How to Connect Gmail in `.env`

To enable direct email sending:

1. Open `whitedathr/.env` in any text editor.
2. Enter your Gmail address:
   ```env
   EMAIL_USER=your_email@gmail.com
   ```
3. Enter your **16-character Google App Password** (NOT your normal Gmail password):
   ```env
   EMAIL_PASS=abcd efgh ijkl mnop
   ```

### How to generate a Google App Password:
1. Go to your [Google Account Security](https://myaccount.google.com/security).
2. Under "How you sign in to Google", enable **2-Step Verification** if not already active.
3. Search or navigate to [App Passwords](https://myaccount.google.com/apppasswords).
4. Enter an app name like `WhiteDart HR` and click **Create**.
5. Copy the 16-letter code and paste it into `EMAIL_PASS` in `.env`.

> **Note**: Even if Gmail is not connected yet, **PDF and DOCX downloading always work 100%**!

---

## 📂 Project Structure

```
whitedathr/
├── .env                       # Gmail credentials & server configuration
├── .env.example               # Example template for .env
├── server.js                  # Express backend (PDF, DOCX generation & Nodemailer dispatch)
├── package.json               # Node.js dependencies & scripts
├── start.bat                  # One-click Windows launch script
├── image.png                  # Original White Dart logo
├── letterhead_a4.png          # Generated high-resolution A4 letterhead
├── generate_letterhead.py     # Script that compiles the A4 letterhead image
├── sent_history.json          # Local persistence of sent offer letters
├── templates/
│   ├── WhiteDart_Offer_Letter_Intern.docx
│   └── WhiteDart_Offer_Letter_Full_Time.docx
└── client/                    # React + Vite frontend
    ├── dist/                  # Pre-built production bundle (served at localhost:5000)
    ├── src/
    │   ├── App.jsx            # Main portal interface (Form, A4 Preview, History)
    │   ├── main.jsx
    │   └── index.css
    └── vite.config.js
```
