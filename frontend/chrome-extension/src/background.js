// Background script that runs in the extension's background context
console.log('AutoAccess background script loaded');

// Listen for installation
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    // First time installation
    console.log('AutoAccess installed');
  } else if (details.reason === 'update') {
    // Extension updated
    console.log('AutoAccess updated');
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getExtensionInfo') {
    // Get extension information
    const extensionInfo = {
      version: chrome.runtime.getManifest().version,
      // Add more extension information as needed
    };
    sendResponse(extensionInfo);
  }
  return true;
});
