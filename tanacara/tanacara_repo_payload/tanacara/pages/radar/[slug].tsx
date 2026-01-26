import Link from 'next/link';
import { getAllPosts, getPostHtml, PostMeta } from '../../lib/posts';

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getPostHtml(params.slug);
  if (!post) return { notFound: true };

  return {
    props: {
      meta: post.meta,
      html: post.html
    },
    revalidate: 3600
  };
}

export default function PostPage({ meta, html }: { meta: PostMeta; html: string }) {
  return (
    <main className="container">
      <div className="card">
        <p className="small"><Link href="/radar">← voltar</Link></p>
        <h1 style={{ marginTop: 0 }}>{meta.title}</h1>
        <p className="small">{new Date(meta.date).toLocaleString('pt-BR')}</p>
        {!!meta.tags?.length && (
          <p className="small">Tags: {meta.tags.join(', ')}</p>
        )}
        <hr />
        <article className="post" dangerouslySetInnerHTML={{ __html: html }} />
        {!!meta.sourceUrls?.length && (
          <>
            <hr />
            <h3>Fontes</h3>
            <ul>
              {meta.sourceUrls.map((u) => (
                <li key={u}><a href={u} target="_blank" rel="noreferrer">{u}</a></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
