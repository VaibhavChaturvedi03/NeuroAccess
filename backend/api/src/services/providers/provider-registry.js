const env = require('../../config/env');

const providerConfig = {
  openai: {
    enabled: Boolean(env.openAiApiKey),
    reason: env.openAiApiKey ? '' : 'OPENAI_API_KEY is not configured'
  },
  huggingface: {
    enabled: Boolean(env.huggingFaceApiKey),
    reason: env.huggingFaceApiKey ? '' : 'HUGGINGFACE_API_KEY is not configured'
  },
  assemblyai: {
    enabled: Boolean(env.assemblyAiApiKey),
    reason: env.assemblyAiApiKey ? '' : 'ASSEMBLYAI_API_KEY is not configured'
  },
  elevenlabs: {
    enabled: Boolean(env.elevenLabsApiKey),
    reason: env.elevenLabsApiKey ? '' : 'ELEVENLABS_API_KEY is not configured'
  }
};

function getProviderStatus(provider) {
  return providerConfig[provider] || { enabled: false, reason: 'Unknown provider' };
}

module.exports = {
  getProviderStatus
};
