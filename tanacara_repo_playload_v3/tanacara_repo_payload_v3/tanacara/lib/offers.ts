export type Offer = {
  slug: string;
  title: string;
  description: string;
  url: string; // destino externo
  tags?: string[];
};

// IMPORTANTE:
// 1) Troque os URLs abaixo pelos seus links oficiais/afiliados (com UTM/ID).
// 2) A página /go/[slug] redireciona para estes links (e isso permite medir cliques via analytics).
export const OFFERS: Offer[] = [
  {
    slug: 'brevo',
    title: 'Brevo (newsletter/CRM) — plano gratuito',
    description: 'Lista de e-mails + automações básicas. Bom para começar funil com custo zero.',
    url: 'https://www.brevo.com/',
    tags: ['newsletter', 'funil']
  },
  {
    slug: 'formspree',
    title: 'Formspree — formulário sem backend',
    description: 'Capte leads com um formulário estático e receba por e-mail (ótimo para MVP).',
    url: 'https://formspree.io/',
    tags: ['leads', 'mvp']
  },
  {
    slug: 'vercel',
    title: 'Vercel — deploy simples do Next.js',
    description: 'Hospedagem com CI/CD automático pelo GitHub. Ideal para Tanacara.',
    url: 'https://vercel.com/',
    tags: ['deploy']
  }
];
