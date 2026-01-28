import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts, PostMeta } from '../../lib/posts';

interface Props {
  posts: PostMeta[];
}

export default function CienciasPage({ posts }: Props) {
  return (
    <div>
      <h1>Newsletter de Ciências Atuais</h1>
      <p>Descobertas recentes, avanços em linguística, física, astronomia, filosofia e sociologia explicados de forma acessível.</p>
      {posts.length === 0 && <p>Nenhum boletim disponível ainda.</p>}
      {posts.map((post) => (
        <div key={post.slug} className="card">
          <h2><Link href={`/newsletter/ciencias/${post.slug}`}>{post.title}</Link></h2>
          <p><small>{new Date(post.date).toLocaleDateString('pt-BR')}</small></p>
          {post.image && (
            <img src={post.image} alt="Preview" style={{ maxWidth: '100%', borderRadius: '0.5rem' }} />
          )}
          <p>{post.summary}</p>
          <p><Link href={`/newsletter/ciencias/${post.slug}`}>Ler mais</Link></p>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts('newsletter/ciencias');
  return { props: { posts } };
};