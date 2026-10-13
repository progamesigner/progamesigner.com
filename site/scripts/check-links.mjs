// Verify every internal link and asset in the built site resolves to a file,
// and that in-page anchors (`#id`) exist on the target page.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith('.html')) pages.push(full);
  }
};
walk(dist);

const idsCache = new Map();
const idsOf = (file) => {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
};

const resolve = (pathname) => {
  const target = join(dist, decodeURIComponent(pathname));
  if (pathname.endsWith('/')) return existsSync(join(target, 'index.html')) ? join(target, 'index.html') : null;
  if (existsSync(target) && statSync(target).isFile()) return target;
  return null;
};

const problems = [];
let checked = 0;
for (const page of pages) {
  if (page.includes('~partytown')) continue;
  const html = readFileSync(page, 'utf8');
  const from = `/${relative(dist, page)}`;
  for (const [, attr, value] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) {
      if (value.startsWith('#') && !idsOf(page).has(value.slice(1))) problems.push(`${from}: missing anchor ${value}`);
      continue;
    }
    checked++;
    const url = new URL(value, 'https://example.invalid');
    const file = resolve(url.pathname);
    if (!file) problems.push(`${from}: ${attr}="${value}" does not resolve`);
    else if (url.hash && file.endsWith('.html') && !idsOf(file).has(decodeURIComponent(url.hash.slice(1))))
      problems.push(`${from}: ${value} points at a missing anchor`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`check-links: ${checked} internal links across ${pages.length} pages resolve.`);
