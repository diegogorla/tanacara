import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getPost, PostMeta } from '../../lib/posts';
import AudioPlayer from '../../components/AudioPlayer';

interface PostPageProps {
  meta: PostMeta;
  html: string;
}

export default function RadarPostPage({ meta, html }: PostPageProps) {
  if (!meta) return <p>Post não encontrado.</p>;
  return (
    <article>
      <h1>{meta.title}</h1>
      <p><small>{new Date(meta.date).toLocaleDateString('pt-BR')}</small></p>
      {meta.image && (
        <img src={meta.image} alt="Preview" style={{ maxWidth: '100%', borderRadius: '0.5rem', marginBottom: '1rem' }} />
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {/* AudioPlayer will generate audio using ElevenLabs */}
      <AudioPlayer text={`${meta.title}. ${meta.summary}`} />
      {meta.sourceUrls.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Fontes:</h4>
          <ul>
            {meta.sourceUrls.map((url) => (
              <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts('radar');
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPost('radar', slug);
  if (!post) return { notFound: true };
  return { props: { meta: post.meta, html: post.html } };
};