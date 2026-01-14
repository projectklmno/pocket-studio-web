'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const { theme } = useTheme();

  const getThemedStyle = (baseStyle: Record<string, string | number>) => {
    if (theme === 'light') {
      return {
        ...baseStyle,
        color: '#2d3436',
      };
    }
    return baseStyle;
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    background: theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: theme === 'light' ? '#2d3436' : '#fff',
    borderBottom: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
    boxShadow: theme === 'light' ? '0 8px 32px 0 rgba(0, 0, 0, 0.15)' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  };

  const logoStyle = getThemedStyle({
    fontSize: 24,
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#fff',
    textShadow: theme === 'light' ? '0 2px 10px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.3)',
  });

  const navLinksContainerStyle = {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: 20,
  };

  const navLinkStyle = getThemedStyle({
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: 12,
    transition: 'all 0.3s ease',
    background: theme === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
    border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
  });

  return (
    <nav style={navStyle}>
      <Link href="/" style={logoStyle}>🎤 Pocket Studio</Link>
      <div style={navLinksContainerStyle}>
        <div style={navLinksStyle}>
          <Link href="/player" style={navLinkStyle}>Player</Link>
          <Link href="/record" style={navLinkStyle}>Record</Link>
          <Link href="/editor" style={navLinkStyle}>Editor</Link>
          <Link href="/library" style={navLinkStyle}>Library</Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
