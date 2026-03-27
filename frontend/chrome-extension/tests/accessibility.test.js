const { AccessibilityController } = require('../src/accessibility-controller.js');

describe('AccessibilityController', () => {
  let controller;

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.zoom = '1';
    Object.defineProperty(window, 'scrollBy', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });

    global.chrome = {
      storage: {
        sync: {
          get: jest.fn(),
          set: jest.fn(),
        },
      },
      runtime: {
        sendMessage: jest.fn(),
      },
    };

    controller = new AccessibilityController();
  });

  describe('processImages', () => {
    it('should add alt text to images without alt attribute', async () => {
      document.body.innerHTML = '<img src="test.jpg" alt="" />';
      const image = document.querySelector('img');

      await controller.processImages();

      expect(image.getAttribute('alt')).toContain('AutoAccess generated description');
    });

    it('should not modify images with existing alt text', async () => {
      document.body.innerHTML = '<img src="test.jpg" alt="Existing alt text" />';
      const image = document.querySelector('img');

      await controller.processImages();

      expect(image.getAttribute('alt')).toBe('Existing alt text');
    });
  });

  describe('adjustColorContrast', () => {
    it('should adjust text color for low contrast elements', () => {
      const el = document.createElement('div');
      el.style.color = 'rgb(200, 200, 200)';
      el.style.backgroundColor = 'rgb(255, 255, 255)';
      document.body.appendChild(el);

      controller.adjustColorContrast();

      expect(el.style.color).toBe('rgb(33, 33, 33)');
    });

    it('should not modify elements with sufficient contrast', () => {
      const el = document.createElement('div');
      el.style.color = 'rgb(0, 0, 0)';
      el.style.backgroundColor = 'rgb(255, 255, 255)';
      document.body.appendChild(el);

      controller.adjustColorContrast();

      expect(el.style.color).toBe('rgb(0, 0, 0)');
    });
  });

  describe('handleVoiceCommand', () => {
    it('should handle scroll commands', () => {
      controller.handleVoiceCommand('scroll down');

      expect(window.scrollBy).toHaveBeenCalledWith(0, expect.any(Number));
    });

    it('should handle zoom commands', () => {
      controller.handleVoiceCommand('zoom in');

      expect(document.body.style.zoom).toBe('1.1');
    });

    it('should handle navigation commands', () => {
      document.body.innerHTML = '<a href="#" id="about">About Us</a>';
      const link = document.getElementById('about');
      link.click = jest.fn();

      controller.handleVoiceCommand('go to about');

      expect(link.click).toHaveBeenCalled();
    });
  });

  describe('loadSettings', () => {
    it('should load settings from chrome storage', async () => {
      const mockSettings = {
        imageLabelingEnabled: true,
        colorContrastEnabled: true,
        voiceNavEnabled: true,
      };

      chrome.storage.sync.get.mockResolvedValue({ settings: mockSettings });

      await controller.loadSettings();

      expect(controller.settings).toEqual(mockSettings);
    });

    it('should use default settings if none are stored', async () => {
      chrome.storage.sync.get.mockResolvedValue({});

      await controller.loadSettings();

      expect(controller.settings).toEqual(controller.defaultSettings);
    });
  });
});
