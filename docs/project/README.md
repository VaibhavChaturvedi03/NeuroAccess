

# 🌐 AutoAccess — Next-Gen Web Accessibility Chrome Extension

> *One Click. Infinite Accessibility.*
> AutoAccess makes any website instantly accessible for 1.3 billion differently-abled people worldwide — with AI-powered assistance, live captions, voice interaction, and inclusive design tools.


## 🚀 Overview

AutoAccess is a **Chrome Extension (Manifest V3)** that transforms any website into an **inclusive, barrier-free experience**.
With features like **One-Click Global Accessibility Mode, AI Chat Assistant, Image Labeling with OCR, Text-to-Speech, Voice Commands, Smart Contrast Fixes, Accessibility Score Badge, Heatmap Overlay, Live Captions, and Profile-based settings**, AutoAccess ensures accessibility is **instant, universal, and empowering**.


## ✨ Core Features

### 1. 🌍 One-Click Global Accessibility Mode

* Runs a full **axe-core accessibility audit**
* Automatically applies **safe fixes**:

  * Placeholder alt text for images
  * ARIA labels for forms & buttons
  * Heading hierarchy correction
  * Smart color contrast adjustments
  * Skip links for keyboard navigation
* Provides a **Before/After visual diff**
* Generates a **downloadable accessibility report** (PDF + JSON)


### 2. ⭐ AI Chat Assistant

* Context-aware chatbot injected into every webpage
* Example commands:

  * “Summarize this article”
  * “Describe this image”
  * “Why is this button inaccessible?”
* Responds with **confidence levels + provenance (local/OpenAI/HuggingFace)**
* Optional **TTS playback**

### 3. ⭐ AI Image Labeling + OCR

* Detects unlabeled images
* Uses **Tesseract.js (local OCR)** + optional APIs (OpenAI/HuggingFace)
* Generates intelligent alt text → user can **edit & apply**
* Updates DOM with accessible attributes

### 4. ⭐ Text-to-Speech (TTS)

* Reads aloud selected or full-page text
* Word-by-word **highlight sync** for dyslexic/blind users
* Multiple voices (browser TTS + optional OpenAI/ElevenLabs)
* Shortcut: **Alt+R**

### 5. ⭐ Speech-to-Text (STT) / Voice Commands

* Voice-powered browsing & navigation
* Supported commands:

  * Navigation: “Scroll down”, “Next link”, “Go back”
  * Interaction: “Click buy now”, “Add to cart”
  * Reading: “Read this page”
* Built on **Web Speech API** (local, privacy-first)

### 6. ⭐ Smart Contrast Fixer

* Improves text readability with **WCAG 2.1 AA compliant colors**
* Presets for color-blindness (Protanopia, Deuteranopia, Tritanopia)
* Preserves brand identity while ensuring compliance

### 7. ⭐ Enhanced Keyboard Navigation

* Logical tab order for focusable elements
* Injects skip links for main content
* Adds **visual focus indicators**
* SPA route-change support


### 8. 👤 Accessibility Profiles

* Predefined profiles: **Blind**, **Low Vision**, **Dyslexic**, **Default**
* Each profile optimizes features for that disability (e.g., Blind → TTS priority, Dyslexic → simplified fonts, Low Vision → high contrast)
* **Custom profiles** + site-specific overrides


## 🔥 Tech Stack

### 🔹 Core Technologies

* **Chrome Extension MV3** — Secure extension architecture
* **React + TypeScript** — Popup & options UI
* **Tailwind CSS** — Modern responsive styling
* **JavaScript/TS** — Content scripts, accessibility fixes

### 🔹 Build & Tools

* **Vite / Webpack 5** — Bundling
* **ESLint + Prettier** — Code quality
* **Jest + Playwright** — Testing

### 🔹 Accessibility Libraries

* **axe-core** — Accessibility auditing
* **Tesseract.js** — Local OCR
* **Web Speech API** — TTS + STT (local fallback)
* **Optional APIs:** OpenAI, HuggingFace, AssemblyAI, ElevenLabs

### 🔹 Security

* **CSP** — Prevents script injection
* **Encrypted storage** — API keys saved securely
* **Local-first design** — No data leaves browser unless user opts in

---

## 🔒 Privacy & Security

* **Local-first architecture** — Core features (audit, OCR, TTS, STT, contrast fixes) work without internet
* **Cloud AI (optional)** — OpenAI / HuggingFace / AssemblyAI with user API keys
* **No personal data collection** — No tracking of URLs or content
* **Keys encrypted locally** — Never uploaded
* **Open source** — Transparent & auditable


## 📦 Installation

### For Users

1. Clone repo or download ZIP → extract
2. Open `chrome://extensions/` → enable Developer Mode
3. Click **Load unpacked** → select extension folder
4. Configure settings & API keys (optional) in Options


## 💰 Business Model

### 🆓 Free Plan

* Basic audit + report
* Standard contrast fixes
* 10 image labelings/day
* Community support

### 💎 Monthly ($9.99)

* Unlimited audits + reports
* Unlimited image labeling
* Full AI Chat Assistant
* Advanced profiles + customization
* Priority support

### 👑 Yearly ($99.99)

* All monthly features
* 2 months free
* Early access to new features
* Dedicated support + enterprise analytics


## 🏆 Why AutoAccess Wins

* **Instant Fixes + Measurable Proof** (Global Mode, Score Badge, Heatmap)
* **Truly Inclusive** (Blind, Low Vision, Dyslexic, Deaf/HOH profiles)
* **Privacy-First** (local-first, encrypted keys, opt-in AI)
* **Universal Value** (users + developers + enterprises)


✨ *AutoAccess isn’t just another extension — it’s the future of universal, barrier-free web accessibility.

