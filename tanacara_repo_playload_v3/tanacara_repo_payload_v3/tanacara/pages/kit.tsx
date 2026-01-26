import Layout from '../components/Layout';
import Link from 'next/link';

export default function Kit() {
  return (
    <Layout title="Kit" description="Kit gratuito com prompts e checklist para colocar monetização no ar.">
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Kit gratuito (comece hoje)</h1>
          <p>
            Um pacote enxuto para você sair do “esqueleto no ar” e chegar em <strong>leads + ofertas + funil</strong>.
          </p>
          <hr />
          <p>
            ✅ <a href="/kit-tanacara.pdf" target="_blank" rel="noreferrer">Baixar o PDF agora</a>
          </p>

          <p className="small">
            Próximo passo: configure a captura de e-mails em <Link href="/newsletter">Newsletter</Link> e
            adicione seus links de afiliado em <Link href="/ofertas">Ofertas</Link>.
          </p>
        </div>

        <div style={{ height: 16 }} />

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Versão Pro (quando você quiser)</h2>
          <p className="small">
            Quando você criar seu checkout (Kiwify/Hotmart/Gumroad), cole aqui o link do produto e pronto.
          </p>
          <p className="small">
            Por enquanto, isso é um placeholder:
          </p>
          <p style={{ marginBottom: 0 }}>
            <a href="https://example.com" target="_blank" rel="noreferrer">Comprar Kit Pro →</a>
          </p>
        </div>
      </main>
    </Layout>
  );
}
