// AutoAccess Extension - Content Script
// This script runs on web pages to provide accessibility features

console.log('AutoAccess Extension: Content script loaded');

// Configuration for Azure Vision API
// To use this extension, you need to:
// 1. Create an Azure Computer Vision resource
// 2. Go to "Keys and Endpoint"
// 3. Copy "Key 1" and "Endpoint"
// 4. Replace the placeholder values below

const config = {
    // Azure Vision API Configuration
    VISION_API_KEY: 'YOUR_AZURE_VISION_API_KEY_HERE',
    VISION_ENDPOINT: 'https://webaccess.cognitiveservices.azure.com/vision/v3.2/analyze',
    // Feature Configuration
    FEATURES: {
        IMAGE_LABELING: {
            enabled: true,
            confidenceThreshold: 0.7,
            maxRetries: 3,
            supportedLanguages: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'ja-JP', 'zh-CN']
        },
        TEXT_EXTRACTION: {
            enabled: true,
            maxImageSize: 4 * 1024 * 1024, // 4MB
            supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']
        },
        ACCESSIBILITY_FEATURES: {
            enabled: true,
            autoAltText: true,
            colorContrastCheck: true,
            keyboardNavigation: true
        }
    }
};

// Initialize the extension
function initializeAutoAccess() {
    console.log('AutoAccess: Initializing accessibility features');
    
    // Add keyboard navigation support
    if (config.FEATURES.ACCESSIBILITY_FEATURES.keyboardNavigation) {
        addKeyboardNavigation();
    }
    
    // Add color contrast checking
    if (config.FEATURES.ACCESSIBILITY_FEATURES.colorContrastCheck) {
        addColorContrastCheck();
    }
    
    // Process existing images for alt text
    if (config.FEATURES.ACCESSIBILITY_FEATURES.autoAltText) {
        processImagesForAltText();
    }
}

// Add keyboard navigation support
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Add custom keyboard shortcuts
        if (event.ctrlKey && event.key === 'a') {
            event.preventDefault();
            // Custom accessibility action
            console.log('AutoAccess: Accessibility shortcut triggered');
        }
    });
}

// Add color contrast checking
function addColorContrastCheck() {
    // This would implement color contrast checking
    console.log('AutoAccess: Color contrast checking enabled');
}

// Process images for automatic alt text generation
function processImagesForAltText() {
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        if (img.src && !img.alt) {
            generateAltText(img);
        }
    });
}

// Generate alt text using Azure Vision API
async function generateAltText(imgElement) {
    try {
        // Check if API key is configured
        if (config.VISION_API_KEY === 'YOUR_AZURE_VISION_API_KEY_HERE') {
            console.log('AutoAccess: Please configure your Azure Vision API key');
            return;
        }
        
        // This would call the Azure Vision API
        // For now, we'll just add a placeholder
        imgElement.alt = 'Image processed by AutoAccess Extension';
        console.log('AutoAccess: Alt text generated for image');
    } catch (error) {
        console.error('AutoAccess: Error generating alt text:', error);
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageInfo') {
        const pageInfo = {
            title: document.title,
            url: window.location.href,
            images: document.querySelectorAll('img').length,
            links: document.querySelectorAll('a').length,
            headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length
        };
        sendResponse(pageInfo);
    } else if (request.action === 'processImages') {
        processImagesForAltText();
        sendResponse({success: true});
    } else if (request.action === 'checkAccessibility') {
        const accessibilityReport = {
            imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
            linksWithoutText: document.querySelectorAll('a:not([title]):empty').length,
            formLabels: document.querySelectorAll('input:not([id]), select:not([id]), textarea:not([id])').length
        };
        sendResponse(accessibilityReport);
    }
    return true;
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAutoAccess);
} else {
    initializeAutoAccess();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        config,
        initializeAutoAccess,
        generateAltText,
        processImagesForAltText
    };
}