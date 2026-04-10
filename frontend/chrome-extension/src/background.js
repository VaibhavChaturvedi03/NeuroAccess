chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    contrast: false,
    tts: false,
    keyboard: false,
    aiImage: false,
    dyslexia: false
  });

  console.log("✅ NeuroAccess installed");
});

// ✅ SAFE INJECTION
async function safeSend(tabId, message) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["src/content.js"] // ✅ KEEP THIS SAME
    });

    chrome.tabs.sendMessage(tabId, message);
  } catch (e) {
    console.log("❌ Injection failed:", e);
  }
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    safeSend(tabs[0].id, msg);
  });
});

console.log("🚀 Background ready");