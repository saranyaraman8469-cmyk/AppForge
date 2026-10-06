import React, { useState } from 'react';
import { Layers, Smartphone, Database, Calendar, Compass, ArrowRight, ArrowLeft, FileText, Clock } from 'lucide-react';
import MermaidDiagram from '../components/MermaidDiagram';
import ExportModal from '../components/ExportModal';
import { useTheme } from '../context/ThemeContext';

export default function PlanStage({ planData, onProceedToBuild, onBack, isBuilding, appTitle = 'My App' }) {
  const { isDark, T } = useTheme();
  const [activeTab, setActiveTab] = useState('stack');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const TABS = [
    { id: 'stack',    label: 'Tech Stack',       icon: Layers,    color: T.copper },
    { id: 'screens',  label: 'Screen Wireframes',icon: Smartphone,color: T.gold },
    { id: 'datamodel',label: 'Data Model',       icon: Database,  color: T.copper },
    { id: 'roadmap',  label: 'Build Roadmap',    icon: Calendar,  color: T.success },
    { id: 'flowchart',label: 'Nav Flow',         icon: Compass,   color: T.gold },
  ];

  if (!planData) {
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
          <Compass className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold mb-1" style={{ color: T.text }}>Architecting Blueprint…</h3>
        <p className="text-sm" style={{ color: T.muted }}>Generating tech stack, entity schemas, wireframes, and roadmap.</p>
      </div>
    );
  }

  const totalMinutes = (planData.buildRoadmap || []).reduce((s, r) => s + (r.estimatedMinutes || 25), 0);

  const generateMarkdown = () => `# Architecture Plan: ${appTitle}

## Tech Stack
${(planData.techStack||[]).map(t => `- **${t.name}** (${t.category}): ${t.reason}`).join('\n')}

## Screens
${(planData.screens||[]).map(s => `### ${s.name}\n${s.description}\nSections: ${(s.wireframeSections||[]).join(', ')}`).join('\n\n')}

## Data Model
${(planData.dataModel||[]).map(e => `### ${e.entity}\n${(e.fields||[]).map(f => `- \`${f.name}\` (${f.type}): ${f.description}`).join('\n')}`).join('\n\n')}

## Build Roadmap (Total: ${totalMinutes} mins)
${(planData.buildRoadmap||[]).map(r => `${r.stepNumber}. **${r.title}** — ${r.estimatedMinutes}m — ${r.description}`).join('\n')}
`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest font-mono" style={{ color: T.copper }}>
            Stage 3 / Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black" style={{ color: T.text }}>System Blueprint</h2>
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
            <FileText className="w-3.5 h-3.5" /><span>Export .md</span>
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>
      </div>

      {/* ── Tab Nav ── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b" style={{ borderColor: T.border }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
              style={isActive ? {
                background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                border: `1px solid ${T.copper}`,
                color: T.copper,
                boxShadow: '0 0 12px rgba(255,122,61,0.2)',
              } : {
                background: 'transparent',
                border: '1px solid transparent',
                color: T.muted,
              }}
            >
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab: Tech Stack ── */}
      {activeTab === 'stack' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {planData.techStack?.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl transition-colors shadow-lg"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono"
                  style={{
                    background: isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.1)',
                    border: '1px solid rgba(255,122,61,0.3)',
                    color: T.copper
                  }}
                >
                  {item.category}
                </span>
                <span className="text-[10px] font-mono" style={{ color: T.muted }}>{item.badge}</span>
              </div>
              <h3 className="font-extrabold text-base mb-2" style={{ color: T.text }}>{item.name}</h3>
              <p className="text-xs leading-relaxed" style={{ color: T.textBody }}>
                <strong style={{ color: T.text }}>Design Rationale:</strong> {item.reason}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Screens ── */}
      {activeTab === 'screens' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          {planData.screens?.map((screen, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl flex flex-col transition-colors shadow-lg"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black text-slate-950 font-mono"
                  style={{ background: T.gradient }}
                >
                  {i+1}
                </span>
                <h3 className="font-extrabold text-sm" style={{ color: T.text }}>{screen.name}</h3>
              </div>
              <p className="text-[11px] mb-4" style={{ color: T.muted }}>{screen.description}</p>
              <div
                className="flex-1 p-3 rounded-xl space-y-2 transition-colors"
                style={{ background: T.cardSub, border: `1px solid ${T.border}` }}
              >
                <p className="text-[9px] font-mono uppercase tracking-wider mb-1.5" style={{ color: T.muted }}>
                  Wireframe Components
                </p>
                {screen.wireframeSections?.map((s, si) => (
                  <div
                    key={si}
                    className="p-2 rounded-lg flex items-center gap-2 text-[11px] transition-colors"
                    style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: T.copper }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Data Model ── */}
      {activeTab === 'datamodel' && (
        <div className="space-y-5 animate-fade-in">
          {planData.dataModel?.map((entity, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl transition-colors shadow-lg"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4" style={{ color: T.gold }} />
                <h3 className="font-bold text-sm" style={{ color: T.text }}>
                  Entity: <span className="font-mono" style={{ color: T.gold }}>{entity.entity}</span>
                </h3>
              </div>
              {entity.description && <p className="text-xs mb-3" style={{ color: T.muted }}>{entity.description}</p>}
              <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${T.border}` }}>
                <table className="w-full text-xs">
                  <thead style={{ background: isDark ? '#101419' : '#EAEFF5' }}>
                    <tr>{['Field','Type','Req','Description'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>
                        {h}
                      </th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {entity.fields?.map((f, fi) => (
                      <tr key={fi} style={{ borderTop: `1px solid ${T.border}` }}>
                        <td className="px-4 py-2.5 font-mono font-bold text-[11px]" style={{ color: T.copper }}>{f.name}</td>
                        <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: T.muted }}>{f.type}</td>
                        <td className="px-4 py-2.5">
                          {f.isRequired ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(54,211,153,0.15)', color: T.success }}>
                              Yes
                            </span>
                          ) : (
                            <span style={{ color: T.muted }} className="text-[10px]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-[11px]" style={{ color: T.textBody }}>{f.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Roadmap ── */}
      {activeTab === 'roadmap' && (
        <div className="space-y-3 animate-fade-in">
          <div
            className="flex items-center justify-between p-3.5 rounded-2xl text-xs font-mono"
            style={{
              background: isDark ? 'rgba(255,122,61,0.08)' : 'rgba(255,122,61,0.08)',
              border: `1px solid rgba(255,122,61,0.25)`,
              color: T.copper
            }}
          >
            <span className="font-bold">Total Estimated Engineering Duration:</span>
            <span className="font-mono font-black">{totalMinutes} minutes</span>
          </div>
          {planData.buildRoadmap?.map((step) => (
            <div
              key={step.stepNumber}
              className="p-5 rounded-2xl flex items-start gap-4 transition-colors shadow-lg"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-slate-950 shrink-0 font-mono"
                style={{ background: T.gradient }}
              >
                {step.stepNumber}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm" style={{ color: T.text }}>{step.title}</h3>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-mono"
                    style={{ background: T.cardSub, color: T.muted }}
                  >
                    {step.phase}
                  </span>
                </div>
                <p className="text-xs mb-1.5" style={{ color: T.muted }}>{step.description}</p>
                {step.deliverables && (
                  <p className="text-[11px] font-mono" style={{ color: T.copper }}>{step.deliverables}</p>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold shrink-0 self-center" style={{ color: T.gold }}>
                <Clock className="w-3 h-3" />{step.estimatedMinutes}m
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Flow ── */}
      {activeTab === 'flowchart' && (
        <div className="animate-fade-in">
          <MermaidDiagram mermaidCode={planData.flowChartMermaid} screens={planData.screens} />
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
          <p className="font-bold text-sm" style={{ color: T.text }}>Ready to generate full runnable code?</p>
          <p className="text-xs" style={{ color: T.muted }}>Proceed to Build: Forge synthesizes complete source + boots live runtime simulator.</p>
        </div>
        <button
          onClick={onProceedToBuild}
          disabled={isBuilding}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all text-slate-950 disabled:opacity-50 cursor-pointer shadow-md"
          style={{
            background: T.gradient,
            boxShadow: '0 4px 20px rgba(255,122,61,0.3)',
          }}
        >
          {isBuilding ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Building App…</span>
            </>
          ) : (
            <>
              <span>Launch Live Build Studio</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title={`Plan: ${appTitle}`}
        markdownContent={generateMarkdown()}
        fileName={`${appTitle.toLowerCase().replace(/\s+/g,'-')}-plan.md`}
      />
    </div>
  );
}
