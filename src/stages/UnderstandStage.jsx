import React, { useState } from 'react';
import { BrainCircuit, CheckSquare, Square, HelpCircle, ArrowRight, ArrowLeft, Plus, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function UnderstandStage({ understandData, setUnderstandData, onConfirm, onBack, isPlanning, error }) {
  const { isDark, T } = useTheme();
  const [newFeatureText, setNewFeatureText] = useState('');
  const [newFeatureType, setNewFeatureType] = useState('must');

  if (!understandData) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center animate-fade-in">
        <div
          className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 animate-float"
          style={{
            background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
            border: '1px solid rgba(255,122,61,0.35)',
            color: T.copper
          }}
        >
          <BrainCircuit className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold mb-1" style={{ color: T.text }}>Synthesizing Problem Scope…</h3>
        <p className="text-sm" style={{ color: T.muted }}>Analyzing user intent, feature hierarchy, and core trade-offs.</p>
      </div>
    );
  }

  const toggleMustHave = (id) => setUnderstandData(prev => ({
    ...prev,
    mustHaveFeatures: prev.mustHaveFeatures.map(f => f.id === id ? { ...f, included: !f.included } : f)
  }));
  
  const toggleNiceToHave = (id) => setUnderstandData(prev => ({
    ...prev,
    niceToHaveFeatures: prev.niceToHaveFeatures.map(f => f.id === id ? { ...f, included: !f.included } : f)
  }));

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!newFeatureText.trim()) return;
    const entry = { id: 'c-' + Date.now(), text: newFeatureText.trim(), included: true };
    if (newFeatureType === 'must') {
      setUnderstandData(prev => ({ ...prev, mustHaveFeatures: [...prev.mustHaveFeatures, entry] }));
    } else {
      setUnderstandData(prev => ({ ...prev, niceToHaveFeatures: [...prev.niceToHaveFeatures, entry] }));
    }
    setNewFeatureText('');
  };

  const handleSelectAnswer = (qId, option) => setUnderstandData(prev => ({
    ...prev,
    clarifyingQuestions: prev.clarifyingQuestions.map(q => q.id === qId ? { ...q, selected: option } : q)
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest font-mono" style={{ color: T.copper }}>
            Stage 2 / Scope Analysis
          </span>
          <h2 className="text-2xl sm:text-3xl font-black" style={{ color: T.text }}>Confirm Requirements</h2>
        </div>
        <button
          onClick={onBack}
          className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
          style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Edit Prompt
        </button>
      </div>

      {error && (
        <div
          className="mb-5 p-4 rounded-2xl flex items-center gap-3 text-xs"
          style={{
            background: isDark ? 'rgba(245,185,66,0.1)' : 'rgba(245,185,66,0.15)',
            border: '1px solid rgba(245,185,66,0.3)',
            color: isDark ? '#F5B942' : '#B87B08'
          }}
        >
          <AlertCircle className="w-4 h-4 shrink-0" style={{ color: T.gold }} />
          {error}
        </div>
      )}

      {/* ── AI Summary ── */}
      <div
        className="rounded-3xl p-5 sm:p-6 mb-6 shadow-xl transition-colors"
        style={{ background: T.card, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-start gap-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.1)',
              border: `1px solid rgba(255,122,61,0.3)`,
              color: T.copper
            }}
          >
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: T.copper }}>
              AI Intent Synthesis
            </p>
            <p className="text-base sm:text-lg font-bold leading-relaxed" style={{ color: T.text }}>
              "{understandData.summary}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5" style={{ borderTop: `1px solid ${T.border}` }}>
          {[
            { label: 'Target Users',       value: understandData.targetUsers },
            { label: 'Core Problem Solved', value: understandData.coreProblem },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3.5 rounded-2xl transition-colors"
              style={{ background: T.cardSub, border: `1px solid ${T.border}` }}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 font-mono" style={{ color: T.muted }}>
                {item.label}
              </span>
              <p className="text-xs font-medium leading-relaxed" style={{ color: T.textBody }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Feature Lists ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Must-Have */}
        <div
          className="rounded-3xl p-5 sm:p-6 shadow-xl transition-colors"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: T.success }}></span>
              <h3 className="font-bold text-sm" style={{ color: T.text }}>Must-Have Features</h3>
            </div>
            <span className="text-[11px]" style={{ color: T.muted }}>{understandData.mustHaveFeatures.filter(f => f.included).length} active</span>
          </div>
          <p className="text-[11px] mb-3" style={{ color: T.muted }}>Core MVP scope — click to toggle:</p>
          <div className="space-y-2">
            {understandData.mustHaveFeatures.map(f => (
              <div
                key={f.id}
                onClick={() => toggleMustHave(f.id)}
                className="p-3 rounded-xl flex items-start gap-3 cursor-pointer transition-all"
                style={f.included ? {
                  background: isDark ? 'rgba(54,211,153,0.1)' : 'rgba(54,211,153,0.12)',
                  border: `1px solid rgba(54,211,153,0.35)`,
                } : {
                  background: T.cardSub,
                  border: `1px solid ${T.border}`,
                  opacity: 0.5,
                }}
              >
                <div className="mt-0.5 shrink-0" style={{ color: f.included ? T.success : T.muted }}>
                  {f.included ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                </div>
                <span
                  className="text-xs font-medium leading-tight"
                  style={{
                    color: f.included ? (isDark ? '#F4F7FA' : '#0B0D10') : T.muted,
                    textDecoration: f.included ? 'none' : 'line-through'
                  }}
                >
                  {f.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Nice-to-Have */}
        <div
          className="rounded-3xl p-5 sm:p-6 shadow-xl transition-colors"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: T.gold }}></span>
              <h3 className="font-bold text-sm" style={{ color: T.text }}>Nice-to-Have Features</h3>
            </div>
            <span className="text-[11px]" style={{ color: T.muted }}>{understandData.niceToHaveFeatures.filter(f => f.included).length} active</span>
          </div>
          <p className="text-[11px] mb-3" style={{ color: T.muted }}>Optional enhancements — enable as desired:</p>
          <div className="space-y-2">
            {understandData.niceToHaveFeatures.map(f => (
              <div
                key={f.id}
                onClick={() => toggleNiceToHave(f.id)}
                className="p-3 rounded-xl flex items-start gap-3 cursor-pointer transition-all"
                style={f.included ? {
                  background: isDark ? 'rgba(245,185,66,0.1)' : 'rgba(245,185,66,0.12)',
                  border: `1px solid rgba(245,185,66,0.35)`,
                } : {
                  background: T.cardSub,
                  border: `1px solid ${T.border}`,
                }}
              >
                <div className="mt-0.5 shrink-0" style={{ color: f.included ? T.gold : T.muted }}>
                  {f.included ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                </div>
                <span className="text-xs font-medium leading-tight" style={{ color: f.included ? (isDark ? '#F4F7FA' : '#0B0D10') : T.muted }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Add Feature ── */}
      <div
        className="p-4 rounded-2xl mb-5 transition-colors"
        style={{ background: T.card, border: `1px solid ${T.border}` }}
      >
        <form onSubmit={handleAddFeature} className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Add a custom feature…"
            value={newFeatureText}
            onChange={(e) => setNewFeatureText(e.target.value)}
            className="flex-1 w-full px-3.5 py-2 rounded-xl text-xs focus:outline-none transition-all"
            style={{
              background: isDark ? '#0B0D10' : '#F0F4F8',
              border: `1px solid ${T.border}`,
              color: T.text,
              caretColor: T.copper
            }}
            onFocus={e => e.target.style.borderColor = T.copper}
            onBlur={e => e.target.style.borderColor = T.border}
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={newFeatureType}
              onChange={(e) => setNewFeatureType(e.target.value)}
              className="rounded-xl px-2.5 py-2 text-xs transition-colors"
              style={{ background: isDark ? '#0B0D10' : '#F0F4F8', border: `1px solid ${T.border}`, color: T.text }}
            >
              <option value="must">Must-Have</option>
              <option value="nice">Nice-to-Have</option>
            </select>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                border: `1px solid rgba(255,122,61,0.35)`,
                color: T.copper
              }}
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </form>
      </div>

      {/* ── Clarifying Questions ── */}
      {understandData.clarifyingQuestions?.length > 0 && (
        <div
          className="rounded-3xl p-5 sm:p-6 mb-6 shadow-xl transition-colors"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-4 h-4" style={{ color: T.gold }} />
            <h3 className="font-bold text-sm" style={{ color: T.text }}>Architectural Clarifications</h3>
          </div>
          <p className="text-xs mb-4" style={{ color: T.muted }}>Select your preference or keep the AI default to sharpen the plan.</p>
          <div className="space-y-4">
            {understandData.clarifyingQuestions.map((q, i) => (
              <div
                key={q.id || i}
                className="p-4 rounded-2xl transition-colors"
                style={{ background: T.cardSub, border: `1px solid ${T.border}` }}
              >
                <p className="text-xs font-bold mb-3" style={{ color: T.text }}>{i + 1}. {q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {q.options?.map((opt) => {
                    const isSel = q.selected === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className="p-2.5 rounded-xl text-left text-xs transition-all"
                        style={isSel ? {
                          background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                          border: `1px solid ${T.copper}`,
                          color: T.copper,
                          fontWeight: '700',
                        } : {
                          background: isDark ? '#1C222A' : '#FFFFFF',
                          border: `1px solid ${T.border}`,
                          color: T.muted,
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Confirm CTA ── */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-3xl gap-4 transition-colors"
        style={{
          background: isDark ? '#15191F' : '#EAEFF5',
          border: `1px solid ${T.border}`
        }}
      >
        <div>
          <p className="font-bold text-sm" style={{ color: T.text }}>Ready to generate architecture?</p>
          <p className="text-xs" style={{ color: T.muted }}>Confirm requirements to generate screen flows, data model, and API spec.</p>
        </div>
        <button
          onClick={onConfirm}
          disabled={isPlanning}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all text-slate-950 disabled:opacity-50 cursor-pointer shadow-md"
          style={{
            background: T.gradient,
            boxShadow: '0 4px 20px rgba(255,122,61,0.3)',
          }}
        >
          {isPlanning ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Generating Plan…</span>
            </>
          ) : (
            <>
              <span>Confirm & Generate Plan</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
