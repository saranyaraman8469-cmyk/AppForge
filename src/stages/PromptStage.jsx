import React from 'react';
import { ArrowRight, Smartphone, Monitor, Flame, DollarSign, UtensilsCrossed, Clock, Sparkles } from 'lucide-react';
import { SAMPLE_APPS } from '../data/sampleApps';
import { useTheme } from '../context/ThemeContext';

const EXAMPLES = [
  { id: 'habit-tracker',   title: 'Habit & Streak Tracker',   desc: 'Daily check-ins, streaks, progress rings, and celebrations.', icon: Flame,          accent: '#FF7A3D' },
  { id: 'expense-splitter',title: 'Group Expense Splitter',   desc: 'Trip balances, receipt logging, and smart debt settlement.',   icon: DollarSign,     accent: '#36D399' },
  { id: 'recipe-finder',   title: 'Fridge Recipe Finder',     desc: 'Cook from pantry items with step-by-step cooking mode.',       icon: UtensilsCrossed,accent: '#F5B942' },
  { id: 'study-planner',   title: 'Pomodoro Study Room',      desc: '25/5 Pomodoro timer with subject milestone checklists.',       icon: Clock,          accent: '#FF9461' },
];

export default function PromptStage({ prompt, setPrompt, skillLevel, setSkillLevel, targetPlatform, setTargetPlatform, onSubmit, isAnalyzing }) {
  const { isDark, T } = useTheme();

  const handleSelectExample = (ex) => {
    const s = SAMPLE_APPS[ex.id];
    setPrompt(s.prompt);
    setSkillLevel(s.skillLevel);
    setTargetPlatform(s.targetPlatform);
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && prompt.trim() && !isAnalyzing) onSubmit();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">

      {/* ── Hero Text ── */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-5 transition-colors font-mono"
          style={{
            background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.1)',
            border: `1px solid rgba(255,122,61,0.35)`,
            color: T.copper
          }}
        >
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>Obsidian Forge AI Studio — 6-Stage Engineering Journey</span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4 transition-colors"
          style={{ color: T.text }}
        >
          Forge Your Next App —{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF7A3D 0%, #F5B942 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            from Concept to Mastery.
          </span>
        </h1>

        <p className="text-base sm:text-lg max-w-2xl mx-auto transition-colors" style={{ color: T.muted }}>
          Describe any application vision. Obsidian Forge analyzes your problem space, architects technical specs, generates clean runnable code, and mentors you through each design decision.
        </p>
      </div>

      {/* ── Main Input Card ── */}
      <div
        className="rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl transition-colors"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: isDark
            ? '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,122,61,0.08)'
            : '0 8px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,122,61,0.1)',
        }}
      >
        <label className="block text-xs font-bold uppercase tracking-widest mb-2.5 font-mono" style={{ color: T.copper }}>
          ✦ Describe the app you want to build
        </label>

        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. A habit tracker with streaks, progress rings, and daily motivational quotes..."
          className="w-full rounded-2xl p-4 text-sm sm:text-base resize-none focus:outline-none transition-all"
          style={{
            background: isDark ? '#0B0D10' : '#F0F4F8',
            border: `1px solid ${T.border}`,
            color: T.text,
            caretColor: T.copper,
          }}
          onFocus={(e) => { e.target.style.borderColor = T.copper; e.target.style.boxShadow = '0 0 0 3px rgba(255,122,61,0.15)'; }}
          onBlur={(e) => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none'; }}
        />

        {/* ── Config Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-6" style={{ borderTop: `1px solid ${T.border}` }}>

          {/* Skill Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2.5 font-mono" style={{ color: T.muted }}>
              Developer Experience Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                const isActive = skillLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setSkillLevel(lvl)}
                    className="py-2.5 px-2 rounded-xl text-xs font-bold transition-all"
                    style={isActive ? {
                      background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                      border: `1px solid ${T.copper}`,
                      color: T.copper,
                      boxShadow: '0 0 12px rgba(255,122,61,0.25)',
                    } : {
                      background: isDark ? '#15191F' : '#EAEFF5',
                      border: `1px solid ${T.border}`,
                      color: T.muted,
                    }}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2.5 font-mono" style={{ color: T.muted }}>
              Target Platform Architecture
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Mobile app', icon: Smartphone },
                { label: 'Web app',    icon: Monitor    },
              ].map(({ label, icon: Icon }) => {
                const isActive = targetPlatform === label;
                return (
                  <button
                    key={label}
                    onClick={() => setTargetPlatform(label)}
                    className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-left"
                    style={isActive ? {
                      background: isDark ? 'rgba(245,185,66,0.15)' : 'rgba(245,185,66,0.12)',
                      border: `1px solid ${T.gold}`,
                      color: isDark ? T.gold : '#B87B08',
                      boxShadow: '0 0 12px rgba(245,185,66,0.25)',
                    } : {
                      background: isDark ? '#15191F' : '#EAEFF5',
                      border: `1px solid ${T.border}`,
                      color: T.muted,
                    }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Submit CTA ── */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs hidden sm:block font-mono" style={{ color: T.muted }}>
            Press <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: isDark ? '#15191F' : '#EAEFF5', border: `1px solid ${T.border}`, color: T.text }}>Ctrl+↵</kbd> to launch
          </span>

          <button
            onClick={onSubmit}
            disabled={!prompt.trim() || isAnalyzing}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: T.gradient,
              boxShadow: '0 4px 24px rgba(255,122,61,0.35)',
            }}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Analyzing Concept…</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Forge App Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Example Template Cards ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center font-mono" style={{ color: T.muted }}>
          ── Or select a verified blueprint preset ──
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {EXAMPLES.map((ex) => {
            const Icon = ex.icon;
            const isSelected = SAMPLE_APPS[ex.id]?.prompt === prompt;

            return (
              <button
                key={ex.id}
                onClick={() => handleSelectExample(ex)}
                className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-95 flex flex-col gap-3"
                style={isSelected ? {
                  background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.08)',
                  border: `1.5px solid ${T.copper}`,
                  boxShadow: '0 0 20px rgba(255,122,61,0.2)',
                } : {
                  background: T.card,
                  border: `1px solid ${T.border}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    background: `${ex.accent}1a`,
                    border: `1px solid ${ex.accent}33`,
                    color: ex.accent
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs mb-1" style={{ color: T.text }}>{ex.title}</h3>
                  <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: T.muted }}>{ex.desc}</p>
                </div>
                <span className="text-[10px] font-bold mt-auto" style={{ color: ex.accent }}>
                  {isSelected ? '✓ Active Preset' : 'Load Blueprint →'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
