export const siteConfig = {
  name: 'Srushti Hosting',
  description: 'Fast, secure & reliable Web Hosting, Domain Registration, and Google Workspace for growing businesses.',
  url: 'https://srushtihosting.com',
  parentCompany: 'Srushti Solutions',
  entityLine: 'A Unit of Srushti Solutions',
  upmind: {
    clientAreaUrl: process.env.NEXT_PUBLIC_UPMIND_CLIENT_AREA_URL || 'https://client.srushtihosting.com/login',
    orderConfigUrl: process.env.NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL || 'https://client.srushtihosting.com/order/product',
    currency: process.env.NEXT_PUBLIC_UPMIND_CURRENCY || 'INR',
  },
  contact: {
    email: 'support@srushtihosting.com',
    phone: '+91 98400 86335',
    whatsapp: 'https://wa.me/919840086335',
    address: 'Srushti Solutions, 1st Floor, N 67, O 22, North Mada Street, Above ICICI Bank, Thiruvanmiyur, Chennai - 600041',
  },
  links: {
    terms: '/terms',
    privacy: '/privacy',
    refund: '/refund-policy',
  },
} as const;
