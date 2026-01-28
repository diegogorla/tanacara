# Tanacara

Site automatizado para a newsletter e radar diário Tanacara.

Este repositório contém o código fonte de uma aplicação Next.js que gera conteúdos automáticos a partir de feeds RSS e da API Gemini.

## Conteúdo

- **`tanacara/`** – código da aplicação Next.js, páginas e componentes.
- **`.github/workflows/`** – pipelines GitHub Actions para gerar o Radar diário e as newsletters.
- **`tanacara/scripts/`** – scripts Node.js responsáveis por coletar notícias, chamar o modelo e gravar posts em Markdown.
- **`tanacara/content/`** – posts gerados automaticamente.

## Como rodar localmente

```bash
npm install
npm run dev
```

## Automatizações

Os workflows estão configurados para rodar diariamente via GitHub Actions. É necessário definir as seguintes secrets no repositório:

- `GEMINI_API_KEY` – chave da API Gemini para geração de conteúdo.

Opcionalmente, configure também `NEXT_PUBLIC_FORMSPREE_*` e `ELEVENLABS_*` para integrações de formulário e voz.