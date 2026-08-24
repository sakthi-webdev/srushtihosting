import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy | ${siteConfig.name}`,
  description: `Refund & Cancellation Policy and subscription terms for ${siteConfig.name}.`,
};

export default function RefundPolicyPage() {
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

        <h1 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] mb-4">Refund & Cancellation Policy</h1>
        <p className="text-xs sm:text-sm text-[#52525B] mb-8 font-medium">Effective Date: August 19, 2026</p>

        <div className="space-y-8 text-sm sm:text-base text-[#52525B] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">1. General Refund Policy</h2>
            <p>
              At Srushti Hosting, we deliver enterprise-grade NVMe web hosting, domain registration, and cloud services. Please note that all payments made for web hosting subscription plans, domain names, email services, and add-on licenses are <strong className="text-[#0F0F0F]">non-refundable</strong>.
            </p>
            <p>
              We do not offer money-back guarantees, cash refunds, or prorated refunds for partial billing periods once a service has been activated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">2. Non-Refundable Services & Products</h2>
            <p>The following items and services are strictly <strong className="text-[#0F0F0F]">non-refundable</strong> under any circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#52525B]">
              <li><strong className="text-[#0F0F0F]">Web Hosting Subscriptions:</strong> Starter, Business, and Professional Shared NVMe hosting plans.</li>
              <li><strong className="text-[#0F0F0F]">Domain Name Registrations, Renewals & Transfers:</strong> Domain name fees paid for .com, .in, .co.in, .org, .net, or any other TLD extension once registered with registry authorities (ICANN / NIXI).</li>
              <li><strong className="text-[#0F0F0F]">Google Workspace Licenses:</strong> User seats and business email accounts provisioned through Google Workspace.</li>
              <li><strong className="text-[#0F0F0F]">Custom Add-ons & Dedicated IPs:</strong> Dedicated IPv4 allocations (which are currently not offered), SSL certificates, and custom admin setup services.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">3. Subscription Cancellation Procedure</h2>
            <p>You may cancel your hosting subscription or disable auto-renewal at any time prior to your next billing cycle:</p>
            <ol className="list-decimal pl-6 space-y-2 text-[#52525B]">
              <li>Log in to your Client Area portal or email our billing support desk at <a href="mailto:billing@srushtihosting.com" className="text-[#C81E1E] underline">billing@srushtihosting.com</a>.</li>
              <li>Specify your hosting account or domain name and submit a cancellation request.</li>
              <li>Your service will remain active until the end of your current paid billing period, after which it will expire without further recurring charges.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">4. Billing Errors & Duplicate Charges</h2>
            <p>
              If you notice an erroneous duplicate transaction or billing mistake, please report it to our billing team within 7 calendar days of the charge.
            </p>
            <p>
              Verified technical or duplicate billing errors will be refunded back directly to your original payment method (Credit Card, Debit Card, Net Banking, or UPI) via Razorpay within <strong className="text-[#0F0F0F]">5 to 7 business days</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">5. Account Termination Due to Abuse</h2>
            <p>
              Accounts suspended or terminated due to Acceptable Use Policy (AUP) violations—such as malware hosting, phishing, unauthorized server access, or spamming—are ineligible for refunds or account transfers under any circumstances.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-200">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F]">6. Contact Our Billing Department</h2>
            <p>If you have any questions regarding subscriptions, invoices, or cancellations, please contact us:</p>
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 text-sm space-y-2 font-medium text-[#0F0F0F]">
              <p><strong>Billing Email:</strong> <a href="mailto:billing@srushtihosting.com" className="text-[#C81E1E] underline">billing@srushtihosting.com</a></p>
              <p><strong>Address:</strong> {siteConfig.contact.address}</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
