import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';

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
        <ThemeProvider>
          <Navigation />
          <main style={mainStyle}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

const mainStyle = {
  minHeight: 'calc(100vh - 70px)',
};