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
      subject: `New Inquiry from ${name} - ${selectedService}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF5F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F2937;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFF5F5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Light Container Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #FEE2E2; box-shadow: 0 4px 16px rgba(200, 30, 30, 0.06); overflow: hidden;">
          
          <!-- Light Red Header Bar -->
          <tr>
            <td style="background-color: #FEF2F2; padding: 24px 32px; border-bottom: 2px solid #FCA5A5;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #C81E1E; font-size: 22px; font-weight: 800;">
                      Srushti Hosting
                    </h1>
                    <p style="margin: 4px 0 0 0; color: #991B1B; font-size: 13px; font-weight: 600;">
                      New Contact Form Inquiry
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 28px 32px;">
              <!-- Details Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #1F2937; font-weight: 700;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #C81E1E; font-weight: 700; text-decoration: none;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C81E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 4px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Phone:</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${cleanPhoneDigits}" style="color: #C81E1E; font-weight: 700; text-decoration: none;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C81E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 4px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      ${phoneFormatted}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Service:</td>
                  <td style="padding: 8px 0; color: #1F2937; font-weight: 700;">${selectedService}</td>
                </tr>
              </table>

              <!-- Message Box -->
              <p style="margin: 16px 0 8px 0; font-size: 13px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Message:</p>
              <div style="background-color: #FFF5F5; border-left: 4px solid #C81E1E; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #374151; margin-bottom: 24px; word-break: break-word;">
                ${message.replace(/\n/g, '<br/>')}
              </div>

              <!-- Reply Action Button -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left">
                    <a href="mailto:${email}" style="display: inline-block; background-color: #C81E1E; color: #FFFFFF; font-weight: 700; font-size: 14px; padding: 12px 22px; border-radius: 8px; text-decoration: none;">
                      Reply to ${name.split(' ')[0]}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Light Footer -->
          <tr>
            <td style="background-color: #FAFAFA; padding: 16px 32px; border-top: 1px solid #F3F4F6; text-align: center; color: #9CA3AF; font-size: 12px;">
              Sent from Srushti Hosting contact form &bull; ${formattedDate}
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

