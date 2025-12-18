'use client';

import { useTheme } from './ThemeProvider';

export function useThemedStyles() {
  const { theme } = useTheme();

  const getTextColor = () => theme === 'light' ? '#2d3436' : '#fff';
  const getSecondaryTextColor = () => theme === 'light' ? '#636e72' : 'rgba(255, 255, 255, 0.8)';
  
  const getGlassStyle = (opacity: number = 0.15) => ({
    background: theme === 'light' ? `rgba(255, 255, 255, ${opacity + 0.25})` : `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
    boxShadow: theme === 'light' ? '0 8px 32px 0 rgba(0, 0, 0, 0.15)' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  });

  const getButtonStyle = () => ({
    background: theme === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: getTextColor(),
    border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)'}`,
    boxShadow: theme === 'light' ? '0 8px 32px 0 rgba(0, 0, 0, 0.15)' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  });

  const getTextShadow = () => theme === 'light' ? '0 2px 10px rgba(0, 0, 0, 0.1)' : '0 2px 20px rgba(0, 0, 0, 0.3)';

  return {
    theme,
    getTextColor,
    getSecondaryTextColor,
    getGlassStyle,
    getButtonStyle,
    getTextShadow,
  };
}
