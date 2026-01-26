import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  summary: string;
  tags: string[];
  sourceUrls: string[];
};

const postsDir = path.join(process.cwd(), 'content', 'radar');

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md') && f !== '.gitkeep');

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const parsed = matter(raw);

    return {
      slug,
      title: String(parsed.data.title ?? slug),
      date: String(parsed.data.date ?? ''),
      summary: String(parsed.data.summary ?? ''),
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
      sourceUrls: Array.isArray(parsed.data.sourceUrls)
        ? parsed.data.sourceUrls.map(String)
        : []
    } satisfies PostMeta;
  });

  return posts
    .filter((p) => !!p.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(slug: string): Promise<{ meta: PostMeta; html: string } | null> {
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, 'utf8');
  const parsed = matter(raw);

  const processed = await remark().use(html).process(parsed.content);
  const contentHtml = processed.toString();

  const meta: PostMeta = {
    slug,
    title: String(parsed.data.title ?? slug),
    date: String(parsed.data.date ?? ''),
    summary: String(parsed.data.summary ?? ''),
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
    sourceUrls: Array.isArray(parsed.data.sourceUrls)
      ? parsed.data.sourceUrls.map(String)
      : []
  };

  return { meta, html: contentHtml };
}
