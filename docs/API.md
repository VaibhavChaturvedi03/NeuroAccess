# NeuroAccess API Documentation

## Overview

NeuroAccess provides a comprehensive API for enhancing web accessibility through AI-powered features. This documentation covers the main components and their usage.

## Core Components

### AccessibilityController

The main controller class that manages accessibility features.

```javascript
import { AccessibilityController } from './content.js';

const controller = new AccessibilityController();
```

#### Methods

##### `initialize()`
Initializes the controller and sets up event listeners.

```javascript
await controller.initialize();
```

##### `processImages()`
Processes images on the page and adds alt text.

```javascript
await controller.processImages();
```

##### `adjustColorContrast()`
Adjusts color contrast to meet WCAG standards.

```javascript
controller.adjustColorContrast();
```

##### `handleVoiceCommand(command)`
Handles voice commands for navigation.

```javascript
controller.handleVoiceCommand('scroll down');
```

### PaymentProcessor

Manages subscription and payment processing.

```javascript
import { PaymentProcessor } from './payment.js';

const processor = new PaymentProcessor();
```

#### Methods

##### `initialize()`
Initializes the payment processor.

```javascript
await processor.initialize();
```

##### `subscribe(planId)`
Subscribes to a premium plan.

```javascript
await processor.subscribe('monthly');
```

##### `cancelSubscription()`
Cancels the current subscription.

```javascript
await processor.cancelSubscription();
```

### OptionsController

Manages extension settings and configuration.

```javascript
import { OptionsController } from './options.js';

const options = new OptionsController();
```

#### Methods

##### `loadSettings()`
Loads saved settings.

```javascript
await options.loadSettings();
```

##### `saveSettings(settings)`
Saves new settings.

```javascript
await options.saveSettings({
  imageLabelingEnabled: true,
  colorContrastEnabled: true
});
```

## Configuration

### Settings Object

```javascript
{
  visionApiKey: string,
  visionEndpoint: string,
  imageLabelingEnabled: boolean,
  confidenceThreshold: number,
  colorContrastEnabled: boolean,
  wcagLevel: 'AA' | 'AAA',
  voiceNavEnabled: boolean,
  voiceLanguage: string,
  batchSize: number,
  debounceDelay: number
}
```

### Voice Commands

#### Navigation
- "Scroll up/down"
- "Zoom in/out"
- "Go to [link text]"
- "Read this"
- "Focus [element]"

#### Actions
- "Click [element]"
- "Select [text]"
- "Copy [text]"
- "Paste"
- "Back/Forward"

## Events

### Message Events

The extension uses Chrome's messaging system for communication between components.

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'settingsUpdated') {
    // Handle settings update
  }
});
```

### Storage Events

Settings are stored in Chrome's sync storage.

```javascript
chrome.storage.sync.get('settings', (result) => {
  const settings = result.settings;
  // Use settings
});
```

## Error Handling

All methods return Promises and can be caught using try/catch.

```javascript
try {
  await controller.processImages();
} catch (error) {
  console.error('Error processing images:', error);
}
```

## Premium Features

### Free Plan
- Basic image labeling
- Standard color contrast
- Limited voice commands

### Monthly Plan ($9.99/month)
- Advanced image labeling
- Custom color schemes
- Unlimited voice commands
- Priority support

### Yearly Plan ($99.99/year)
- All monthly features
- Early access to new features
- 2 months free
- Dedicated support

## Best Practices

1. Always check subscription status before using premium features
2. Handle errors gracefully
3. Use appropriate WCAG levels for color contrast
4. Cache image descriptions for better performance
5. Implement proper error boundaries

## Security

1. API keys should be stored securely
2. Use HTTPS for all API calls
3. Validate user input
4. Implement rate limiting
5. Follow Chrome Web Store security guidelines

## Performance

1. Use batch processing for images
2. Implement debouncing for frequent operations
3. Cache results when possible
4. Use web workers for heavy computations
5. Optimize bundle size

## Browser Support

- Chrome 88+
- Edge 88+
- Opera 74+
- Brave 1.0+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests
4. Submit a pull request

## Support

For support, please:
1. Check the documentation
2. Open an issue on GitHub
3. Contact support@neuroaccess.com 