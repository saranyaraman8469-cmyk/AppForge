// AI integration layer supporting OpenAI, Claude/Anthropic, OpenRouter, and Gemini
// with automatic JSON validation, safe parsing, retry logic, and seamless Demo Mode fallback.

import { SAMPLE_APPS } from './sampleApps';
import { STAGE_PROMPTS } from './aiPrompts';

/**
 * Strips markdown code fences and parses JSON safely
 */
export function safeParseJson(rawText) {
  if (typeof rawText !== 'string') return rawText;
  
  // Clean markdown fences like ```json ... ``` or ``` ... ```
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  
  // Find first { and last } if extra text exists
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return JSON.parse(cleaned);
}

/**
 * Intelligent sample app matcher for Demo Mode
 */
export function findBestMatchingSample(promptText) {
  const lower = (promptText || '').toLowerCase();
  if (lower.includes('habit') || lower.includes('streak') || lower.includes('routine')) {
    return SAMPLE_APPS['habit-tracker'];
  }
  if (lower.includes('expense') || lower.includes('split') || lower.includes('bill') || lower.includes('money') || lower.includes('trip')) {
    return SAMPLE_APPS['expense-splitter'];
  }
  if (lower.includes('recipe') || lower.includes('food') || lower.includes('cook') || lower.includes('kitchen') || lower.includes('pantry')) {
    return SAMPLE_APPS['recipe-finder'];
  }
  if (lower.includes('study') || lower.includes('pomodoro') || lower.includes('focus') || lower.includes('timer') || lower.includes('task')) {
    return SAMPLE_APPS['study-planner'];
  }
  // Default to habit-tracker as standard flagship
  return SAMPLE_APPS['habit-tracker'];
}

/**
 * Synthesizes a structured custom mock if user entered an arbitrary prompt in Demo Mode
 */
function generateDynamicMockUnderstand(prompt, skillLevel, targetPlatform) {
  const title = prompt.length > 25 ? prompt.slice(0, 25).trim() + '...' : prompt;
  return {
    summary: `A smart ${targetPlatform.toLowerCase()} tailored for ${prompt.toLowerCase().replace(/[.]+$/, '')}.`,
    targetUsers: `Modern digital users, enthusiasts, and individuals looking for efficient execution of "${title}".`,
    coreProblem: `Existing solutions are overcomplicated, expensive, or lack clean intuitive focus for this specific workflow.`,
    mustHaveFeatures: [
      { id: 'f1', text: `Core interactive dashboard for ${title}`, included: true },
      { id: 'f2', text: `Real-time activity logging and item management`, included: true },
      { id: 'f3', text: `Visual progress indicators and metrics`, included: true },
      { id: 'f4', text: `Fast search, filtering, and status categorization`, included: true }
    ],
    niceToHaveFeatures: [
      { id: 'n1', text: `Dark mode and theme accent customization`, included: true },
      { id: 'n2', text: `Export data to CSV / JSON backups`, included: false },
      { id: 'n3', text: `Collaborative multi-user sharing`, included: false }
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: `Should data prioritize local offline-first storage or real-time cloud sync?`,
        options: ['Local offline-first (instant speed, privacy)', 'Cloud sync with user accounts', 'Hybrid with local fallback'],
        selected: 'Local offline-first (instant speed, privacy)'
      },
      {
        id: 'q2',
        question: `What primary interface style best suits your workflow?`,
        options: ['Compact stream card view', 'Detailed dashboard table', 'Interactive visual kanban'],
        selected: 'Compact stream card view'
      }
    ]
  };
}

/**
 * Universal LLM caller supporting OpenAI, Claude, OpenRouter, and Gemini
 */
export async function callLlmApi({
  provider = 'demo',
  apiKey = '',
  model = '',
  systemPrompt,
  userPrompt,
  retries = 2
}) {
  if (provider === 'demo' || !apiKey) {
    throw new Error('DEMO_MODE');
  }

  let attempt = 0;
  while (attempt <= retries) {
    try {
      if (provider === 'openai' || provider === 'openrouter') {
        const url = provider === 'openrouter'
          ? 'https://openrouter.ai/api/v1/chat/completions'
          : 'https://api.openai.com/v1/chat/completions';
        
        const defaultModel = provider === 'openrouter' ? 'meta-llama/llama-3.3-70b-instruct' : 'gpt-4o-mini';
        
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            ...(provider === 'openrouter' ? { 'HTTP-Referer': 'https://appforge.dev', 'X-Title': 'AppForge' } : {})
          },
          body: JSON.stringify({
            model: model || defaultModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `API Error: HTTP ${res.status}`);
        }

        const data = await res.json();
        const content = data.choices[0]?.message?.content;
        return safeParseJson(content);
      }

      if (provider === 'claude') {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'dangerously-allow-browser': 'true'
          },
          body: JSON.stringify({
            model: model || 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            system: systemPrompt,
            messages: [
              { role: 'user', content: userPrompt }
            ]
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `Claude API Error: HTTP ${res.status}`);
        }

        const data = await res.json();
        const textBlock = data.content?.find(c => c.type === 'text');
        return safeParseJson(textBlock?.text || '');
      }

      if (provider === 'gemini') {
        const chosenModel = model || 'gemini-1.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${apiKey}`;
        
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `Gemini API Error: HTTP ${res.status}`);
        }

        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return safeParseJson(candidate || '');
      }

      throw new Error(`Unsupported provider: ${provider}`);
    } catch (err) {
      attempt++;
      if (attempt > retries) {
        throw err;
      }
      // Wait before retry
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}

/**
 * Stage 2: Understand Execution
 */
export async function executeUnderstandStage({ prompt, skillLevel, targetPlatform, apiSettings }) {
  if (!apiSettings?.apiKey || apiSettings.provider === 'demo') {
    // Artificial small delay for realistic UX animation
    await new Promise(r => setTimeout(r, 600));
    const matchedSample = findBestMatchingSample(prompt);
    
    // If prompt closely matches a prebaked sample, return its rich curated data
    const lower = prompt.toLowerCase();
    if (lower.includes('habit') || lower.includes('expense') || lower.includes('recipe') || lower.includes('study')) {
      return matchedSample.understand;
    }
    // Otherwise synthesize dynamic mock
    return generateDynamicMockUnderstand(prompt, skillLevel, targetPlatform);
  }

  const { system, userTemplate } = STAGE_PROMPTS.understand;
  return await callLlmApi({
    provider: apiSettings.provider,
    apiKey: apiSettings.apiKey,
    model: apiSettings.model,
    systemPrompt: system,
    userPrompt: userTemplate(prompt, skillLevel, targetPlatform)
  });
}

/**
 * Stage 3: Plan Execution
 */
export async function executePlanStage({ understandData, prompt, skillLevel, targetPlatform, apiSettings }) {
  if (!apiSettings?.apiKey || apiSettings.provider === 'demo') {
    await new Promise(r => setTimeout(r, 700));
    const matchedSample = findBestMatchingSample(prompt);
    return matchedSample.plan;
  }

  const { system, userTemplate } = STAGE_PROMPTS.plan;
  return await callLlmApi({
    provider: apiSettings.provider,
    apiKey: apiSettings.apiKey,
    model: apiSettings.model,
    systemPrompt: system,
    userPrompt: userTemplate(understandData, skillLevel, targetPlatform)
  });
}

/**
 * Stage 6: Learn Execution
 */
export async function executeLearnStage({ planData, understandData, prompt, skillLevel, apiSettings }) {
  if (!apiSettings?.apiKey || apiSettings.provider === 'demo') {
    await new Promise(r => setTimeout(r, 500));
    const matchedSample = findBestMatchingSample(prompt);
    return matchedSample.learn;
  }

  const { system, userTemplate } = STAGE_PROMPTS.learn;
  return await callLlmApi({
    provider: apiSettings.provider,
    apiKey: apiSettings.apiKey,
    model: apiSettings.model,
    systemPrompt: system,
    userPrompt: userTemplate(understandData.summary, planData, skillLevel)
  });
}

/**
 * Stage 5: Explain Chat Query Assistant
 */
export async function askCodeChat({ question, activeFile, codeContent, skillLevel, apiSettings }) {
  if (!apiSettings?.apiKey || apiSettings.provider === 'demo') {
    await new Promise(r => setTimeout(r, 400));
    
    // Contextual demo responses
    const q = question.toLowerCase();
    if (q.includes('state') || q.includes('hook') || q.includes('usestate')) {
      return `In this app, state is managed with React's \`useState\` hook. State represents mutable data over time. Each time a setter function like \`setHabits()\` or \`setExpenses()\` is dispatched, React re-renders the component with the new data. Note that we update state immutably (e.g., using \`[...prev, newItem]\` or \`.map()\`) to maintain strict reference integrity.`;
    }
    if (q.includes('persist') || q.includes('database') || q.includes('storage') || q.includes('backend') || q.includes('supabase')) {
      return `To persist this data permanently across sessions or devices, you can add a lightweight storage layer:
1. **Offline-first (Browser):** Use \`localStorage.setItem('app_data', JSON.stringify(data))\` inside a \`useEffect\`.
2. **Cloud Database (Supabase/Firebase):** Replace \`useState\` with Supabase Client queries (\`supabase.from('items').select('*')\`) and add real-time subscriptions with Row-Level Security (RLS).`;
    }
    if (q.includes('performance') || q.includes('render') || q.includes('usememo')) {
      return `This code stays high-performance by calculating derived values (like percentages or net balances) with \`useMemo\`. This caches calculations and skips recomputation during irrelevant re-renders. Component functions are kept pure and light.`;
    }
    if (q.includes('tailwind') || q.includes('style') || q.includes('css')) {
      return `Tailwind CSS utilities allow styling directly in JSX using class names like \`bg-slate-900 border border-slate-800 rounded-2xl\`. This avoids switching files, enforces consistent spacing tokens (4px grid), and produces zero runtime CSS overhead.`;
    }
    return `That's a great question about ${activeFile || 'this application'}! The code is designed around clean functional components, unidirectional data flow, and responsive mobile-first UI patterns tailored for ${skillLevel} developers. Feel free to explore other files or try the challenges in the Learn tab!`;
  }

  const system = `You are an encouraging, expert coding instructor at AppForge explaining code to a ${skillLevel} developer.
Analyze the provided code and provide clear, concise, actionable explanations. Avoid jargon if Beginner, provide architectural depth if Advanced. Keep answers under 150 words.`;

  const userMsg = `Active File: ${activeFile}\nCode Snippet:\n${(codeContent || '').slice(0, 1500)}\n\nUser Question: ${question}`;

  if (apiSettings.provider === 'openai' || apiSettings.provider === 'openrouter') {
    const url = apiSettings.provider === 'openrouter' ? 'https://openrouter.ai/api/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiSettings.apiKey}`
      },
      body: JSON.stringify({
        model: apiSettings.model || 'gpt-4o-mini',
        messages: [{ role: 'system', content: system }, { role: 'user', content: userMsg }],
        temperature: 0.7
      })
    });
    const d = await res.json();
    return d.choices?.[0]?.message?.content || 'Could not generate answer.';
  }

  return 'Live chat supported with OpenAI, Claude, or OpenRouter.';
}
