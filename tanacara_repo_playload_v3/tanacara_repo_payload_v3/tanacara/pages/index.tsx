import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Tanacara</h1>
          <p className="small">
            Radar diário de tecnologia, apps e ferramentas — atualizado automaticamente.
          </p>
          <hr />
          <div className="grid">
            <div className="card col-12 col-6">
              <h2 style={{ marginTop: 0 }}>Comece pelo Radar</h2>
              <p>Posts curtos com prós/contras e “o que fazer agora”.</p>
              <p style={{ marginBottom: 0 }}>
                <Link href="/radar">Abrir Radar →</Link>
              </p>
            </div>

            <div className="card col-12 col-6">
              <h2 style={{ marginTop: 0 }}>Transforme em receita</h2>
              <p>Leads + ofertas + funil (sem gambiarra cara).</p>
              <p style={{ marginBottom: 0 }}>
                <Link href="/kit">Baixar kit gratuito →</Link>
              </p>
            </div>
          </div>

          <hr />
          <p className="small" style={{ marginBottom: 0, opacity: 0.85 }}>
            (Sim, isso aqui vira uma máquina de conteúdo. Não, ela não precisa de cafeína.)
          </p>
        </div>
      </main>
    </Layout>
  );
}
