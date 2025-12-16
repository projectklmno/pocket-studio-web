import LibraryClient from '@/components/LibraryClient';

export default function LibraryPage() {
  return (
    <div style={{ padding:  40, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 30, fontSize: 36 }}>📚 My Library</h1>
      <LibraryClient />
    </div>
  );
}