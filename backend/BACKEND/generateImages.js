const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // A4 size in pixels at 96 DPI
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const logoBase64 = fs.readFileSync('e:/acc/accenlearn-website-main/src/assets/logo.png', 'base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  const htmlTemplate = (isBackPage) => `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Great+Vibes&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            width: 794px;
            height: 1123px;
            background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
            font-family: 'Montserrat', sans-serif;
            position: relative;
            box-sizing: border-box;
          }
          
          /* Black accents */
          .header-bar {
            background-color: #111;
            height: 150px;
            width: 100%;
            border-bottom: 5px solid #00acc1;
            display: flex;
            align-items: center;
            padding-left: 50px;
            box-sizing: border-box;
          }
          
          .footer-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #111;
            height: 60px;
            width: 100%;
            border-top: 5px solid #00acc1;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            letter-spacing: 2px;
          }

          .logo {
            max-height: 80px;
          }
          
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            color: rgba(0, 0, 0, 0.03);
            font-weight: 700;
            white-space: nowrap;
            pointer-events: none;
          }

          /* Seal and Signature container */
          .auth-section {
            position: absolute;
            bottom: 120px;
            right: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* Signature */
          .signature {
            font-family: 'Great Vibes', cursive;
            font-size: 40px;
            color: #111;
            margin-bottom: 10px;
            transform: rotate(-5deg);
          }
          
          .signature-line {
            width: 200px;
            height: 2px;
            background-color: #111;
            margin-bottom: 5px;
          }
          
          .signature-title {
            font-size: 14px;
            font-weight: 700;
            color: #111;
            margin-bottom: 30px;
          }

          /* Accenlearn Seal */
          .seal {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            border: 4px dashed #111;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .seal-inner {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 2px solid #111;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .seal-text-top {
            font-weight: 700;
            font-size: 13px;
            color: #111;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          .seal-text-mid {
            font-size: 11px;
            font-weight: 700;
            color: #00acc1;
            text-transform: uppercase;
            border-top: 1px solid #111;
            border-bottom: 1px solid #111;
            padding: 4px 0;
            margin: 5px 0;
            width: 90%;
          }
          .seal-text-bot {
            font-weight: 700;
            font-size: 13px;
            color: #111;
            letter-spacing: 1px;
          }
          
          /* Add some skyblue gradients to the seal */
          .seal::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 50%;
            background: rgba(0, 172, 193, 0.1);
            z-index: -1;
          }
        </style>
      </head>
      <body>
        <div class="header-bar">
          <img src="${logoSrc}" class="logo" />
        </div>
        
        <div class="watermark">ACCENLEARN</div>

        ${isBackPage ? `
          <div class="auth-section">
            <div class="signature">Accenlearn</div>
            <div class="signature-line"></div>
            <div class="signature-title">Authorized Signatory</div>
            
            <div class="seal">
              <div class="seal-inner">
                <div class="seal-text-top">ACCENLEARN</div>
                <div class="seal-text-mid">Auth. Signatory</div>
                <div class="seal-text-bot">BENGALURU</div>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="footer-bar">
          WWW.ACCENLEARN.COM | CONFIDENTIAL
        </div>
      </body>
    </html>
  `;

  // Generate offer.jpg (Front page)
  await page.setContent(htmlTemplate(false), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'controllers', 'offer.jpg'), type: 'jpeg', quality: 90 });
  
  // Generate offerback.jpg (Back page with seal)
  await page.setContent(htmlTemplate(true), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'controllers', 'offerback.jpg'), type: 'jpeg', quality: 90 });

  await browser.close();
})();
