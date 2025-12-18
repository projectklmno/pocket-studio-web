'use client';

import LibraryClient from '@/components/LibraryClient';
import { useThemedStyles } from '@/components/useThemedStyles';

export default function LibraryPage() {
  const { getTextColor, getTextShadow } = useThemedStyles();
  
  return (
    <div style={{ padding:  40, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 30, fontSize: 36, color: getTextColor(), textShadow: getTextShadow() }}>📚 My Library</h1>
      <LibraryClient />
    </div>
  );
}