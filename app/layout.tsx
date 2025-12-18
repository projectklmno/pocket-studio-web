import type { Metadata } from 'next';
import Link from 'next/link';
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
          <Link href="/" style={logoStyle}>🎤 Pocket Studio</Link>
          <div style={navLinksStyle}>
            <Link href="/player" style={navLinkStyle}>Player</Link>
            <Link href="/record" style={navLinkStyle}>Record</Link>
            <Link href="/editor" style={navLinkStyle}>Editor</Link>
            <Link href="/library" style={navLinkStyle}>Library</Link>
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
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  color: '#fff',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

const logoStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textDecoration: 'none',
  color: '#fff',
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
};

const navLinksStyle = {
  display: 'flex',
  gap: 20,
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: 12,
  transition: 'all 0.3s ease',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
};

const mainStyle = {
  minHeight: 'calc(100vh - 70px)',
};