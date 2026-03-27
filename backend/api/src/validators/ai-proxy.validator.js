const { z } = require('zod');

const aiProxySchema = z.object({
  provider: z.enum(['openai', 'huggingface', 'assemblyai', 'elevenlabs']),
  task: z.enum(['chat', 'summarize', 'caption', 'tts', 'stt']),
  payload: z.record(z.string(), z.any())
});

module.exports = {
  aiProxySchema
};
