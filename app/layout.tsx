import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pocket Studio - Audio Recording Studio',
  description: 'Professional audio recording studio in your browser',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={navStyle}>
          <a href="/" style={logoStyle}>🎤 Pocket Studio</a>
          <div style={navLinksStyle}>
            <a href="/player" style={navLinkStyle}>Player</a>
            <a href="/record" style={navLinkStyle}>Record</a>
            <a href="/editor" style={navLinkStyle}>Editor</a>
            <a href="/library" style={navLinkStyle}>Library</a>
          </div>
        </nav>
        <main style={mainStyle}>{children}</main>
      </body>
    </html>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 40px',
  background: '#000',
  color: '#fff',
  borderBottom: '2px solid #0070f3',
};

const logoStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textDecoration: 'none',
  color: '#fff',
};

const navLinksStyle = {
  display: 'flex',
  gap: 20,
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: 4,
  transition: 'background 0.2s',
};

const mainStyle = {
  minHeight: 'calc(100vh - 70px)',
};