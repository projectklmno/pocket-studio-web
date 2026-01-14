'use client';

import AudioRecorder from '@/components/AudioRecorder';
import { useThemedStyles } from '@/components/useThemedStyles';

export default function RecordPage() {
  const { getTextColor, getTextShadow } = useThemedStyles();
  
  return (
    <div style={{ padding: 40, maxWidth:  1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom:  30, fontSize: 36, color: getTextColor(), textShadow: getTextShadow() }}>🎤 Recording Studio</h1>
      <AudioRecorder />
    </div>
  );
}