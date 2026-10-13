export const locales = ['en', 'zh-tw'] as const;
export type Locale = (typeof locales)[number];

export const htmlLang: Record<Locale, string> = { en: 'en', 'zh-tw': 'zh-Hant-TW' };
export const ogLocale: Record<Locale, string> = { en: 'en_US', 'zh-tw': 'zh_TW' };

const en = {
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
  'index.viewAll': 'View all work',
  'work.title': 'Work',
  'work.description':
    'Projects by Yang Sheng Han (progamesigner): case studies, tools, community sites and smaller pieces.',
  'work.lead': 'Everything here can be opened, tried, or read at the source.',
  'work.section.featured': 'Featured work',
  'work.section.shipped': 'Tools',
  'work.section.community': 'Community',
  'work.section.misc': 'Other',
  'work.filter': 'Filter by stack',
  'work.filterAll': 'All',
  'work.showing': 'Showing {count} of {total}',
  'work.noMatch': 'No project uses this stack.',
  'work.readCase': 'Read the case study',
  'tier.featured': 'Featured',
  'tier.shipped': 'Tool',
  'tier.community': 'Community',
  'tier.misc': 'Misc',
  'stack.title': 'Stack, by project',
  'stack.lead': 'The tools I reach for, and where each one is in use.',
  'contact.title': 'Get in touch',
  'contact.lead': 'Email is the best way to reach me. Encrypted mail welcome.',
  'contact.keyNote': 'Key user ID: {uid}',
  'contact.download': 'Download public key',
  'contact.more': 'All contact details',
  'contactPage.title': 'Contact',
  'contactPage.description': 'How to reach Yang Sheng Han (progamesigner): email, OpenPGP key and profiles.',
  'contactPage.lead': 'Email reaches me fastest. For anything sensitive, encrypt it with the key below.',
  'contactPage.email': 'Email',
  'contactPage.pgp': 'OpenPGP key',
  'contactPage.fingerprint': 'Fingerprint',
  'contactPage.algorithm': 'Algorithm',
  'contactPage.created': 'Created',
  'contactPage.uid': 'User ID',
  'contactPage.uidNote': 'The key is issued to my Gmail address; mail to either address can use it.',
  'contactPage.import': 'Import the key',
  'contactPage.keyserver': 'Look it up on keyserver.ubuntu.com',
  'contactPage.elsewhere': 'Elsewhere',
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
  'case.breadcrumb': 'Breadcrumb',
  'status.live': 'Live',
  'status.maintained': 'Maintained',
  'status.archived': 'Archived',
  'status.concept': 'Concept',
  '404.title': 'Not found',
  '404.body': 'This page does not exist. The index of work might have what you were looking for.',
  '404.back': 'Back to the index',
} as const;

export type UIKey = keyof typeof en;

// Typed against the English keys, so a missing or extra translation fails type checking.
const zhTW: Record<UIKey, string> = {
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
  'index.viewAll': '看所有作品',
  'work.title': '作品',
  'work.description': 'Yang Sheng Han（progamesigner）的作品：個案、工具、社群網站與其他小專案。',
  'work.lead': '這裡的每個作品都能打開、試用，或直接看原始碼。',
  'work.section.featured': '精選作品',
  'work.section.shipped': '工具',
  'work.section.community': '社群',
  'work.section.misc': '其他',
  'work.filter': '依技術篩選',
  'work.filterAll': '全部',
  'work.showing': '顯示 {count} / {total} 個',
  'work.noMatch': '沒有作品使用這項技術。',
  'work.readCase': '閱讀個案',
  'tier.featured': '精選',
  'tier.shipped': '工具',
  'tier.community': '社群',
  'tier.misc': '其他',
  'stack.title': '技術，依作品',
  'stack.lead': '常用的工具，以及各自用在哪些作品。',
  'contact.title': '聯絡我',
  'contact.lead': '最好用 Email 聯絡，歡迎加密來信。',
  'contact.keyNote': '金鑰 User ID：{uid}',
  'contact.download': '下載公鑰',
  'contact.more': '完整聯絡資訊',
  'contactPage.title': '聯絡',
  'contactPage.description': '聯絡 Yang Sheng Han（progamesigner）：Email、OpenPGP 公鑰與各平台帳號。',
  'contactPage.lead': 'Email 最快找到我。敏感內容請用下方公鑰加密。',
  'contactPage.email': 'Email',
  'contactPage.pgp': 'OpenPGP 公鑰',
  'contactPage.fingerprint': '指紋',
  'contactPage.algorithm': '演算法',
  'contactPage.created': '建立日期',
  'contactPage.uid': 'User ID',
  'contactPage.uidNote': '金鑰綁定的是 Gmail 地址；寄到任一信箱都可以用它加密。',
  'contactPage.import': '匯入公鑰',
  'contactPage.keyserver': '在 keyserver.ubuntu.com 查詢',
  'contactPage.elsewhere': '其他平台',
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
  'case.breadcrumb': '麵包屑',
  'status.live': '上線中',
  'status.maintained': '維護中',
  'status.archived': '已封存',
  'status.concept': '構想',
  '404.title': '找不到頁面',
  '404.body': '這個頁面不存在，可以回作品索引找找看。',
  '404.back': '回作品索引',
};

const strings: Record<Locale, Record<UIKey, string>> = { en, 'zh-tw': zhTW };

export function translator(locale: Locale) {
  return (key: UIKey, vars: Record<string, string | number> = {}) =>
    strings[locale][key].replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''));
}

export function localeFromUrl(url: URL): Locale {
  return /^\/zh-tw(\/|$)/.test(url.pathname) ? 'zh-tw' : 'en';
}

/**
 * Prefix a site-relative path with the locale segment and normalise the
 * trailing slash, e.g. `/work/bragi` → `/zh-tw/work/bragi/`.
 */
export function localizePath(path: string, locale: Locale): string {
  const [pathname, hash = ''] = path.split('#');
  let clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!clean.endsWith('/') && !/\.[a-z0-9]+$/i.test(clean)) clean += '/';
  const prefixed = locale === 'en' ? clean : `/zh-tw${clean}`;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

/** The 404 page is served for any missing path, so it has no locale twin. */
export function isNotFound(url: URL): boolean {
  return /^\/404(\.html|\/)?$/.test(url.pathname);
}

/** Swap the locale of the current path, keeping the rest of it. The 404 page switches to the home page. */
export function switchLocalePath(url: URL, target: Locale): string {
  if (isNotFound(url)) return localizePath('/', target);
  const bare = url.pathname.replace(/^\/zh-tw(?=\/|$)/, '') || '/';
  return localizePath(bare, target);
}
