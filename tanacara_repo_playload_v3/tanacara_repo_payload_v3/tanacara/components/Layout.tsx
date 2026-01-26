import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export default function Layout({ title, description, children }: Props) {
  const pageTitle = title ? `${title} | Tanacara` : 'Tanacara';
  const pageDesc =
    description ??
    'Radar diário de tecnologia, apps e ferramentas — atualizado automaticamente.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
      </Head>

      <header className="container" style={{ paddingBottom: 0 }}>
        <nav className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <strong style={{ fontSize: 18 }}>Tanacara</strong>
            </Link>
            <span className="small" style={{ opacity: 0.75 }}>conteúdo que vira receita (sem virar picaretagem)</span>
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link href="/radar">Radar</Link>
            <Link href="/ofertas">Ofertas</Link>
            <Link href="/kit">Kit</Link>
            <Link href="/newsletter">Newsletter</Link>
            <Link href="/sobre">Sobre</Link>
          </div>
        </nav>
      </header>

      {children}

      <footer className="container" style={{ paddingTop: 0 }}>
        <div className="card">
          <p className="small" style={{ margin: 0 }}>
            Transparência: alguns links podem ser de afiliados. Se você comprar por eles, a Tanacara pode receber comissão
            — sem custo extra para você.
          </p>
          <p className="small" style={{ margin: '10px 0 0 0', opacity: 0.75 }}>
            <Link href="/politica">Política & Privacidade</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
