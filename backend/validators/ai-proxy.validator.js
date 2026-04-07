const { z } = require('zod');

const aiProxySchema = z.object({
  provider: z.enum(['openai', 'huggingface', 'assemblyai', 'elevenlabs', 'localai']),
  task: z.enum(['chat', 'summarize', 'caption', 'tts', 'stt', 'ocr', 'alt_text', 'read_aloud']),
  payload: z.record(z.string(), z.any())
});

module.exports = {
  aiProxySchema
};
