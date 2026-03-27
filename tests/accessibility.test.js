import { AccessibilityController } from '../content.js';

describe('AccessibilityController', () => {
  let controller;
  let mockDocument;

  beforeEach(() => {
    mockDocument = {
      querySelectorAll: jest.fn(),
      createElement: jest.fn(),
      body: {
        appendChild: jest.fn(),
      },
    };

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
      const mockImage = {
        alt: '',
        src: 'test.jpg',
        setAttribute: jest.fn(),
      };

      mockDocument.querySelectorAll.mockReturnValue([mockImage]);

      await controller.processImages();

      expect(mockImage.setAttribute).toHaveBeenCalledWith('alt', expect.any(String));
    });

    it('should not modify images with existing alt text', async () => {
      const mockImage = {
        alt: 'Existing alt text',
        src: 'test.jpg',
        setAttribute: jest.fn(),
      };

      mockDocument.querySelectorAll.mockReturnValue([mockImage]);

      await controller.processImages();

      expect(mockImage.setAttribute).not.toHaveBeenCalled();
    });
  });

  describe('adjustColorContrast', () => {
    it('should adjust text color for low contrast elements', () => {
      const mockElement = {
        style: {
          color: 'rgb(200, 200, 200)',
          backgroundColor: 'rgb(255, 255, 255)',
        },
      };

      mockDocument.querySelectorAll.mockReturnValue([mockElement]);

      controller.adjustColorContrast();

      expect(mockElement.style.color).not.toBe('rgb(200, 200, 200)');
    });

    it('should not modify elements with sufficient contrast', () => {
      const mockElement = {
        style: {
          color: 'rgb(0, 0, 0)',
          backgroundColor: 'rgb(255, 255, 255)',
        },
      };

      mockDocument.querySelectorAll.mockReturnValue([mockElement]);

      controller.adjustColorContrast();

      expect(mockElement.style.color).toBe('rgb(0, 0, 0)');
    });
  });

  describe('handleVoiceCommand', () => {
    it('should handle scroll commands', () => {
      const mockWindow = {
        scrollBy: jest.fn(),
      };

      global.window = mockWindow;

      controller.handleVoiceCommand('scroll down');

      expect(mockWindow.scrollBy).toHaveBeenCalledWith(0, expect.any(Number));
    });

    it('should handle zoom commands', () => {
      const mockDocument = {
        body: {
          style: {
            zoom: '1',
          },
        },
      };

      global.document = mockDocument;

      controller.handleVoiceCommand('zoom in');

      expect(mockDocument.body.style.zoom).toBe('1.1');
    });

    it('should handle navigation commands', () => {
      const mockLink = {
        click: jest.fn(),
      };

      mockDocument.querySelector.mockReturnValue(mockLink);

      controller.handleVoiceCommand('go to about');

      expect(mockLink.click).toHaveBeenCalled();
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
