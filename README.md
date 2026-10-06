# FORGEAPP — Obsidian Forge AI Development Studio

> **Prompt → Understand → Plan → Build → Explain → Learn**
>
> An interactive AI-powered software engineering studio that guides users through the complete lifecycle of building applications with plain-English mentorship, visual blueprints, live sandboxing, and interactive quizzes.

---

## 🎨 Premium Theme — Obsidian Forge

FORGEAPP is styled with the **Obsidian Forge** engineering design system:

| Element | Colour Name | Hex Code |
|:---|:---|:---|
| **Primary Background** | Obsidian Black | `#0B0D10` |
| **Secondary Background** | Graphite | `#15191F` |
| **Card / Surface** | Dark Steel | `#1C222A` |
| **Borders** | Dark Steel Border | `#29313A` |
| **Primary Accent** | Electric Copper | `#FF7A3D` |
| **Secondary Accent** | Molten Gold | `#F5B942` |
| **Highlight** | Titanium Silver | `#C8D0D9` |
| **Main Text** | Ice White | `#F4F7FA` |
| **Body Text** | Steel Light | `#AAB4BF` |
| **Muted Text** | Steel Gray | `#8D98A5` |
| **Success** | Forge Green | `#36D399` |
| **Error** | Ember Red | `#FF4D4D` |

### ⚡ Signature Gradient
`#FF7A3D → #F5B942` *(Electric Copper to Molten Gold)*
Applied across interactive buttons, active navigation, logo glyphs, and primary CTAs.

### 🌓 Simultaneous Dark & Light Mode
- **Dark Mode (Default)**: Deep Obsidian Black (`#0B0D10`), Graphite (`#15191F`), Dark Steel cards (`#1C222A`), and glowing copper/gold accents.
- **Light Mode (Titanium Foundry)**: Crisp Titanium White (`#F4F7FA`), Ice White cards (`#FFFFFF`), Graphite light surfaces (`#EAEFF5`), and crisp borders with signature copper/gold accents.
- Toggle anytime via the **Sun / Moon** button in the top navigation bar.

---

## ✨ 6-Stage Guided Journey

### 1. 💡 PROMPT
- Large text box with keyboard shortcuts (`Ctrl+↵` to launch).
- 4 pre-built templates: **Habit Streak Tracker**, **Group Expense Splitter**, **Fridge Recipe Finder**, and **Pomodoro Study Room**.
- Experience level selector (**Beginner**, **Intermediate**, **Advanced**) and target platform (**Mobile app**, **Web app**).

### 2. 🎯 UNDERSTAND
- AI problem scope synthesis & one-line intent capture.
- Target personas & core problem breakdown.
- **Interactive Feature Scope Checklist**: Toggle Must-Have vs. Nice-to-Have features in real time or add custom entries.
- **Clarifying Questions**: Multiple-choice prompts to eliminate ambiguity.

### 3. 🗺️ PLAN
- **Interactive Flow Chart**: Zoomable screen and navigation architecture diagram.
- **Tailored Tech Stack**: Libraries and frameworks justified for the user's skill level.
- **Data Model Schema**: Full relational entities, fields, types, and constraints.
- **Build Roadmap & API Endpoints**: Step-by-step engineering timeline.
- **Markdown Export**: 1-click download of the complete blueprint `.md`.

### 4. ⚡ BUILD
- **Split-Screen Studio**: Syntax-highlighted code editor alongside a **Live Sandboxed Device Frame**.
- Multi-file tab browsing (`src/App.jsx`, `index.html`, etc.).
- Switch between **Mobile Phone Frame** and **Desktop Window** viewport modes.
- **1-Click ZIP Download**: Generates and downloads a complete runnable project `.zip` in-browser with `JSZip`.

### 5. 🧠 EXPLAIN
- Plain-language function explanations tailored to the developer's experience level.
- Code design trade-offs and "Why built this way?" deep dives.
- **Interactive AI Code Mentor Chat**: Multi-turn technical Q&A grounded in the generated source code.

### 6. 🎓 LEARN
- **4-Stage Learning Path**: Core engineering principles with runnable snippets.
- **Tiered Coding Challenges**: Easy, Medium, and Hard exercises with hints and expandable solutions.
- **Mastery Quiz**: Dynamic multiple-choice questions with instant feedback and celebratory copper/gold confetti.
- **What to Build Next**: Recommended production expansions and curated search keywords.

---

## 🚀 Quick Start

### Installation
```bash
# Clone or navigate to directory
cd AppForge

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

---

## 🤖 AI Providers & Zero-Key Demo Mode
- **Demo Mode**: Rich built-in datasets for all 4 flagship presets (Works 100% offline out-of-the-box without keys).
- **OpenAI**: GPT-4o / GPT-4o-mini
- **Anthropic Claude**: Claude 3.5 Sonnet / Haiku
- **Google Gemini**: Gemini 1.5 Flash / Pro
- **OpenRouter**: Llama 3.3 70B & 100+ models
