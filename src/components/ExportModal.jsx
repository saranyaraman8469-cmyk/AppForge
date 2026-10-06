import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ExportModal({ isOpen, onClose, title, markdownContent, fileName }) {
  const { isDark, T } = useTheme();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{
        background: isDark ? 'rgba(11,13,16,0.85)' : 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col p-6 shadow-2xl relative transition-colors"
        style={{ background: T.card, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-center justify-between pb-4 mb-4" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
                border: '1px solid rgba(255,122,61,0.3)',
                color: T.copper
              }}
            >
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base" style={{ color: T.text }}>{title}</h3>
              <p className="text-xs" style={{ color: T.muted }}>Export clean markdown documentation</p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: T.muted }} className="p-1 rounded-lg hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 rounded-2xl mb-4 transition-colors"
          style={{ background: isDark ? '#0B0D10' : '#F0F4F8', border: `1px solid ${T.border}` }}
        >
          <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap" style={{ color: T.textBody }}>
            {markdownContent}
          </pre>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs" style={{ color: T.muted }}>{markdownContent.length} characters</span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
            >
              {copied ? <Check className="w-3.5 h-3.5" style={{ color: T.success }} /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-slate-950 transition-all shadow-md"
              style={{
                background: T.gradient,
                boxShadow: '0 4px 16px rgba(255,122,61,0.3)',
              }}
            >
              <Download className="w-3.5 h-3.5" /> Download .md
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
