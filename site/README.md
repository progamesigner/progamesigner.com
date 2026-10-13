# progamesigner.com (Astro)

The 2026 redesign of progamesigner.com, built with [Astro](https://astro.build), Tailwind CSS and a small amount of React. The current production site is still the Hugo project at the repository root; this directory replaces it at launch.

## Develop

```sh
npm ci
npm run dev      # local dev server
npm run check    # astro check + Biome
npm run build    # static output in dist/
```

Node 24 or later.

## Content

- `src/content/projects/*.yaml`: one file per project. The schema in `src/content.config.ts` validates every field; a missing link or tagline fails the build.
- `src/content/case-studies/<project>.<lang>.md`: case studies for featured projects, one per language. `draft: true` renders the page with `noindex` and leaves it out of the sitemap.
- Case studies may include a `diagram` (a caption plus two or more steps), rendered as a flow diagram.
- Share images: `/og/<project>.png` is rendered at build time from project data with Satori; the site default is `public/og.png`.
- Placeholders are written as `PLACEHOLDER` in content so they are easy to find: `grep -rn PLACEHOLDER src/`.
- `src/i18n/ui.ts`: interface strings for English and Traditional Chinese.
- `public/pgp.asc`: the current OpenPGP public key only.

## Analytics

Google Analytics 4 loads only in production builds when `PUBLIC_GA_ID` (a `G-…` measurement ID) is set, and runs through Partytown.
