import { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Top-level layout component that wraps every page.
 * Includes the navigation bar and a footer.
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <main className="container">
        {children}
      </main>
      <footer>
        &copy; {new Date().getFullYear()} Tanacara &mdash; Conteúdo automatizado para quem quer ir além.
      </footer>
    </>
  );
}