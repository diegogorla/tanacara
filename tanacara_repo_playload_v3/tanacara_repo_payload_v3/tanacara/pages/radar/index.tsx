import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllPosts, PostMeta } from '../../lib/posts';

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts }, revalidate: 3600 };
}

export default function Radar({ posts }: { posts: PostMeta[] }) {
  return (
    <Layout title="Radar" description="Posts gerados automaticamente (com curadoria de fontes).">
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Radar</h1>
          <p className="small">
            Posts gerados automaticamente (com curadoria de fontes).
          </p>
          <p className="small" style={{ opacity: 0.85 }}>
            Quer monetizar? <Link href="/ofertas">Ofertas</Link> · <Link href="/newsletter">Newsletter</Link> · <Link href="/kit">Kit</Link>
          </p>
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
              <p className="small" style={{ marginBottom: 0 }}>
                Enquanto isso: <Link href="/kit">baixe o kit</Link> e <Link href="/newsletter">ative o formulário</Link>.
              </p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
