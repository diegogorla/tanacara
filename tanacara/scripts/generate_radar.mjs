import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import slugify from 'slugify';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const parser = new Parser();

// You can add or replace RSS feeds here
const SOURCES = [
  'https://blog.google/rss/',
  'https://www.theverge.com/rss/index.xml',
];

function todayBR() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function fetchItems(maxItems = 12) {
  const all = [];
  for (const url of SOURCES) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items.slice(0, 6)) {
        all.push({
          source: feed.title || url,
          title: item.title || '',
          link: item.link || '',
          snippet: item.contentSnippet || item.content || '',
          isoDate: item.isoDate || ''
        });
      }
    } catch (e) {
      console.error('RSS fail:', url, e.message);
    }
  }
  // sort by date desc if isoDate exists
  all.sort((a, b) => (b.isoDate || '').localeCompare(a.isoDate || ''));
  return all.slice(0, maxItems);
}

async function generateRadar(items) {
  const itemsText = items
    .map((it, i) => {
      return `${i + 1}) ${it.title}\nFonte: ${it.source}\nLink: ${it.link}\nResumo bruto: ${String(it.snippet).slice(0, 280)}\n`;
    })
    .join('\n');

  const prompt = `
Você é o editor do site Tanacara (PT-BR). Gere um \"Radar\" diário.
Regras:
- Use tom profissional, direto e humano.
- Faça 6 a 8 tópicos, cada um com:
  (a) O que aconteceu (1-2 frases)
  (b) Por que importa (1 frase)
  (c) Link da fonte (mantenha o URL)
- Depois, inclua uma seção \"Recomendação do dia\" com 1 ferramenta digital (genérica, sem inventar preços) e 1 CTA para newsletter.
- Não invente fatos além do que está nos itens. Se algo estiver incerto, declare incerteza.
- Saída final em Markdown.

Itens do dia:
${itemsText}
`;

  const resp = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return resp.text || '';
}

async function main() {
  const date = todayBR();
  const items = await fetchItems();
  if (items.length < 4) {
    throw new Error('Poucos itens coletados. Ajuste fontes RSS.');
  }
  const md = await generateRadar(items);

  const title = `Radar Tanacara — ${date}`;
  const slug = slugify(`radar-${date}`, { lower: true, strict: true });

  const outDir = path.join(process.cwd(), 'content', 'radar');
  fs.mkdirSync(outDir, { recursive: true });
  const filePath = path.join(outDir, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    console.log('Já existe:', filePath);
    return;
  }

  const frontmatter = `---\ntitle: "${title}"\ndate: "${date}"\ntype: "radar"\n---\n\n`;
  fs.writeFileSync(filePath, frontmatter + md.trim() + '\n', 'utf-8');
  console.log('Gerado:', filePath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
