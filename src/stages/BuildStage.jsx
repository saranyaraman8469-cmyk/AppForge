import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, Terminal } from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';
import CodeViewer from '../components/CodeViewer';
import { useTheme } from '../context/ThemeContext';

const STEPS = [
  'Parsing data model entities and state schema…',
  'Scaffolding component tree and UI hierarchy…',
  'Compiling responsive mobile-first Tailwind styles…',
  'Wiring reactive state, event handlers, animations…',
  'Mounting sandboxed runtime environment…',
  '✓ Build complete — App is live in sandbox!',
];

export default function BuildStage({ codeFiles, appTitle = 'Generated App', targetPlatform = 'Mobile app', onProceedToExplain, onBack }) {
  const { isDark, T } = useTheme();
  const [stepIdx, setStepIdx] = useState(0);
  const [isStreamDone, setIsStreamDone] = useState(false);
  const [view, setView] = useState('split'); // split | preview | code

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i < STEPS.length) setStepIdx(i);
      else { setIsStreamDone(true); clearInterval(t); }
    }, 450);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest font-mono" style={{ color: T.copper }}>
            Stage 4 / Live Studio
          </span>
          <h2 className="text-2xl sm:text-3xl font-black" style={{ color: T.text }}>Live Preview & Codebase</h2>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div
            className="hidden lg:flex items-center p-1 rounded-xl gap-0.5 transition-colors"
            style={{ background: isDark ? '#15191F' : '#EAEFF5', border: `1px solid ${T.border}` }}
          >
            {[['split','Split View'],['preview','Device Only'],['code','Code Only']].map(([v,l]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={view === v ? {
                  background: isDark ? '#1C222A' : '#FFFFFF',
                  color: T.copper,
                  border: `1px solid ${T.copper}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                } : {
                  color: T.muted,
                  border: '1px solid transparent'
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>
      </div>

      {/* ── Build Stream / Status ── */}
      {!isStreamDone ? (
        <div
          className="p-5 rounded-3xl mb-6 shadow-xl transition-colors"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center animate-spin-slow font-mono"
              style={{
                background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                border: '1px solid rgba(255,122,61,0.3)',
                color: T.copper
              }}
            >
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider font-mono" style={{ color: T.copper }}>
                Synthesizing Application Runtime
              </p>
              <p className="text-sm font-semibold" style={{ color: T.text }}>{STEPS[stepIdx]}</p>
            </div>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? '#101419' : '#D0D9E2' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((stepIdx+1)/STEPS.length)*100}%`, background: T.gradient }}
            />
          </div>
          <div className="flex gap-1 mt-2.5">
            {STEPS.map((_,i) => (
              <span key={i} className="text-[9px] font-mono transition-all" style={{ color: i <= stepIdx ? T.copper : (isDark ? '#29313A' : '#D0D9E2') }}>
                ▮
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-between p-3.5 rounded-2xl mb-6 text-xs font-medium transition-colors"
          style={{
            background: isDark ? 'rgba(54,211,153,0.1)' : 'rgba(54,211,153,0.12)',
            border: `1px solid rgba(54,211,153,0.3)`,
            color: isDark ? '#36D399' : '#0D8A56'
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: T.success }} />
            <span>App is live and interactive in the sandbox! Click buttons, add items, and test all interactions.</span>
          </div>
          <span
            className="px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider"
            style={{ background: 'rgba(54,211,153,0.18)', color: T.success }}
          >
            Live
          </span>
        </div>
      )}

      {/* ── Main Work Area ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[640px]">
        {(view === 'split' || view === 'preview') && (
          <div className={view === 'split' ? 'lg:col-span-5 flex flex-col' : 'lg:col-span-12 flex flex-col'}>
            <PhoneMockup codeFiles={codeFiles} appTitle={appTitle} targetPlatform={targetPlatform} />
          </div>
        )}
        {(view === 'split' || view === 'code') && (
          <div className={view === 'split' ? 'lg:col-span-7 flex flex-col' : 'lg:col-span-12 flex flex-col'}>
            <CodeViewer files={codeFiles} appTitle={appTitle} />
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div
        className="mt-8 flex flex-col sm:flex-row items-center justify-between p-5 rounded-3xl gap-4 transition-colors"
        style={{
          background: isDark ? '#15191F' : '#EAEFF5',
          border: `1px solid ${T.border}`
        }}
      >
        <div>
          <p className="font-bold text-sm" style={{ color: T.text }}>Want to understand how this code is engineered?</p>
          <p className="text-xs" style={{ color: T.muted }}>Explain Stage: plain-language breakdowns, design trade-offs, and interactive AI Q&A.</p>
        </div>
        <button
          onClick={onProceedToExplain}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all text-slate-950 cursor-pointer shadow-md"
          style={{
            background: T.gradient,
            boxShadow: '0 4px 20px rgba(255,122,61,0.3)',
          }}
        >
          <span>Proceed to Explain</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
