# Tanacara — MVP (Next.js + Radar automático)

Este repositório contém o código-fonte do Tanacara, um site desenvolvido com Next.js e TypeScript para publicação automática de um Radar diário de tecnologia, política e ciências, além de páginas de ofertas e newsletter.

## Rodar localmente
1. Instale Node 18+ (recomendado 20).
2. Entre na pasta do app:
   ```bash
   cd tanacara
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Gerar posts manualmente
Defina a variável de ambiente `GEMINI_API_KEY` e execute:
```bash
npm run gen:radar
```

## Deploy
Na Vercel, importe o repositório e defina `Root Directory` para `tanacara`.

## Onde ficam os posts
Os posts gerados ficam em `tanacara/content/radar/*.md`.

## Conteúdo
As páginas ficam em `tanacara/pages`, incluindo:
- `/radar` para listar posts.
- `/radar/[slug]` para cada post individual.
- `/ofertas` para ofertas e afiliados.
- `/newsletter` para inscrição em newsletters segmentadas.
- Outras páginas conforme design do projeto.
