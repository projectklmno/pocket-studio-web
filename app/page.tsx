import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto' }}>
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 48, marginBottom: 10, color: '#fff', textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)' }}>🎤 Pocket Studio</h1>
        <p style={{ fontSize: 18, color: '#fff' }}>
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
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}>
        <h2 style={{ marginBottom: 20, color: '#fff' }}>Quick Start</h2>
        <ol style={{ lineHeight: 2, paddingLeft: 20, color: '#fff' }}>
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
  return (
    <Link href={link}>
      <div
        style={{
          padding: 30,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 16,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          height: '100%',
        }}
      >
        <h3 style={{ marginBottom: 10, color: '#fff', fontSize: 24, textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>{title}</h3>
        <p style={{ color:  '#fff', margin: 0, fontSize: 16 }}>{description}</p>
      </div>
    </Link>
  );
}