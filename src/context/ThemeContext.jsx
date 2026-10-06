import React, { createContext, useContext, useState, useEffect } from 'react';

export const getTheme = (isDark) => ({
  isDark,
  // Backgrounds & Surfaces
  bg: isDark ? '#0B0D10' : '#F4F7FA',
  bgSecondary: isDark ? '#15191F' : '#EAEFF5',
  card: isDark ? '#1C222A' : '#FFFFFF',
  cardSub: isDark ? '#101419' : '#F0F4F8',
  cardHover: isDark ? '#232B35' : '#F8FAFC',
  border: isDark ? '#29313A' : '#D0D9E2',
  borderLight: isDark ? 'rgba(255,122,61,0.25)' : 'rgba(255,122,61,0.3)',
  
  // Accents & Brand (Obsidian Forge)
  copper: '#FF7A3D',     // Electric Copper (Primary Accent)
  gold: '#F5B942',       // Molten Gold (Secondary Accent)
  silver: '#C8D0D9',     // Titanium Silver (Highlight)
  
  // Text
  text: isDark ? '#F4F7FA' : '#0B0D10',          // Ice White vs Obsidian Black
  textBody: isDark ? '#AAB4BF' : '#2A3440',      // Body text
  muted: isDark ? '#8D98A5' : '#5C6878',         // Steel Gray
  
  // Status
  success: '#36D399',    // Forge Green
  error: '#FF4D4D',      // Ember Red
  
  // Signature Gradient (#FF7A3D → #F5B942)
  gradient: 'linear-gradient(135deg, #FF7A3D 0%, #F5B942 100%)',
  gradientHover: 'linear-gradient(135deg, #F5B942 0%, #FF7A3D 100%)',
  gradientSubtle: isDark 
    ? 'linear-gradient(135deg, rgba(255,122,61,0.14) 0%, rgba(245,185,66,0.07) 100%)'
    : 'linear-gradient(135deg, rgba(255,122,61,0.1) 0%, rgba(245,185,66,0.05) 100%)',
    
  glowCopper: '0 0 25px rgba(255, 122, 61, 0.3)',
  glowGold: '0 0 25px rgba(245, 185, 66, 0.3)',
});

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0B0D10';
      document.body.style.color = '#F4F7FA';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F4F7FA';
      document.body.style.color = '#0B0D10';
    }
  }, [isDark]);

  const T = getTheme(isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, T }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
