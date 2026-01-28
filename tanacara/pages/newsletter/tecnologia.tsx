import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts, PostMeta } from '../../lib/posts';

interface Props {
  posts: PostMeta[];
}

export default function TecnologiaPage({ posts }: Props) {
  return (
    <div>
      <h1>Newsletter de Tecnologia de Ponta</h1>
      <p>Atualizações sobre inteligência artificial, engenharia aeroespacial, energias renováveis, gadgets inovadores e desenvolvimento de aplicativos.</p>
      {posts.length === 0 && <p>Nenhum boletim disponível ainda.</p>}
      {posts.map((post) => (
        <div key={post.slug} className="card">
          <h2><Link href={`/newsletter/tecnologia/${post.slug}`}>{post.title}</Link></h2>
          <p><small>{new Date(post.date).toLocaleDateString('pt-BR')}</small></p>
          {post.image && (
            <img src={post.image} alt="Preview" style={{ maxWidth: '100%', borderRadius: '0.5rem' }} />
          )}
          <p>{post.summary}</p>
          <p><Link href={`/newsletter/tecnologia/${post.slug}`}>Ler mais</Link></p>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts('newsletter/tecnologia');
  return { props: { posts } };
};