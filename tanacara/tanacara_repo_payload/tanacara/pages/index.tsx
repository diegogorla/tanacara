import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <div className="card">
        <h1>Tanacara</h1>
        <p className="small">Radar diário de tecnologia, apps e ferramentas — atualizado automaticamente.</p>
        <hr />
        <p>
          Comece por aqui: <Link href="/radar">Radar</Link>
        </p>
        <p className="small">
          (Sim, isso aqui vira uma máquina de conteúdo. Não, ela não precisa de cafeína.)
        </p>
      </div>
    </main>
  );
}
