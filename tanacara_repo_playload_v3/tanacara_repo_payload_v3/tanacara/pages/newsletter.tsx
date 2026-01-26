import Layout from '../components/Layout';
import Link from 'next/link';

export default function Newsletter() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '';

  return (
    <Layout title="Newsletter" description="Receba o Radar e as ofertas (sem spam).">
      <main className="container">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Newsletter Tanacara</h1>
          <p>
            1 e-mail por semana com: <strong>Radar</strong> + <strong>1 ferramenta</strong> + <strong>1 ideia de monetização</strong>.
          </p>
          <hr />

          {!endpoint ? (
            <>
              <p className="small">
                Falta configurar o endpoint do formulário (Formspree). É rápido:
              </p>
              <ol className="small">
                <li>Crie uma conta em Formspree e crie um form.</li>
                <li>Copie o endpoint (algo como <code>https://formspree.io/f/xxxxxx</code>).</li>
                <li>Na Vercel, vá em <strong>Project → Settings → Environment Variables</strong> e crie:</li>
              </ol>
              <pre><code>NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/SEU_ID</code></pre>
              <p className="small">Depois disso, o formulário aparece aqui automaticamente.</p>
            </>
          ) : (
            <form action={endpoint} method="POST" className="card" style={{ borderRadius: 12 }}>
              <input type="hidden" name="_subject" value="Novo inscrito — Newsletter Tanacara" />
              <input type="hidden" name="_redirect" value="https://www.tanacara.com/obrigado" />

              <label className="small">Seu e-mail</label>
              <input
                name="email"
                type="email"
                required
                placeholder="voce@exemplo.com"
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'inherit',
                  marginTop: 8
                }}
              />

              <button
                type="submit"
                style={{
                  marginTop: 12,
                  width: '100%',
                  padding: 12,
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
              >
                Quero receber
              </button>

              <p className="small" style={{ marginTop: 12, opacity: 0.75 }}>
                Ao assinar, você concorda com a <Link href="/politica">Política</Link>.
              </p>
            </form>
          )}

          <hr />
          <p className="small" style={{ margin: 0 }}>
            Alternativa: se preferir, baixe o <Link href="/kit">Kit gratuito</Link> e use a lista de tarefas.
          </p>
        </div>
      </main>
    </Layout>
  );
}
