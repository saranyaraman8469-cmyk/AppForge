import React, { useState } from 'react';
import { FileCode, FunctionSquare, MessageSquare, ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { askCodeChat } from '../data/aiService';
import { useTheme } from '../context/ThemeContext';

const QUICK_Qs = [
  'How does state management flow here?',
  'Why was this data structure selected?',
  'How would I connect a real backend/database?',
  'Why use useMemo or useCallback here?',
];

export default function ExplainStage({ explainData, codeFiles, skillLevel = 'Beginner', apiSettings, onProceedToLearn, onBack }) {
  const { isDark, T } = useTheme();
  const [activeTab, setActiveTab] = useState('functions');
  const [selFunc, setSelFunc] = useState(0);
  const [selFile, setSelFile] = useState(0);
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! I'm your Obsidian Forge Code Mentor. Ask me anything about how this app was engineered, how state flows, or what each function does — tailored for your ${skillLevel} level.` }
  ]);
  const [input, setInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const TABS = [
    { id: 'functions', label: 'Functions & Key Logic',        icon: FunctionSquare, color: T.copper },
    { id: 'files',     label: 'File Roles & Architecture',   icon: FileCode,       color: T.gold },
    { id: 'chat',      label: 'Ask About This Code (AI Mentor)', icon: MessageSquare, color: T.copper },
  ];

  const files     = explainData?.files     || [{ fileName:'src/App.jsx', overview:'Main component orchestrator.', keyConcepts:['useState'], skillNotes:{ Beginner:'Focus on how useState manages list items.', Intermediate:'Notice the derived state pattern.', Advanced:'State updates use functional setters to prevent batching issues.' } }];
  const functions = explainData?.functions || [{ name:'toggleItem(id)', code:'setItems(prev => prev.map(i => i.id===id ? {...i, done:!i.done} : i));', explanation:'Toggles completion immutably.', whyBuiltThisWay:'Avoids direct state mutation so React detects changes.', tradeOffs:'O(n) map is fine for <10k items.' }];

  const curFile = files[selFile] || files[0];
  const curFunc = functions[selFunc] || functions[0];

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isAsking) return;
    const q = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setIsAsking(true);
    try {
      const ans = await askCodeChat({ question: q, activeFile: curFile.fileName, codeContent: codeFiles?.[curFile.fileName]||'', skillLevel, apiSettings });
      setMessages(prev => [...prev, { role: 'ai', text: ans }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Running on Demo Mode — enter an API key in Settings for full custom LLM chat answers.' }]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest font-mono" style={{ color: T.copper }}>
            Stage 5 / Code Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-black" style={{ color: T.text }}>Interactive Code Walkthrough</h2>
        </div>
        <button
          onClick={onBack}
          className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
          style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Build
        </button>
      </div>

      {/* Skill level indicator */}
      <div
        className="flex items-center gap-2 p-3.5 rounded-2xl text-xs mb-5 transition-colors font-mono"
        style={{
          background: isDark ? 'rgba(255,122,61,0.1)' : 'rgba(255,122,61,0.08)',
          border: `1px solid rgba(255,122,61,0.3)`,
          color: isDark ? '#FF9461' : '#B8501E'
        }}
      >
        <Sparkles className="w-4 h-4 shrink-0" style={{ color: T.copper }} />
        <span>Explanations are calibrated for your <strong>{skillLevel}</strong> developer experience level.</span>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 border-b mb-6 overflow-x-auto" style={{ borderColor: T.border }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
              style={isActive ? {
                background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                border: `1px solid ${T.copper}`,
                color: T.copper,
                boxShadow: '0 0 12px rgba(255,122,61,0.2)',
              } : {
                background: 'transparent',
                border: '1px solid transparent',
                color: T.muted
              }}
            >
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Functions ── */}
      {activeTab === 'functions' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
          <div className="md:col-span-4 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: T.muted }}>Select a Function:</p>
            {functions.map((fn, i) => {
              const isSel = selFunc === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelFunc(i)}
                  className="w-full text-left p-3.5 rounded-2xl border transition-all"
                  style={isSel ? {
                    background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.1)',
                    border: `1px solid ${T.copper}`,
                    color: T.copper
                  } : {
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    color: T.text
                  }}
                >
                  <FunctionSquare className="w-4 h-4 inline mr-2" style={{ color: T.copper }} />
                  <span className="font-mono text-xs">{fn.name}</span>
                </button>
              );
            })}
          </div>

          <div
            className="md:col-span-8 p-6 rounded-3xl space-y-5 shadow-lg transition-colors"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider font-mono" style={{ color: T.copper }}>Function</span>
              <h3 className="text-lg font-black font-mono mt-0.5" style={{ color: T.text }}>{curFunc.name}</h3>
            </div>
            {curFunc.code && (
              <div
                className="p-4 rounded-2xl overflow-x-auto transition-colors"
                style={{ background: isDark ? '#080A0D' : '#F0F4F8', border: `1px solid ${T.border}` }}
              >
                <pre className="font-mono text-xs leading-relaxed" style={{ color: T.copper }}>{curFunc.code}</pre>
              </div>
            )}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: T.muted }}>What this does:</h4>
              <p className="text-sm font-medium leading-relaxed" style={{ color: T.textBody }}>{curFunc.explanation}</p>
            </div>
            <div
              className="p-4 rounded-2xl transition-colors"
              style={{
                background: isDark ? 'rgba(245,185,66,0.08)' : 'rgba(245,185,66,0.1)',
                border: `1px solid rgba(245,185,66,0.25)`
              }}
            >
              <h4 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono" style={{ color: isDark ? T.gold : '#B87B08' }}>
                <Sparkles className="w-3.5 h-3.5" />Why engineered this way?
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: T.textBody }}>{curFunc.whyBuiltThisWay}</p>
            </div>
            {curFunc.tradeOffs && (
              <p
                className="text-xs p-3 rounded-xl transition-colors"
                style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
              >
                <strong style={{ color: T.text }}>Trade-off: </strong>{curFunc.tradeOffs}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Files ── */}
      {activeTab === 'files' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
          <div className="md:col-span-4 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: T.muted }}>Select a File:</p>
            {files.map((file, i) => {
              const isSel = selFile === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelFile(i)}
                  className="w-full text-left p-3.5 rounded-2xl border transition-all"
                  style={isSel ? {
                    background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.1)',
                    border: `1px solid ${T.copper}`,
                    color: T.copper
                  } : {
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    color: T.text
                  }}
                >
                  <FileCode className="w-4 h-4 inline mr-2" style={{ color: T.copper }} />
                  <span className="font-mono text-xs">{file.fileName}</span>
                </button>
              );
            })}
          </div>

          <div
            className="md:col-span-8 p-6 rounded-3xl space-y-5 shadow-lg transition-colors"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider font-mono" style={{ color: T.copper }}>File Architecture</span>
              <h3 className="text-lg font-black font-mono mt-0.5" style={{ color: T.text }}>{curFile.fileName}</h3>
            </div>
            <p className="text-sm font-medium leading-relaxed" style={{ color: T.textBody }}>{curFile.overview}</p>
            {curFile.keyConcepts && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 font-mono" style={{ color: T.muted }}>Core Concepts:</h4>
                <div className="flex flex-wrap gap-2">
                  {curFile.keyConcepts.map((k,i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl font-mono text-xs"
                      style={{
                        background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.08)',
                        border: `1px solid rgba(255,122,61,0.3)`,
                        color: T.copper
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {curFile.skillNotes && (
              <div
                className="p-4 rounded-2xl transition-colors"
                style={{
                  background: isDark ? 'rgba(245,185,66,0.08)' : 'rgba(245,185,66,0.1)',
                  border: `1px solid rgba(245,185,66,0.25)`
                }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 font-mono" style={{ color: isDark ? T.gold : '#B87B08' }}>
                  Note for {skillLevel} Developers:
                </span>
                <p className="text-xs leading-relaxed font-medium" style={{ color: T.textBody }}>
                  {curFile.skillNotes?.[skillLevel] || curFile.overview}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Chat ── */}
      {activeTab === 'chat' && (
        <div
          className="p-6 rounded-3xl flex flex-col h-[520px] animate-fade-in shadow-xl transition-colors"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div className="mb-3">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2 font-mono" style={{ color: T.muted }}>Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_Qs.map((q,i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="px-3 py-1 rounded-xl text-[11px] font-medium transition-all"
                  style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.textBody }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div
            className="flex-1 overflow-y-auto space-y-3 p-3 rounded-2xl mb-4 transition-colors"
            style={{ background: isDark ? '#080A0D' : '#F0F4F8', border: `1px solid ${T.border}` }}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role==='user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role==='ai' && (
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-black text-slate-950 font-mono"
                    style={{ background: T.gradient }}
                  >
                    AF
                  </div>
                )}
                <div
                  className="p-3.5 rounded-2xl max-w-[80%] text-xs whitespace-pre-wrap leading-relaxed"
                  style={msg.role==='user' ? {
                    background: T.gradient,
                    color: '#0B0D10',
                    fontWeight: '600'
                  } : {
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    color: T.text
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isAsking && (
              <div className="flex items-center gap-2 text-xs pl-2 font-mono" style={{ color: T.muted }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.copper }} />
                AI Mentor is analyzing codebase…
              </div>
            )}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about how this code works…"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs focus:outline-none transition-colors"
              style={{
                background: isDark ? '#0B0D10' : '#FFFFFF',
                border: `1px solid ${T.border}`,
                color: T.text,
                caretColor: T.copper
              }}
              onFocus={e => e.target.style.borderColor = T.copper}
              onBlur={e => e.target.style.borderColor = T.border}
            />
            <button
              type="submit"
              disabled={!input.trim() || isAsking}
              className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 text-slate-950 disabled:opacity-40 cursor-pointer shadow-md"
              style={{ background: T.gradient }}
            >
              <Send className="w-3.5 h-3.5" /> Ask
            </button>
          </form>
        </div>
      )}

      {/* ── CTA ── */}
      <div
        className="mt-8 flex flex-col sm:flex-row items-center justify-between p-5 rounded-3xl gap-4 transition-colors"
        style={{
          background: isDark ? '#15191F' : '#EAEFF5',
          border: `1px solid ${T.border}`
        }}
      >
        <div>
          <p className="font-bold text-sm" style={{ color: T.text }}>Ready to test your knowledge and extend the app?</p>
          <p className="text-xs" style={{ color: T.muted }}>Learn Stage: mastery quiz with confetti, coding challenges, and documentation.</p>
        </div>
        <button
          onClick={onProceedToLearn}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all text-slate-950 cursor-pointer shadow-md"
          style={{
            background: T.gradient,
            boxShadow: '0 4px 20px rgba(255,122,61,0.3)',
          }}
        >
          <span>Proceed to Learn Stage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
