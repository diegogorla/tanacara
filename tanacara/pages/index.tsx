import Link from 'next/link';

export default function Home() {
  return (
    <div className="card">
      <h1>Tanacara</h1>
      <p>Bem-vindo ao Tanacara — sua fonte automatizada para notícias e análises sobre tecnologia, ciências e política internacional.</p>
      <p>
        Comece explorando nosso <Link href="/radar">Radar</Link> diário ou mergulhe nas nossas newsletters temáticas:
      </p>
      <ul>
        <li><Link href="/newsletter/politica">Política Internacional</Link></li>
        <li><Link href="/newsletter/ciencias">Ciências Atuais</Link></li>
        <li><Link href="/newsletter/tecnologia">Tecnologia de Ponta</Link></li>
      </ul>
      <p>Assine nossas newsletters e receba conteúdos exclusivos e análises aprofundadas diretamente no seu email.</p>
    </div>
  );
}