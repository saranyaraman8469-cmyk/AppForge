import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Monitor, RotateCw, ExternalLink, Wifi, Battery } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function PhoneMockup({ codeFiles, appTitle = "App Preview", targetPlatform = "Mobile app" }) {
  const { isDark, T } = useTheme();
  const [deviceMode, setDeviceMode] = useState(targetPlatform.includes('Mobile') ? 'mobile' : 'desktop');
  const [reloadKey, setReloadKey] = useState(0);
  const [time, setTime] = useState('9:41');
  const iframeRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Construct self-contained executable HTML bundle
  const generateBundleHtml = () => {
    const appJsx = codeFiles?.['src/App.jsx'] || '';
    
    // Clean imports from App.jsx so Babel Standalone runs it cleanly
    const cleanedJsx = appJsx
      .replace(/import\s+React.*?from\s+['"].*?['"];?/g, '')
      .replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"];?/g, 'const { useState, useEffect, useMemo, useRef, useCallback } = React;')
      .replace(/export\s+default\s+function\s+App/g, 'function App');

    return `<!DOCTYPE html>
<html lang="en" class="${isDark ? 'dark' : ''}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>${appTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            copper: '#FF7A3D',
            gold: '#F5B942',
            obsidian: '#0B0D10',
            steel: '#1C222A',
          }
        }
      }
    }
  </script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      background-color: ${isDark ? '#0B0D10' : '#FFFFFF'};
      color: ${isDark ? '#F4F7FA' : '#0B0D10'};
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    ::-webkit-scrollbar { display: none; }
    * { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="${isDark ? 'bg-[#0B0D10] text-[#F4F7FA]' : 'bg-[#FFFFFF] text-[#0B0D10]'} antialiased min-h-screen">
  <div id="root"></div>

  <script type="text/babel">
    ${cleanedJsx}

    // Mount to DOM
    if (typeof App !== 'undefined') {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
    } else {
      document.getElementById('root').innerHTML = '<div style="padding:20px;text-align:center;color:#8D98A5">App initialized successfully.</div>';
    }
  </script>
</body>
</html>`;
  };

  const bundleHtml = generateBundleHtml();

  const handleOpenNewWindow = () => {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(bundleHtml);
      win.document.close();
    }
  };

  return (
    <div
      className="flex flex-col h-full rounded-3xl p-4 shadow-xl transition-colors"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      {/* Device Toolbar */}
      <div className="flex items-center justify-between mb-4 px-2">
        {/* Device Switcher */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl transition-colors"
          style={{ background: isDark ? '#101419' : '#EAEFF5', border: `1px solid ${T.border}` }}
        >
          <button
            onClick={() => setDeviceMode('mobile')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: deviceMode === 'mobile' ? (isDark ? '#1C222A' : '#FFFFFF') : 'transparent',
              color: deviceMode === 'mobile' ? T.copper : T.muted,
              border: deviceMode === 'mobile' ? `1px solid ${T.copper}` : '1px solid transparent',
              boxShadow: deviceMode === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>

          <button
            onClick={() => setDeviceMode('desktop')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: deviceMode === 'desktop' ? (isDark ? '#1C222A' : '#FFFFFF') : 'transparent',
              color: deviceMode === 'desktop' ? T.copper : T.muted,
              border: deviceMode === 'desktop' ? `1px solid ${T.copper}` : '1px solid transparent',
              boxShadow: deviceMode === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
        </div>

        {/* Live Status indicator & Reload */}
        <div className="flex items-center gap-2">
          <span
            className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: isDark ? 'rgba(54,211,153,0.12)' : 'rgba(54,211,153,0.18)',
              border: `1px solid rgba(54,211,153,0.35)`,
              color: isDark ? '#36D399' : '#0D8A56',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.success }}></span>
            Live Sandbox
          </span>

          <button
            onClick={() => setReloadKey(k => k + 1)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ background: isDark ? '#15191F' : '#EAEFF5', border: `1px solid ${T.border}`, color: T.muted }}
            title="Reload sandbox runtime"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleOpenNewWindow}
            className="p-1.5 rounded-lg transition-colors"
            style={{ background: isDark ? '#15191F' : '#EAEFF5', border: `1px solid ${T.border}`, color: T.muted }}
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-2">
        {deviceMode === 'mobile' ? (
          /* Phone Frame Mockup */
          <div
            className="relative w-[360px] h-[680px] rounded-[44px] p-3 shadow-2xl flex flex-col shrink-0 transition-colors"
            style={{
              background: isDark ? '#080A0D' : '#1C222A',
              border: `4px solid ${isDark ? '#29313A' : '#15191F'}`,
              boxShadow: isDark
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255,122,61,0.1)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(255,122,61,0.15)',
            }}
          >
            {/* Top Phone Island / Camera Notch */}
            <div className="h-6 w-full flex items-center justify-between px-6 text-[11px] font-semibold select-none pt-1" style={{ color: '#8D98A5' }}>
              <span>{time}</span>
              <div className="w-20 h-4 bg-black rounded-full mx-auto relative flex items-center justify-end px-2">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#29313A' }}></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3" style={{ color: '#8D98A5' }} />
                <Battery className="w-3.5 h-3.5" style={{ color: '#8D98A5' }} />
              </div>
            </div>

            {/* Screen Viewport with Sandboxed Iframe */}
            <div
              className="flex-1 rounded-[32px] overflow-hidden mt-1 relative"
              style={{ background: isDark ? '#0B0D10' : '#FFFFFF', border: `1px solid ${T.border}` }}
            >
              <iframe
                key={reloadKey}
                ref={iframeRef}
                title="App Preview Sandbox"
                srcDoc={bundleHtml}
                className="w-full h-full border-0 select-none"
                sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
              />
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="h-4 flex items-center justify-center pt-1">
              <div className="w-32 h-1 rounded-full" style={{ background: '#8D98A5' }}></div>
            </div>
          </div>
        ) : (
          /* Responsive Desktop/Tablet Window */
          <div
            className="w-full h-full min-h-[520px] rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-colors"
            style={{ background: isDark ? '#0B0D10' : '#FFFFFF', border: `1px solid ${T.border}` }}
          >
            {/* Window titlebar */}
            <div
              className="h-8 flex items-center px-4 gap-2 transition-colors"
              style={{ background: isDark ? '#15191F' : '#EAEFF5', borderBottom: `1px solid ${T.border}` }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF4D4D' }}></div>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F5B942' }}></div>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#36D399' }}></div>
              </div>
              <div className="flex-1 text-center text-[11px] font-mono truncate" style={{ color: T.muted }}>
                http://localhost:5173/preview
              </div>
            </div>

            {/* Desktop Iframe */}
            <div className="flex-1" style={{ background: isDark ? '#0B0D10' : '#FFFFFF' }}>
              <iframe
                key={reloadKey}
                ref={iframeRef}
                title="App Desktop Preview"
                srcDoc={bundleHtml}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
