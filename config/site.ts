export const siteConfig = {
  name: 'Srushti Hosting',
  description: 'Fast, secure & reliable Web Hosting, Domain Registration, and Google Workspace for growing businesses.',
  url: 'https://srushtihosting.com',
  upmind: {
    clientAreaUrl: process.env.NEXT_PUBLIC_UPMIND_CLIENT_AREA_URL || 'https://client.srushtihosting.com/login',
    orderConfigUrl: process.env.NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL || 'https://client.srushtihosting.com/order/shop/',
    currency: process.env.NEXT_PUBLIC_UPMIND_CURRENCY || 'INR',
  },
  contact: {
    email: 'support@srushtihosting.com',
    phone: '+91 98400 86335',
    whatsapp: 'https://wa.me/919840086335',
  },
  links: {
    terms: '/terms',
    privacy: '/privacy',
    refund: '/refund-policy',
  },
} as const;
