import React from 'react';
import { Sparkles, BrainCircuit, Compass, Hammer, BookOpen, GraduationCap, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const STAGES = [
  { id: 1, name: 'Prompt',    tag: 'Idea Intake',       aiDoing: 'Capturing your vision, platform, and developer experience level.',                 icon: Sparkles,      accent: '#FF7A3D' },
  { id: 2, name: 'Understand',tag: 'Scope & Analysis',  aiDoing: 'Decomposing problem space, ranking features, and clarifying requirements.',        icon: BrainCircuit,  accent: '#FF9461' },
  { id: 3, name: 'Plan',      tag: 'Architecture',      aiDoing: 'Designing tech stack, screen wireframes, schema entities, and navigation flows.',   icon: Compass,       accent: '#F5B942' },
  { id: 4, name: 'Build',     tag: 'Code & Runtime',    aiDoing: 'Generating production-ready code and launching sandboxed phone simulator.',         icon: Hammer,        accent: '#FF7A3D' },
  { id: 5, name: 'Explain',   tag: 'Code Mentorship',   aiDoing: 'Explaining design decisions and answering your technical questions in plain terms.',  icon: BookOpen,      accent: '#F5B942' },
  { id: 6, name: 'Learn',     tag: 'Mastery & Quiz',    aiDoing: 'Creating hands-on coding challenges, mastery quiz, and personalized learning path.', icon: GraduationCap, accent: '#36D399' },
];

export default function Stepper({ currentStage, maxReachedStage, onSelectStage }) {
  const { isDark, T } = useTheme();
  const activeInfo = STAGES.find(s => s.id === currentStage) || STAGES[0];

  return (
    <div
      className="w-full sticky top-16 z-40 transition-colors duration-200"
      style={{
        background: isDark ? 'rgba(11,13,16,0.95)' : 'rgba(244,247,250,0.95)',
        borderBottom: `1px solid ${T.border}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3.5 pb-3">

        {/* ── Stage Pills Row ── */}
        <div className="relative">
          {/* Progress connector line */}
          <div
            className="hidden md:block absolute top-5 left-8 right-8 h-px"
            style={{ background: isDark ? '#29313A' : '#D0D9E2' }}
          />
          <div
            className="hidden md:block absolute top-5 left-8 h-px transition-all duration-500"
            style={{
              background: 'linear-gradient(90deg, #FF7A3D 0%, #F5B942 50%, #36D399 100%)',
              width: `calc(${((Math.min(currentStage, 6) - 1) / 5) * 100}% - 16px)`,
            }}
          />

          <div className="grid grid-cols-3 md:grid-cols-6 gap-1 sm:gap-2 relative z-10">
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              const isCurrent   = stage.id === currentStage;
              const isCompleted = stage.id < currentStage;
              const isAccessible= stage.id <= maxReachedStage;

              return (
                <button
                  key={stage.id}
                  onClick={() => isAccessible && onSelectStage(stage.id)}
                  disabled={!isAccessible}
                  className="flex flex-col items-center gap-1.5 py-1.5 px-1 rounded-2xl transition-all"
                  style={{
                    cursor: isAccessible ? 'pointer' : 'not-allowed',
                    opacity: isAccessible ? 1 : 0.4,
                    background: isCurrent ? (isDark ? 'rgba(255,122,61,0.08)' : 'rgba(255,122,61,0.08)') : 'transparent',
                  }}
                >
                  {/* Icon Bubble */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300"
                    style={
                      isCurrent ? {
                        background: T.gradient,
                        border: 'none',
                        color: '#0B0D10',
                        boxShadow: '0 0 18px rgba(255,122,61,0.4)',
                        transform: 'scale(1.08)',
                      } : isCompleted ? {
                        background: isDark ? 'rgba(54,211,153,0.15)' : 'rgba(54,211,153,0.18)',
                        border: `1.5px solid ${T.success}`,
                        color: T.success,
                      } : {
                        background: isDark ? '#15191F' : '#EAEFF5',
                        border: `1px solid ${T.border}`,
                        color: T.muted,
                      }
                    }
                  >
                    {isCompleted && !isCurrent ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                  </div>

                  {/* Labels */}
                  <div className="text-center">
                    <p
                      className="text-[11px] font-bold leading-tight transition-colors"
                      style={{
                        color: isCurrent
                          ? T.copper
                          : isCompleted
                          ? (isDark ? '#C8D0D9' : '#2A3440')
                          : T.muted
                      }}
                    >
                      {stage.name}
                    </p>
                    <p className="text-[9px] hidden sm:block" style={{ color: T.muted }}>
                      {stage.tag}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Stage Description Bar ── */}
        <div
          className="mt-3 py-2 px-3.5 rounded-xl flex items-center gap-3 transition-colors"
          style={{
            background: isDark ? '#15191F' : '#EAEFF5',
            border: `1px solid ${T.border}`,
          }}
        >
          <span
            className="text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 font-mono"
            style={{
              background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.18)',
              color: T.copper,
              border: `1px solid rgba(255,122,61,0.35)`
            }}
          >
            Stage {activeInfo.id} / 6 — {activeInfo.name}
          </span>
          <p className="text-xs truncate" style={{ color: T.textBody }}>
            <span className="font-semibold" style={{ color: T.text }}>AI Status:</span> {activeInfo.aiDoing}
          </p>
        </div>

      </div>
    </div>
  );
}
