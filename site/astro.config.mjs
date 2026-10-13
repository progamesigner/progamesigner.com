// @ts-check

import { readdirSync, readFileSync } from 'node:fs';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Draft case studies render with noindex, so keep them out of the sitemap too.
const caseStudyDir = new URL('./src/content/case-studies/', import.meta.url);
const draftPages = readdirSync(caseStudyDir)
  .filter((file) => /^draft:\s*true$/m.test(readFileSync(new URL(file, caseStudyDir), 'utf8')))
  .map((file) => {
    const [slug, lang] = file.replace(/\.md$/, '').split('.');
    return `${lang === 'en' ? '' : `/${lang}`}/work/${slug}/`;
  });

export default defineConfig({
  site: 'https://progamesigner.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-tw'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !draftPages.some((path) => page.endsWith(path)),
      i18n: { defaultLocale: 'en', locales: { en: 'en', 'zh-tw': 'zh-Hant-TW' } },
    }),
    partytown({ config: { forward: ['dataLayer.push', 'gtag'] } }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
