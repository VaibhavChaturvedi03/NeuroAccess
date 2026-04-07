const { z } = require('zod');

const siteOverridesSchema = z.object({
  site: z.string().min(1),
  overrides: z.record(z.string(), z.any())
});

module.exports = {
  siteOverridesSchema
};
