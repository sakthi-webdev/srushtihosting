import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of Service, Service Level Agreement, and Acceptable Use Policy for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <main className="py-16 bg-white min-h-screen text-[#0F0F0F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#52525B] hover:text-[#C81E1E] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] mb-4">Terms of Service</h1>
        <p className="text-xs sm:text-sm text-[#52525B] mb-8 font-medium">Effective Date: August 18, 2026</p>

        <div className="space-y-8 text-sm sm:text-base text-[#52525B] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">1. Terms of Agreement</h2>
            <p>
              Welcome to Srushti Hosting (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By creating an account, registering a domain, subscribing to web hosting services, purchasing SSL security add-ons, or placing an inquiry on our website ({siteConfig.url}), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our infrastructure or services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">2. Provision of Hosting Services</h2>
            <p>
              Srushti Hosting provides web hosting infrastructure, cPanel server environments, custom domain registration, SSL certificates, and Google Workspace integration. We reserve the right to perform routine server updates, hardware maintenance, and security enhancements to maintain network stability and performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">3. User Account Responsibilities</h2>
            <p>Customers are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#52525B]">
              <li>Maintaining accurate, complete, and up-to-date contact and billing information in the client portal.</li>
              <li>Safeguarding client account credentials, passwords, and administrative cPanel access keys.</li>
              <li>Ensuring all website content, databases, scripts, and software applications uploaded to our servers comply with applicable national and international laws.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">4. Acceptable Use Policy (AUP)</h2>
            <p>Our web hosting servers may only be used for lawful web publishing. You agree NOT to engage in:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#52525B]">
              <li>Host or distribute malicious software, phishing pages, ransomware, or illegal material.</li>
              <li>Send unsolicited commercial bulk emails (SPAM) or run unauthorized mass mailing scripts.</li>
              <li>Launch network abuse, port scanning, or unauthorized security exploits against third-party servers.</li>
              <li>Exceed server resource CPU/RAM allocations in a manner that degrades service quality for adjacent hosted accounts on shared nodes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">5. Uptime Service Level Agreement (SLA)</h2>
            <p>
              Srushti Hosting aims to maintain a <strong className="text-[#0F0F0F]">99.9% uptime SLA</strong> for all web hosting services. Planned server upgrades or emergency security maintenance communicated in advance are excluded from SLA downtime calculations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">6. Fees, Billing & Payment Processing</h2>
            <p>
              All service prices are listed in Indian Rupees (INR) unless otherwise specified. Subscriptions are billed in advance on a monthly or annual recurring cycle based on your selected billing term.
            </p>
            <p>
              Payments are executed securely through authorized payment gateway partners, including Razorpay (Credit/Debit Cards, Net Banking, UPI, and Wallets). Failure to renew services prior to the invoice due date may result in automated service suspension or domain expiration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Srushti Hosting shall not be held liable for indirect, incidental, or consequential damages resulting from website downtime, loss of data, third-party software vulnerabilities, or un-backed-up customer files. We strongly recommend customers maintain regular offsite website backups.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">8. Governing Law & Dispute Jurisdiction</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India. Any legal disputes or claims arising out of or related to our services shall be subject to the exclusive jurisdiction of the competent courts of India.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-200">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">9. Corporate Contact Information</h2>
            <p>For questions regarding these Terms of Service or billing inquiries, please contact our legal desk:</p>
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 text-sm space-y-1 font-medium text-[#0F0F0F]">
              <p><strong>Entity Name:</strong> {siteConfig.name}</p>
              <p><strong>Support Email:</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-[#C81E1E] underline">{siteConfig.contact.email}</a></p>
              <p><strong>Phone Support:</strong> {siteConfig.contact.phone}</p>
              <p><strong>WhatsApp Support:</strong> Available 24/7 via Website Chat</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
