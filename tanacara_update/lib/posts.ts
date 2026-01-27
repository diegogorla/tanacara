import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  sourceUrls: string[];
  image?: string;
};

/**
 * Reads all posts in a given content directory (e.g. content/radar or content/newsletter/politica).
 * Returns metadata sorted by date descending.
 */
export function getAllPosts(dir: string): PostMeta[] {
  const fullDir = path.join(process.cwd(), 'content', dir);
  if (!fs.existsSync(fullDir)) return [];
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(fullDir, file), 'utf8');
    const { data } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ''),
      summary: String(data.summary ?? ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      sourceUrls: Array.isArray(data.sourceUrls) ? data.sourceUrls.map(String) : [],
      image: data.image ? String(data.image) : undefined,
    } as PostMeta;
  });
  return posts
    .filter((p) => p.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Reads a single post and returns metadata and HTML.
 */
export async function getPost(dir: string, slug: string): Promise<{ meta: PostMeta; html: string } | null> {
  const filePath = path.join(process.cwd(), 'content', dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  const postHtml = processed.toString();
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    summary: String(data.summary ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    sourceUrls: Array.isArray(data.sourceUrls) ? data.sourceUrls.map(String) : [],
    image: data.image ? String(data.image) : undefined,
  };
  return { meta, html: postHtml };
}