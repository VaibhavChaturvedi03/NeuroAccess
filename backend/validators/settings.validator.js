const { z } = require('zod');

const settingsSchema = z.object({
  profile: z.string().min(1),
  features: z.object({
    globalMode: z.boolean().optional(),
    tts: z.boolean().optional(),
    stt: z.boolean().optional(),
    contrastFixer: z.boolean().optional(),
    imageLabeling: z.boolean().optional(),
    dyslexiaMode: z.boolean().optional()
  }),
  preferences: z.record(z.string(), z.any()).optional()
});

module.exports = {
  settingsSchema
};
