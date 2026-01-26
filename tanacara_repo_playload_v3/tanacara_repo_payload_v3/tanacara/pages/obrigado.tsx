import Layout from '../components/Layout';
import Link from 'next/link';

export default function Obrigado() {
  return (
    <Layout title="Obrigado" description="Inscrição confirmada.">
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Pronto ✅</h1>
          <p>Inscrição recebida. Se a caixa de entrada demorar, olhe o spam (ela é ciumenta).</p>
          <p className="small">
            Enquanto isso: <Link href="/ofertas">ver ofertas</Link> · <Link href="/radar">ler o Radar</Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
