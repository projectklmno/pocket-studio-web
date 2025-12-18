'use client';

import CdgPlayer from '@/components/CdgPlayer';
import { useThemedStyles } from '@/components/useThemedStyles';

export default function PlayerPage() {
  const { getTextColor, getTextShadow } = useThemedStyles();
  
  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 30, fontSize: 36, color: getTextColor(), textShadow: getTextShadow() }}>🎵 Karaoke Player</h1>
      <CdgPlayer />
    </div>
  );
}