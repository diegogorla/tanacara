import Link from 'next/link';
import { getAllPosts, PostMeta } from '../../lib/posts';

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts }, revalidate: 3600 };
}

export default function Radar({ posts }: { posts: PostMeta[] }) {
  return (
    <main className="container">
      <div className="card">
        <h1>Radar</h1>
        <p className="small">Posts gerados automaticamente (com curadoria de fontes).</p>
      </div>

      <div style={{ height: 16 }} />

      <div className="grid">
        {posts.map((p) => (
          <article key={p.slug} className="card col-12 col-6">
            <h2 style={{ marginTop: 0 }}>
              <Link href={`/radar/${p.slug}`}>{p.title}</Link>
            </h2>
            <p className="small">{new Date(p.date).toLocaleString('pt-BR')}</p>
            <p>{p.summary}</p>
            {!!p.tags?.length && (
              <p className="small">Tags: {p.tags.join(', ')}</p>
            )}
          </article>
        ))}

        {!posts.length && (
          <div className="card col-12">
            <p>Nenhum post ainda. Quando a automação rodar, isso aqui enche sozinho.</p>
          </div>
        )}
      </div>
    </main>
  );
}
