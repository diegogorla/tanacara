import Layout from '../components/Layout';

export default function Sobre() {
  return (
    <Layout title="Sobre" description="O que é a Tanacara e como ela ganha dinheiro.">
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Sobre a Tanacara</h1>
          <p>
            Tanacara é um site de curadoria + automação: um radar de ferramentas digitais e ideias de uso real.
            A promessa é simples: <strong>menos ruído</strong>, <strong>mais decisão</strong>.
          </p>
          <hr />
          <h2>Como a Tanacara monetiza</h2>
          <ul>
            <li><strong>Afiliados</strong> (links de ferramentas e cursos).</li>
            <li><strong>Produtos próprios</strong> (kits, templates, mini-cursos, mini-apps).</li>
            <li><strong>Anúncios</strong> (quando houver tráfego e páginas suficientes).</li>
          </ul>
          <p className="small" style={{ opacity: 0.8 }}>
            Transparência é regra: quando houver link afiliado, ele pode gerar comissão sem custo extra para você.
          </p>
        </div>
      </main>
    </Layout>
  );
}
