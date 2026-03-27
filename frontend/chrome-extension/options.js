import config from './config.js';

class OptionsController {
    constructor() {
        this.defaultSettings = {
            visionApiKey: '',
            visionEndpoint: '',
            imageLabelingEnabled: true,
            confidenceThreshold: 0.7,
            colorContrastEnabled: true,
            wcagLevel: 'AA',
            voiceNavEnabled: true,
            voiceLanguage: 'en-US',
            batchSize: 10,
            debounceDelay: 300
        };

        this.initializeElements();
        this.loadSettings();
        this.attachEventListeners();
    }

    initializeElements() {
        // API Configuration
        this.visionApiKeyInput = document.getElementById('visionApiKey');
        this.visionEndpointInput = document.getElementById('visionEndpoint');

        // Image Labeling
        this.imageLabelingCheckbox = document.getElementById('imageLabelingEnabled');
        this.confidenceThresholdInput = document.getElementById('confidenceThreshold');

        // Color Contrast
        this.colorContrastCheckbox = document.getElementById('colorContrastEnabled');
        this.wcagLevelSelect = document.getElementById('wcagLevel');

        // Voice Navigation
        this.voiceNavCheckbox = document.getElementById('voiceNavEnabled');
        this.voiceLanguageSelect = document.getElementById('voiceLanguage');

        // Performance
        this.batchSizeInput = document.getElementById('batchSize');
        this.debounceDelayInput = document.getElementById('debounceDelay');

        // Buttons
        this.saveButton = document.getElementById('saveButton');
        this.resetButton = document.getElementById('resetButton');

        // Status
        this.statusDiv = document.getElementById('status');
    }

    async loadSettings() {
        try {
            const settings = await chrome.storage.sync.get('settings');
            const currentSettings = settings.settings || this.defaultSettings;

            // API Configuration
            this.visionApiKeyInput.value = currentSettings.visionApiKey;
            this.visionEndpointInput.value = currentSettings.visionEndpoint;

            // Image Labeling
            this.imageLabelingCheckbox.checked = currentSettings.imageLabelingEnabled;
            this.confidenceThresholdInput.value = currentSettings.confidenceThreshold;

            // Color Contrast
            this.colorContrastCheckbox.checked = currentSettings.colorContrastEnabled;
            this.wcagLevelSelect.value = currentSettings.wcagLevel;

            // Voice Navigation
            this.voiceNavCheckbox.checked = currentSettings.voiceNavEnabled;
            this.voiceLanguageSelect.value = currentSettings.voiceLanguage;

            // Performance
            this.batchSizeInput.value = currentSettings.batchSize;
            this.debounceDelayInput.value = currentSettings.debounceDelay;
        } catch (error) {
            this.showStatus('Error loading settings: ' + error.message, 'error');
        }
    }

    attachEventListeners() {
        this.saveButton.addEventListener('click', () => this.saveSettings());
        this.resetButton.addEventListener('click', () => this.resetSettings());
    }

    async saveSettings() {
        try {
            const settings = {
                visionApiKey: this.visionApiKeyInput.value,
                visionEndpoint: this.visionEndpointInput.value,
                imageLabelingEnabled: this.imageLabelingCheckbox.checked,
                confidenceThreshold: parseFloat(this.confidenceThresholdInput.value),
                colorContrastEnabled: this.colorContrastCheckbox.checked,
                wcagLevel: this.wcagLevelSelect.value,
                voiceNavEnabled: this.voiceNavCheckbox.checked,
                voiceLanguage: this.voiceLanguageSelect.value,
                batchSize: parseInt(this.batchSizeInput.value),
                debounceDelay: parseInt(this.debounceDelayInput.value)
            };

            await chrome.storage.sync.set({ settings });
            this.showStatus('Settings saved successfully!', 'success');

            // Notify content script about settings change
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'settingsUpdated',
                    settings
                });
            }
        } catch (error) {
            this.showStatus('Error saving settings: ' + error.message, 'error');
        }
    }

    async resetSettings() {
        try {
            await chrome.storage.sync.set({ settings: this.defaultSettings });
            await this.loadSettings();
            this.showStatus('Settings reset to default values!', 'success');

            // Notify content script about settings change
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'settingsUpdated',
                    settings: this.defaultSettings
                });
            }
        } catch (error) {
            this.showStatus('Error resetting settings: ' + error.message, 'error');
        }
    }

    showStatus(message, type) {
        this.statusDiv.textContent = message;
        this.statusDiv.className = 'status ' + type;
        setTimeout(() => {
            this.statusDiv.style.display = 'none';
        }, 3000);
    }
}

// Initialize options controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OptionsController();
}); 