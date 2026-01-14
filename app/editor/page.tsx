'use client';

import LyricsEditor from '@/components/LyricsEditor';
import { useThemedStyles } from '@/components/useThemedStyles';

export default function EditorPage() {
  const { getTextColor, getTextShadow } = useThemedStyles();
  
  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 30, fontSize: 36, color: getTextColor(), textShadow: getTextShadow() }}>✏️ Lyrics Editor</h1>
      <LyricsEditor />
    </div>
  );
}