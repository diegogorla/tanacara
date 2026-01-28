import Link from 'next/link';

/**
 * Navigation bar for the site.
 * Includes links to the radar and newsletter categories.
 */
export default function NavBar() {
  return (
    <nav>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href="/">
          <strong>Tanacara</strong>
        </Link>
        <div style={{ marginLeft: 'auto' }}>
          <Link href="/radar">Radar</Link>
          <Link href="/newsletter">Newsletter</Link>
          <Link href="/newsletter/politica">Política</Link>
          <Link href="/newsletter/ciencias">Ciências</Link>
          <Link href="/newsletter/tecnologia">Tecnologia</Link>
        </div>
      </div>
    </nav>
  );
}