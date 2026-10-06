import React, { useState } from 'react';
import { GraduationCap, Trophy, HelpCircle, CheckCircle2, XCircle, Code, Lightbulb, ArrowLeft, RotateCcw, Sparkles, BookOpen, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import ExportModal from '../components/ExportModal';
import { useTheme } from '../context/ThemeContext';

export default function LearnStage({ learnData, appTitle = 'My App', onBack, onStartOver }) {
  const { isDark, T } = useTheme();
  const [tab, setTab] = useState('path');
  const [solRevealed, setSolRevealed] = useState({});
  const [hintRevealed, setHintRevealed] = useState({});
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const TABS = [
    { id: 'path',       label: '1. Learning Path',    icon: BookOpen,      color: T.copper },
    { id: 'challenges', label: '2. Code Challenges',  icon: Code,          color: T.gold },
    { id: 'quiz',       label: '3. Mastery Quiz',      icon: HelpCircle,    color: T.copper },
    { id: 'next',       label: '4. What to Build Next',icon: Sparkles,      color: T.gold },
  ];

  if (!learnData) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center animate-fade-in">
        <div
          className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 animate-float"
          style={{
            background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
            border: '1px solid rgba(255,122,61,0.3)',
            color: T.copper
          }}
        >
          <GraduationCap className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold mb-1" style={{ color: T.text }}>Synthesizing Mini-Course…</h3>
        <p className="text-sm" style={{ color: T.muted }}>Building custom quizzes, coding challenges, and extension roadmap.</p>
      </div>
    );
  }

  const quiz = learnData.quiz || [];
  const correct = quiz.filter(q => answers[q.id] === q.correctIndex).length;

  const handleGrade = () => {
    setSubmitted(true);
    if (correct >= Math.ceil(quiz.length * 0.6)) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF7A3D', '#F5B942', '#36D399', '#C8D0D9']
        });
      } catch {}
    }
  };

  const genCourseMarkdown = () => `# Mini-Course: ${appTitle}

## Learning Path
${(learnData.learningPath||[]).map(p=>`### ${p.stage}. ${p.title}\n${p.keyTakeaway}\n\`\`\`js\n${p.codeSnippet||''}\n\`\`\``).join('\n\n')}

## Challenges
${(learnData.challenges||[]).map(c=>`### ${c.title} (${c.difficulty})\n${c.description}`).join('\n\n')}

## Next Steps
${(learnData.nextSteps||[]).map(n=>`- **${n.title}** (${n.complexity}): ${n.description||''}`).join('\n')}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest font-mono" style={{ color: T.copper }}>
            Stage 6 / Mastery & Learn
          </span>
          <h2 className="text-2xl sm:text-3xl font-black" style={{ color: T.text }}>Personalized Learning Studio</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.08)',
              border: `1px solid rgba(255,122,61,0.35)`,
              color: T.copper
            }}
          >
            <Download className="w-3.5 h-3.5" /> Export Course
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 border-b mb-6 overflow-x-auto" style={{ borderColor: T.border }}>
        {TABS.map(t => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
              style={isActive ? {
                background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                border: `1px solid ${T.copper}`,
                color: T.copper,
                boxShadow: '0 0 12px rgba(255,122,61,0.2)'
              } : {
                background: 'transparent',
                border: '1px solid transparent',
                color: T.muted
              }}
            >
              <Icon className="w-3.5 h-3.5" />{t.label}
            </button>
          );
        })}
      </div>

      {/* ── 1. Learning Path ── */}
      {tab === 'path' && (
        <div className="space-y-4 animate-fade-in">
          {learnData.learningPath?.map(step => (
            <div
              key={step.stage}
              className="p-6 rounded-3xl flex flex-col md:flex-row items-start gap-4 transition-colors shadow-lg"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-slate-950 shrink-0 font-mono shadow-md"
                style={{ background: T.gradient }}
              >
                {step.stage}
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-base mb-1" style={{ color: T.text }}>{step.title}</h3>
                <p className="font-mono text-xs mb-2 font-semibold" style={{ color: T.copper }}>{step.concepts}</p>
                <p className="text-xs leading-relaxed font-medium mb-3" style={{ color: T.textBody }}>
                  <strong style={{ color: T.text }}>Key Principle: </strong>{step.keyTakeaway}
                </p>
                {step.codeSnippet && (
                  <div
                    className="p-3.5 rounded-xl overflow-x-auto transition-colors"
                    style={{ background: isDark ? '#080A0D' : '#F0F4F8', border: `1px solid ${T.border}` }}
                  >
                    <pre className="font-mono text-xs" style={{ color: T.success }}>{step.codeSnippet}</pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 2. Challenges ── */}
      {tab === 'challenges' && (
        <div className="space-y-4 animate-fade-in">
          {learnData.challenges?.map(c => (
            <div
              key={c.id}
              className="p-6 rounded-3xl transition-colors shadow-lg"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-base" style={{ color: T.text }}>{c.title}</h3>
                <span
                  className="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase font-mono"
                  style={c.difficulty === 'Easy' ? {
                    background: 'rgba(54,211,153,0.15)', color: T.success
                  } : c.difficulty === 'Medium' ? {
                    background: 'rgba(245,185,66,0.15)', color: isDark ? T.gold : '#B87B08'
                  } : {
                    background: 'rgba(255,77,77,0.15)', color: '#FF4D4D'
                  }}
                >
                  {c.difficulty}
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: T.textBody }}>{c.description}</p>
              <div className="flex flex-wrap gap-2 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
                {c.hint && (
                  <button
                    onClick={() => setHintRevealed(p => ({...p,[c.id]:!p[c.id]}))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: isDark ? 'rgba(245,185,66,0.1)' : 'rgba(245,185,66,0.12)',
                      border: `1px solid rgba(245,185,66,0.3)`,
                      color: isDark ? '#F5B942' : '#B87B08'
                    }}
                  >
                    <Lightbulb className="w-3.5 h-3.5" />{hintRevealed[c.id] ? 'Hide Hint' : 'Show Hint'}
                  </button>
                )}
                <button
                  onClick={() => setSolRevealed(p => ({...p,[c.id]:!p[c.id]}))}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.08)',
                    border: `1px solid ${T.copper}`,
                    color: T.copper
                  }}
                >
                  <Code className="w-3.5 h-3.5" />{solRevealed[c.id] ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>
              {hintRevealed[c.id] && c.hint && (
                <div
                  className="mt-3 p-3.5 rounded-2xl text-xs animate-slide-up transition-colors"
                  style={{
                    background: isDark ? 'rgba(245,185,66,0.08)' : 'rgba(245,185,66,0.1)',
                    border: `1px solid rgba(245,185,66,0.25)`,
                    color: T.text
                  }}
                >
                  <strong style={{ color: T.gold }}>Architectural Nudge: </strong>{c.hint}
                </div>
              )}
              {solRevealed[c.id] && c.solutionCode && (
                <div
                  className="mt-3 p-4 rounded-2xl overflow-x-auto animate-slide-up transition-colors"
                  style={{ background: isDark ? '#080A0D' : '#F0F4F8', border: `1px solid ${T.border}` }}
                >
                  <pre className="font-mono text-xs" style={{ color: T.success }}>{c.solutionCode}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── 3. Quiz ── */}
      {tab === 'quiz' && (
        <div className="space-y-5 animate-fade-in">
          {submitted && (
            <div
              className="p-5 rounded-3xl flex items-center justify-between shadow-xl transition-colors"
              style={{
                background: isDark ? '#15191F' : '#EAEFF5',
                border: `1px solid ${T.copper}`
              }}
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 shrink-0" style={{ color: T.gold }} />
                <div>
                  <h3 className="font-extrabold text-base" style={{ color: T.text }}>Score: {correct} / {quiz.length} Correct</h3>
                  <p className="text-xs" style={{ color: T.muted }}>
                    {correct >= Math.ceil(quiz.length * 0.6)
                      ? 'Outstanding engineering mastery! You understand the foundational architecture.'
                      : 'Good effort — review the answer explanations below to solidify the concepts.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setAnswers({}); setSubmitted(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retry
              </button>
            </div>
          )}

          {quiz.map((q, qi) => {
            const selected = answers[q.id];
            const isCorrect = selected === q.correctIndex;
            return (
              <div
                key={q.id || qi}
                className="p-6 rounded-3xl shadow-lg transition-colors"
                style={{ background: T.card, border: `1px solid ${T.border}` }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="font-bold text-sm" style={{ color: T.text }}>{qi+1}. {q.question}</h4>
                  {submitted && (isCorrect
                    ? <span className="flex items-center gap-1 text-xs font-bold shrink-0" style={{ color: T.success }}><CheckCircle2 className="w-4 h-4" />Correct</span>
                    : <span className="flex items-center gap-1 text-xs font-bold shrink-0" style={{ color: '#FF4D4D' }}><XCircle className="w-4 h-4" />Incorrect</span>
                  )}
                </div>
                <div className="space-y-2">
                  {q.options?.map((opt, oi) => {
                    const isSel = selected === oi;
                    let optionStyle = {
                      background: isDark ? '#15191F' : '#EAEFF5',
                      border: `1px solid ${T.border}`,
                      color: T.textBody
                    };
                    if (submitted) {
                      if (oi === q.correctIndex) {
                        optionStyle = {
                          background: 'rgba(54,211,153,0.15)',
                          border: `1.5px solid ${T.success}`,
                          color: isDark ? '#36D399' : '#0D8A56',
                          fontWeight: '700'
                        };
                      } else if (isSel && !isCorrect) {
                        optionStyle = {
                          background: 'rgba(255,77,77,0.12)',
                          border: '1.5px solid #FF4D4D',
                          color: '#FF4D4D',
                          textDecoration: 'line-through'
                        };
                      }
                    } else if (isSel) {
                      optionStyle = {
                        background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                        border: `1.5px solid ${T.copper}`,
                        color: T.copper,
                        fontWeight: '700'
                      };
                    }
                    return (
                      <button
                        key={oi}
                        disabled={submitted}
                        onClick={() => setAnswers(p => ({...p,[q.id]:oi}))}
                        className="w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between"
                        style={optionStyle}
                      >
                        <span>{opt}</span>
                        {isSel && !submitted && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: T.copper }} />}
                      </button>
                    );
                  })}
                </div>
                {submitted && q.explanation && (
                  <div
                    className="mt-3 p-3.5 rounded-xl text-xs animate-slide-up transition-colors"
                    style={{ background: isDark ? '#080A0D' : '#F0F4F8', border: `1px solid ${T.border}`, color: T.textBody }}
                  >
                    <strong style={{ color: T.copper }}>Rationale: </strong>{q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {!submitted && (
            <div className="flex justify-end">
              <button
                onClick={handleGrade}
                disabled={Object.keys(answers).length === 0}
                className="px-6 py-3 rounded-2xl font-black text-xs text-slate-950 disabled:opacity-40 cursor-pointer shadow-md"
                style={{ background: T.gradient }}
              >
                Submit & Grade Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── 4. Next Steps ── */}
      {tab === 'next' && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono" style={{ color: T.muted }}>
              Recommended Engineering Next Steps:
            </h3>
            {learnData.nextSteps?.map((s,i) => (
              <div
                key={i}
                className="p-5 rounded-2xl flex items-start justify-between gap-4 transition-colors shadow-lg"
                style={{ background: T.card, border: `1px solid ${T.border}` }}
              >
                <div>
                  <h4 className="font-extrabold text-sm mb-1" style={{ color: T.text }}>{s.title}</h4>
                  {s.description && <p className="text-xs" style={{ color: T.muted }}>{s.description}</p>}
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0 font-mono"
                  style={{ background: T.cardSub, color: T.copper }}
                >
                  {s.complexity}
                </span>
              </div>
            ))}
          </div>
          {learnData.curatedKeywords?.length > 0 && (
            <div
              className="p-5 rounded-3xl shadow-lg transition-colors"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 font-mono" style={{ color: T.muted }}>
                Curated Deep-Dive Documentation Search Keywords:
              </h3>
              <div className="flex flex-wrap gap-2">
                {learnData.curatedKeywords.map((kw,i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl font-mono text-xs"
                    style={{
                      background: isDark ? 'rgba(255,122,61,0.1)' : 'rgba(255,122,61,0.08)',
                      border: `1px solid rgba(255,122,61,0.25)`,
                      color: T.copper
                    }}
                  >
                    🔍 {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Completion Banner ── */}
      <div
        className="mt-10 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl transition-colors"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #1C222A 0%, #15191F 50%, #101419 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #EAEFF5 100%)',
          border: `1.5px solid ${T.copper}`,
          boxShadow: '0 8px 40px rgba(255,122,61,0.15)'
        }}
      >
        <div>
          <h3 className="text-lg font-black" style={{ color: T.text }}>🎉 Full 6-Stage Engineering Journey Complete!</h3>
          <p className="text-xs mt-0.5 max-w-xl" style={{ color: T.muted }}>
            You traveled from raw prompt → requirements synthesis → architectural blueprint → runnable live runtime → code intelligence → interactive mini-course mastery.
          </p>
        </div>
        <button
          onClick={onStartOver}
          className="px-6 py-3 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shrink-0 text-slate-950 cursor-pointer shadow-md"
          style={{ background: T.gradient }}
        >
          Forge Another App ⚡
        </button>
      </div>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title={`Mini-Course: ${appTitle}`}
        markdownContent={genCourseMarkdown()}
        fileName={`${appTitle.toLowerCase().replace(/\s+/g,'-')}-course.md`}
      />
    </div>
  );
}
