import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy, Data Protection, and Payment Security Guidelines for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
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

        <h1 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] mb-4">Privacy Policy</h1>
        <p className="text-xs sm:text-sm text-[#52525B] mb-8 font-medium">Effective Date: August 18, 2026</p>

        <div className="space-y-8 text-sm sm:text-base text-[#52525B] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">1. Introduction & Overview</h2>
            <p>
              Srushti Hosting (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and security of our clients, website visitors, and service subscribers. This Privacy Policy outlines how we collect, use, store, process, and safeguard your personal information when you visit our website ({siteConfig.url}) or purchase our web hosting, domain registration, SSL certificates, and business email services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">2. Information We Collect</h2>
            <p>We collect personal information necessary to deliver, manage, and secure our hosting services:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#52525B]">
              <li><strong className="text-[#0F0F0F]">Personal Identification Data:</strong> Full name, email address, phone number, mailing address, and business details provided during account registration or inquiry forms.</li>
              <li><strong className="text-[#0F0F0F]">Domain Registration Data:</strong> Registrant name, administrative email, physical address, and technical details required by domain registry authorities (ICANN / NIXI).</li>
              <li><strong className="text-[#0F0F0F]">Technical & Server Log Data:</strong> IP addresses, browser types, device information, access timestamps, and bandwidth utilization logs collected automatically for operational security and network monitoring.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">3. Payment Processing & Data Security</h2>
            <p>
              We prioritize strict financial data security. All payment card transactions, UPI payments, net banking, and subscription renewals are processed securely via PCI-DSS compliant payment gateways, including Razorpay.
            </p>
            <p>
              Srushti Hosting <strong className="text-[#0F0F0F]">does not store or capture</strong> credit card numbers, debit card PINs, CVVs, or online banking passwords on our servers. Financial authentication is handled directly by encrypted payment processor sessions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">4. How We Use Your Information</h2>
            <p>Your information is utilized solely for legitimate operational purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#52525B]">
              <li>Provisioning and maintaining web hosting servers, cPanel accounts, and email mailboxes.</li>
              <li>Executing domain registration orders and instant DNS propagation.</li>
              <li>Processing invoices, renewal receipts, and automated transaction confirmations.</li>
              <li>Delivering 24/7 technical customer support and resolving infrastructure service tickets.</li>
              <li>Preventing fraudulent transactions, abuse, DDoS attacks, and network security violations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">5. Information Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, trade, or commercialize customer personal data. We disclose information only to essential service partners necessary for fulfillment (e.g., domain registry authorities for WHOIS database requirements or verified payment processors like Razorpay for billing verification).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">6. Cookies & Tracking Technologies</h2>
            <p>
              Our website uses essential session cookies to keep users authenticated in the client portal, save language or currency preferences, and analyze anonymized site traffic performance. Users can configure browser settings to decline non-essential cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">7. Data Retention & Privacy Rights</h2>
            <p>
              We retain personal data for as long as your account remains active or as required to fulfill legal, tax, and regulatory compliance obligations. Customers may request account data inspection, correction, or account deletion by contacting our privacy compliance team.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-200">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">8. Contact Our Privacy Officer</h2>
            <p>If you have any questions or privacy concerns regarding this policy, please contact us:</p>
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 text-sm space-y-2 font-medium text-[#0F0F0F]">
              <p><strong>Email:</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-[#C81E1E] underline">{siteConfig.contact.email}</a></p>
              <p><strong>Address:</strong> {siteConfig.contact.address}</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
