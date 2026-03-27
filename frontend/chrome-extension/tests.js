// Test Suite for AutoAccess Extension

// Mock Chrome API
const mockChrome = {
    storage: {
        sync: {
            get: jest.fn(),
            set: jest.fn()
        }
    },
    tabs: {
        query: jest.fn(),
        sendMessage: jest.fn()
    },
    runtime: {
        onMessage: {
            addListener: jest.fn()
        }
    }
};

// Mock DOM elements
document.body.innerHTML = `
    <img src="test.jpg" alt="">
    <div style="color: #ff0000; background-color: #ffcccc;">Low contrast text</div>
    <button>Test Button</button>
`;

// Test Image Labeling
describe('Image Labeling', () => {
    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();
    });

    test('should add alt text to images without descriptions', async () => {
        const images = document.getElementsByTagName('img');
        await processImages();
        expect(images[0].alt).toBeTruthy();
    });

    test('should handle API errors gracefully', async () => {
        // Mock failed API call
        global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));
        const images = document.getElementsByTagName('img');
        await processImages();
        expect(images[0].style.border).toBe('2px solid #f44336');
    });
});

// Test Color Contrast
describe('Color Contrast', () => {
    test('should improve low contrast text', () => {
        const element = document.querySelector('div');
        const originalColor = element.style.color;
        fixColorContrast();
        expect(element.style.color).not.toBe(originalColor);
    });

    test('should maintain high contrast text', () => {
        const element = document.createElement('div');
        element.style.color = '#000000';
        element.style.backgroundColor = '#ffffff';
        document.body.appendChild(element);
        const originalColor = element.style.color;
        fixColorContrast();
        expect(element.style.color).toBe(originalColor);
    });
});

// Test Voice Navigation
describe('Voice Navigation', () => {
    beforeEach(() => {
        // Mock speech recognition
        window.webkitSpeechRecognition = jest.fn().mockImplementation(() => ({
            continuous: true,
            interimResults: true,
            lang: 'en-US',
            start: jest.fn(),
            onresult: null,
            onerror: null
        }));
    });

    test('should handle scroll commands', () => {
        const originalScrollY = window.scrollY;
        handleVoiceCommand('scroll down');
        expect(window.scrollY).toBeGreaterThan(originalScrollY);
    });

    test('should handle zoom commands', () => {
        const originalZoom = document.body.style.zoom || 1;
        handleVoiceCommand('zoom in');
        expect(parseFloat(document.body.style.zoom)).toBeGreaterThan(originalZoom);
    });
});

// Test Settings Management
describe('Settings Management', () => {
    test('should load saved settings', () => {
        const mockSettings = {
            imageLabeling: true,
            colorContrast: true,
            voiceNav: true
        };
        mockChrome.storage.sync.get.mockImplementation((keys, callback) => {
            callback(mockSettings);
        });
        // Test settings loading
        expect(settings).toEqual(mockSettings);
    });

    test('should save settings', () => {
        const newSettings = {
            imageLabeling: false,
            colorContrast: true,
            voiceNav: false
        };
        saveSettings(newSettings);
        expect(mockChrome.storage.sync.set).toHaveBeenCalledWith(newSettings);
    });
});

// Test Cache Management
describe('Cache Management', () => {
    test('should cache image descriptions', async () => {
        const imageUrl = 'test.jpg';
        const description = 'Test image';
        imageCache.set(imageUrl, {
            description,
            timestamp: Date.now()
        });
        const cachedDescription = await getImageDescription(imageUrl);
        expect(cachedDescription).toBe(description);
    });

    test('should respect cache duration', async () => {
        const imageUrl = 'test.jpg';
        const oldTimestamp = Date.now() - (config.CACHE.DURATION + 1000);
        imageCache.set(imageUrl, {
            description: 'Old description',
            timestamp: oldTimestamp
        });
        const description = await getImageDescription(imageUrl);
        expect(description).not.toBe('Old description');
    });
});

// Test Error Handling
describe('Error Handling', () => {
    test('should handle API errors with retries', async () => {
        let attempts = 0;
        global.fetch = jest.fn().mockImplementation(() => {
            attempts++;
            if (attempts < config.ERROR_HANDLING.MAX_RETRIES) {
                return Promise.reject(new Error('API Error'));
            }
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    description: { captions: [{ text: 'Test description' }] }
                })
            });
        });
        const description = await getImageDescription('test.jpg');
        expect(description).toBe('Test description');
        expect(attempts).toBe(config.ERROR_HANDLING.MAX_RETRIES);
    });
});

// Test Performance
describe('Performance', () => {
    test('should batch process images', async () => {
        const images = Array(20).fill().map(() => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            document.body.appendChild(img);
            return img;
        });
        await processImages();
        expect(images.every(img => img.alt)).toBe(true);
    });
});

// Run all tests
function runTests() {
    const results = {
        passed: 0,
        failed: 0,
        total: 0
    };

    // Run each test suite
    Object.keys(global).forEach(key => {
        if (key.startsWith('describe')) {
            const suite = global[key];
            suite();
            results.total += suite.tests.length;
            results.passed += suite.tests.filter(t => t.passed).length;
            results.failed += suite.tests.filter(t => !t.passed).length;
        }
    });

    // Log results
    console.log('Test Results:', results);
    return results;
}

// Export test runner
export { runTests }; 