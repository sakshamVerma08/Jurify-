export function getOTPTemplate(otp: string, firstName: string): string {
  const year = new Date().getFullYear();

  // Helper function to generate individual OTP digit cells
  const generateOTPDigits = (code: string) => {
    return code
      .split("")
      .map(
        (digit) => `
        <td class="otp-cell" align="center" valign="middle" style="
          width: 48px;
          height: 62px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 30px;
          font-weight: 600;
          color: #F5F0EA;
          line-height: 62px;
        ">
          ${digit}
        </td>
        <td width="8" style="font-size:0;line-height:0;">&nbsp;</td>
      `
      )
      .join("");
  };

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <title>Your Jurify Verification Code</title>
 
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
 
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
 
    @media (prefers-color-scheme: dark) {
      .email-body    { background-color: #080808 !important; }
      .email-wrapper { background-color: #080808 !important; }
    }
 
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .fluid           { max-width: 100% !important; height: auto !important; }
      .email-padding   { padding-left: 20px !important; padding-right: 20px !important; }
      .otp-cell        { font-size: 26px !important; width: 40px !important; height: 52px !important; line-height: 52px !important; }
      .heading         { font-size: 28px !important; }
    }
  </style>
</head>
 
<body class="email-body" style="
  margin: 0;
  padding: 0;
  background-color: #0a0a09;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
">
 
<table class="email-wrapper" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a09;">
<tr>
<td align="center" style="padding: 40px 12px;">
 
  <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="580" style="max-width: 580px; width: 100%;">
 
    <!-- LOGO -->
    <tr>
      <td align="center" style="padding-bottom: 28px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td
              align="center"
              valign="middle"
              style="
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, rgba(212,133,58,0.22), rgba(200,98,42,0.1));
                border: 1.5px solid rgba(212,133,58,0.55);
                border-radius: 11px;
              "
            >
              <img src="https://res.cloudinary.com/dbhy7xp5v/image/upload/q_auto/f_auto/v1781261103/logo_1_jlug70.png" width="24" height="24" alt="Jurify" />
            </td>
            <td width="10"></td>
            <td valign="middle">
              <span style="
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 26px;
                font-weight: 600;
                color: #F5F0EA;
                letter-spacing: 0.4px;
                line-height: 1;
              ">Jurify</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
 
    <!-- MAIN CARD -->
    <tr>
      <td style="
        background-color: #0e0d0b;
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 20px;
        overflow: hidden;
      ">
 
        <!-- Gold top accent -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td height="3" style="
              background: linear-gradient(90deg, #C8622A 0%, #D4853A 40%, #E8A44A 70%, rgba(232,164,74,0.3) 100%);
              font-size: 0; line-height: 0;
            ">&nbsp;</td>
          </tr>
        </table>
 
        <!-- Card body -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td class="email-padding" style="padding: 44px 48px 40px;">
 
              <!-- Shield icon -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" valign="middle" style="
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, rgba(212,133,58,0.14), rgba(200,98,42,0.06));
                    border: 1.5px solid rgba(212,133,58,0.3);
                    border-radius: 18px;
                  ">
                    <img src="https://res.cloudinary.com/dbhy7xp5v/image/upload/q_auto/f_auto/v1781261112/shield_1_xctksv.png" width="30" height="30" alt="" />
                  </td>
                </tr>
              </table>
 
              <!-- Spacer -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td height="24" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
              </table>
 
              <!-- Heading -->
              <h1 class="heading" style="
                margin: 0 0 10px 0;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 34px;
                font-weight: 300;
                line-height: 1.1;
                letter-spacing: -0.8px;
                color: #F5F0EA;
              ">
                Verify your <span style="font-style: italic; color: #E8A44A;">identity</span>
              </h1>
 
              <!-- Subheading -->
              <p style="
                margin: 0 0 32px 0;
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
                color: rgba(245,240,234,0.52);
              ">
                Hello <strong style="color: rgba(245,240,234,0.8); font-weight: 500;">${firstName}</strong>, use the verification code below to
                complete your Jurify account setup. This code is valid for
                <strong style="color: rgba(245,240,234,0.72); font-weight: 500;">5 minutes</strong>.
              </p>
 
              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td height="1" style="
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
                    font-size: 0; line-height: 0;
                  ">&nbsp;</td>
                </tr>
              </table>
 
              <!-- Spacer -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td height="32" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
              </table>
 
              <!-- OTP label -->
              <p style="
                margin: 0 0 16px 0;
                font-size: 11px;
                font-weight: 500;
                letter-spacing: 1.8px;
                text-transform: uppercase;
                color: rgba(245,240,234,0.3);
              ">Your verification code</p>
 
              <!-- OTP digits -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="8" style="font-size:0;line-height:0;">&nbsp;</td>
                  ${generateOTPDigits(otp)}
                </tr>
              </table>
 
              <!-- Spacer -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td height="32" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
              </table>
 
              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td height="1" style="
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
                    font-size: 0; line-height: 0;
                  ">&nbsp;</td>
                </tr>
              </table>
 
              <!-- Spacer -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td height="28" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
              </table>
 
              <!-- Expiry notice -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td valign="middle" style="
                    background: rgba(240,180,60,0.07);
                    border: 1px solid rgba(240,180,60,0.18);
                    border-radius: 9px;
                    padding: 12px 18px;
                  ">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="middle" style="
                          font-size: 18px;
                          padding-right: 10px;
                          line-height: 1;
                          color: rgba(240,200,80,0.85);
                        ">⏱</td>
                        <td valign="middle">
                          <span style="
                            font-size: 13px;
                            color: rgba(240,200,80,0.85);
                            font-weight: 400;
                            line-height: 1;
                          ">
                            Code expires in <strong style="font-weight: 600;">5 minutes</strong> from when this email was sent
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
 
              <!-- Spacer -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td height="28" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
              </table>
 
              <!-- Security notice -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 10px;
                    padding: 16px 18px;
                  ">
                    <p style="
                      margin: 0;
                      font-size: 12.5px;
                      line-height: 1.65;
                      color: rgba(245,240,234,0.38);
                    ">
                      <strong style="color: rgba(245,240,234,0.55); font-weight: 500;">Didn't request this?</strong>
                      If you did not attempt to sign up for Jurify, you can safely ignore this email.
                      Your account remains secure. Never share this code with anyone &mdash;
                      Jurify will never ask for your OTP over phone or email.
                    </p>
                  </td>
                </tr>
              </table>
 
            </td>
          </tr>
        </table>
 
      </td>
    </tr>
 
    <!-- Spacer -->
    <tr><td height="24" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
 
    <!-- FOOTER -->
    <tr>
      <td align="center" class="email-padding" style="padding: 0 24px;">
 
        <!-- Footer divider -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td height="1" style="background: rgba(255,255,255,0.06); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>
        </table>
 
        <!-- Spacer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr><td height="24" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
        </table>
 
        <!-- Footer links -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td>
              <a href="https://jurify.in/privacy" style="font-size: 12px; color: rgba(245,240,234,0.28); text-decoration: none;">Privacy Policy</a>
            </td>
            <td style="padding: 0 12px;">
              <span style="color: rgba(255,255,255,0.12); font-size: 12px;">&middot;</span>
            </td>
            <td>
              <a href="https://jurify.in/terms" style="font-size: 12px; color: rgba(245,240,234,0.28); text-decoration: none;">Terms of Service</a>
            </td>
            <td style="padding: 0 12px;">
              <span style="color: rgba(255,255,255,0.12); font-size: 12px;">&middot;</span>
            </td>
            <td>
              <a href="https://jurify.in/help" style="font-size: 12px; color: rgba(245,240,234,0.28); text-decoration: none;">Help Centre</a>
            </td>
          </tr>
        </table>
 
        <!-- Spacer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr><td height="14" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
        </table>
 
        <!-- Copyright -->
        <p style="
          margin: 0;
          font-size: 11.5px;
          color: rgba(245,240,234,0.2);
          line-height: 1.6;
          text-align: center;
        ">
          &copy; ${year} Jurify Technologies Pvt. Ltd. &middot; Built for legal accessibility<br />
          <span style="font-size: 11px;">This is an automated security email. Please do not reply.</span>
        </p>
 
        <!-- Spacer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr><td height="32" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
        </table>
 
      </td>
    </tr>
 
  </table>
</td>
</tr>
</table>
 
</body>
</html>`;
}
