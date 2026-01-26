# Tanacara — MVP (Next.js + Radar automático)

## Rodar localmente
1) Instale Node 18+ (recomendado 20)
2) Entre na pasta do app:
   - `cd tanacara`
3) Instale dependências:
   - `npm install`
4) Rode:
   - `npm run dev`

## Gerar posts manualmente
- Defina `GEMINI_API_KEY` no ambiente (local) e rode:
  - `npm run gen:radar`

## Deploy
- Vercel importando o repo e definindo **Root Directory = tanacara**

## Onde ficam os posts
- `tanacara/content/radar/*.md`


## Páginas de monetização
- /ofertas (recomendações)
- /kit (PDF gratuito em /public/kit-tanacara.pdf)
- /newsletter (form via Formspree)
- /go/[slug] (redireciona para medir cliques)
