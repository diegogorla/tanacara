#!/usr/bin/env node
// Este script gera boletins das newsletters Tanacara.
// Ele coleta itens de RSS em várias línguas, traduz e resume para pt-BR usando Gemini.
// Exige que a variável de ambiente GEMINI_API_KEY esteja definida e que os pacotes
// @google/genai e rss-parser estejam instalados.

import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import { GoogleGenAI } from '@google/genai';
import { formatISO } from 'date-fns';

const parser = new Parser();

const CATEGORIES = {
  politica: [
    // Exemplos de fontes de política internacional (alterar conforme preferência)
    'https://www1.folha.uol.com.br/poder/rss.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    'https://www.lemonde.fr/international/rss_full.xml'
  ],
  ciencias: [
    'https://www.nature.com/nature/articles?type=news&rss=1',
    'https://rss.sciam.com/ScientificAmerican-News',
    'https://www.innovationnewsnetwork.com/feed/'
  ],
  tecnologia: [
    'https://feeds.feedburner.com/TechCrunch/',
    'https://feeds.arstechnica.com/arstechnica/index/',
    'https://www.theverge.com/rss/index.xml'
  ]
};

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

async function fetchItemsForCategory(category, maxItems = 5) {
  const urls = CATEGORIES[category] || [];
  const all = [];
  for (const url of urls) {
    try {
      const feed = await parser.parseURL(url);
      feed.items.slice(0, maxItems).forEach((item) => {
        all.push({
          title: item.title || '',
          link: item.link || '',
          snippet: item.contentSnippet || item.content || '',
          isoDate: item.isoDate || '',
          source: feed.title || url
        });
      });
    } catch (e) {
      console.error('Falha RSS', url, e.message);
    }
  }
  // Ordena por data desc
  all.sort((a, b) => (b.isoDate || '').localeCompare(a.isoDate || ''));
  return all.slice(0, maxItems);
}

function systemPrompt(category) {
  // Gera prompt base para cada categoria
  const base = `Você é um analista da newsletter Tanacara (pt-BR) na categoria ${category}.
Resumo deve ser objetivo, sem alucinação e com ênfase nos fatos. Informe sempre as fontes. Traduza tudo para português do Brasil.`;
  return base;
}

async function summarize(ai, category, item) {
  const prompt = `${systemPrompt(category)}\n\nTítulo: ${item.title}\nResumo original: ${item.snippet}\nLink: ${item.link}\n\nEscreva um título chamativo em pt-BR, um resumo (2–3 frases), corpo do texto em 2–3 parágrafos e lista de 3 pontos importantes. Responda em JSON no formato {"title","summary","body","points"}.`;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  });
  const text = response.text?.trim() || '';
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('Resposta inválida do modelo');
  return JSON.parse(text.slice(start, end + 1));
}

function toMarkdown(post, category, sourceUrl) {
  const now = new Date();
  const date = formatISO(now);
  const slug = slugify(post.title);
  const frontmatter = [
    '---',
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    `summary: "${post.summary.replace(/"/g, '\\"')}"`,
    `tags: ["${category}"]`,
    `sourceUrls: ["${sourceUrl}"]`,
    '---\n'
  ].join('\n');
  const body = `${post.body}\n\n### Pontos principais\n${post.points.map((p) => `- ${p}`).join('\n')}`;
  return { slug, md: frontmatter + body + '\n' };
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Defina GEMINI_API_KEY');
    process.exit(1);
  }
  const ai = new GoogleGenAI({});
  for (const category of Object.keys(CATEGORIES)) {
    const items = await fetchItemsForCategory(category);
    for (const item of items) {
      try {
        const post = await summarize(ai, category, item);
        const { slug, md } = toMarkdown(post, category, item.link);
        const dir = path.join(process.cwd(), 'content', 'newsletter', category);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, `${slug}.md`);
        if (fs.existsSync(filePath)) continue;
        fs.writeFileSync(filePath, md, 'utf8');
        console.log('Gerado', category, slug);
      } catch (e) {
        console.error('Erro ao processar item', item.title, e);
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});