/**
 * Site-wide settings and contact details. Values marked as placeholders are
 * filled in before launch; everything else is the real, public value.
 */

/**
 * Google Analytics 4 measurement ID (`G-…`). Placeholder: empty until the
 * GA4 property exists. Set `PUBLIC_GA_ID` at build time or fill it in here.
 * Analytics stays off while this is empty or malformed.
 */
const gaMeasurementId: string = import.meta.env.PUBLIC_GA_ID ?? '';

export const analyticsId: string | undefined = /^G-[A-Z0-9]+$/.test(gaMeasurementId) ? gaMeasurementId : undefined;

export const email = 'progamesigner@outlook.com';

export const pgp = {
  fingerprint: '11BE C92C 7365 6BE7 C4D1  EC61 546B 7387 8102 7B88',
  algorithm: 'RSA 4096',
  created: '2017-12-10',
  userId: 'progamesigner@gmail.com',
  file: '/pgp.asc',
  keyserver: 'https://keyserver.ubuntu.com/pks/lookup?search=0x11BEC92C73656BE7C4D1EC61546B738781027B88&op=index',
} as const;

export const profiles = [
  { label: 'GitHub', handle: 'progamesigner', href: 'https://github.com/progamesigner' },
  { label: 'X', handle: '@progamesigner', href: 'https://x.com/progamesigner' },
  { label: 'LinkedIn', handle: 'in/progamesigner', href: 'https://www.linkedin.com/in/progamesigner' },
  { label: 'Blog', handle: '0x148.com', href: 'https://0x148.com' },
] as const;
