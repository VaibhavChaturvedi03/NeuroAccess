import config from './config.js';
import paymentProcessor from './payment.js';

class PopupController {
    constructor() {
        this.initializeElements();
        this.loadSettings();
        this.attachEventListeners();
        this.checkSubscriptionStatus();
    }

    initializeElements() {
        // Feature toggles
        this.imageLabelingToggle = document.getElementById('imageLabeling');
        this.colorContrastToggle = document.getElementById('colorContrast');
        this.voiceNavToggle = document.getElementById('voiceNav');

        // Buttons
        this.upgradeButton = document.getElementById('upgradeButton');
        this.settingsButton = document.getElementById('settingsButton');

        // Status
        this.statusElement = document.getElementById('status');
    }

    async loadSettings() {
        const settings = await this.getSettings();
        
        // Set toggle states
        this.imageLabelingToggle.checked = settings.imageLabeling;
        this.colorContrastToggle.checked = settings.colorContrast;
        this.voiceNavToggle.checked = settings.voiceNav;
    }

    async getSettings() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['settings'], (result) => {
                resolve(result.settings || {
                    imageLabeling: true,
                    colorContrast: true,
                    voiceNav: true
                });
            });
        });
    }

    async saveSettings(settings) {
        return new Promise((resolve) => {
            chrome.storage.sync.set({ settings }, resolve);
        });
    }

    attachEventListeners() {
        // Feature toggle listeners
        this.imageLabelingToggle.addEventListener('change', () => this.handleFeatureToggle('imageLabeling'));
        this.colorContrastToggle.addEventListener('change', () => this.handleFeatureToggle('colorContrast'));
        this.voiceNavToggle.addEventListener('change', () => this.handleFeatureToggle('voiceNav'));

        // Button listeners
        this.upgradeButton.addEventListener('click', () => this.handleUpgrade());
        this.settingsButton.addEventListener('click', () => this.handleSettings());
    }

    async handleFeatureToggle(feature) {
        const settings = await this.getSettings();
        settings[feature] = this[`${feature}Toggle`].checked;
        await this.saveSettings(settings);

        // Notify content script
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updateSettings',
                settings
            });
        });
    }

    async handleUpgrade() {
        chrome.tabs.create({ url: 'pricing.html' });
    }

    handleSettings() {
        chrome.runtime.openOptionsPage();
    }

    async checkSubscriptionStatus() {
        const subscription = await paymentProcessor.loadSubscription();
        if (subscription) {
            this.statusElement.textContent = 'Premium';
            this.statusElement.classList.add('premium');
            this.upgradeButton.textContent = 'Manage Subscription';
        }
    }
}

// Initialize popup controller
const popupController = new PopupController(); 