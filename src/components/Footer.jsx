import React from 'react';
import { Cpu, ShieldCheck, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer({ onOpenTechStack, onOpenSettings, isDemoMode }) {
  const { isDark, T } = useTheme();

  return (
    <footer
      className="w-full py-7 transition-colors mt-auto"
      style={{
        background: isDark ? 'rgba(11, 13, 16, 0.95)' : 'rgba(244, 247, 250, 0.95)',
        borderTop: `1px solid ${T.border}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Left info */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-slate-950 shadow-md"
            style={{
              background: T.gradient,
              boxShadow: '0 0 12px rgba(255,122,61,0.3)',
            }}
          >
            <Flame className="w-4 h-4 text-slate-950 fill-current" />
          </div>
          <p style={{ color: T.muted }}>
            <strong style={{ color: T.text }}>FORGEAPP</strong> — Obsidian Forge AI Development Studio (Prompt → Understand → Plan → Build → Explain → Learn)
          </p>
        </div>

        {/* Center / Right Links */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            onClick={onOpenTechStack}
            className="flex items-center gap-1.5 transition-colors font-medium hover:underline"
            style={{ color: T.copper }}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech & AI Spec</span>
          </button>

          <span style={{ color: T.border }}>•</span>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 transition-colors font-medium hover:underline"
            style={{ color: isDemoMode ? T.gold : T.success }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>API Settings ({isDemoMode ? 'Demo Mode' : 'Custom Key'})</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
