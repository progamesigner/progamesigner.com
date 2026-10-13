import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import { getProjects, type Project } from '../../lib/projects';

// One 1200×630 share image per project, rendered at build time in the Swiss v2 style.
// Text is English only: the bundled fonts carry Latin glyphs, and both locales share the image.

export const getStaticPaths = (async () => {
  const projects = await getProjects();
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}) satisfies GetStaticPaths;

// Resolved from the project root: bundled build output no longer sits next to node_modules.
const font = (path: string) => readFile(join(process.cwd(), 'node_modules', path));
const fonts = Promise.all([
  font('@fontsource/archivo/files/archivo-latin-800-normal.woff'),
  font('@fontsource/archivo/files/archivo-latin-400-normal.woff'),
  font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff'),
]);

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

const tierLabel: Record<Project['data']['tier'], string> = {
  featured: 'Featured',
  shipped: 'Tool',
  community: 'Community',
  misc: 'Misc',
};

export const GET: APIRoute = async ({ props }) => {
  const { project } = props as { project: Project };
  const [display, body, mono] = await fonts;
  const name = project.data.name;
  // Long names step down so the title stays on one or two lines inside the padding.
  const nameSize = name.length > 16 ? 84 : name.length > 12 ? 100 : name.length > 8 ? 128 : 168;

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '56px 64px',
      background: '#F3F1EC',
      color: '#22211F',
      fontFamily: 'Archivo',
    },
    [
      h(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '2px solid #22211F',
          paddingTop: 16,
          fontFamily: 'Plex Mono',
          fontSize: 20,
          color: '#5F5B54',
        },
        [h('span', {}, `${tierLabel[project.data.tier]} · ${project.data.year}`), h('span', {}, 'progamesigner.com')],
      ),
      h('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
        h(
          'div',
          {
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: nameSize,
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: -4,
            textTransform: 'uppercase',
          },
          // Keep the accent dot inline with the last word so it never wraps on its own.
          [h('span', {}, [name, h('span', { color: '#D4563A' }, '.')])],
        ),
        h('div', { display: 'flex', fontSize: 34, fontWeight: 400, maxWidth: 1000 }, project.data.tagline.en),
      ]),
      h(
        'div',
        { display: 'flex', fontFamily: 'Plex Mono', fontSize: 20, color: '#5F5B54' },
        project.data.stack.join(' / '),
      ),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Archivo', data: display, weight: 800, style: 'normal' },
      { name: 'Archivo', data: body, weight: 400, style: 'normal' },
      { name: 'Plex Mono', data: mono, weight: 400, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
