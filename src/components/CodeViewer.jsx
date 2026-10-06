import React, { useState } from 'react';
import { Copy, Check, Download, FileCode } from 'lucide-react';
import JSZip from 'jszip';
import { useTheme } from '../context/ThemeContext';

export default function CodeViewer({ files, appTitle = "ForgeApp-Project" }) {
  const { isDark, T } = useTheme();
  const fileKeys = Object.keys(files || {});
  const [activeFile, setActiveFile] = useState(fileKeys[0] || 'src/App.jsx');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const currentCode = files?.[activeFile] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();
      
      // Add each file to the zip archive
      Object.entries(files).forEach(([path, content]) => {
        zip.file(path, content);
      });

      // Include a standard README.md if not present
      if (!files['README.md']) {
        zip.file(
          'README.md',
          `# ${appTitle}\n\nGenerated with [FORGEAPP](https://forgeapp.dev) — Obsidian Forge AI Development Studio.\n\n## Quick Start\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n`
        );
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${appTitle.toLowerCase().replace(/\s+/g, '-')}-source.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error creating zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const lines = currentCode.split('\n');

  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl transition-colors"
      style={{
        background: isDark ? '#0B0D10' : '#FFFFFF',
        border: `1px solid ${T.border}`,
        color: T.text
      }}
    >
      {/* Top Action Bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 transition-colors"
        style={{
          background: isDark ? '#15191F' : '#EAEFF5',
          borderBottom: `1px solid ${T.border}`
        }}
      >
        {/* File tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {fileKeys.map((f) => {
            const isActive = activeFile === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFile(f)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all"
                style={{
                  background: isActive
                    ? (isDark ? 'rgba(255,122,61,0.15)' : '#FFFFFF')
                    : 'transparent',
                  color: isActive ? T.copper : T.muted,
                  border: isActive ? `1px solid ${T.copper}` : '1px solid transparent',
                  boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{f}</span>
              </button>
            );
          })}
        </div>

        {/* Copy & Download ZIP Actions */}
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: isDark ? '#1C222A' : '#FFFFFF',
              border: `1px solid ${T.border}`,
              color: copied ? T.success : T.text,
            }}
            title="Copy current file code"
          >
            {copied ? <Check className="w-3.5 h-3.5" style={{ color: T.success }} /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 text-slate-950"
            style={{
              background: T.gradient,
              boxShadow: '0 0 15px rgba(255,122,61,0.3)',
            }}
            title="Download full project as .ZIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isZipping ? 'Zipping...' : 'Download .ZIP'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Panel with Line Numbers */}
      <div
        className="flex-1 overflow-auto font-mono text-xs leading-relaxed flex select-text transition-colors"
        style={{ background: isDark ? '#080A0D' : '#F8FAFC' }}
      >
        {/* Line numbers column */}
        <div
          className="py-4 px-3 text-right select-none font-mono text-[11px] min-w-[3rem] transition-colors"
          style={{
            background: isDark ? '#0B0D10' : '#F1F5F9',
            borderRight: `1px solid ${T.border}`,
            color: T.muted
          }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <pre
          className="p-4 flex-1 overflow-x-auto font-mono text-[12px] whitespace-pre tab-4"
          style={{ color: isDark ? '#F4F7FA' : '#0B0D10' }}
        >
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Editor Status Bar */}
      <div
        className="px-4 py-1.5 flex items-center justify-between text-[11px] font-mono transition-colors"
        style={{
          background: isDark ? '#15191F' : '#EAEFF5',
          borderTop: `1px solid ${T.border}`,
          color: T.muted
        }}
      >
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>{lines.length} lines</span>
          <span>{activeFile.endsWith('.jsx') ? 'React JSX' : activeFile.endsWith('.html') ? 'HTML5' : 'Text'}</span>
        </div>
        <div style={{ color: T.copper, fontWeight: 600 }}>
          FORGE Engine v2.0
        </div>
      </div>
    </div>
  );
}
