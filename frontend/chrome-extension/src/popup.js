console.log("🚀 POPUP LOADED");

/*MAIN  */

window.onload = async () => {

  /* SIMPLE LOGO ANIMATION  */

  const logo = document.getElementById("logo");

  if (logo) {
    logo.addEventListener("mouseenter", () => {
  logo.style.transform = "scale(1.18)";
});

    logo.addEventListener("mouseleave", () => {
      logo.style.transform = "scale(1)";
    });
  }

  /*  LOADER TRANSITION  */

  setTimeout(() => {
    const loader = document.getElementById("loader");
    const mainUI = document.getElementById("mainUI");

    if (loader) loader.style.display = "none";
    if (mainUI) mainUI.classList.remove("hidden");
  }, 1500);

  /* ================= ELEMENTS ================= */

  const applyBtn = document.getElementById("naApplyBtn");
  const resetBtn = document.getElementById("naResetBtn");
  const voiceBtn = document.getElementById("voiceBtn");
  const ttsBtn = document.getElementById("ttsBtn");

  const altEl = document.getElementById("altCount");
  const contrastEl = document.getElementById("contrastCount");
  const navEl = document.getElementById("navCount");
  const scoreEl = document.getElementById("scoreValue");

  const logBox = document.querySelector(".na-log");

  function log(text, type = "") {
    if (!logBox) return;
    logBox.innerHTML = `<p class="${type}">• ${text}</p>`;
  }

  /*  TAB CHECK  */

  async function getTab() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tab || !tab.id || tab.url.startsWith("chrome://")) {
      log("Open a normal website ❌");
      return null;
    }

    return tab;
  }

  /* <<<< ENSURE CONTENT>>>>  */

  async function ensureContent(tabId) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ["src/content.js"]
      });
    } catch {
      console.log("⚠️ Content already injected");
    }
  }

  /* ================= SCAN ================= */
async function runScan() {
  log("Scanning page... 🔍");

  const tab = await getTab();
  if (!tab) return;

  await ensureContent(tab.id);

  chrome.tabs.sendMessage(tab.id, { action: "SCAN_PAGE" }, (res) => {

    if (chrome.runtime.lastError || !res) {
      log("Scan failed ❌");
      return;
    }

    const alt = res.missingAlt ?? 0;
    const contrast = res.lowContrast ?? 0;
    const nav = res.navIssues ?? 0;

    altEl.textContent = alt;
    contrastEl.textContent = contrast;
    navEl.textContent = nav;

    /*  SMART SCORE */

    let score = 100;

score -= Math.min(alt, 10) * 5;
score -= Math.min(nav, 10) * 4;
score -= Math.min(contrast, 20) * 2;

score = Math.max(0, Math.min(100, score));
    
    scoreEl.textContent = score;

    /*INTELLIGENT FEEDBACK */

    if (score >= 85) {
      log("Excellent accessibility 🌟", "success");
    }
    else if (score >= 60) {
      log("Good, but can improve ⚠️");
    }
    else if (score >= 40) {
      log("Accessibility issues found ❗");
    }
    else {
      log("Poor accessibility 🚨 Fix recommended");
    }

    /*  COLOR SCORE  */

    const circle = document.querySelector(".circle");

    if (circle) {
      if (score >= 80) circle.style.borderColor = "#16a34a"; // green
      else if (score >= 50) circle.style.borderColor = "#f59e0b"; // yellow
      else circle.style.borderColor = "#ef4444"; // red
    }

    console.log("📊 FINAL SCORE:", score, res);
  });
}

  /*  APPLY  */

  if (applyBtn) {
    applyBtn.onclick = async () => {

      log("Applying fixes...");

      const tab = await getTab();
      if (!tab) return;

      await ensureContent(tab.id);

      const config = {
        contrast: document.getElementById("naContrastToggle")?.checked || false,
        keyboard: document.getElementById("naKeyboardToggle")?.checked || false,
        dyslexia: document.getElementById("naDyslexiaToggle")?.checked || false,
        aiImage: document.getElementById("naImageToggle")?.checked || false,
        tts: document.getElementById("naTTSToggle")?.checked || false
      };

      chrome.tabs.sendMessage(tab.id, {
        action: "APPLY",
        config
      }, () => {

        if (chrome.runtime.lastError) {
          log("Apply failed ❌");
          return;
        }

        log("Applied ✅");
        setTimeout(runScan, 800);
      });
    };
  }

  /* RESET */

  if (resetBtn) {
    resetBtn.onclick = async () => {

      log("Resetting...");

      const tab = await getTab();
      if (!tab) return;

      chrome.tabs.sendMessage(tab.id, { action: "RESET" });

      log("Page reloading...");
      setTimeout(runScan, 1200);
    };
  }

  /*  TTS  */

  if (ttsBtn) {
    ttsBtn.onclick = async () => {
      const tab = await getTab();
      if (!tab) return;

      chrome.tabs.sendMessage(tab.id, { action: "READ_PAGE" });
    };
  }

  /*  VOICE  */

  if (voiceBtn) {
    voiceBtn.onclick = async () => {

      log("Voice control started 🎤");

      const tab = await getTab();
      if (!tab) return;

      chrome.tabs.sendMessage(tab.id, {
        action: "START_VOICE"
      });
    };
  }

  /* AUTO SCAN */

  setTimeout(runScan, 1500);
};