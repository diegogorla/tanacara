import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getAllPosts, PostMeta } from '../../lib/posts';

interface RadarProps {
  posts: PostMeta[];
}

export default function RadarPage({ posts }: RadarProps) {
  return (
    <div>
      <h1>Radar diário</h1>
      {posts.length === 0 && <p>Nenhum post no radar ainda.</p>}
      {posts.map((post) => (
        <div key={post.slug} className="card">
          <h2><Link href={`/radar/${post.slug}`}>{post.title}</Link></h2>
          <p><small>{new Date(post.date).toLocaleDateString('pt-BR')}</small></p>
          {post.image && (
            <img src={post.image} alt="Preview" style={{ maxWidth: '100%', borderRadius: '0.5rem' }} />
          )}
          <p>{post.summary}</p>
          <p>
            <Link href={`/radar/${post.slug}`}>Ler mais</Link>
          </p>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<RadarProps> = async () => {
  const posts = getAllPosts('radar');
  return { props: { posts } };
};