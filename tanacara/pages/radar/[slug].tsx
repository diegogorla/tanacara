import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getPostHtml, PostMeta } from '../../lib/posts';

interface PostProps {
  meta: PostMeta;
  html: string;
}

export default function RadarPost({ meta, html }: PostProps) {
  return (
    <main className="container mx-auto p-4">
      <nav className="mb-4">
        <Link href="/radar">\u2190 Voltar ao Radar</Link>
      </nav>
      <article>
        <h1>{meta.title}</h1>
        <p className="text-sm text-gray-500">{meta.date}</p>
        <div
          className="prose prose-invert"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {meta.sources && meta.sources.length > 0 && (
          <section className="mt-8">
            <h2>Fontes</h2>
            <ul>
              {meta.sources.map((src) => (
                <li key={src}>
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    {src}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const { meta, html } = await getPostHtml(slug);
  return { props: { meta, html } };
};
