import React, { useState } from 'react';
import { Key, Shield, Check, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PROVIDERS = [
  { id: 'demo',       name: 'Demo Mode (Built-in Datasets)',        badge: '⭐ Recommended',  desc: 'Zero setup — rich pre-built datasets for all 4 flagship apps.' },
  { id: 'openai',     name: 'OpenAI (GPT-4o / GPT-4o-mini)',        badge: 'Live API', desc: 'JSON-mode with structured output enforcement.' },
  { id: 'claude',     name: 'Anthropic (Claude 3.5 Sonnet)',         badge: 'Live API', desc: 'System prompt–driven JSON extraction.' },
  { id: 'openrouter', name: 'OpenRouter (Llama 3.3 / Multi-model)', badge: 'Aggregator', desc: 'Universal endpoint for open-weight models.' },
  { id: 'gemini',     name: 'Google Gemini (1.5 Flash / Pro)',       badge: 'Live API', desc: 'Gemini with JSON mime type enforcement.' },
];

export default function ApiKeyModal({ isOpen, onClose, apiSettings, onSaveSettings }) {
  const { isDark, T } = useTheme();
  const [provider, setProvider] = useState(apiSettings.provider || 'demo');
  const [apiKey, setApiKey] = useState(apiSettings.apiKey || '');
  const [model, setModel] = useState(apiSettings.model || '');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings({ provider, apiKey: provider === 'demo' ? '' : apiKey.trim(), model: model.trim() });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: isDark ? 'rgba(11,13,16,0.85)' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)' }}
    >
      <div
        className="rounded-3xl w-full max-w-lg p-6 shadow-2xl relative transition-colors"
        style={{ background: T.card, border: `1px solid ${T.border}` }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 transition-colors p-1 rounded-lg"
          style={{ color: T.muted }}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{
              background: isDark ? 'rgba(255,122,61,0.15)' : 'rgba(255,122,61,0.12)',
              border: `1px solid rgba(255,122,61,0.3)`,
              color: T.copper
            }}
          >
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: T.text }}>AI Provider Settings</h3>
            <p className="text-xs" style={{ color: T.muted }}>Configure your LLM or run in zero-key Demo Mode</p>
          </div>
        </div>

        <div
          className="flex items-start gap-2.5 p-3 rounded-2xl mb-5 text-xs"
          style={{
            background: isDark ? 'rgba(255,122,61,0.08)' : 'rgba(255,122,61,0.06)',
            border: `1px solid rgba(255,122,61,0.25)`,
            color: isDark ? '#FF9461' : '#B8501E'
          }}
        >
          <Shield className="w-4 h-4 shrink-0 mt-0.5" style={{ color: T.copper }} />
          <span>Keys are held strictly in temporary memory during your browser session — never saved or transmitted externally.</span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 font-mono" style={{ color: T.muted }}>
              Select Provider
            </label>
            <div className="space-y-2">
              {PROVIDERS.map(p => {
                const isSel = provider === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className="p-3 rounded-2xl cursor-pointer transition-all flex items-start justify-between"
                    style={{
                      background: isSel
                        ? (isDark ? 'rgba(255,122,61,0.12)' : 'rgba(255,122,61,0.08)')
                        : T.cardSub,
                      border: isSel ? `1px solid ${T.copper}` : `1px solid ${T.border}`,
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: isSel ? T.copper : T.text }}>
                          {p.name}
                        </span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={p.id === 'demo' ? {
                            background: isDark ? 'rgba(245,185,66,0.2)' : 'rgba(245,185,66,0.25)',
                            color: isDark ? '#F5B942' : '#B87B08'
                          } : {
                            background: isDark ? '#29313A' : '#D0D9E2',
                            color: T.muted
                          }}
                        >
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: T.muted }}>{p.desc}</p>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        borderColor: isSel ? T.copper : T.border,
                        background: isSel ? T.copper : 'transparent'
                      }}
                    >
                      {isSel && <Check className="w-2.5 h-2.5 stroke-[3] text-slate-950" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {provider !== 'demo' && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: T.muted }}>
                  {provider.toUpperCase()} API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder={`Paste ${provider} API key…`}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono focus:outline-none transition-colors"
                  style={{
                    background: isDark ? '#0B0D10' : '#FFFFFF',
                    border: `1px solid ${T.border}`,
                    color: T.text
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: T.muted }}>
                  Custom Model ID (optional)
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  placeholder={provider === 'openai' ? 'gpt-4o-mini' : provider === 'claude' ? 'claude-3-5-sonnet-20241022' : provider === 'gemini' ? 'gemini-1.5-flash' : 'default'}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-colors"
                  style={{
                    background: isDark ? '#0B0D10' : '#FFFFFF',
                    border: `1px solid ${T.border}`,
                    color: T.text
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: T.cardSub, border: `1px solid ${T.border}`, color: T.muted }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold text-xs text-slate-950 transition-all shadow-md"
              style={{
                background: T.gradient,
                boxShadow: '0 4px 16px rgba(255,122,61,0.3)',
              }}
            >
              {saved ? '✓ Saved!' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
