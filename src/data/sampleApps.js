// Flagship sample applications with complete multi-stage datasets
export const SAMPLE_APPS = {
  'habit-tracker': {
    id: 'habit-tracker',
    title: 'HabitPulse',
    tagline: 'Minimalist habit & streak companion',
    prompt: 'A sleek habit tracker that helps users build consistent daily routines with streaks, visual progress rings, category badges, and celebration animations.',
    skillLevel: 'Beginner',
    targetPlatform: 'Mobile app',
    understand: {
      summary: 'A friction-free mobile habit tracker focused on micro-habits, visual streak motivation, and celebratory completion feedback.',
      targetUsers: 'Individuals seeking routine consistency, students building study habits, and professionals balancing wellness routines.',
      coreProblem: 'Traditional habit trackers are bloated with complex charts and friction-heavy check-ins, leading users to abandon them after 3-5 days.',
      mustHaveFeatures: [
        { id: 'f1', text: 'One-tap daily habit completion toggle with streak incrementing', included: true },
        { id: 'f2', text: 'Visual progress bar and daily completion percentage ring', included: true },
        { id: 'f3', text: 'Create new custom habits with category tags and icons', included: true },
        { id: 'f4', text: 'Streak freeze protection indicator for missed days', included: true },
        { id: 'f5', text: 'Weekly 7-day completion calendar dot view', included: true }
      ],
      niceToHaveFeatures: [
        { id: 'n1', text: 'Haptic and micro-confetti particle celebrations on goal completion', included: true },
        { id: 'n2', text: 'Dark mode theme toggle with OLED contrast', included: true },
        { id: 'n3', text: 'Push notification reminder scheduler', included: false },
        { id: 'n4', text: 'CSV / JSON backup and restore', included: false }
      ],
      clarifyingQuestions: [
        {
          id: 'q1',
          question: 'How should habits reset if a user forgets to check in yesterday?',
          options: ['Reset streak to zero immediately', 'Give a 24-hour grace period / streak freeze', 'Allow retroactive editing for the past 3 days'],
          selected: 'Give a 24-hour grace period / streak freeze'
        },
        {
          id: 'q2',
          question: 'Should habits be sorted by category or by completion status?',
          options: ['Active/incomplete first, then completed at bottom', 'Grouped by custom categories (Health, Work, Mind)', 'Chronological order of creation'],
          selected: 'Active/incomplete first, then completed at bottom'
        }
      ]
    },
    plan: {
      techStack: [
        { name: 'React 18 + Vite', category: 'Frontend Core', reason: 'Ultra-fast HMR and reactive state model perfect for immediate check-in UI updates.', badge: 'Client' },
        { name: 'Tailwind CSS', category: 'Styling & Tokens', reason: 'Rapid mobile-first responsive layout with dark mode utility classes and micro-animations.', badge: 'Design System' },
        { name: 'LocalStorage / IndexedDB', category: 'Persistence', reason: 'Zero-latency offline-first storage so habits load instantly without cloud latency.', badge: 'Storage' },
        { name: 'Canvas-Confetti', category: 'Micro-interactions', reason: 'Lightweight celebratory particle burst when hitting 100% daily completion.', badge: 'UX Polish' }
      ],
      screens: [
        {
          id: 's1',
          name: 'Today Dashboard',
          description: 'Main focus screen showing today\'s completion ring, active streak banner, and tap-to-complete habit cards.',
          wireframeSections: ['Header: Date & Profile', 'Hero: Circular Progress Ring & Streak Count', 'Habit Card List (Check, Title, Streak)', 'Floating Action Button (+)']
        },
        {
          id: 's2',
          name: 'Add Habit Modal',
          description: 'Quick sheet to define habit name, icon, frequency, and category tag.',
          wireframeSections: ['Header with Close & Save', 'Habit Title Input', 'Category Selector (Health, Focus, Mindfulness)', 'Daily Reminder Time Picker']
        },
        {
          id: 's3',
          name: 'Weekly Analytics',
          description: '7-day heatmap view showing consistency trends and longest unbroken streaks.',
          wireframeSections: ['Weekly Summary Card', '7-Day Check-in Grid', 'All-Time Best Streaks', 'Streak Freeze Status']
        }
      ],
      dataModel: [
        {
          entity: 'Habit',
          description: 'The primary tracked routine item',
          fields: [
            { name: 'id', type: 'string (UUID)', description: 'Unique identifier', isPrimary: true, isRequired: true },
            { name: 'title', type: 'string', description: 'Name of the habit (e.g., Morning Meditation)', isPrimary: false, isRequired: true },
            { name: 'category', type: 'string', description: 'Health | Focus | Mindfulness | Fitness', isPrimary: false, isRequired: true },
            { name: 'streak', type: 'number', description: 'Consecutive active days', isPrimary: false, isRequired: true },
            { name: 'completedToday', type: 'boolean', description: 'Today completion status', isPrimary: false, isRequired: true },
            { name: 'history', type: 'string[]', description: 'Array of ISO date strings (YYYY-MM-DD) completed', isPrimary: false, isRequired: true }
          ]
        },
        {
          entity: 'UserSettings',
          description: 'User configuration and preference state',
          fields: [
            { name: 'theme', type: 'string', description: 'dark | light | system', isPrimary: false, isRequired: true },
            { name: 'streakFreezesLeft', type: 'number', description: 'Available streak freeze tokens', isPrimary: false, isRequired: true },
            { name: 'dailyGoalCount', type: 'number', description: 'Target habits per day', isPrimary: false, isRequired: true }
          ]
        }
      ],
      buildRoadmap: [
        { stepNumber: 1, title: 'Project Scaffold & State Primitives', description: 'Set up Vite, Tailwind config, and define initial Habit state with mock data.', estimatedMinutes: 20, phase: 'Foundation', deliverables: 'App.jsx, data model types, initial state store' },
        { stepNumber: 2, title: 'Habit Card & Interactive Toggle', description: 'Build habit item component with checkmark animation, streak counter badge, and sound/haptic hook.', estimatedMinutes: 30, phase: 'Core UI', deliverables: 'HabitCard.jsx, toggle logic' },
        { stepNumber: 3, title: 'Progress Ring & Daily Stats Header', description: 'Compute completed percentage dynamically and render SVG progress ring.', estimatedMinutes: 25, phase: 'Data Viz', deliverables: 'ProgressRing.jsx, stats computation' },
        { stepNumber: 4, title: 'Add Habit Modal & Form Validation', description: 'Build slide-up modal with category picker, quick presets, and input validation.', estimatedMinutes: 35, phase: 'Interactions', deliverables: 'AddHabitModal.jsx, form state' },
        { stepNumber: 5, title: 'Celebration Effects & LocalStorage Persistence', description: 'Integrate confetti trigger upon 100% completion and sync state with browser storage.', estimatedMinutes: 20, phase: 'Polish', deliverables: 'useLocalStorage hook, confetti trigger' }
      ],
      flowChartMermaid: `graph TD
  A[Open App] --> B[Today Dashboard]
  B --> C{Tap Habit Card}
  C -->|Toggle Complete| D[Increment Streak & Trigger Confetti]
  C -->|Hold / Edit| E[Edit Habit Details]
  B --> F[Tap Floating + Button]
  F --> G[Add Habit Modal]
  G -->|Save| B
  B --> H[Tap Analytics Tab]
  H --> I[7-Day Consistency Grid]`
    },
    codeFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HabitPulse</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
          colors: {
            brand: { 500: '#6366f1', 600: '#4f46e5' }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-900 text-slate-100 font-sans antialiased min-h-screen">
  <div id="root"></div>
</body>
</html>`,
      'src/App.jsx': `import React, { useState, useEffect } from 'react';

// Default initial habits
const INITIAL_HABITS = [
  { id: '1', title: 'Morning Hydration (500ml)', category: 'Health', streak: 12, completedToday: true, icon: '💧' },
  { id: '2', title: 'Read 15 Pages', category: 'Mind', streak: 7, completedToday: false, icon: '📖' },
  { id: '3', title: '30-Min Cardio / Walk', category: 'Fitness', streak: 4, completedToday: false, icon: '🏃' },
  { id: '4', title: 'Deep Work Session (45m)', category: 'Focus', streak: 19, completedToday: true, icon: '⚡' },
];

export default function App() {
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Health');

  const completedCount = habits.filter(h => h.completedToday).length;
  const progressPercent = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;

  const toggleHabit = (id) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const nextCompleted = !h.completedToday;
        return {
          ...h,
          completedToday: nextCompleted,
          streak: nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
        };
      }
      return h;
    }));
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const icons = { Health: '💧', Mind: '📖', Fitness: '🏃', Focus: '⚡' };
    const newEntry = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      streak: 0,
      completedToday: false,
      icon: icons[newCategory] || '⭐'
    };
    setHabits([...habits, newEntry]);
    setNewTitle('');
    setIsModalOpen(false);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const filteredHabits = filterCategory === 'All'
    ? habits
    : habits.filter(h => h.category === filterCategory);

  return (
    <div className="max-w-md mx-auto p-4 pb-20 select-none">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 pt-2">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">HabitPulse</span>
          <h1 className="text-2xl font-extrabold text-white">Today's Focus</h1>
        </div>
        <div className="bg-indigo-950/80 border border-indigo-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-indigo-300 font-semibold shadow-inner">
          <span>🔥</span>
          <span>19-day Best</span>
        </div>
      </header>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-indigo-900/60 to-slate-900/90 border border-indigo-500/20 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden backdrop-blur">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-indigo-200 uppercase font-medium">Daily Target</p>
            <p className="text-xl font-bold text-white">{completedCount} of {habits.length} Done</p>
          </div>
          <div className="text-3xl font-black text-indigo-400">{progressPercent}%</div>
        </div>
        <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: \`\${progressPercent}%\` }}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {['All', 'Health', 'Focus', 'Mind', 'Fitness'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={\`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all \${
              filterCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }\`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Habits List */}
      <div className="space-y-3">
        {filteredHabits.map(habit => (
          <div
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className={\`group p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between \${
              habit.completedToday
                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-white'
            }\`}
          >
            <div className="flex items-center gap-3.5">
              <div className={\`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-105 \${
                habit.completedToday ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700/60'
              }\`}>
                {habit.completedToday ? '✓' : habit.icon}
              </div>
              <div>
                <p className={\`font-semibold text-sm transition-all \${
                  habit.completedToday ? 'line-through text-slate-400' : 'text-slate-100'
                }\`}>
                  {habit.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-700/50 text-indigo-300">
                    {habit.category}
                  </span>
                  <span className="text-xs text-amber-400 font-medium flex items-center gap-0.5">
                    🔥 {habit.streak}d streak
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteHabit(habit.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1.5 transition-all text-xs"
              title="Delete habit"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/40 text-2xl font-bold transition-all hover:scale-105 active:scale-95 z-20"
      >
        +
      </button>

      {/* Add Habit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add New Habit</h3>
            <form onSubmit={addHabit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Habit Name</label>
                <input
                  type="text"
                  placeholder="e.g., Evening Meditation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Health', 'Focus', 'Mind', 'Fitness'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={\`py-2 rounded-xl text-xs font-semibold border transition-all \${
                        newCategory === cat
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }\`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
                >
                  Create Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}`
    },
    explain: {
      files: [
        {
          fileName: 'src/App.jsx',
          overview: 'The primary orchestrator managing habit state, progress math, category filtering, and modal interactions.',
          keyConcepts: ['useState hook', 'Immutable array updates', 'Derived state calculation', 'Conditional rendering'],
          skillNotes: {
            Beginner: 'Notice how we hold our habits in `useState(INITIAL_HABITS)`. When a habit is clicked, we do NOT change the habit directly. Instead, we use `setHabits` to produce a fresh copy with updated values.',
            Intermediate: 'The completion percentage and completed count are computed inline as `derived state` rather than stored in separate state variables. This eliminates state sync bugs and keeps rendering clean.',
            Advanced: 'The state mutation uses functional setter callbacks `setHabits(prev => ...)` to ensure no race conditions if multiple state dispatches occur in the same frame.'
          }
        },
        {
          fileName: 'index.html',
          overview: 'HTML container loading the Tailwind CSS runtime compiler and modern Google typography.',
          keyConcepts: ['Tailwind Play CDN', 'Viewport meta tag for mobile responsiveness', 'Google Web Fonts'],
          skillNotes: {
            Beginner: 'This file provides the skeleton frame where React mounts the entire application.',
            Intermediate: 'Tailwind configuration is customized right inside the head tag for instant styling without build step latency.',
            Advanced: 'The viewport configuration includes `width=device-width, initial-scale=1.0` to ensure precise touch target scaling on high-DPI smartphone displays.'
          }
        }
      ],
      functions: [
        {
          name: 'toggleHabit(id)',
          code: `const toggleHabit = (id) => {
  setHabits(prev => prev.map(h => {
    if (h.id === id) {
      const nextCompleted = !h.completedToday;
      return {
        ...h,
        completedToday: nextCompleted,
        streak: nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
      };
    }
    return h;
  }));
};`,
          explanation: 'Toggles the habit checkmark and immediately updates the consecutive streak count.',
          whyBuiltThisWay: 'Uses an immutable `.map()` pattern. Mutating an object directly like `habit.completed = true` would bypass React\'s reconciliation engine and fail to trigger re-renders.',
          tradeOffs: 'For hundreds of habits, mapping through the array is fine ($O(n)$ is trivial for <1000 items). For enterprise scales with 100k items, a normalized ID-lookup dictionary would be used.'
        },
        {
          name: 'addHabit(e)',
          code: `const addHabit = (e) => {
  e.preventDefault();
  if (!newTitle.trim()) return;
  const newEntry = {
    id: Date.now().toString(),
    title: newTitle.trim(),
    category: newCategory,
    streak: 0,
    completedToday: false,
    icon: icons[newCategory] || '⭐'
  };
  setHabits([...habits, newEntry]);
  setNewTitle('');
  setIsModalOpen(false);
};`,
          explanation: 'Prevents standard HTML form reload, validates non-empty title, creates a timestamp-based unique ID, and prepends or appends the item to the habit list.',
          whyBuiltThisWay: '`e.preventDefault()` stops browser full page refresh. `Date.now().toString()` generates a lightweight unique client key without requiring backend database latency.',
          tradeOffs: 'For collaborative multi-user apps, use crypto.randomUUID() or database sequence IDs.'
        }
      ],
      faqChat: [
        {
          question: 'How does state persist if I refresh the page?',
          answer: 'Currently, the state is kept in React\'s in-memory memory (`useState`). To make it permanent across browser reloads, you can wrap `habits` in a `useEffect` that synchronizes with `localStorage.setItem("habits", JSON.stringify(habits))`, or an offline IndexedDB store.'
        },
        {
          question: 'Why not use Redux or Zustand here?',
          answer: 'For a focused single-screen app with 1-3 components, React\'s built-in `useState` provides the simplest, zero-overhead architecture. Introducing external stores like Redux would add unnecessary boilerplate.'
        },
        {
          question: 'How do we animate the progress bar smoothly?',
          answer: 'Notice the Tailwind classes `transition-all duration-500` on the progress bar div. Whenever `progressPercent` changes from 25% to 50%, CSS hardware-accelerated transitions smoothly interpolate the width.'
        }
      ]
    },
    learn: {
      learningPath: [
        {
          stage: 1,
          title: 'React State & Immutability',
          concepts: 'useState, immutability, spread operator (...), mapping over arrays',
          keyTakeaway: 'Never mutate state directly. Always return new array/object references so React knows when to re-render.',
          codeSnippet: 'setHabits(prev => prev.map(item => item.id === targetId ? { ...item, completed: true } : item));'
        },
        {
          stage: 2,
          title: 'Derived State vs Stored State',
          concepts: 'Single source of truth, avoiding state desynchronization',
          keyTakeaway: 'If a value can be calculated from existing state (like completedCount = habits.filter(...).length), do not store it in its own useState!',
          codeSnippet: 'const progressPercent = Math.round((completedCount / habits.length) * 100);'
        },
        {
          stage: 3,
          title: 'Controlled Form Inputs & Modals',
          concepts: 'e.preventDefault, two-way data binding, backdrop blur overlay',
          keyTakeaway: 'React forms bind the value attribute to state and update via onChange. This gives you instant validation control.',
          codeSnippet: '<input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />'
        },
        {
          stage: 4,
          title: 'Mobile Touch UX & Micro-interactions',
          concepts: 'Touch targets, haptics, active/hover micro-scaling, glowing borders',
          keyTakeaway: 'Ensure button touch targets are at least 44x44px and use visual feedback (active:scale-95) for responsive tactile feel.',
          codeSnippet: 'className="active:scale-95 transition-all p-3 rounded-2xl"'
        }
      ],
      challenges: [
        {
          id: 'c1',
          title: 'Add a "Streak Freeze" Token Counter',
          difficulty: 'Easy',
          description: 'Add a button next to each habit to spend one of your 2 available monthly "Streak Freezes", protecting your streak even if missed today.',
          hint: 'Add a userTokens state initialized to 2. In toggleHabit, allow activating a freeze if streak > 0.',
          solutionCode: `const [freezeTokens, setFreezeTokens] = useState(2);
const useFreeze = (id) => {
  if (freezeTokens <= 0) return alert("No freezes left!");
  setFreezeTokens(f => f - 1);
  alert("Habit streak protected for today!");
};`
        },
        {
          id: 'c2',
          title: 'Sort by Incomplete First',
          difficulty: 'Medium',
          description: 'Sort the displayed habit list so that habits waiting to be completed appear at the top, and completed ones sink to the bottom with reduced opacity.',
          hint: 'Use [...filteredHabits].sort((a, b) => Number(a.completedToday) - Number(b.completedToday))',
          solutionCode: `const sortedHabits = [...filteredHabits].sort((a, b) => {
  return Number(a.completedToday) - Number(b.completedToday);
});`
        },
        {
          id: 'c3',
          title: 'Export Habit Data as JSON',
          difficulty: 'Medium',
          description: 'Add a "Backup My Habits" button in the header that downloads a habit-pulse-backup.json file with current habits and streaks.',
          hint: 'Use URL.createObjectURL(new Blob([JSON.stringify(habits)], { type: "application/json" })) and trigger an invisible anchor tag download.',
          solutionCode: `const exportJSON = () => {
  const blob = new Blob([JSON.stringify(habits, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "habits-backup.json";
  a.click();
};`
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Why should we avoid storing `completedCount` in its own `useState` alongside `habits`?',
          options: [
            'Because React only allows 3 state variables per component.',
            'Because storing it separately creates dual sources of truth that can get out of sync.',
            'Because numbers cannot be stored in useState.',
            'Because it makes the application slower by 50%.'
          ],
          correctIndex: 1,
          explanation: 'Calculating `completedCount` directly from `habits` ensures it is always 100% accurate without having to manually synchronize two separate states.'
        },
        {
          id: 'q2',
          question: 'What does the spread operator (`...h`) do inside `toggleHabit`?',
          options: [
            'Deletes the habit from the database.',
            'Creates a shallow copy of all properties of the habit object before overriding completedToday.',
            'Converts the habit object into a string.',
            'Forces a page reload.'
          ],
          correctIndex: 1,
          explanation: 'The spread operator `{ ...h, completedToday: nextCompleted }` clones the existing properties while selectively updating the target fields immutably.'
        },
        {
          id: 'q3',
          question: 'What does `e.preventDefault()` prevent when submitting the Add Habit form?',
          options: [
            'It prevents the browser from refreshing the page via traditional HTTP GET/POST.',
            'It stops the state from updating.',
            'It blocks user keystrokes.',
            'It clears local storage.'
          ],
          correctIndex: 0,
          explanation: 'Standard HTML form submits cause a full browser reload. In Single Page Applications (SPAs), `e.preventDefault()` lets JavaScript handle the event cleanly.'
        },
        {
          id: 'q4',
          question: 'Which CSS class combination provides the smooth width transition on the progress bar?',
          options: [
            'display: none',
            'transition-all duration-500',
            'animate-bounce',
            'transform-none'
          ],
          correctIndex: 1,
          explanation: '`transition-all duration-500` instructs the browser to smoothly animate property shifts (such as style.width) over 500 milliseconds.'
        },
        {
          id: 'q5',
          question: 'Why is `Date.now().toString()` used for generating item IDs in client-side prototypes?',
          options: [
            'Because it is guaranteed to produce a high-precision unique timestamp key for local items.',
            'Because it automatically connects to an SQL database.',
            'Because React requires IDs to be dates.',
            'Because it enables automatic dark mode.'
          ],
          correctIndex: 0,
          explanation: 'Timestamp-based IDs are instantaneous to generate client-side and provide unique keys for local UI lists without needing external UUID libraries or servers.'
        }
      ],
      nextSteps: [
        { title: 'Add Audio & Haptic Feedback', complexity: 'Beginner', description: 'Trigger pleasant chime sounds using the Web Audio API synthesizer when all daily habits are checked off.' },
        { title: 'Weekly Heatmap Grid', complexity: 'Intermediate', description: 'Render a GitHub-style 7x52 contribution heatmap representing habit consistency across months.' },
        { title: 'Cloud Sync with Supabase', complexity: 'Advanced', description: 'Add OAuth sign-in and sync habit records to a PostgreSQL backend with row-level security.' }
      ],
      curatedKeywords: ['React State Machine', 'Derived State', 'Optimistic UI Updates', 'Tailwind Micro-transitions', 'Web Audio API', 'IndexedDB Dexie.js']
    }
  },

  'expense-splitter': {
    id: 'expense-splitter',
    title: 'FairShare',
    tagline: 'Frictionless group expense splitter & ledger',
    prompt: 'An intuitive expense sharing app for trips and roommates: add friends, log bills, split evenly or custom, and settle balances with minimum transactions.',
    skillLevel: 'Intermediate',
    targetPlatform: 'Mobile app',
    understand: {
      summary: 'A group ledger that tracks shared expenses between friends, computes net balances, and shows who owes whom with zero awkwardness.',
      targetUsers: 'Roommates dividing utilities, friends traveling together, and dining groups sharing restaurant bills.',
      coreProblem: 'Tracking group expenses manually leads to chaotic spreadsheets, awkward IOUs, and complex multi-party debt cycles.',
      mustHaveFeatures: [
        { id: 'f1', text: 'Add friends to the active trip / group circle', included: true },
        { id: 'f2', text: 'Log expense with amount, title, paid-by person, and split category', included: true },
        { id: 'f3', text: 'Live net balance ledger showing who is owed vs who owes', included: true },
        { id: 'f4', text: 'One-click "Settle Up" transaction calculator', included: true },
        { id: 'f5', text: 'Category breakdown (Food, Transport, Lodging, Entertainment)', included: true }
      ],
      niceToHaveFeatures: [
        { id: 'n1', text: 'Currency converter with preset exchange rates', included: true },
        { id: 'n2', text: 'Receipt photo attachment simulator', included: false },
        { id: 'n3', text: 'Export balance summary to WhatsApp / text message', included: true }
      ],
      clarifyingQuestions: [
        {
          id: 'q1',
          question: 'Should expenses support uneven custom percentage splits or strictly equal shares?',
          options: ['Equal split default with option for custom amounts', 'Strictly equal split only for maximum simplicity', 'Percentage based splits only'],
          selected: 'Equal split default with option for custom amounts'
        },
        {
          id: 'q2',
          question: 'How should debts be resolved across 3+ people?',
          options: ['Greedy minimum cash-flow debt simplification', 'Direct pairwise balances between the payer and participants'],
          selected: 'Greedy minimum cash-flow debt simplification'
        }
      ]
    },
    plan: {
      techStack: [
        { name: 'React 18 + Hooks', category: 'Frontend', reason: 'Reactive state handles real-time recalculation of net balance ledgers across all members.', badge: 'Core' },
        { name: 'Tailwind CSS', category: 'UI Framework', reason: 'Custom financial badge styling, green/red balance indicators, and mobile-friendly numeric keyboards.', badge: 'Design' },
        { name: 'Debt Simplification Algorithm', category: 'Math Engine', reason: 'Graph reduction algorithm that settles 10 complex debts in 3 clean payments.', badge: 'Algorithm' }
      ],
      screens: [
        {
          id: 's1',
          name: 'Balances & Trip Overview',
          description: 'High-level card displaying total group spend, your personal net balance (+you get / -you owe), and quick friends avatar list.',
          wireframeSections: ['Header with Group Title', 'Hero Net Balance Card', 'Friends Horizon Bar', 'Recent Expenses Feed', 'Bottom Settle Bar']
        },
        {
          id: 's2',
          name: 'Add Expense Screen',
          description: 'Clean numeric keypad, category icons, "Paid by" dropdown, and participant checkboxes.',
          wireframeSections: ['Amount Big Input ($0.00)', 'Expense Description', 'Payer Selector', 'Participant Checkboxes', 'Save Button']
        },
        {
          id: 's3',
          name: 'Settlement Matrix',
          description: 'Minimized debt transactions (e.g., "Sarah pays Alex $34.50") with simulated Venmo/CashApp link.',
          wireframeSections: ['Suggested Payments List', 'Mark Settled Button', 'Share Breakdown via Text']
        }
      ],
      dataModel: [
        {
          entity: 'Member',
          description: 'Participant in the expense group',
          fields: [
            { name: 'id', type: 'string', description: 'Unique member ID', isPrimary: true, isRequired: true },
            { name: 'name', type: 'string', description: 'First name of friend', isPrimary: false, isRequired: true },
            { name: 'avatar', type: 'string', description: 'Avatar emoji or photo URL', isPrimary: false, isRequired: true },
            { name: 'netBalance', type: 'number', description: 'Computed positive or negative balance in dollars', isPrimary: false, isRequired: true }
          ]
        },
        {
          entity: 'Expense',
          description: 'Individual recorded transaction',
          fields: [
            { name: 'id', type: 'string', description: 'Transaction ID', isPrimary: true, isRequired: true },
            { name: 'description', type: 'string', description: 'What was bought (e.g., Airbnb, Pizza)', isPrimary: false, isRequired: true },
            { name: 'amount', type: 'number', description: 'Total cost in dollars', isPrimary: false, isRequired: true },
            { name: 'paidById', type: 'string', description: 'Member ID of payer', isPrimary: false, isRequired: true },
            { name: 'category', type: 'string', description: 'Food | Stay | Transit | Fun', isPrimary: false, isRequired: true },
            { name: 'date', type: 'string', description: 'ISO timestamp', isPrimary: false, isRequired: true }
          ]
        }
      ],
      buildRoadmap: [
        { stepNumber: 1, title: 'State Architecture & Ledger Math', description: 'Define members, expense records, and write the balance ledger calculation engine.', estimatedMinutes: 25, phase: 'Engine', deliverables: 'calculateBalances utility, initial mock state' },
        { stepNumber: 2, title: 'Dashboard Balance Cards', description: 'Render net balance hero banner with green/red positive/negative indicators.', estimatedMinutes: 30, phase: 'UI', deliverables: 'BalanceHeader.jsx' },
        { stepNumber: 3, title: 'Add Expense Form & Split Logic', description: 'Build expense input form with category tagging and multi-payer assignment.', estimatedMinutes: 35, phase: 'Transactions', deliverables: 'AddExpenseModal.jsx' },
        { stepNumber: 4, title: 'Debt Settlement Minimizer', description: 'Compute who pays whom to clear all balances in fewest possible payments.', estimatedMinutes: 40, phase: 'Optimization', deliverables: 'SettlementModal.jsx' }
      ],
      flowChartMermaid: `graph TD
  A[Open FairShare] --> B[Group Dashboard]
  B --> C[Tap + Log Expense]
  C --> D[Select Payer & Amount]
  D --> E[Save & Auto-Rebalance Ledger]
  E --> B
  B --> F[Tap Settle Up]
  F --> G[View Optimized Payment Paths]
  G --> H[Mark as Settled]`
    },
    codeFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FairShare</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: { sans: ['Space Grotesk', 'sans-serif'] }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen">
  <div id="root"></div>
</body>
</html>`,
      'src/App.jsx': `import React, { useState, useMemo } from 'react';

const INITIAL_MEMBERS = [
  { id: 'm1', name: 'You (Alex)', avatar: '🦊' },
  { id: 'm2', name: 'Maya', avatar: '🌸' },
  { id: 'm3', name: 'Jordan', avatar: '⚡' },
  { id: 'm4', name: 'Sam', avatar: '🌿' },
];

const INITIAL_EXPENSES = [
  { id: 'e1', description: 'Roadtrip Rental Car', amount: 160, paidById: 'm1', category: 'Transit', date: 'Yesterday' },
  { id: 'e2', description: 'Tacos & Guacamole Dinner', amount: 84, paidById: 'm2', category: 'Food', date: 'Yesterday' },
  { id: 'e3', description: 'Cabin Groceries & Snacks', amount: 120, paidById: 'm3', category: 'Food', date: 'Today' },
];

export default function App() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettleOpen, setIsSettleOpen] = useState(false);

  // Form State
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('m1');
  const [category, setCategory] = useState('Food');

  // Math: Compute net balance per member
  const balances = useMemo(() => {
    const map = {};
    members.forEach(m => { map[m.id] = 0; });
    const count = members.length;
    if (count === 0) return map;

    expenses.forEach(exp => {
      const perPerson = exp.amount / count;
      // Payer paid the full amount
      map[exp.paidById] = (map[exp.paidById] || 0) + exp.amount;
      // Everyone owes their share
      members.forEach(m => {
        map[m.id] -= perPerson;
      });
    });
    return map;
  }, [members, expenses]);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const myNet = balances['m1'] || 0;

  const handleAddExpense = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!desc.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newExp = {
      id: Date.now().toString(),
      description: desc.trim(),
      amount: parsedAmount,
      paidById: paidBy,
      category,
      date: 'Just now'
    };
    setExpenses([newExp, ...expenses]);
    setDesc('');
    setAmount('');
    setIsModalOpen(false);
  };

  const getPayerName = (id) => {
    const found = members.find(m => m.id === id);
    return found ? found.name : 'Unknown';
  };

  // Compute simplified settlements
  const settlements = useMemo(() => {
    const debtors = [];
    const creditors = [];
    Object.entries(balances).forEach(([id, bal]) => {
      const rounded = Math.round(bal * 100) / 100;
      if (rounded < -0.01) debtors.push({ id, amount: -rounded });
      else if (rounded > 0.01) creditors.push({ id, amount: rounded });
    });

    const results = [];
    let d = 0, c = 0;
    while (d < debtors.length && c < creditors.length) {
      const debtor = debtors[d];
      const creditor = creditors[c];
      const payment = Math.min(debtor.amount, creditor.amount);

      results.push({
        from: getPayerName(debtor.id),
        to: getPayerName(creditor.id),
        amount: Math.round(payment * 100) / 100
      });

      debtor.amount -= payment;
      creditor.amount -= payment;
      if (debtor.amount < 0.01) d++;
      if (creditor.amount < 0.01) c++;
    }
    return results;
  }, [balances, members]);

  return (
    <div className="max-w-md mx-auto p-4 pb-20 select-none">
      {/* Top Bar */}
      <header className="flex justify-between items-center mb-5 pt-2">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">FairShare</span>
          <h1 className="text-xl font-black text-white">Trip: Pacific Coast</h1>
        </div>
        <button
          onClick={() => setIsSettleOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-full text-xs shadow-md transition-all active:scale-95"
        >
          Settle Up ({settlements.length})
        </button>
      </header>

      {/* Net Balance Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 rounded-2xl p-5 mb-5 shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Your Balance</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className={\`text-3xl font-black \${myNet >= 0 ? 'text-emerald-400' : 'text-rose-400'}\`}>
                {myNet >= 0 ? \`+\$\${myNet.toFixed(2)}\` : \`-\$\${Math.abs(myNet).toFixed(2)}\`}
              </span>
              <span className="text-xs text-slate-400">
                {myNet >= 0 ? 'you are owed' : 'you owe in total'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-medium">Group Total</p>
            <p className="text-lg font-bold text-white">\${totalSpent.toFixed(2)}</p>
          </div>
        </div>

        {/* Member balances list */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-700/60">
          {members.map(m => {
            const bal = balances[m.id] || 0;
            return (
              <div key={m.id} className="text-center p-2 rounded-xl bg-slate-950/50 border border-slate-800">
                <div className="text-base">{m.avatar}</div>
                <div className="text-[11px] font-bold text-slate-300 truncate">{m.name.split(' ')[0]}</div>
                <div className={\`text-[10px] font-semibold mt-0.5 \${bal >= 0 ? 'text-emerald-400' : 'text-rose-400'}\`}>
                  {bal >= 0 ? \`+\$\${bal.toFixed(0)}\` : \`-\$\${Math.abs(bal).toFixed(0)}\`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expenses Feed */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Shared Expenses</h2>
        <span className="text-xs text-slate-500">{expenses.length} records</span>
      </div>

      <div className="space-y-2.5">
        {expenses.map(exp => (
          <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">
                {exp.category === 'Food' ? '🍕' : exp.category === 'Transit' ? '🚗' : '🏨'}
              </div>
              <div>
                <p className="font-bold text-sm text-white">{exp.description}</p>
                <p className="text-xs text-slate-400">
                  Paid by <span className="text-slate-200 font-medium">{getPayerName(exp.paidById)}</span> • {exp.date}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-extrabold text-white">\${exp.amount.toFixed(2)}</p>
              <p className="text-[10px] text-slate-400">\${(exp.amount / members.length).toFixed(2)} / ea</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Expense Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-full flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 text-sm z-20"
      >
        <span>+ Add Expense</span>
      </button>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-sm">
            <h3 className="text-base font-bold text-white mb-4">Add Group Expense</h3>
            <form onSubmit={handleAddExpense} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Seafood Dinner"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Total Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Paid By</label>
                  <select
                    value={paidBy}
                    onChange={e => setPaidBy(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white"
                  >
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white"
                  >
                    <option value="Food">Food & Drinks</option>
                    <option value="Transit">Transportation</option>
                    <option value="Stay">Accommodation</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settle Up Modal */}
      {isSettleOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-sm">
            <h3 className="text-base font-bold text-white mb-2">Simplified Debt Settlement</h3>
            <p className="text-xs text-slate-400 mb-4">
              Clears all debts across 4 people using the minimum number of payments:
            </p>
            <div className="space-y-2 mb-4">
              {settlements.length === 0 ? (
                <p className="text-xs text-emerald-400 font-semibold py-4 text-center">All settled up! No one owes anything.</p>
              ) : (
                settlements.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <div className="text-xs text-white">
                      <span className="font-bold text-rose-300">{s.from}</span>
                      <span className="text-slate-400"> pays </span>
                      <span className="font-bold text-emerald-300">{s.to}</span>
                    </div>
                    <span className="text-xs font-black text-emerald-400">\${s.amount.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => setIsSettleOpen(false)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`
    },
    explain: {
      files: [
        {
          fileName: 'src/App.jsx',
          overview: 'Calculates the multi-party net ledger and implements greedy debt simplification.',
          keyConcepts: ['useMemo hook', 'Debt graph simplification', 'Multi-participant distribution math'],
          skillNotes: {
            Beginner: 'Every expense takes the total amount and divides it equally among everyone. The person who paid gets credit for the full bill.',
            Intermediate: 'The `useMemo` hook ensures balances are only recalculated when `expenses` or `members` array actually change, avoiding redundant iterations on re-renders.',
            Advanced: 'The settlements engine implements a bipartite greedy matching between negative balance debtors and positive balance creditors.'
          }
        }
      ],
      functions: [
        {
          name: 'settlements (Greedy Balancer)',
          code: `const settlements = useMemo(() => {
  const debtors = [];
  const creditors = [];
  // partition into debtors and creditors
  ...
  while (d < debtors.length && c < creditors.length) {
    const payment = Math.min(debtor.amount, creditor.amount);
    results.push({ from: debtor.name, to: creditor.name, amount: payment });
    debtor.amount -= payment;
    creditor.amount -= payment;
  }
  return results;
}, [balances]);`,
          explanation: 'Matches the person who owes the most with the person who is owed the most and settles the lesser amount, eliminating redundant back-and-forth transactions.',
          whyBuiltThisWay: 'Without debt simplification, 5 people on a trip would have 10 separate bilateral repayments. This algorithm condenses them into at most 4 clean payments.',
          tradeOffs: 'For small groups (under 50 members), greedy reduction is fast and optimal in 99% of real-world scenarios.'
        }
      ],
      faqChat: [
        {
          question: 'How do we handle custom split percentages?',
          answer: 'Instead of dividing equally by `count`, we can store an array of `splits: [{ memberId, sharePercentage }]` inside the Expense entity and multiply `exp.amount * (share / 100)`.'
        },
        {
          question: 'What if someone pays using a different currency?',
          answer: 'You store `currency: "EUR"` and a conversion rate property `exchangeRate: 1.08`. Convert to base currency (USD) before injecting into the balance calculation.'
        }
      ]
    },
    learn: {
      learningPath: [
        {
          stage: 1,
          title: 'Financial Math in JavaScript',
          concepts: 'Floating point rounding, Math.round(val * 100) / 100, currency display',
          keyTakeaway: 'JavaScript floats like 0.1 + 0.2 = 0.30000000000000004 can cause display anomalies. Always round monetary cents explicitly.',
          codeSnippet: 'const rounded = Math.round(balance * 100) / 100;'
        },
        {
          stage: 2,
          title: 'Graph Debt Simplification Algorithms',
          concepts: 'Greedy algorithms, bipartite matching, minimizing cash flow',
          keyTakeaway: 'You can resolve N-party debt cycles in at most N-1 transactions by canceling opposing debts.',
          codeSnippet: 'const payment = Math.min(debtor.amount, creditor.amount);'
        }
      ],
      challenges: [
        {
          id: 'c1',
          title: 'Add Currency Switcher ($ USD / € EUR / £ GBP)',
          difficulty: 'Easy',
          description: 'Add a header toggle to format all balances in Euros or Pounds with live symbol changes.',
          hint: 'Add a currentCurrency state and format with Intl.NumberFormat.',
          solutionCode: `const [currency, setCurrency] = useState('$');`
        },
        {
          id: 'c2',
          title: 'Delete an Expense with Confirmation',
          difficulty: 'Medium',
          description: 'Allow users to delete an expense record, which instantly recalculates everyone\'s net balances.',
          hint: 'setExpenses(prev => prev.filter(e => e.id !== targetId));',
          solutionCode: `const deleteExpense = (id) => {
  if (confirm("Delete this expense?")) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }
};`
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Why does JavaScript produce `0.1 + 0.2 = 0.30000000000000004`?',
          options: [
            'Because JavaScript uses IEEE 754 binary floating point representation.',
            'Because the browser ran out of memory.',
            'Because React state delays math execution.',
            'Because numbers in JavaScript are secretly strings.'
          ],
          correctIndex: 0,
          explanation: 'Computers represent decimal fractions in binary powers of 2, which causes periodic repeating decimals for fractions like 0.1 and 0.2.'
        },
        {
          id: 'q2',
          question: 'What is the maximum number of transactions needed to settle debts among N people?',
          options: ['N * N', 'N - 1', 'N / 2', 'Infinite'],
          correctIndex: 1,
          explanation: 'Using minimum cash flow debt simplification, any connected group of N people can be completely balanced with at most N - 1 payments.'
        }
      ],
      nextSteps: [
        { title: 'Receipt OCR Camera Scan', complexity: 'Intermediate', description: 'Integrate Tesseract.js to scan photo receipts and parse item prices automatically.' },
        { title: 'Deep Linking to Venmo / CashApp', complexity: 'Easy', description: 'Create dynamic pay links `https://venmo.com/?txn=pay&amount=...` on the settlement cards.' }
      ],
      curatedKeywords: ['Greedy Debt Minimization', 'IEEE 754 Floating Point', 'useMemo Performance', 'Bipartite Matching']
    }
  },

  'recipe-finder': {
    id: 'recipe-finder',
    title: 'PlateCraft',
    tagline: 'Pantry-to-table smart recipe creator',
    prompt: 'A smart recipe finder that takes ingredients currently in your fridge, filters by dietary preferences, and guides you through step-by-step cooking mode with built-in timers.',
    skillLevel: 'Beginner',
    targetPlatform: 'Web app',
    understand: {
      summary: 'A web culinary assistant that prevents food waste by recommending delicious meals you can cook with ingredients you already own.',
      targetUsers: 'Busy home cooks, students, and budget-conscious foodies looking to use leftover groceries.',
      coreProblem: 'People throw away unused food because they do not know how to combine disparate fridge ingredients into cohesive recipes.',
      mustHaveFeatures: [
        { id: 'f1', text: 'Ingredient tag input (type or click pantry staples)', included: true },
        { id: 'f2', text: 'Dietary filter chips (Vegan, High Protein, Gluten-Free, Under 20 Mins)', included: true },
        { id: 'f3', text: 'Matching recipe list with ingredient match score (% matched)', included: true },
        { id: 'f4', text: 'Interactive step-by-step cooking view with active step highlight', included: true }
      ],
      niceToHaveFeatures: [
        { id: 'n1', text: 'Integrated cooking countdown timer with audio chime', included: true },
        { id: 'n2', text: 'Servings multiplier that dynamically scales ingredient quantities', included: true }
      ],
      clarifyingQuestions: [
        {
          id: 'q1',
          question: 'Should the app assume common household pantry items (salt, oil, pepper, water) are always available?',
          options: ['Yes, treat pantry staples as assumed', 'No, strictly require every single item'],
          selected: 'Yes, treat pantry staples as assumed'
        }
      ]
    },
    plan: {
      techStack: [
        { name: 'React 18', category: 'Frontend', reason: 'Instant ingredient chip toggling and step navigation without page reloads.', badge: 'Core' },
        { name: 'Tailwind CSS', category: 'Design', reason: 'High-contrast typography for readability while cooking on a kitchen counter.', badge: 'Styling' }
      ],
      screens: [
        { id: 's1', name: 'Pantry Explorer', description: 'Ingredient search bar, dietary tag toggles, and recipe match cards.', wireframeSections: ['Pantry Input Bar', 'Dietary Pills', 'Recipe Card Grid'] },
        { id: 's2', name: 'Cooking Mode View', description: 'Full-screen hands-free cooking steps with timer control.', wireframeSections: ['Recipe Hero Header', 'Dynamic Servings Stepper', 'Step List with Timer'] }
      ],
      dataModel: [
        {
          entity: 'Recipe',
          description: 'Cooking recipe instructions and metadata',
          fields: [
            { name: 'id', type: 'string', description: 'Recipe ID', isPrimary: true, isRequired: true },
            { name: 'title', type: 'string', description: 'Dish name', isPrimary: false, isRequired: true },
            { name: 'prepTime', type: 'number', description: 'Minutes to prepare', isPrimary: false, isRequired: true },
            { name: 'ingredients', type: 'string[]', description: 'Required items', isPrimary: false, isRequired: true },
            { name: 'steps', type: 'string[]', description: 'Instructions', isPrimary: false, isRequired: true }
          ]
        }
      ],
      buildRoadmap: [
        { stepNumber: 1, title: 'Ingredient Filter Engine', description: 'Build chip selection logic and match score calculation.', estimatedMinutes: 20, phase: 'Core', deliverables: 'Search & filter state' },
        { stepNumber: 2, title: 'Recipe Card Grid', description: 'Render card preview with missing ingredients highlighted.', estimatedMinutes: 25, phase: 'UI', deliverables: 'RecipeCard.jsx' },
        { stepNumber: 3, title: 'Step Cooking Mode & Timer', description: 'Interactive step checklist with countdown timer.', estimatedMinutes: 30, phase: 'Experience', deliverables: 'CookingMode.jsx' }
      ],
      flowChartMermaid: `graph TD
  A[Input Ingredients] --> B[Filter Recipes]
  B --> C[Select Recipe]
  C --> D[Enter Cooking Mode]
  D --> E[Start Step Timer]
  E --> F[Meal Complete]`
    },
    codeFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlateCraft</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-amber-950/20 text-slate-100 min-h-screen">
  <div id="root"></div>
</body>
</html>`,
      'src/App.jsx': `import React, { useState } from 'react';

const RECIPES = [
  {
    id: 'r1',
    title: 'Garlic Butter Tomato Pasta',
    time: 15,
    tag: 'Quick & Easy',
    image: '🍝',
    ingredients: ['Pasta', 'Garlic', 'Tomatoes', 'Olive Oil', 'Parmesan'],
    steps: ['Boil salted water and cook pasta al dente (9 mins).', 'Sauté minced garlic in warm olive oil until fragrant.', 'Toss in halved cherry tomatoes until blistered.', 'Combine pasta, cooking water, and fresh parmesan.']
  },
  {
    id: 'r2',
    title: 'Avocado & Egg Protein Toast',
    time: 10,
    tag: 'High Protein',
    image: '🥑',
    ingredients: ['Eggs', 'Avocado', 'Bread', 'Chili Flakes'],
    steps: ['Toast bread slices until golden brown.', 'Mash ripe avocado with salt and a splash of lime.', 'Poach or fry eggs to sunny-side perfection.', 'Assemble with a pinch of chili flakes.']
  },
  {
    id: 'r3',
    title: 'Crispy Garlic Mushroom Skillet',
    time: 18,
    tag: 'Vegetarian',
    image: '🍄',
    ingredients: ['Mushrooms', 'Garlic', 'Butter', 'Parsley'],
    steps: ['Clean and slice mushrooms evenly.', 'Sear in a hot pan without stirring for 3 mins for browning.', 'Add butter, garlic, and toss for 2 mins.', 'Garnish with freshly chopped parsley.']
  }
];

export default function App() {
  const [selectedIngredients, setSelectedIngredients] = useState(['Garlic', 'Eggs']);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const pantryStaples = ['Garlic', 'Eggs', 'Tomatoes', 'Pasta', 'Avocado', 'Mushrooms', 'Bread'];

  const togglePantry = (item) => {
    setSelectedIngredients(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 pb-20 select-none text-slate-100">
      <header className="mb-4 pt-2">
        <span className="text-xs uppercase font-extrabold text-amber-500 tracking-wider">PlateCraft</span>
        <h1 className="text-2xl font-black text-white">What's In Your Kitchen?</h1>
      </header>

      {/* Ingredient Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-5">
        <p className="text-xs text-slate-400 font-semibold mb-2.5">TAP ITEMS IN YOUR FRIDGE:</p>
        <div className="flex flex-wrap gap-2">
          {pantryStaples.map(item => {
            const has = selectedIngredients.includes(item);
            return (
              <button
                key={item}
                onClick={() => togglePantry(item)}
                className={\`px-3 py-1.5 rounded-xl text-xs font-bold transition-all \${
                  has
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }\`}
              >
                {has ? '✓ ' : '+ '} {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recipe List */}
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Matching Recipes</h2>
      <div className="space-y-3">
        {RECIPES.map(recipe => {
          const matched = recipe.ingredients.filter(i => selectedIngredients.includes(i)).length;
          const matchPercent = Math.round((matched / recipe.ingredients.length) * 100);

          return (
            <div
              key={recipe.id}
              onClick={() => setActiveRecipe(recipe)}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{recipe.image}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{recipe.title}</h3>
                    <p className="text-xs text-slate-400">⏱ {recipe.time} mins • {recipe.tag}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={\`text-xs font-extrabold px-2 py-1 rounded-lg \${
                    matchPercent > 50 ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }\`}>
                    {matchPercent}% Match
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cooking Mode Modal */}
      {activeRecipe && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-3">
              <span className="text-4xl">{activeRecipe.image}</span>
              <button onClick={() => setActiveRecipe(null)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>
            <h3 className="text-lg font-black text-white mb-1">{activeRecipe.title}</h3>
            <p className="text-xs text-amber-400 font-semibold mb-4">Total Time: {activeRecipe.time} minutes</p>

            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Cooking Steps:</h4>
            <div className="space-y-3 mb-6">
              {activeRecipe.steps.map((st, i) => (
                <div key={i} className="flex gap-3 text-xs bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                  <span className="font-extrabold text-amber-400">{i + 1}.</span>
                  <span className="text-slate-200">{st}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveRecipe(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Done Cooking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`
    },
    explain: {
      files: [{ fileName: 'src/App.jsx', overview: 'Recipe matching engine that computes pantry overlap and displays cooking steps.' }],
      functions: [{ name: 'togglePantry(item)', explanation: 'Toggles items in the selected ingredients array.' }],
      faqChat: [{ question: 'How is the match percentage computed?', answer: 'It calculates (matchedIngredients / totalRequiredIngredients) * 100.' }]
    },
    learn: {
      learningPath: [{ stage: 1, title: 'Array Filtering & Intersections', concepts: 'filter(), includes(), sets' }],
      challenges: [{ id: 'c1', title: 'Add a Kitchen Timer', difficulty: 'Easy', description: 'Add a 5-minute countdown timer with play/pause.' }],
      quiz: [{ id: 'q1', question: 'How do you check if an array contains an item in modern JS?', options: ['arr.hasItem()', 'arr.includes(item)', 'arr.contains()', 'arr.isThere()'], correctIndex: 1, explanation: 'Array.prototype.includes() returns true if the element exists in the array.' }],
      nextSteps: [{ title: 'Nutritional breakdown API', complexity: 'Medium' }],
      curatedKeywords: ['Array intersection', 'Computed match scores', 'Modal overlays']
    }
  },

  'study-planner': {
    id: 'study-planner',
    title: 'FocusFlow',
    tagline: 'Pomodoro study timer & daily goals',
    prompt: 'A distraction-free study companion featuring an integrated 25/5 Pomodoro timer, daily subject task checklists, and session progress tracking.',
    skillLevel: 'Beginner',
    targetPlatform: 'Web app',
    understand: {
      summary: 'A clean student productivity dashboard pairing structured interval timers with actionable subject milestones.',
      targetUsers: 'College students, self-taught coders, and certification candidates.',
      coreProblem: 'Long unguided study sessions cause cognitive fatigue and lack clear tracking of what was actually completed.',
      mustHaveFeatures: [
        { id: 'f1', text: 'Interactive 25-minute Pomodoro timer with start/pause/reset', included: true },
        { id: 'f2', text: 'Task checklist by subject (e.g. Math, Algorithms, History)', included: true },
        { id: 'f3', text: 'Daily completed focus sessions counter', included: true }
      ],
      niceToHaveFeatures: [
        { id: 'n1', text: '5-minute short break mode toggle', included: true },
        { id: 'n2', text: 'Sound notification on timer completion', included: false }
      ],
      clarifyingQuestions: [
        {
          id: 'q1',
          question: 'What default study interval do you prefer?',
          options: ['Standard 25 min focus / 5 min break', '50 min focus / 10 min break', 'Ultradian 90 min rhythm'],
          selected: 'Standard 25 min focus / 5 min break'
        }
      ]
    },
    plan: {
      techStack: [
        { name: 'React 18 + setInterval', category: 'Frontend', reason: 'Precision interval timer with stateful start/pause cycles.', badge: 'Core' },
        { name: 'Tailwind CSS', category: 'Design', reason: 'Calm purple/slate color scheme optimized for night-time study focus.', badge: 'Styling' }
      ],
      screens: [
        { id: 's1', name: 'Study Room', description: 'Large digital timer, break modes, and active subject tasks.', wireframeSections: ['Timer Clock', 'Controls', 'Tasks'] }
      ],
      dataModel: [
        { entity: 'StudyTask', description: 'A topic or exercise to complete', fields: [{ name: 'id', type: 'string' }, { name: 'subject', type: 'string' }, { name: 'done', type: 'boolean' }] }
      ],
      buildRoadmap: [
        { stepNumber: 1, title: 'Timer Engine', description: 'Build accurate second decrementer with useEffect cleanup.', estimatedMinutes: 20, phase: 'Engine' }
      ],
      flowChartMermaid: `graph TD
  A[Start Focus Timer] --> B[25 Min Countdown]
  B --> C[Timer Finishes]
  C --> D[Log Session & Take 5m Break]`
    },
    codeFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FocusFlow</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <div id="root"></div>
</body>
</html>`,
      'src/App.jsx': `import React, { useState, useEffect } from 'react';

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // focus or break
  const [completedSessions, setCompletedSessions] = useState(3);
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Review Binary Trees & BFS', subject: 'CS', done: true },
    { id: '2', title: 'Complete Calculus Assignment #4', subject: 'Math', done: false },
    { id: '3', title: 'Read Research Paper on LLMs', subject: 'AI', done: false },
  ]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        setCompletedSessions(c => c + 1);
        setMode('break');
        setSecondsLeft(5 * 60);
      } else {
        setMode('focus');
        setSecondsLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode]);

  const toggleRun = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask.trim(), subject: 'General', done: false }]);
    setNewTask('');
  };

  return (
    <div className="max-w-md mx-auto p-4 pb-16 select-none">
      <header className="mb-5 pt-2 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase font-extrabold text-violet-400 tracking-wider">FocusFlow</span>
          <h1 className="text-xl font-black text-white">Deep Work Room</h1>
        </div>
        <div className="bg-violet-950/60 border border-violet-500/30 px-3 py-1 rounded-full text-xs text-violet-300 font-bold">
          🍅 {completedSessions} Focus Sessions
        </div>
      </header>

      {/* Timer Card */}
      <div className="bg-gradient-to-b from-slate-900 to-violet-950/40 border border-violet-500/20 rounded-3xl p-6 text-center mb-6 shadow-2xl">
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => { setMode('focus'); setSecondsLeft(25 * 60); setIsRunning(false); }}
            className={\`px-3 py-1 rounded-full text-xs font-bold transition-all \${mode === 'focus' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}\`}
          >
            25m Focus
          </button>
          <button
            onClick={() => { setMode('break'); setSecondsLeft(5 * 60); setIsRunning(false); }}
            className={\`px-3 py-1 rounded-full text-xs font-bold transition-all \${mode === 'break' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}\`}
          >
            5m Break
          </button>
        </div>

        <div className="text-6xl font-black tracking-tight text-white my-3 font-mono">
          {timeFormatted}
        </div>

        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={toggleRun}
            className={\`px-6 py-2.5 rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-95 \${
              isRunning ? 'bg-amber-500 text-slate-950' : 'bg-violet-600 hover:bg-violet-500 text-white'
            }\`}
          >
            {isRunning ? 'Pause' : 'Start Focus'}
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Study Milestones</h2>
          <span className="text-xs text-slate-500">{tasks.filter(t => t.done).length}/{tasks.length} Done</span>
        </div>

        {tasks.map(t => (
          <div
            key={t.id}
            onClick={() => toggleTask(t.id)}
            className={\`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all \${
              t.done ? 'bg-slate-900/50 border-slate-800 text-slate-500' : 'bg-slate-900 border-slate-800 text-white hover:border-slate-700'
            }\`}
          >
            <div className="flex items-center gap-3">
              <span className={\`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border \${
                t.done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'
              }\`}>
                {t.done && '✓'}
              </span>
              <span className={\`text-xs font-semibold \${t.done ? 'line-through text-slate-500' : ''}\`}>
                {t.title}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-violet-300">
              {t.subject}
            </span>
          </div>
        ))}

        <form onSubmit={addTask} className="pt-2 flex gap-2">
          <input
            type="text"
            placeholder="Add new study goal..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
          <button type="submit" className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-xs font-bold">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}`
    },
    explain: {
      files: [{ fileName: 'src/App.jsx', overview: 'Combines an interval timer with cleanup and task tracking.' }],
      functions: [{ name: 'useEffect (Timer Loop)', explanation: 'Decrements secondsLeft each second and performs clearInterval in cleanup to prevent memory leaks.' }],
      faqChat: [{ question: 'Why is clearInterval in return statement?', answer: 'React unmounts or re-triggers effects when dependencies change. Clearing the interval prevents multiple concurrent timers from running.' }]
    },
    learn: {
      learningPath: [{ stage: 1, title: 'Timer Loops & useEffect Cleanup', concepts: 'setInterval, clearInterval, memory leaks' }],
      challenges: [{ id: 'c1', title: 'Add a 15-Minute Long Break Mode', difficulty: 'Easy', description: 'Add a 3rd button for 15m Long Break.' }],
      quiz: [{ id: 'q1', question: 'What happens if you omit clearInterval inside useEffect?', options: ['The computer catches fire', 'A memory leak occurs with duplicate timers speeding up', 'React cancels it automatically', 'Nothing'], correctIndex: 1, explanation: 'Failing to clean up an interval creates stacked runaway timers that decrement faster and faster.' }],
      nextSteps: [{ title: 'Ambient background noise generator (Rain, Lo-Fi, Cafe)', complexity: 'Easy' }],
      curatedKeywords: ['Timer Cleanup', 'useEffect Lifecycle', 'Audio Synthesizer']
    }
  }
};
