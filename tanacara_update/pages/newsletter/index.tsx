import Link from 'next/link';

export default function NewsletterIndex() {
  return (
    <div>
      <h1>Newsletters</h1>
      <p>Escolha uma das nossas newsletters temáticas:</p>
      <ul>
        <li><Link href="/newsletter/politica">Política Internacional</Link></li>
        <li><Link href="/newsletter/ciencias">Ciências Atuais</Link></li>
        <li><Link href="/newsletter/tecnologia">Tecnologia de Ponta</Link></li>
      </ul>
    </div>
  );
}