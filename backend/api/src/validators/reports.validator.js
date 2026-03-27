const { z } = require('zod');

const reportSchema = z.object({
  pageUrl: z.string().url(),
  score: z.number().min(0).max(100),
  issueCount: z.number().int().min(0),
  fixedCount: z.number().int().min(0),
  details: z.record(z.string(), z.any()).optional()
});

module.exports = {
  reportSchema
};
