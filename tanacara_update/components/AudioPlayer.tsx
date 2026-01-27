import { useState } from 'react';

interface AudioPlayerProps {
  /**
   * Text content to convert to speech. Should be short (a few paragraphs).
   */
  text: string;
}

/**
 * AudioPlayer component requests a TTS audio stream from the API route
 * and provides a play/pause button. Requires ELEVENLABS_API_KEY and
 * ELEVENLABS_VOICE_ID environment variables to be defined on the server.
 */
export default function AudioPlayer({ text }: AudioPlayerProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Falha ao gerar áudio');
      const { url } = await res.json();
      setAudioUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={handleGenerate} disabled={loading} style={{ marginRight: '1rem' }}>
        {loading ? 'Gerando...' : 'Ouvir com voz Tanacara'}
      </button>
      {audioUrl && (
        <audio controls src={audioUrl} style={{ verticalAlign: 'middle' }} />
      )}
    </div>
  );
}