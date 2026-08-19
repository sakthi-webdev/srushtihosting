export const sectionFlags = {
  hero: true,
  servicesOverview: true,
  hosting: true,
  domains: true,
  googleWorkspace: true,
  sslAddons: false,
  whyUs: true,                // Enabled: Features tailored to your needs
  testimonials: true,         // Enabled: Client reviews section
  faq: true,                  // Enabled: FAQ 2-column accordion
  contact: true,
} as const;

export type SectionFlags = typeof sectionFlags;
