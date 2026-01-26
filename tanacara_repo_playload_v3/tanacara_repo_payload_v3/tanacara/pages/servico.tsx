import Layout from '../components/Layout';

export default function Servico() {
  return (
    <Layout title="Serviço" description="Implementação rápida: site + automação + monetização inicial.">
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Serviço: colocar seu site “rentável mínimo” no ar</h1>
          <p>
            Se você quer sair do zero e chegar em <strong>conteúdo + leads + ofertas</strong> com um stack simples
            (GitHub + Vercel + automação), eu posso te ajudar a implementar rápido.
          </p>

          <hr />

          <h2>O que eu entrego</h2>
          <ul>
            <li>Setup GitHub + Vercel + domínio</li>
            <li>Automação de conteúdo (pipeline diário)</li>
            <li>Páginas de monetização: ofertas, kit, newsletter</li>
            <li>Rastreamento de cliques (links /go)</li>
          </ul>

          <h2>Como funciona</h2>
          <ol>
            <li>Você diz o nicho e 3 ofertas (afiliados/produtos).</li>
            <li>Eu ajusto o site e deixo o funil pronto.</li>
            <li>Você publica e começa a medir cliques/inscrições.</li>
          </ol>

          <hr />

          <h2>Contato</h2>
          <p className="small">
            Coloque aqui seu canal preferido (WhatsApp, e-mail, Instagram). Por enquanto, deixei placeholders:
          </p>
          <p style={{ marginBottom: 0 }}>
            <a href="mailto:contato@tanacara.com">contato@tanacara.com</a> ·{' '}
            <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">WhatsApp</a>
          </p>

          <p className="small" style={{ marginTop: 12, opacity: 0.8 }}>
            Observação: este é um “produto-serviço” rápido. Quando você quiser, dá para evoluir para cursos, templates e apps.
          </p>
        </div>
      </main>
    </Layout>
  );
}
