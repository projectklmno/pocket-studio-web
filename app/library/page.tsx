import LibraryClient from '@/components/LibraryClient';

export default function LibraryPage() {
  return (
    <div style={{ padding:  40, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 30, fontSize: 36, color: '#fff', textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)' }}>📚 My Library</h1>
      <LibraryClient />
    </div>
  );
}