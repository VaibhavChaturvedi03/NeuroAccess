// import config from './config.js'; // Removed because config.js was deleted and is not needed here
import paymentProcessor from './payment.js';

// Initialize payment processor
paymentProcessor.initialize();

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case 'subscribe':
            handleSubscription(message.plan);
            break;
        case 'updateSubscriptionStatus':
            handleSubscriptionStatus(message.isPremium, message.plan);
            break;
        case 'showError':
            handleError(message.message);
            break;
    }
    return true;
});

async function handleSubscription(plan) {
    try {
        await paymentProcessor.subscribe(plan);
    } catch (error) {
        console.error('Subscription error:', error);
        handleError(error.message);
    }
}

function handleSubscriptionStatus(isPremium, plan) {
    // Update extension icon based on subscription status
    const iconPath = isPremium ? 'icons/icon48_premium.png' : 'icons/icon48.png';
    chrome.action.setIcon({ path: iconPath });

    // Notify all tabs about subscription status change
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {
                action: 'updateSubscriptionStatus',
                isPremium,
                plan
            }).catch(() => {
                // Ignore errors for tabs where content script isn't loaded
            });
        });
    });
}

function handleError(message) {
    // Show error notification
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'AutoAccess Error',
        message: message
    });
}

// Handle installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Open welcome page
        chrome.tabs.create({ url: 'landing.html' });
    }
});

// Handle updates
chrome.runtime.onUpdateAvailable.addListener((details) => {
    if (details.version !== chrome.runtime.getManifest().version) {
        chrome.runtime.reload();
    }
});

// Listen for tab updates to inject content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
}); 