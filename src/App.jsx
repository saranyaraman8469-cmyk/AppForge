import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Stepper from './components/Stepper';
import Footer from './components/Footer';
import ApiKeyModal from './components/ApiKeyModal';
import TechStackModal from './components/TechStackModal';

import PromptStage from './stages/PromptStage';
import UnderstandStage from './stages/UnderstandStage';
import PlanStage from './stages/PlanStage';
import BuildStage from './stages/BuildStage';
import ExplainStage from './stages/ExplainStage';
import LearnStage from './stages/LearnStage';

import { ThemeProvider, useTheme } from './context/ThemeContext';

import {
  executeUnderstandStage,
  executePlanStage,
  executeLearnStage,
  findBestMatchingSample
} from './data/aiService';

function AppContent() {
  const { isDark, T } = useTheme();

  // ── Navigation ──────────────────────────────────────────
  const [currentStage, setCurrentStage]       = useState(1);
  const [maxReachedStage, setMaxReachedStage] = useState(1);

  // ── Modals ───────────────────────────────────────────────
  const [isSettingsOpen, setIsSettingsOpen]   = useState(false);
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);

  // ── AI Config (in-memory only) ────────────────────────────
  const [apiSettings, setApiSettings] = useState({ provider: 'demo', apiKey: '', model: '' });

  // ── Stage 1 ───────────────────────────────────────────────
  const [prompt, setPrompt]               = useState('A sleek habit tracker that helps users build consistent daily routines with streaks, visual progress rings, category badges, and celebration animations.');
  const [skillLevel, setSkillLevel]       = useState('Beginner');
  const [targetPlatform, setTargetPlatform] = useState('Mobile app');

  // ── Stage 2 ───────────────────────────────────────────────
  const [understandData, setUnderstandData] = useState(null);
  const [isAnalyzing, setIsAnalyzing]       = useState(false);
  const [understandError, setUnderstandError] = useState(null);

  // ── Stage 3 ───────────────────────────────────────────────
  const [planData, setPlanData]   = useState(null);
  const [isPlanning, setIsPlanning] = useState(false);

  // ── Stage 4 ───────────────────────────────────────────────
  const [codeFiles, setCodeFiles]   = useState(null);
  const [isBuilding, setIsBuilding] = useState(false);

  // ── Stage 5 ───────────────────────────────────────────────
  const [explainData, setExplainData] = useState(null);

  // ── Stage 6 ───────────────────────────────────────────────
  const [learnData, setLearnData]   = useState(null);
  const [isLearning, setIsLearning] = useState(false);

  // ── Derived App Title ────────────────────────────────────
  const appTitle =
    prompt.toLowerCase().includes('habit')   ? 'HabitPulse'   :
    prompt.toLowerCase().includes('expense') ? 'FairShare'     :
    prompt.toLowerCase().includes('recipe')  ? 'PlateCraft'    :
    prompt.toLowerCase().includes('study')   ? 'FocusFlow'     : 'Forged App';

  // ── Advance to next stage helper ──────────────────────────
  const advance = (n) => {
    setCurrentStage(n);
    setMaxReachedStage(prev => Math.max(prev, n));
  };

  // ── Stage 1 → 2 ──────────────────────────────────────────
  const handlePromptSubmit = async () => {
    setIsAnalyzing(true);
    setUnderstandError(null);
    try {
      const result = await executeUnderstandStage({ prompt, skillLevel, targetPlatform, apiSettings });
      setUnderstandData(result);
      advance(2);
    } catch (err) {
      const fallback = findBestMatchingSample(prompt).understand;
      setUnderstandData(fallback);
      advance(2);
      setUnderstandError('Running on Demo Mode datasets — enter an API key in Settings for custom AI output.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ── Stage 2 → 3 ──────────────────────────────────────────
  const handleConfirmUnderstand = async () => {
    setIsPlanning(true);
    try {
      const result = await executePlanStage({ understandData, prompt, skillLevel, targetPlatform, apiSettings });
      setPlanData(result);
      advance(3);
    } catch (err) {
      setPlanData(findBestMatchingSample(prompt).plan);
      advance(3);
    } finally {
      setIsPlanning(false);
    }
  };

  // ── Stage 3 → 4 ──────────────────────────────────────────
  const handleProceedToBuild = () => {
    setIsBuilding(true);
    const matched = findBestMatchingSample(prompt);
    setCodeFiles(matched.codeFiles);
    setExplainData(matched.explain);
    setIsBuilding(false);
    advance(4);
  };

  // ── Stage 4 → 5 ──────────────────────────────────────────
  const handleProceedToExplain = () => advance(5);

  // ── Stage 5 → 6 ──────────────────────────────────────────
  const handleProceedToLearn = async () => {
    setIsLearning(true);
    try {
      const result = await executeLearnStage({ planData, understandData, prompt, skillLevel, apiSettings });
      setLearnData(result);
    } catch (err) {
      setLearnData(findBestMatchingSample(prompt).learn);
    } finally {
      setIsLearning(false);
      advance(6);
    }
  };

  // ── Reset ─────────────────────────────────────────────────
  const handleStartOver = () => {
    if (!window.confirm('Start fresh? Current session data will be cleared.')) return;
    setCurrentStage(1); setMaxReachedStage(1);
    setUnderstandData(null); setPlanData(null);
    setCodeFiles(null); setExplainData(null); setLearnData(null);
    setPrompt('A sleek habit tracker that helps users build consistent daily routines with streaks, visual progress rings, category badges, and celebration animations.');
    setSkillLevel('Beginner'); setTargetPlatform('Mobile app');
  };

  const isDemoMode = apiSettings.provider === 'demo' || !apiSettings.apiKey;

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-250 obsidian-pattern"
      style={{ background: T.bg, color: T.text }}
    >
      {/* ── Ambient background glow orbs (Copper & Gold) ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="forge-glow-copper"
          style={{ top: '-120px', left: '50%', transform: 'translateX(-50%)' }}
        />
        <div
          className="forge-glow-gold"
          style={{ bottom: '10%', right: '-120px' }}
        />
      </div>

      {/* ── Navbar ── */}
      <Navbar
        currentStage={currentStage}
        onStartOver={handleStartOver}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTechStack={() => setIsTechStackOpen(true)}
        isDemoMode={isDemoMode}
      />

      {/* ── 6-Stage Progress Stepper ── */}
      <Stepper
        currentStage={currentStage}
        maxReachedStage={maxReachedStage}
        onSelectStage={(id) => id <= maxReachedStage && setCurrentStage(id)}
      />

      {/* ── Main Stage Area ── */}
      <main className="relative z-10 flex-1 w-full pb-16">
        {currentStage === 1 && (
          <PromptStage
            prompt={prompt} setPrompt={setPrompt}
            skillLevel={skillLevel} setSkillLevel={setSkillLevel}
            targetPlatform={targetPlatform} setTargetPlatform={setTargetPlatform}
            onSubmit={handlePromptSubmit} isAnalyzing={isAnalyzing}
          />
        )}
        {currentStage === 2 && (
          <UnderstandStage
            understandData={understandData} setUnderstandData={setUnderstandData}
            onConfirm={handleConfirmUnderstand} onBack={() => setCurrentStage(1)}
            isPlanning={isPlanning} error={understandError}
          />
        )}
        {currentStage === 3 && (
          <PlanStage
            planData={planData}
            onProceedToBuild={handleProceedToBuild}
            onBack={() => setCurrentStage(2)}
            isBuilding={isBuilding} appTitle={appTitle}
          />
        )}
        {currentStage === 4 && (
          <BuildStage
            codeFiles={codeFiles} appTitle={appTitle}
            targetPlatform={targetPlatform}
            onProceedToExplain={handleProceedToExplain}
            onBack={() => setCurrentStage(3)}
          />
        )}
        {currentStage === 5 && (
          <ExplainStage
            explainData={explainData} codeFiles={codeFiles}
            skillLevel={skillLevel} apiSettings={apiSettings}
            onProceedToLearn={handleProceedToLearn}
            onBack={() => setCurrentStage(4)}
          />
        )}
        {currentStage === 6 && (
          <LearnStage
            learnData={learnData} appTitle={appTitle}
            onBack={() => setCurrentStage(5)} onStartOver={handleStartOver}
          />
        )}
      </main>

      {/* ── Footer ── */}
      <Footer
        onOpenTechStack={() => setIsTechStackOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isDemoMode={isDemoMode}
      />

      {/* ── Modals ── */}
      <ApiKeyModal
        isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}
        apiSettings={apiSettings} onSaveSettings={setApiSettings}
      />
      <TechStackModal isOpen={isTechStackOpen} onClose={() => setIsTechStackOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
