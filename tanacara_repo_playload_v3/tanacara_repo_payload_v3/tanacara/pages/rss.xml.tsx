import type { GetServerSideProps } from 'next';
import { getAllPosts } from '../lib/posts';

const BASE = 'https://www.tanacara.com';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getAllPosts().slice(0, 20);

  const items = posts.map((p) => {
    const link = `${BASE}/radar/${p.slug}`;
    return `
<item>
  <title><![CDATA[${p.title}]]></title>
  <link>${link}</link>
  <guid>${link}</guid>
  <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  <description><![CDATA[${p.summary}]]></description>
</item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0">\n` +
    `<channel>\n` +
    `<title>Tanacara — Radar</title>\n` +
    `<link>${BASE}</link>\n` +
    `<description>Radar diário de tecnologia, apps e ferramentas.</description>\n` +
    items +
    `\n</channel>\n</rss>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function RSS() {
  return null;
}
