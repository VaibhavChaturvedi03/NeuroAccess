const { AccessibilityController } = require('./accessibility-controller');

console.log('NeuroAccess content script loaded');

const controller = new AccessibilityController();

if (typeof chrome !== 'undefined' && chrome?.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageInfo') {
      sendResponse({
        title: document.title,
        url: window.location.href,
      });
      return true;
    }

    if (request.action === 'processImages') {
      controller.processImages().then(count => {
        sendResponse({ processed: count });
      });
      return true;
    }

    return true;
  });
}

module.exports = {
  AccessibilityController,
  controller,
};
