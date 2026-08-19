import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { siteConfig } from '@/config/site';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const contactRecipient = process.env.CONTACT_EMAIL || siteConfig.contact.email;
    const selectedService = service || 'Web Hosting';

    // Send email using Resend if key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
      console.log(`[Contact Form Demo] From: ${name} <${email}> (${selectedService}): ${message}`);
      return NextResponse.json({ success: true, note: 'Demo mode submission logged.' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Srushti Hosting <onboarding@resend.dev>',
      to: [contactRecipient],
      replyTo: email,
      subject: `New ${selectedService} Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F0F0F;">
          <h2 style="color: #C81E1E;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Interested Service:</strong> ${selectedService}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #FAFAFA; border-left: 4px solid #C81E1E; padding: 12px; margin: 0;">
            ${message.replace(/\n/g, '<br/>')}
          </blockquote>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
