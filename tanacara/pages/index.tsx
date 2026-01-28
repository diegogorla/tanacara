import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tanacara — Radar diário</title>
        <meta name="description" content="Radar diário de política, ciências e tecnologia; newsletter e ofertas; atualizado automaticamente." />
      </Head>
      <main style={{ padding: '2rem' }}>
        <h1>Tanacara</h1>
        <p>Radar diário de política, ciências e tecnologia, com newsletter e ofertas.</p>
        <nav>
          <ul>
            <li><Link href="/radar">Radar</Link></li>
            <li><Link href="/newsletter/politica">Newsletter Política</Link></li>
            <li><Link href="/newsletter/ciencias">Newsletter Ciências</Link></li>
            <li><Link href="/newsletter/tecnologia">Newsletter Tecnologia</Link></li>
            <li><Link href="/ofertas">Ofertas</Link></li>
          </ul>
        </nav>
      </main>
    </>
  );
}
