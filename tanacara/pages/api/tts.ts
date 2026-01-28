import type { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }
  const { text } = req.body as { text: string };
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Texto inválido' });
  }
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey || !voiceId) {
    return res.status(500).json({ error: 'Configuração do ElevenLabs ausente. Defina ELEVENLABS_API_KEY e ELEVENLABS_VOICE_ID' });
  }
  try {
    // Faz a chamada para ElevenLabs
    const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.7
        }
      })
    });
    if (!ttsRes.ok) {
      const errorText = await ttsRes.text();
      throw new Error(`Erro ElevenLabs: ${ttsRes.status} ${errorText}`);
    }
    const buffer = Buffer.from(await ttsRes.arrayBuffer());
    // Salva o arquivo em /tmp e serve via rota
    const filename = `${randomUUID()}.mp3`;
    const outDir = path.join(process.cwd(), 'public', 'audio');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filePath = path.join(outDir, filename);
    fs.writeFileSync(filePath, buffer);
    // Retorna URL relativa
    const url = `/audio/${filename}`;
    return res.status(200).json({ url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Falha ao gerar áudio' });
  }
}