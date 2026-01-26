import Layout from '../components/Layout';

export default function Politica() {
  return (
    <Layout title="Política" description="Privacidade, cookies e transparência de links.">
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Política & Privacidade</h1>

          <h2>Privacidade</h2>
          <p className="small">
            A Tanacara pode coletar métricas de navegação para entender quais páginas funcionam melhor (analytics).
            Se você assinar a newsletter, seu e-mail será usado apenas para envio de conteúdo da Tanacara.
          </p>

          <h2>Afiliados</h2>
          <p className="small">
            Alguns links podem ser de afiliados. Se você comprar por eles, a Tanacara pode receber uma comissão.
            Isso não aumenta o preço para você.
          </p>

          <h2>Cookies</h2>
          <p className="small">
            Cookies podem ser utilizados por serviços de analytics e (futuramente) anúncios. Quando ativarmos anúncios,
            manteremos este texto atualizado.
          </p>

          <p className="small" style={{ opacity: 0.75 }}>
            Atualizado: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </main>
    </Layout>
  );
}
