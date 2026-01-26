import { useRouter } from 'next/router';

export default function RadarItem() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <main>
      <h1>Radar: {String(slug)}</h1>
      <p>Detalhes do item: {String(slug)}</p>
    </main>
  );
}