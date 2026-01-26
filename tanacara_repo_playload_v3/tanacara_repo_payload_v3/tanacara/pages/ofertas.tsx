import Layout from '../components/Layout';
import Link from 'next/link';
import { OFFERS } from '../lib/offers';

export default function Ofertas() {
  return (
    <Layout title="Ofertas" description="Ferramentas e serviços recomendados — com transparência.">
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Ofertas e recomendações</h1>
          <p className="small">
            Aqui ficam ferramentas que fazem sentido para quem quer produzir, automatizar e vender no digital.
            A ideia é simples: <strong>menos hype</strong>, <strong>mais utilidade</strong>.
          </p>
          <hr />
          <p className="small">
            Dica: os links abaixo passam por <code>/go/</code> para facilitar medição (cliques) via analytics.
          </p>
        </div>

        <div style={{ height: 16 }} />

        <div className="grid">
          {OFFERS.map((o) => (
            <article key={o.slug} className="card col-12 col-6">
              <h2 style={{ marginTop: 0 }}>{o.title}</h2>
              <p>{o.description}</p>
              {!!o.tags?.length && <p className="small">Tags: {o.tags.join(', ')}</p>}
              <p style={{ marginBottom: 0 }}>
                <a href={`/go/${o.slug}`} rel="sponsored noreferrer" target="_blank">
                  Ver agora →
                </a>
              </p>
            </article>
          ))}
        </div>

        <div style={{ height: 16 }} />

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Quer que eu recomende ferramentas para o seu caso?</h2>
          <p className="small">
            Responda 3 perguntas rápidas e eu te devolvo um “stack” enxuto (sem gastar à toa).
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link href="/newsletter">Entrar na newsletter</Link> (respondo por e-mail) ·{' '}
            <Link href="/kit">Baixar o kit gratuito</Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
