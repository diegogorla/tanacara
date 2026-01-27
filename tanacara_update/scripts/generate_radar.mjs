#!/usr/bin/env node
// Este script gera posts diários para a seção Radar do Tanacara.
// Ele usa o modelo Gemini para criar conteúdo original a partir de temas.

import fs from 'fs';
import path from 'path';
import { formatISO } from 'date-fns';
import { GoogleGenAI } from '@google/genai';

const OUT_DIR = path.join(process.cwd(), 'content', 'radar');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function safeWrite(filePath, content) {
  if (fs.existsSync(filePath)) return false;
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function getTopics() {
  return [
    'Ferramenta digital barata que resolve um problema real (produtividade/automação)',
    'App útil para criadores (vídeo/áudio/imagem) com bom custo-benefício',
    'Curso ou trilha de aprendizado (IA/automação/negócios) com proposta prática',
    'Notícia relevante de IA aplicada (sem hype vazio)'
  ];
}

function systemPrompt() {
  return `Você é o editor do site Tanacara (pt-BR).

Regras:
- Produza conteúdo útil, objetivo e com rigor terminológico.
- Não invente dados nem fontes; se citar algo, use URL oficial da empresa/projeto quando possível.
- Estilo: informativo, direto, com humor sutil quando couber.
- Estrutura do post: título, resumo (2-3 frases), corpo com subtítulos, lista de prós/contras, sugestão de uso, CTA discreto.
- Inclua de 1 a 3 URLs em "sourceUrls".

Retorne SOMENTE JSON com este schema:
{
  "title": string,
  "summary": string,
  "tags": string[],
  "sourceUrls": string[],
  "bodyMarkdown": string
}`;
}

async function generatePost(ai, topic) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { role: 'user', parts: [{ text: systemPrompt() }] },
      { role: 'user', parts: [{ text: `Tema do post: ${topic}` }] }
    ]
  });
  const text = response.text?.trim();
  if (!text) throw new Error('Resposta vazia do modelo.');
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  const json = JSON.parse(text.slice(start, end + 1));
  return json;
}

function toMarkdownFile({ title, summary, tags, sourceUrls, bodyMarkdown }) {
  const date = formatISO(new Date());
  return (
    `---\n` +
    `title: "${String(title).replace(/"/g, '\\"')}"\n` +
    `date: "${date}"\n` +
    `summary: "${String(summary).replace(/"/g, '\\"')}"\n` +
    `tags: [${(tags || []).map((t) => `"${String(t).replace(/"/g, '\\"')}"`).join(', ')}]\n` +
    `sourceUrls: [${(sourceUrls || []).map((u) => `"${String(u).replace(/"/g, '\\"')}"`).join(', ')}]\n` +
    '---\n\n' +
    `${bodyMarkdown}\n`
  );
}

async function main() {
  ensureDir(OUT_DIR);
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('ERRO: defina GEMINI_API_KEY');
    process.exit(1);
  }
  const ai = new GoogleGenAI({});
  const topics = getTopics();
  let created = 0;
  for (const topic of topics) {
    try {
      const post = await generatePost(ai, topic);
      const slug = slugify(post.title || topic);
      const filePath = path.join(OUT_DIR, `${slug}.md`);
      const md = toMarkdownFile(post);
      const ok = safeWrite(filePath, md);
      if (ok) created++;
    } catch (e) {
      console.error('Falha ao gerar post para tema', topic, e);
    }
  }
  console.log(`Posts criados: ${created}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});