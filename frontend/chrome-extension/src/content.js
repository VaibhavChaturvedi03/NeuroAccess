

let speech = window.speechSynthesis;
let recognition = null;

console.log("🔥 NeuroAccess content loaded");

let appliedStyles = [];

/*  MESSAGE LISTENER  */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  console.log("📩 Message received:", msg);

  if (!msg || !msg.action) return;

  try {
    
    if (msg.action === "START_VOICE") {
  startVoice();   // 🔥 THIS WAS MISSING
  sendResponse({ success: true });
  return true;
}

    if (msg.action === "APPLY") {
      applyFixes(msg.config || {});
      sendResponse({ success: true });   // ✅ VERY IMPORTANT
      return true;
    }

    if (msg.action === "RESET") {
      resetAll();
      sendResponse({ success: true });
      return true;
    }

    if (msg.action === "READ_PAGE") {
      readPage();
      sendResponse({ success: true });
      return true;
    }

    if (msg.action === "SCAN_PAGE") {
      const result = scanPage();
      sendResponse(result);
      return true;
    }

  } catch (e) {
    console.error("❌ Error in content:", e);
    sendResponse({ success: false });
  }

});



function applyFixes(config) {

  resetStyles();

  if (config.contrast) fixContrast();
  if (config.keyboard) fixNavigation();
  if (config.dyslexia) applyDyslexia();
  if (config.aiImage) generateAltText();

  if (config.tts) {
    readPage(); // 🔥 auto start TTS
  }
}



function applyStyle(el, styles) {
  appliedStyles.push({
    el,
    style: el.getAttribute("style") || ""
  });

  Object.assign(el.style, styles);
}

/* <<<<<< FEATURES>>>>>>>  */
function fixContrast() {

  console.log("🌑 High contrast ON");

  // remove old if exists
  const old = document.getElementById("na-contrast-style");
  if (old) old.remove();

  const style = document.createElement("style");
  style.id = "na-contrast-style";

  style.innerHTML = `
    html, body, * {
      background-color: #000000 !important;
      color: #ffffff !important;
      border-color: #ffffff !important;
    }

    img, video {
      filter: grayscale(100%) contrast(120%) !important;
    }

    a {
      color: #00ffff !important;
    }

    button {
      background: #111 !important;
      color: #fff !important;
      border: 1px solid #fff !important;
    }
  `;

  document.head.appendChild(style);
}
 
// KEYBOARD NAVIGATION 
function fixNavigation() {

  document.querySelectorAll("a, button, input").forEach(el => {
    el.style.outline = "3px solid #2563eb";
  });

  document.querySelectorAll("div").forEach(el => {
    if (el.onclick && !el.getAttribute("tabindex")) {
      el.setAttribute("tabindex", "0");
    }
  });

  console.log(" Navigation improved");
}
// DYSLEXIA MODE
function applyDyslexia() {

  applyStyle(document.body, {
    fontFamily: "Verdana, Arial, sans-serif",
    letterSpacing: "0.12em",
    lineHeight: "1.8",
    wordSpacing: "0.15em"
  });

  document.querySelectorAll("p, span, li").forEach(el => {
    applyStyle(el, {
      fontSize: "16px",
      lineHeight: "1.8"
    });
  });

  console.log("📖 Dyslexia mode applied");
}


function generateAltText() {

  document.querySelectorAll("img").forEach(img => {

    if (!img.alt || img.alt.trim() === "") {

      let desc = "Image";

      if (img.src.includes("logo")) desc = "Logo";
      else if (img.src.includes("icon")) desc = "Icon";
      else if (img.src.includes("banner")) desc = "Banner";
      else desc = "Illustration";

      img.alt = desc;

      // 🔥 visual proof
      img.style.border = "3px solid lime";
    }

  });

  console.log("🤖 AI alt text applied");
}

// VOICE NAVIGATION
function startVoice() {

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice not supported in this browser");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;

  recognition.onresult = (event) => {

    const command =
      event.results[event.results.length - 1][0].transcript.toLowerCase();

    console.log("🎤 Voice:", command);

    if (command.includes("scroll down")) {
      window.scrollBy(0, 400);
    }

    if (command.includes("scroll up")) {
      window.scrollBy(0, -400);
    }

    if (command.includes("go top")) {
      window.scrollTo(0, 0);
    }

    if (command.includes("click")) {
      document.querySelector("button, a")?.click();
    }
  };

  recognition.start();

  console.log("🎤 Voice navigation started");
}

/* RESET  */

function resetStyles() {
  appliedStyles.forEach(item => {
    item.el.setAttribute("style", item.style);
  });
  appliedStyles = [];
}

function resetAll() {

  console.log("🔄 Resetting...");

  // Remove contrast style
  const styleTag = document.getElementById("na-contrast-style");
  if (styleTag) styleTag.remove();

  window.location.reload();
}
/* SCAN  */

function scanPage() {

  // clear old highlights
  document.querySelectorAll(".na-issue").forEach(el => {
    el.classList.remove("na-issue");
  });

  let missingAlt = 0;
  let navIssues = 0;
  let lowContrast = 0;

  const images = document.querySelectorAll("img");
  const clickable = document.querySelectorAll("a, button, [role='button']");
  

  /* ALT */

  images.forEach(img => {
    if (!img.alt || img.alt.trim() === "") {
      missingAlt++;
      img.classList.add("na-issue");
    }
  });

  /* NAV*/

  clickable.forEach(el => {
    if (!el.hasAttribute("tabindex") && el.tagName !== "A" && el.tagName !== "BUTTON") {
      navIssues++;
      el.classList.add("na-issue");
    }
  });


/* ================= CONTRAST (WCAG ) ================= */

function parseRGB(str) {
  const match = str.match(/\d+/g);
  if (!match) return null;
  return match.map(Number);
}

function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrast(rgb1, rgb2) {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/* 🔥 IMPORTANT: ONLY TEXT ELEMENTS */
const textElements = document.querySelectorAll(
  "p, span, a, button, h1, h2, h3, h4, h5, h6, li"
);

textElements.forEach(el => {
  try {
    const text = el.innerText?.trim();
    if (!text) return; 

    const style = getComputedStyle(el);

    /* 🔥 SKIP TRANSPARENT BACKGROUND */
    if (style.display === "none" || style.visibility === "hidden") return;
    if (style.backgroundColor === "rgba(0, 0, 0, 0)") return;

    const textColor = parseRGB(style.color);
    const bgColor = parseRGB(style.backgroundColor);

    if (!textColor || !bgColor) return;

    const ratio = getContrast(textColor, bgColor);

    /* WCAG RULE */
    if (ratio < 4.5) {
      lowContrast++;
      el.classList.add("na-issue");
    }

  } catch (e) {}
});

/* DEBUG */
console.log("LOW CONTRAST COUNT:", lowContrast);

  return {
    missingAlt,
    navIssues,
    lowContrast
  };
}
/* TTS */

let isSpeaking = false;

function readPage() {

  if (isSpeaking) {
    speech.cancel();
    isSpeaking = false;
    console.log("⏹️ Stopped reading");
    return;
  }

  const text = document.body.innerText.substring(0, 3000);

  const utter = new SpeechSynthesisUtterance(text);

  speech.speak(utter);

  isSpeaking = true;

  utter.onend = () => {
    isSpeaking = false;
  };

  console.log("🔊 Reading started");
}
