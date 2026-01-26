import type { GetServerSideProps } from 'next';
import { getAllPosts } from '../lib/posts';

const BASE = 'https://www.tanacara.com';

function siteUrl(path: string) {
  return `${BASE}${path}`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getAllPosts();

  const staticPaths = [
    '/',
    '/radar',
    '/ofertas',
    '/kit',
    '/newsletter',
    '/sobre',
        '/servico',
    '/politica'
  ];

  const urls = [
    ...staticPaths.map((p) => siteUrl(p)),
    ...posts.map((p) => siteUrl(`/radar/${p.slug}`))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `<url><loc>${u}</loc></url>`).join('\n') +
    `\n</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null;
}
