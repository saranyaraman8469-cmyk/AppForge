import React from 'react';
import { X, Cpu, Code2, Layers, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Section({ color, icon: Icon, title, children, isDark, T }) {
  return (
    <div
      className="p-4 rounded-2xl transition-colors"
      style={{
        background: isDark ? 'rgba(16,20,25,0.7)' : 'rgba(234,239,245,0.7)',
        border: `1px solid ${color}33`,
      }}
    >
      <div className="flex items-center gap-2 mb-3 font-bold text-sm">
        <Icon className="w-4 h-4" style={{ color }} />
        <span style={{ color }}>{title}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

function Card({ title, desc, T }) {
  return (
    <div
      className="p-3 rounded-xl transition-colors"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <p className="font-bold text-xs mb-1" style={{ color: T.text }}>{title}</p>
      <p className="text-[11px] leading-relaxed" style={{ color: T.muted }}>{desc}</p>
    </div>
  );
}

export default function TechStackModal({ isOpen, onClose }) {
  const { isDark, T } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{
        background: isDark ? 'rgba(11,13,16,0.88)' : 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        className="rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative transition-colors"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: isDark
            ? '0 8px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,122,61,0.1)'
            : '0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,122,61,0.15)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 transition-colors p-1 rounded-lg"
          style={{ color: T.muted }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-slate-950 font-bold"
            style={{
              background: T.gradient,
              boxShadow: '0 0 24px rgba(255,122,61,0.35)',
            }}
          >
            <Cpu className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="text-xl font-black" style={{ color: T.text }}>Tech & AI Stack</h2>
            <p className="text-xs" style={{ color: T.muted }}>Full index of AI models, frameworks, and architecture powering Obsidian Forge</p>
          </div>
        </div>

        <div className="space-y-4">
          <Section color={T.copper} icon={Sparkles} title="AI Models & Prompt Engineering" isDark={isDark} T={T}>
            <Card title="Models Supported" desc="Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o / GPT-4o-mini, Google Gemini 1.5 Flash/Pro, OpenRouter (Llama 3.3 70B Instruct)." T={T} />
            <Card title="Structured JSON Output" desc="Strict schema enforcement on Understand, Plan, and Learn stages with markdown fence cleaning, JSON.parse validation, and retry backoff." T={T} />
            <Card title="Zero-Key Demo Mode" desc="Pre-baked high-fidelity datasets for 4 complete apps + a fallback mock synthesizer for arbitrary ideas. Always works for reviewers." T={T} />
            <Card title="Contextual AI Chat (Stage 5)" desc="Multi-turn technical mentorship grounded in the exact files and functions generated in the Build stage." T={T} />
          </Section>

          <Section color={T.gold} icon={Code2} title="Frontend Core & Design System" isDark={isDark} T={T}>
            <Card title="React 18 + Vite 6" desc="Single-Page architecture with hot-module reload. Strict in-memory state — zero localStorage dependency." T={T} />
            <Card title="Obsidian Forge Theme System" desc="Dual Dark/Light themes with Electric Copper (#FF7A3D), Molten Gold (#F5B942), Titanium Silver (#C8D0D9), and Obsidian Black (#0B0D10)." T={T} />
            <Card title="Inter + JetBrains Mono" desc="Google Fonts: Inter for UI, JetBrains Mono for all code editors, monospace elements, and terminal output." T={T} />
            <Card title="Lucide React Icons" desc="Consistent icon set across all stages with crisp stroke weights and theme-reactive coloring." T={T} />
          </Section>

          <Section color={T.success} icon={Layers} title="UX Libraries & Packaging" isDark={isDark} T={T}>
            <Card title="JSZip v3.10" desc="Client-side ZIP bundler for one-click full project download with all source files packaged instantly in-browser." T={T} />
            <Card title="Canvas-Confetti" desc="Hardware-accelerated celebratory particle explosions triggered on quiz completion with copper and gold spark colors." T={T} />
            <Card title="Sandboxed iframe Preview" desc="React apps executed via Babel Standalone + Tailwind CDN inside a sandboxed iframe with phone & desktop mockup frames." T={T} />
            <Card title="Security & Privacy" desc="API keys held strictly in-memory during the browser session. Zero network transmission to third-party services from AppForge servers." T={T} />
          </Section>
        </div>

        <div className="mt-6 pt-4 flex justify-end" style={{ borderTop: `1px solid ${T.border}` }}>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 transition-all shadow-md"
            style={{
              background: T.gradient,
              boxShadow: '0 4px 16px rgba(255,122,61,0.25)',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
