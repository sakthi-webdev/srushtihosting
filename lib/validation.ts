import { parsePhoneNumberWithError, CountryCode } from 'libphonenumber-js';
import { COUNTRIES, CountryOption, DEFAULT_COUNTRY, getCountryByCode } from './countries';

// List of blacklisted disposable/temporary email provider domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  'yopmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'trashmail.com',
  'dispostable.com',
  'sharklasers.com',
  'getnada.com',
  'throwawaymail.com',
  'fakeinbox.com',
  'maildrop.cc',
  'disposable.com',
  'byom.de',
  'mohmal.com',
  'crazymailing.com',
  'tmail.ws',
  'tempail.com',
]);

// Spam trigger keywords often used by automated spammers
const SPAM_KEYWORDS = [
  'buy backlinks',
  'seo ranking',
  'casino online',
  'crypto investment',
  'guaranteed profit',
  'viagra',
  'pills online',
  'loan offer',
  'whatsapp marketing',
  'telegram bot',
];

export interface ContactFormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  service: string;
  message: string;
  hp_website?: string; // Honeypot field
  renderedAt?: number; // Timestamp when form rendered
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  formattedPhone?: string;
  isSpamBot?: boolean;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};
  let formattedPhone: string | undefined;

  // 0. Anti-Spam Honeypot check
  if (data.hp_website && data.hp_website.trim().length > 0) {
    return {
      isValid: false,
      errors: { _general: 'Bot submission detected.' },
      isSpamBot: true,
    };
  }

  // 0. Anti-Spam Time-Delta check (if client sends timestamp)
  if (data.renderedAt && typeof data.renderedAt === 'number') {
    const elapsedMs = Date.now() - data.renderedAt;
    if (elapsedMs > 0 && elapsedMs < 2000) {
      return {
        isValid: false,
        errors: { _general: 'Form submitted too fast. Please try again.' },
        isSpamBot: true,
      };
    }
  }

  // 1. Name Validation
  const trimmedName = (data.name || '').trim();
  if (!trimmedName) {
    errors.name = 'Full name is required.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (trimmedName.length > 70) {
    errors.name = 'Name cannot exceed 70 characters.';
  } else if (/https?:\/\/|www\./i.test(trimmedName)) {
    errors.name = 'Name cannot contain website links.';
  } else if (!/^[a-zA-Z\s.'\-]+$/.test(trimmedName)) {
    errors.name = 'Name can only contain letters, spaces, hyphens, and dots.';
  } else if (/^(.)\1{4,}$/.test(trimmedName)) {
    errors.name = 'Please enter a valid real name.';
  }

  // 2. Email Validation
  const trimmedEmail = (data.email || '').trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!trimmedEmail) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g. name@company.com).';
  } else {
    const domain = trimmedEmail.split('@')[1];
    if (domain && DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
      errors.email = 'Disposable or temporary email addresses are not allowed.';
    }
  }

  // 3. Country Code & Mobile Number Validation
  const phoneDigits = (data.phone || '').replace(/\s+/g, '');
  const countryObj = getCountryByCode(data.countryCode || DEFAULT_COUNTRY.code);

  if (!phoneDigits) {
    errors.phone = 'Mobile phone number is required.';
  } else if (!/^\+?[0-[#\d\-()]+$/.test(phoneDigits)) {
    errors.phone = 'Phone number contains invalid characters.';
  } else {
    try {
      // Validate using libphonenumber-js
      const phoneNumber = parsePhoneNumberWithError(phoneDigits, countryObj.code as CountryCode);
      if (!phoneNumber || !phoneNumber.isValid()) {
        errors.phone = `Invalid mobile number for ${countryObj.name} (${countryObj.dialCode}).`;
      } else {
        formattedPhone = phoneNumber.formatInternational();
      }
    } catch {
      errors.phone = `Invalid phone format for ${countryObj.name} (${countryObj.dialCode}).`;
    }
  }

  // 4. Service Whitelist Validation
  const ALLOWED_SERVICES = [
    'Web Hosting',
    'Domain Registration & Transfer',
    'Google Workspace',
    'SSL Security & Wildcard Add-ons',
    'Free Website Migration',
    'Other Technical Inquiry',
  ];
  if (!data.service || !ALLOWED_SERVICES.includes(data.service)) {
    errors.service = 'Please select a valid service from the list.';
  }

  // 5. Message Validation
  const trimmedMessage = (data.message || '').trim();
  if (!trimmedMessage) {
    errors.message = 'Message is required.';
  } else if (trimmedMessage.length < 15) {
    errors.message = 'Please provide a more detailed message (at least 15 characters).';
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message is too long (maximum 2000 characters).';
  } else {
    // Check link spam count
    const urlMatches = trimmedMessage.match(/https?:\/\/[^\s]+/gi) || [];
    if (urlMatches.length > 2) {
      errors.message = 'Message contains too many web links.';
    }

    // Check spam keywords
    const lowerMessage = trimmedMessage.toLowerCase();
    const hasSpamKeyword = SPAM_KEYWORDS.some((kw) => lowerMessage.includes(kw));
    if (hasSpamKeyword) {
      errors.message = 'Your message was flagged by our security filter. Please revise.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    formattedPhone,
  };
}
