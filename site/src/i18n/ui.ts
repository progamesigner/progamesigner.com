export const locales = ['en', 'zh-tw'] as const;
export type Locale = (typeof locales)[number];

export const htmlLang: Record<Locale, string> = { en: 'en', 'zh-tw': 'zh-Hant-TW' };
export const ogLocale: Record<Locale, string> = { en: 'en_US', 'zh-tw': 'zh_TW' };

const strings = {
  en: {
    'site.title': 'Progamesigner — Yang Sheng Han',
    'site.description':
      'Yang Sheng Han (progamesigner) is a software engineer in Taipei who builds products and the infrastructure under them.',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.primary': 'Primary',
    'nav.language': 'Language',
    'theme.toggle': 'Toggle dark mode',
    skip: 'Skip to content',
    'hero.role': 'Software engineer',
    'hero.place': 'Taipei',
    'hero.lead': 'I build products and the infrastructure under them.',
    'hero.sub':
      "From small web apps people use every day to the clusters they run on. Lately I'm teaching AI agents to remember, and giving them a home to live in.",
    'now.title': 'Now',
    'now.muninn': 'long-term memory for AI agents',
    'now.sleipnir': 'an agent team, run from my phone',
    'index.title': 'Index of work',
    'index.count': '{total} projects · {live} live',
    'index.also': 'Also:',
    'index.preview': 'Preview',
    'tier.featured': 'Featured',
    'tier.shipped': 'Tool',
    'tier.community': 'Community',
    'tier.misc': 'Misc',
    'contact.title': 'Get in touch',
    'contact.lead': 'Email is the best way to reach me. Encrypted mail welcome.',
    'contact.keyNote': 'Key user ID: progamesigner@gmail.com',
    'contact.download': 'Download public key',
    'footer.built': 'Built with Astro',
    'footer.analytics': 'This site uses Google Analytics.',
    'case.label': 'Case study',
    'case.role': 'Role',
    'case.year': 'Year',
    'case.stack': 'Stack',
    'case.status': 'Status',
    'case.links': 'Links',
    'case.try': 'Try it',
    'case.source': 'Source',
    'case.next': 'Next',
    'case.draft': 'Draft — this case study is still being written.',
    'case.screens': 'Screens',
    'case.outcome': 'Outcome',
    'status.live': 'Live',
    'status.maintained': 'Maintained',
    'status.archived': 'Archived',
    'status.concept': 'Concept',
    '404.title': 'Not found',
    '404.body': 'This page does not exist. The index of work might have what you were looking for.',
    '404.back': 'Back to the index',
  },
  'zh-tw': {
    'site.title': 'Progamesigner — Yang Sheng Han',
    'site.description': 'Yang Sheng Han（progamesigner），台北的軟體工程師，做產品，也做撐起產品的基礎設施。',
    'nav.work': '作品',
    'nav.about': '關於',
    'nav.contact': '聯絡',
    'nav.blog': '部落格',
    'nav.primary': '主要導覽',
    'nav.language': '語言',
    'theme.toggle': '切換深淺色',
    skip: '跳到主要內容',
    'hero.role': '軟體工程師',
    'hero.place': '台北',
    'hero.lead': '做產品，也做撐起產品的基礎設施。',
    'hero.sub': '從每天有人在用的小工具，到它們跑在上面的叢集。最近在教 AI agent 記得事情，也替它們找個地方住。',
    'now.title': '近況',
    'now.muninn': 'AI agent 的長期記憶',
    'now.sleipnir': '用手機指揮整組 agent',
    'index.title': '作品索引',
    'index.count': '{total} 個作品 · {live} 個上線中',
    'index.also': '其他：',
    'index.preview': '預覽',
    'tier.featured': '精選',
    'tier.shipped': '工具',
    'tier.community': '社群',
    'tier.misc': '其他',
    'contact.title': '聯絡我',
    'contact.lead': '最好用 Email 聯絡，歡迎加密來信。',
    'contact.keyNote': '金鑰 User ID：progamesigner@gmail.com',
    'contact.download': '下載公鑰',
    'footer.built': '以 Astro 建置',
    'footer.analytics': '本站使用 Google Analytics。',
    'case.label': '個案',
    'case.role': '角色',
    'case.year': '年份',
    'case.stack': '技術',
    'case.status': '狀態',
    'case.links': '連結',
    'case.try': '試用',
    'case.source': '原始碼',
    'case.next': '下一個',
    'case.draft': '草稿：這篇個案還在撰寫中。',
    'case.screens': '畫面',
    'case.outcome': '成果',
    'status.live': '上線中',
    'status.maintained': '維護中',
    'status.archived': '已封存',
    'status.concept': '構想',
    '404.title': '找不到頁面',
    '404.body': '這個頁面不存在，可以回作品索引找找看。',
    '404.back': '回作品索引',
  },
} as const;

export type UIKey = keyof (typeof strings)['en'];

export function translator(locale: Locale) {
  return (key: UIKey, vars: Record<string, string | number> = {}) =>
    (strings[locale][key] as string).replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''));
}

export function localeFromUrl(url: URL): Locale {
  return url.pathname.startsWith('/zh-tw') ? 'zh-tw' : 'en';
}

/** Prefix a site-relative path with the locale segment, e.g. `/work/bragi` → `/zh-tw/work/bragi`. */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? clean : `/zh-tw${clean === '/' ? '/' : clean}`;
}

/** Swap the locale of the current path, keeping the rest of it. */
export function switchLocalePath(url: URL, target: Locale): string {
  const bare = url.pathname.replace(/^\/zh-tw(?=\/|$)/, '') || '/';
  return localizePath(bare, target);
}
