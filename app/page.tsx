'use client';

import Link from 'next/link';
import { useThemedStyles } from '@/components/useThemedStyles';

export default function Home() {
  const { getTextColor, getGlassStyle, getTextShadow } = useThemedStyles();

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto' }}>
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 48, marginBottom: 10, color: getTextColor(), textShadow: getTextShadow() }}>🎤 Pocket Studio</h1>
        <p style={{ fontSize: 18, color: getTextColor() }}>
          Professional audio recording studio in your browser
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <Card
          title="🎵 Karaoke Player"
          description="Play songs with synchronized CDG lyrics"
          link="/player"
        />
        <Card
          title="🎤 Record Studio"
          description="Record vocals over instrumentals with effects"
          link="/record"
        />
        <Card
          title="✏️ Lyrics Editor"
          description="Add and sync lyrics to your music"
          link="/editor"
        />
        <Card
          title="📚 My Library"
          description="Browse uploaded tracks and recordings"
          link="/library"
        />
      </div>

      <section style={{ 
        marginTop: 60, 
        padding: 30, 
        ...getGlassStyle(0.15),
        borderRadius: 16,
      }}>
        <h2 style={{ marginBottom: 20, color: getTextColor() }}>Quick Start</h2>
        <ol style={{ lineHeight: 2, paddingLeft: 20, color: getTextColor() }}>
          <li>Upload your instrumental track (MP3/WAV)</li>
          <li>Add lyrics using the editor or upload CDG file</li>
          <li>Record your vocals in the studio</li>
          <li>Apply effects and download your final mix</li>
        </ol>
      </section>
    </div>
  );
}

function Card({ title, description, link }: { title: string; description:  string; link: string }) {
  const { getTextColor, getGlassStyle, getTextShadow } = useThemedStyles();
  
  return (
    <Link href={link}>
      <div
        style={{
          padding: 30,
          ...getGlassStyle(0.15),
          borderRadius: 16,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          height: '100%',
        }}
      >
        <h3 style={{ marginBottom: 10, color: getTextColor(), fontSize: 24, textShadow: getTextShadow() }}>{title}</h3>
        <p style={{ color: getTextColor(), margin: 0, fontSize: 16 }}>{description}</p>
      </div>
    </Link>
  );
}