const openAiApiKey = process.env.OPENAI_API_KEY || '';
const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY || '';
const assemblyAiApiKey = process.env.ASSEMBLYAI_API_KEY || '';
const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY || '';

const providerConfig = {
  openai: {
    enabled: Boolean(openAiApiKey),
    reason: openAiApiKey ? '' : 'OPENAI_API_KEY is not configured'
  },
  huggingface: {
    enabled: Boolean(huggingFaceApiKey),
    reason: huggingFaceApiKey ? '' : 'HUGGINGFACE_API_KEY is not configured'
  },
  assemblyai: {
    enabled: Boolean(assemblyAiApiKey),
    reason: assemblyAiApiKey ? '' : 'ASSEMBLYAI_API_KEY is not configured'
  },
  elevenlabs: {
    enabled: Boolean(elevenLabsApiKey),
    reason: elevenLabsApiKey ? '' : 'ELEVENLABS_API_KEY is not configured'
  }
};

function getProviderStatus(provider) {
  return providerConfig[provider] || { enabled: false, reason: 'Unknown provider' };
}

module.exports = {
  getProviderStatus
};
