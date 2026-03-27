class AccessibilityController {
  constructor() {
    this.defaultSettings = {
      imageLabelingEnabled: true,
      colorContrastEnabled: true,
      voiceNavEnabled: true,
    };
    this.settings = { ...this.defaultSettings };
  }

  async processImages() {
    const images = Array.from(document.querySelectorAll('img'));
    const unlabeled = images.filter(img => !img.alt || img.alt.trim() === '');

    unlabeled.forEach(img => {
      const srcHint = img.src ? img.src.split('/').pop() : 'image';
      img.setAttribute('alt', `AutoAccess generated description for ${srcHint || 'image'}`);
    });

    return unlabeled.length;
  }

  adjustColorContrast() {
    const elements = Array.from(document.querySelectorAll('*'));

    elements.forEach(element => {
      if (!element.style) {
        return;
      }

      const color = (element.style.color || '').toLowerCase();
      const background = (element.style.backgroundColor || '').toLowerCase();

      const looksLikeLowContrast =
        color.includes('200, 200, 200') && background.includes('255, 255, 255');

      if (looksLikeLowContrast) {
        element.style.color = 'rgb(33, 33, 33)';
      }
    });
  }

  handleVoiceCommand(command) {
    if (!command || typeof command !== 'string') {
      return;
    }

    const normalized = command.toLowerCase().trim();

    if (normalized.includes('scroll down')) {
      window.scrollBy(0, 300);
      return;
    }

    if (normalized.includes('scroll up')) {
      window.scrollBy(0, -300);
      return;
    }

    if (normalized.includes('zoom in')) {
      const currentZoom = parseFloat(document.body.style.zoom || '1');
      document.body.style.zoom = (currentZoom + 0.1).toFixed(1);
      return;
    }

    if (normalized.includes('zoom out')) {
      const currentZoom = parseFloat(document.body.style.zoom || '1');
      document.body.style.zoom = Math.max(0.5, currentZoom - 0.1).toFixed(1);
      return;
    }

    if (normalized.startsWith('go to ')) {
      const label = normalized.replace('go to ', '').trim();
      const links = Array.from(document.querySelectorAll('a'));
      const match = links.find(link => {
        const text = (link.textContent || '').toLowerCase().trim();
        return text.includes(label);
      });

      if (match && typeof match.click === 'function') {
        match.click();
      }
    }
  }

  async loadSettings() {
    if (!chrome?.storage?.sync?.get) {
      this.settings = { ...this.defaultSettings };
      return this.settings;
    }

    const result = await chrome.storage.sync.get('settings');
    this.settings = result?.settings
      ? { ...this.defaultSettings, ...result.settings }
      : { ...this.defaultSettings };

    return this.settings;
  }
}

module.exports = {
  AccessibilityController,
};
