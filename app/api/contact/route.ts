import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { siteConfig } from '@/config/site';
import { validateContactForm } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Strict validation and anti-spam checks
    const validation = validateContactForm(body);

    // If honeypot or fast bot submission detected, pretend success without sending email
    if (validation.isSpamBot) {
      console.warn('[Contact API Anti-Spam] Bot submission silently dropped:', body.email || body.name);
      return NextResponse.json({ success: true, note: 'Submission received.' });
    }

    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Form validation failed. Please check your inputs.',
          fieldErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, service, message } = body;
    const phoneFormatted = validation.formattedPhone || body.phone;
    const contactRecipient = process.env.CONTACT_EMAIL || siteConfig.contact.email;
    const selectedService = service || 'Web Hosting';

    // Send email using Resend if key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
      console.log(
        `[Contact Form Submission] From: ${name} <${email}> | Phone: ${phoneFormatted} | Service: ${selectedService}\nMessage: ${message}`
      );
      return NextResponse.json({ success: true, note: 'Demo mode submission logged.' });
    }

    const formattedDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const cleanPhoneDigits = phoneFormatted.replace(/[^\d+]/g, '');

    const { data, error } = await resend.emails.send({
      from: 'Srushti Hosting <onboarding@resend.dev>',
      to: [contactRecipient],
      replyTo: email,
      subject: `[New Inquiry] ${selectedService} - ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Inquiry - Srushti Hosting</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F4F5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E4E4E7; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
          
          <!-- Corporate Header -->
          <tr>
            <td style="background-color: #0F0F0F; padding: 32px 36px; border-top: 5px solid #C81E1E;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 900; tracking-tight: -0.5px;">
                      SRUSHTI<span style="color: #C81E1E;">.</span>HOSTING
                    </h1>
                    <p style="margin: 4px 0 0 0; color: #A1A1AA; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                      Enterprise Hosting & Cloud Solutions
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <span style="background-color: #C81E1E; color: #FFFFFF; font-size: 10px; font-weight: 800; padding: 6px 12px; border-radius: 20px; letter-spacing: 1px; text-transform: uppercase;">
                      NEW INQUIRY
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notice Sub-Bar -->
          <tr>
            <td style="background-color: #FAFAFA; padding: 14px 36px; border-bottom: 1px solid #E4E4E7;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 12px; color: #71717A;">
                    <strong style="color: #18181B;">Received:</strong> ${formattedDate} (IST)
                  </td>
                  <td align="right" style="font-size: 12px; color: #71717A;">
                    <strong style="color: #18181B;">Status:</strong> <span style="color: #16A34A; font-weight: 700;">● Pending Action</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding: 32px 36px;">
              <h2 style="margin: 0 0 20px 0; color: #0F0F0F; font-size: 18px; font-weight: 800; tracking-tight: -0.3px;">
                Client Contact Details
              </h2>

              <!-- Details Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #E4E4E7; border-radius: 12px; overflow: hidden; font-size: 14px; margin-bottom: 28px;">
                <tr style="border-bottom: 1px solid #F1F5F9; background-color: #FFFFFF;">
                  <td style="padding: 14px 18px; width: 140px; font-weight: 700; color: #52525B; background-color: #FAFAFA; border-right: 1px solid #F1F5F9;">
                    Full Name
                  </td>
                  <td style="padding: 14px 18px; font-weight: 700; color: #0F0F0F;">
                    ${name}
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9; background-color: #FFFFFF;">
                  <td style="padding: 14px 18px; font-weight: 700; color: #52525B; background-color: #FAFAFA; border-right: 1px solid #F1F5F9;">
                    Email Address
                  </td>
                  <td style="padding: 14px 18px;">
                    <a href="mailto:${email}" style="color: #C81E1E; font-weight: 700; text-decoration: none;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9; background-color: #FFFFFF;">
                  <td style="padding: 14px 18px; font-weight: 700; color: #52525B; background-color: #FAFAFA; border-right: 1px solid #F1F5F9;">
                    Mobile Phone
                  </td>
                  <td style="padding: 14px 18px;">
                    <a href="tel:${cleanPhoneDigits}" style="display: inline-block; background-color: #FEF2F2; color: #991B1B; font-weight: 800; padding: 4px 10px; border-radius: 6px; border: 1px solid #FCA5A5; text-decoration: none;">
                      📞 ${phoneFormatted}
                    </a>
                  </td>
                </tr>
                <tr style="background-color: #FFFFFF;">
                  <td style="padding: 14px 18px; font-weight: 700; color: #52525B; background-color: #FAFAFA; border-right: 1px solid #F1F5F9;">
                    Requested Service
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-block; background-color: #F4F4F5; color: #18181B; font-weight: 700; padding: 4px 12px; border-radius: 6px; font-size: 13px;">
                      ${selectedService}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Client Message Box -->
              <h2 style="margin: 0 0 12px 0; color: #0F0F0F; font-size: 16px; font-weight: 800;">
                Message Content
              </h2>
              <div style="background-color: #F8FAFC; border-left: 4px solid #C81E1E; border-radius: 8px; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 32px; word-break: break-word;">
                ${message.replace(/\n/g, '<br/>')}
              </div>

              <!-- Quick Action Call to Action Buttons -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(selectedService)}%20Inquiry%20-%20Srushti%20Hosting" style="display: inline-block; background-color: #C81E1E; color: #FFFFFF; font-weight: 800; font-size: 14px; padding: 14px 28px; border-radius: 10px; text-decoration: none; margin-right: 10px; box-shadow: 0 2px 8px rgba(200, 30, 30, 0.25);">
                      ✉️ Reply to Client
                    </a>
                    <a href="tel:${cleanPhoneDigits}" style="display: inline-block; background-color: #18181B; color: #FFFFFF; font-weight: 800; font-size: 14px; padding: 14px 28px; border-radius: 10px; text-decoration: none;">
                      📞 Call ${name.split(' ')[0]}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color: #0F0F0F; padding: 28px 36px; border-top: 1px solid #27272A; text-align: center; color: #A1A1AA; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 10px 0; color: #E4E4E7; font-weight: 700;">
                Srushti Hosting Technical Operations Center
              </p>
              <p style="margin: 0 0 14px 0; font-size: 11px; color: #71717A;">
                This automated message was generated by the official Srushti Hosting contact portal. Response target SLA: 2 hours.
              </p>
              <p style="margin: 0; font-size: 11px; color: #A1A1AA;">
                <a href="${siteConfig.url}" style="color: #C81E1E; text-decoration: none; font-weight: 700;">${siteConfig.url.replace('https://', '')}</a> &bull; <a href="mailto:${siteConfig.contact.email}" style="color: #A1A1AA; text-decoration: none;">${siteConfig.contact.email}</a>
              </p>
              <p style="margin: 12px 0 0 0; font-size: 10px; color: #52525B;">
                &copy; ${new Date().getFullYear()} Srushti Hosting. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error.';
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

