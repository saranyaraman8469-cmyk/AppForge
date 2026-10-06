import React, { useState } from 'react';
import { GitBranch, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function MermaidDiagram({ mermaidCode, screens }) {
  const { isDark, T } = useTheme();
  const [zoom, setZoom] = useState(1);
  const [activeNode, setActiveNode] = useState(null);

  // Extract flow steps from screens or default
  const nodes = [
    { id: 'start', label: 'User Opens App', type: 'entry', desc: 'Initial hydration & state load' },
    { id: 'screen1', label: screens?.[0]?.name || 'Main Dashboard', type: 'screen', desc: 'Core UI feed & active metrics' },
    { id: 'action1', label: 'User Action / Check-in', type: 'action', desc: 'Optimistic state dispatch & visual feedback' },
    { id: 'screen2', label: screens?.[1]?.name || 'Action Modal', type: 'screen', desc: 'Creation sheet & input validation' },
    { id: 'screen3', label: screens?.[2]?.name || 'Analytics / Settle View', type: 'screen', desc: 'Summary insights & calculations' }
  ];

  return (
    <div
      className="w-full rounded-2xl p-5 shadow-xl relative overflow-hidden transition-colors"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      {/* Header & Controls */}
      <div
        className="flex items-center justify-between mb-6 pb-3"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4" style={{ color: T.copper }} />
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: T.text }}>
            Screen & Navigation Architecture Flow
          </h4>
        </div>
        <div
          className="flex items-center gap-1.5 p-1 rounded-lg transition-colors"
          style={{ background: isDark ? '#15191F' : '#EAEFF5', border: `1px solid ${T.border}` }}
        >
          <button
            onClick={() => setZoom(z => Math.max(0.7, z - 0.1))}
            className="p-1 rounded transition-colors"
            style={{ color: T.muted }}
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono px-1" style={{ color: T.text }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}
            className="p-1 rounded transition-colors"
            style={{ color: T.muted }}
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1 rounded transition-colors"
            style={{ color: T.muted }}
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Flow Canvas */}
      <div
        className="w-full overflow-x-auto py-6 transition-transform duration-200 flex justify-center"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
      >
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 max-w-4xl">
          {nodes.map((node, idx) => {
            const isActive = activeNode === node.id;
            const dotColor = node.type === 'entry' ? T.success : node.type === 'screen' ? T.copper : T.gold;
            
            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <div
                  onClick={() => setActiveNode(isActive ? null : node.id)}
                  className="p-3.5 rounded-2xl text-center transition-all cursor-pointer min-w-[150px] max-w-[180px]"
                  style={{
                    background: isActive
                      ? (isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.1)')
                      : T.cardSub,
                    border: isActive ? `1px solid ${T.copper}` : `1px solid ${T.border}`,
                    boxShadow: isActive ? '0 0 20px rgba(255,122,61,0.25)' : 'none',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: dotColor }} />
                    <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.muted }}>
                      {node.type}
                    </span>
                  </div>
                  <p className="font-bold text-xs leading-tight" style={{ color: T.text }}>{node.label}</p>
                  <p className="text-[10px] mt-1 line-clamp-2" style={{ color: T.muted }}>{node.desc}</p>
                </div>

                {/* Arrow Connector */}
                {idx < nodes.length - 1 && (
                  <div className="flex flex-col md:flex-row items-center font-mono text-xs" style={{ color: T.muted }}>
                    <span className="hidden md:inline">➔</span>
                    <span className="md:hidden">⬇</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Raw Mermaid Syntax Accordion */}
      {mermaidCode && (
        <details className="mt-4 pt-3 group" style={{ borderTop: `1px solid ${T.border}` }}>
          <summary className="text-[11px] cursor-pointer font-mono font-medium" style={{ color: T.muted }}>
            View Mermaid Code Syntax
          </summary>
          <pre
            className="mt-2 p-3 rounded-xl font-mono text-[11px] overflow-x-auto"
            style={{
              background: isDark ? '#080A0D' : '#F0F4F8',
              border: `1px solid ${T.border}`,
              color: T.textBody
            }}
          >
            {mermaidCode}
          </pre>
        </details>
      )}
    </div>
  );
}
