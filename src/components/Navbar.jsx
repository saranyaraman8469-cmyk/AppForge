import React from 'react';
import { Key, RefreshCw, Cpu, Sun, Moon, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ currentStage, onStartOver, onOpenSettings, onOpenTechStack, isDemoMode }) {
  const { isDark, toggleTheme, T } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 w-full transition-colors duration-250"
      style={{
        background: isDark ? 'rgba(11, 13, 16, 0.92)' : 'rgba(244, 247, 250, 0.92)',
        borderBottom: `1px solid ${T.border}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* ── Brand / Logo (FORGE with Metallic Lettering & Forged Spark/Anvil Icon) ── */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* Forged Spark / Anvil Geometric Symbol with Signature Gradient Accent */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-950 font-bold relative shadow-lg group transition-transform hover:scale-105"
            style={{
              background: T.gradient,
              boxShadow: '0 0 20px rgba(255, 122, 61, 0.35)',
            }}
          >
            {/* Minimal geometric anvil spark glyph */}
            <Flame className="w-5 h-5 text-slate-950 fill-current" />
            <div
              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
              style={{ background: '#F5B942', boxShadow: '0 0 8px #F5B942' }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-black text-xl tracking-wider uppercase font-mono"
                style={{
                  color: T.text,
                  letterSpacing: '0.08em',
                  textShadow: isDark ? '0 1px 4px rgba(0,0,0,0.8)' : 'none'
                }}
              >
                FORGE<span style={{ color: T.copper }}>APP</span>
              </span>
              <span
                className="text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest font-mono"
                style={{
                  background: isDark ? 'rgba(255,122,61,0.14)' : 'rgba(255,122,61,0.1)',
                  border: `1px solid rgba(255,122,61,0.35)`,
                  color: T.copper,
                }}
              >
                STUDIO
              </span>
            </div>
            <p className="text-[11px] hidden sm:block -mt-0.5" style={{ color: T.muted }}>
              Prompt → Understand → Plan → Build → Explain → Learn
            </p>
          </div>
        </div>

        {/* ── Right Controls ── */}
        <div className="flex items-center gap-2 sm:gap-2.5">

          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105"
            style={{
              background: isDark ? '#15191F' : '#EAEFF5',
              border: `1px solid ${T.border}`,
              color: isDark ? '#F5B942' : '#FF7A3D',
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline text-slate-300">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span className="hidden md:inline text-slate-700">Dark</span>
              </>
            )}
          </button>

          {/* Demo / Live API Badge */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={isDemoMode ? {
              background: isDark ? 'rgba(245,185,66,0.12)' : 'rgba(245,185,66,0.15)',
              border: `1px solid rgba(245,185,66,0.4)`,
              color: isDark ? '#F5B942' : '#B87B08',
            } : {
              background: isDark ? 'rgba(54,211,153,0.12)' : 'rgba(54,211,153,0.18)',
              border: `1px solid rgba(54,211,153,0.4)`,
              color: isDark ? '#36D399' : '#0D8A56',
            }}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isDemoMode ? '✦ Demo Mode' : '✦ Custom API'}</span>
            <span className="md:hidden">{isDemoMode ? 'Demo' : 'API'}</span>
          </button>

          {/* Tech & AI Used */}
          <button
            onClick={onOpenTechStack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: isDark ? 'rgba(200,208,217,0.1)' : 'rgba(41,49,58,0.06)',
              border: `1px solid ${T.border}`,
              color: T.text,
            }}
          >
            <Cpu className="w-3.5 h-3.5" style={{ color: T.copper }} />
            <span className="hidden sm:inline">Spec & Tech</span>
          </button>

          {/* Start Over */}
          {currentStage > 1 && (
            <button
              onClick={onStartOver}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: 'rgba(255,77,77,0.12)',
                border: '1px solid rgba(255,77,77,0.3)',
                color: '#FF4D4D',
              }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
