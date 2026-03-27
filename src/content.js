// Content script that runs in the context of web pages
console.log('AutoAccess content script loaded');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageInfo') {
    // Get page information
    const pageInfo = {
      title: document.title,
      url: window.location.href,
      // Add more page information as needed
    };
    sendResponse(pageInfo);
  }
  return true;
});
