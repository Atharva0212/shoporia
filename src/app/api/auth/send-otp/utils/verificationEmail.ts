export function generateVerificationEmail(otp:string){
    const subject="Your Shoporia Verification Code"
    const html=`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #f8f9fa;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #f8f9fa; padding: 40px 20px"
    >
      <tr>
        <td align="center">
          <!-- Main Container -->
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              padding: 24px;
            "
          >
            <!-- Header with Logo -->
            <tr>

              <!-- Brand Name -->
              <td
                align="center"
                valign="middle"
                style="
                  font-size: 20px;
                  font-weight: 700;
                  color: #1a1d2e;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    sans-serif;
                "
              >
                Shoporia
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 40px">
                <h2
                  style="
                    margin: 0 0 16px;
                    color: #1a1d2e;
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                  "
                >
                  Verify Your Email
                </h2>
                <p
                  style="
                    margin: 0 0 24px;
                    color: #6c757d;
                    font-size: 16px;
                    line-height: 1.6;
                    text-align: center;
                  "
                >
                  Enter this code to complete your sign-in:
                </p>

                <!-- OTP Code Box -->
                <div
                  style="
                    background-color: #f8f9fa;
                    border: 2px solid #e9ecef;
                    border-radius: 12px;
                    padding: 24px;
                    text-align: center;
                    margin: 32px 0;
                  "
                >
                  <div
                    style="
                      font-size: 40px;
                      font-weight: bold;
                      letter-spacing: 8px;
                      color: #1a1d2e;
                      font-family: 'Courier New', monospace;
                    "
                  >
                    ${otp}
                  </div>
                </div>

                <p
                  style="
                    margin: 24px 0 8px;
                    color: #6c757d;
                    font-size: 14px;
                    line-height: 1.6;
                    text-align: center;
                  "
                >
                  This code will expire in
                  <strong style="color: #1a1d2e">5 minutes</strong>
                </p>
                <p
                  style="
                    margin: 0;
                    color: #6c757d;
                    font-size: 14px;
                    line-height: 1.6;
                    text-align: center;
                  "
                >
                  If you didn't request this code, please ignore this email.
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding: 0 40px">
                <div style="border-top: 1px solid #e9ecef"></div>
              </td>
            </tr>

            <!-- Security Notice -->
            <tr>
              <td style="padding: 32px 40px">
                <div
                  style="
                    background-color: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 16px;
                    border-radius: 8px;
                  "
                >
                  <p
                    style="
                      margin: 0;
                      color: #856404;
                      font-size: 14px;
                      line-height: 1.6;
                    "
                  >
                    <strong>Security Tip:</strong> Never share this code with
                    anyone. BuiltBolt will never ask for your verification code.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background-color: #f8f9fa;
                  padding: 32px 40px;
                  text-align: center;
                "
              >
                <p style="margin: 0 0 16px; color: #6c757d; font-size: 14px">
                  Need help? Contact us at
                  <a
                    href="mailto:atharvagajakos92@gmail.com"
                    style="
                      color: #1a1d2e;
                      text-decoration: none;
                      font-weight: 600;
                    "
                    >support@builtbolt.com</a
                  >
                </p>
                <p style="margin: 0 0 8px; color: #adb5bd; font-size: 12px">
                  © 2025 Shoporia. All rights reserved.
                </p>
                <p style="margin: 0; color: #adb5bd; font-size: 12px">
                  Mumbai, Maharashtra, India
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

     `
    return{subject,html}
}