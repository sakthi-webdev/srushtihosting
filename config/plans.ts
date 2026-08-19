export type HostingPlan = {
  id: string;
  name: string;
  currency: string;
  monthlyPrice: number;
  yearlyPricePerMonth: number;
  yearlyTotal: number;
  saleTag: string;
  description: string;
  features: { text: string; isNew?: boolean; highlight?: boolean }[];
  recommended?: boolean;
  monthlyCheckoutUrl: string;
  yearlyCheckoutUrl: string;
};

const baseUrl = process.env.NEXT_PUBLIC_UPMIND_BASE_URL || 'https://client.srushtihosting.com';

export const hostingPlansData: HostingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    currency: '₹',
    monthlyPrice: 349,
    yearlyPricePerMonth: 279,
    yearlyTotal: 3348,
    saleTag: 'On sale - Save 20%',
    description: 'Essential NVMe resources for personal websites & blogs.',
    features: [
      { text: '5 GB SSD Storage' },
      { text: '1 Website' },
      { text: '5 Email Accounts' },
      { text: '50 GB Monthly Bandwidth' },
      { text: 'Free SSL Certificate' },
      { text: 'cPanel Control Panel', isNew: true },
      { text: 'Automated Daily Snapshots' },
    ],
    monthlyCheckoutUrl: `${baseUrl}/order/starter-monthly`,
    yearlyCheckoutUrl: `${baseUrl}/order/starter-yearly`,
  },
  {
    id: 'business',
    name: 'Business',
    currency: '₹',
    monthlyPrice: 799,
    yearlyPricePerMonth: 639,
    yearlyTotal: 7668,
    saleTag: 'On sale - Best Value',
    description: 'High-performance web hosting for growing business websites & stores.',
    features: [
      { text: '15 GB SSD Storage' },
      { text: '5 Websites' },
      { text: 'Unlimited Email Accounts', highlight: true },
      { text: 'Unmetered Bandwidth' },
      { text: 'Free SSL Certificate' },
      { text: 'Free Website Migration', isNew: true },
      { text: '24/7 Priority Support', highlight: true },
    ],
    recommended: true,
    monthlyCheckoutUrl: `${baseUrl}/order/business-monthly`,
    yearlyCheckoutUrl: `${baseUrl}/order/business-yearly`,
  },
  {
    id: 'professional',
    name: 'Professional',
    currency: '₹',
    monthlyPrice: 1499,
    yearlyPricePerMonth: 1199,
    yearlyTotal: 14388,
    saleTag: 'On sale - Save 20%',
    description: 'Unmatched RAM & CPU allocation for high-traffic enterprise platforms.',
    features: [
      { text: '30 GB SSD Storage' },
      { text: 'Unlimited Websites', highlight: true },
      { text: 'Unlimited Email Accounts' },
      { text: 'Unmetered Bandwidth' },
      { text: 'Free SSL Certificate' },
      { text: 'Free Dedicated IP', isNew: true },
      { text: 'Free Website Migration' },
    ],
    monthlyCheckoutUrl: `${baseUrl}/order/professional-monthly`,
    yearlyCheckoutUrl: `${baseUrl}/order/professional-yearly`,
  },
];

export const domainPricing = [
  { tld: '.com', price: '₹949', renewal: '₹1,399', highlight: 'Popular' },
  { tld: '.in', price: '₹399', renewal: '₹799', highlight: 'India National' },
  { tld: '.co.in', price: '₹299', renewal: '₹599' },
  { tld: '.org', price: '₹1,199', renewal: '₹1,499' },
  { tld: '.net', price: '₹1,149', renewal: '₹1,399' },
];
