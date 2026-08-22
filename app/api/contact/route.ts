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

    const { data, error } = await resend.emails.send({
      from: 'Srushti Hosting <onboarding@resend.dev>',
      to: [contactRecipient],
      replyTo: email,
      subject: `New ${selectedService} Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #0F0F0F; background-color: #FAFAFA; border-radius: 12px; border: 1px solid #E5E5E5;">
          <h2 style="color: #C81E1E; margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Mobile Phone:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #C81E1E;"><a href="tel:${phoneFormatted.replace(/\s+/g, '')}">${phoneFormatted}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service:</td>
              <td style="padding: 8px 0;">${selectedService}</td>
            </tr>
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: bold; margin-bottom: 6px;">Message:</p>
            <blockquote style="background: #FFFFFF; border-left: 4px solid #C81E1E; padding: 12px; margin: 0; border-radius: 4px; color: #3F3F46;">
              ${message.replace(/\n/g, '<br/>')}
            </blockquote>
          </div>
        </div>
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

