export type HostingPlan = {
  id: string;
  name: string;
  currency: string;
  monthlyPrice: number;
  yearlyPricePerMonth: number;
  yearlyTotal: number;
  saleTag?: string;
  description: string;
  features: { text: string; isNew?: boolean; highlight?: boolean }[];
  recommended?: boolean;
  monthlyCheckoutUrl: string;
  yearlyCheckoutUrl: string;
};

/**
 * Annual Discount Configuration
 * Set to true in the future to enable the 20% discount on annual billing plans.
 */
export const ENABLE_ANNUAL_DISCOUNT = false;

interface RawHostingPlanConfig {
  id: string;
  name: string;
  currency: string;
  monthlyPrice: number;
  discountedYearlyPricePerMonth: number;
  discountedYearlyTotal: number;
  discountSaleTag?: string;
  standardSaleTag?: string;
  description: string;
  features: { text: string; isNew?: boolean; highlight?: boolean }[];
  recommended?: boolean;
  checkoutUrl: string;
}

const rawPlansData: RawHostingPlanConfig[] = [
  {
    id: 'starter',
    name: 'Starter',
    currency: '₹',
    monthlyPrice: 349,
    discountedYearlyPricePerMonth: 279,
    discountedYearlyTotal: 3348,
    discountSaleTag: 'On sale - Save 20%',
    standardSaleTag: undefined,
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
    checkoutUrl: 'https://client.srushtihosting.com/order/product/61e50989-73d2-472e-67db-745e610832d7',
  },
  {
    id: 'business',
    name: 'Business',
    currency: '₹',
    monthlyPrice: 799,
    discountedYearlyPricePerMonth: 639,
    discountedYearlyTotal: 7668,
    discountSaleTag: 'On sale - Best Value',
    standardSaleTag: 'Best Value',
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
    checkoutUrl: 'https://client.srushtihosting.com/order/product/1e96d298-537d-4e58-03db-84e120637085',
  },
  {
    id: 'professional',
    name: 'Professional',
    currency: '₹',
    monthlyPrice: 1499,
    discountedYearlyPricePerMonth: 1199,
    discountedYearlyTotal: 14388,
    discountSaleTag: 'On sale - Save 20%',
    standardSaleTag: undefined,
    description: 'Unmatched RAM & CPU allocation for high-traffic enterprise platforms.',
    features: [
      { text: '30 GB SSD Storage' },
      { text: 'Unlimited Websites', highlight: true },
      { text: 'Unlimited Email Accounts' },
      { text: 'Unmetered Bandwidth' },
      { text: 'Free SSL Certificate' },
      { text: 'High CPU & RAM Allocation', isNew: true },
      { text: 'Free Website Migration' },
    ],
    checkoutUrl: 'https://client.srushtihosting.com/order/product/80d1639e-237d-4350-d39f-24610589e572',
  },
];

export const hostingPlansData: HostingPlan[] = rawPlansData.map((plan) => {
  const yearlyPricePerMonth = ENABLE_ANNUAL_DISCOUNT
    ? plan.discountedYearlyPricePerMonth
    : plan.monthlyPrice;

  const yearlyTotal = ENABLE_ANNUAL_DISCOUNT
    ? plan.discountedYearlyTotal
    : plan.monthlyPrice * 12;

  const saleTag = ENABLE_ANNUAL_DISCOUNT
    ? plan.discountSaleTag
    : plan.standardSaleTag;

  return {
    id: plan.id,
    name: plan.name,
    currency: plan.currency,
    monthlyPrice: plan.monthlyPrice,
    yearlyPricePerMonth,
    yearlyTotal,
    saleTag,
    description: plan.description,
    features: plan.features,
    recommended: plan.recommended,
    monthlyCheckoutUrl: plan.checkoutUrl,
    yearlyCheckoutUrl: plan.checkoutUrl,
  };
});

export const domainPricing = [
  { tld: '.com', price: '₹949', renewal: '₹1,399', highlight: 'Popular' },
  { tld: '.in', price: '₹399', renewal: '₹799', highlight: 'India National' },
  { tld: '.co.in', price: '₹299', renewal: '₹599' },
  { tld: '.org', price: '₹1,199', renewal: '₹1,499' },
  { tld: '.net', price: '₹1,149', renewal: '₹1,399' },
];
