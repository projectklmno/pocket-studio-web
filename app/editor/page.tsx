import LyricsEditor from '@/components/LyricsEditor';

export default function EditorPage() {
  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 30, fontSize: 36 }}>✏️ Lyrics Editor</h1>
      <LyricsEditor />
    </div>
  );
}