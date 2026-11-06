const COMPANY_NAME = "Accenlearn";
const COMPANY_WEBSITE = "www.accenlearn.in";
const COMPANY_SUPPORT_EMAIL = "support@accenlearn.in";
const LOGO_URL = ""; // Text-based branding used instead

// Reusable SVG icons for emails (replacing emojis)
const SVGS = {
    warning: `<img src="https://img.icons8.com/color/48/000000/warning-shield.png" width="24" height="24" alt="Warning" style="vertical-align: middle; margin-right: 8px;"/>`,
    info: `<img src="https://img.icons8.com/color/48/000000/info.png" width="24" height="24" alt="Info" style="vertical-align: middle; margin-right: 8px;"/>`,
    check: `<img src="https://img.icons8.com/color/48/000000/checked-checkbox.png" width="24" height="24" alt="Check" style="vertical-align: middle; margin-right: 8px;"/>`,
    bell: `<img src="https://img.icons8.com/color/48/000000/appointment-reminders.png" width="24" height="24" alt="Reminder" style="vertical-align: middle; margin-right: 8px;"/>`,
    star: `<img src="https://img.icons8.com/color/48/000000/star--v1.png" width="24" height="24" alt="Star" style="vertical-align: middle; margin-right: 8px;"/>`,
    pin: `<img src="https://img.icons8.com/color/48/000000/marker.png" width="24" height="24" alt="Pin" style="vertical-align: middle; margin-right: 8px;"/>`,
    calendar: `<img src="https://img.icons8.com/color/48/000000/calendar.png" width="24" height="24" alt="Date" style="vertical-align: middle; margin-right: 8px;"/>`
};

/**
 * Wraps email content inside a premium, professional Accenlearn template.
 * @param {Object} options
 * @param {string} options.title - The main heading inside the email
 * @param {string} options.content - The HTML content to place in the body
 * @returns {string} Fully formatted HTML string
 */
const buildPremiumEmail = ({ title, content }) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #334155;
            word-break: break-word;
            overflow-wrap: break-word;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        .email-wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 20px;
            box-sizing: border-box;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
            border: 1px solid #e2e8f0;
        }

        .header {
            background-color: #0B0F19;
            padding: 40px 30px;
            text-align: center;
            border-bottom: 4px solid #8b5cf6;
        }

        .header-logo-text {
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 1px;
            display: block;
            margin: 0 auto;
            font-family: 'Inter', -apple-system, sans-serif;
        }

        .header h1 {
            margin: 25px 0 0 0;
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .content {
            padding: 40px 30px;
            background-color: #ffffff;
        }

        .content p {
            margin: 0 0 20px 0;
            font-size: 16px;
            color: #475569;
        }

        .content strong {
            color: #0f172a;
            font-weight: 600;
        }

        .highlight-box {
            word-break: break-word;
            overflow-wrap: break-word;
            word-wrap: break-word;
            background: #f1f5f9;
            border-left: 4px solid #8b5cf6;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }

        .highlight-box.danger {
            border-left-color: #ef4444;
            background: #fef2f2;
        }

        .highlight-box.success {
            border-left-color: #10b981;
            background: #ecfdf5;
        }

        .data-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .data-row:last-child { border-bottom: none; }
        
        .data-label { color: #64748b; font-size: 14px; font-weight: 500; }
        .data-value { color: #0f172a; font-size: 15px; font-weight: 600; text-align: right; }

        .cta-container {
            text-align: center;
            margin: 35px 0;
        }

        .cta-button {
            display: inline-block;
            background: #8b5cf6;
            color: #ffffff !important;
            padding: 16px 36px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.2s;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
        }

        .cta-button.secondary {
            background: #f1f5f9;
            color: #475569 !important;
            box-shadow: none;
            border: 1px solid #cbd5e1;
            margin-left: 10px;
        }

        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }

        .footer p {
            margin: 0 0 10px 0;
            color: #64748b;
            font-size: 13px;
        }

        .footer-links {
            margin-top: 15px;
        }
        
        .footer-links a {
            color: #8b5cf6;
            text-decoration: none;
            margin: 0 10px;
            font-size: 13px;
            font-weight: 500;
        }

        @media only screen and (max-width: 600px) {
            .email-wrapper { padding: 20px 10px; }
            .header { padding: 30px 20px; }
            .content { padding: 30px 20px; }
            .data-row { flex-direction: column; gap: 4px; }
            .data-value { text-align: left; }
            .cta-button { display: block; margin: 10px 0; width: 100%; box-sizing: border-box; }
            .cta-button.secondary { margin-left: 0; }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="container">
            <div class="header">
                <span class="header-logo-text">Accenlearn</span>
                <h1>${title}</h1>
            </div>

            <div class="content">
                ${content}

                <p style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 25px;">
                    <strong>Best Regards,</strong><br>
                    Team ${COMPANY_NAME}<br>
                    <span style="color: #64748b; font-size: 14px;">Innovating for the Future</span>
                </p>
            </div>

            <div class="footer">
                <p>This is an automated message. Please do not reply directly to this email.</p>
                <p>&copy; ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.</p>
                <div class="footer-links">
                    <a href="mailto:${COMPANY_SUPPORT_EMAIL}">Contact Support</a>
                    <a href="https://${COMPANY_WEBSITE}">Visit Website</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = {
    COMPANY_NAME,
    COMPANY_WEBSITE,
    COMPANY_SUPPORT_EMAIL,
    LOGO_URL,
    SVGS,
    buildPremiumEmail
};
