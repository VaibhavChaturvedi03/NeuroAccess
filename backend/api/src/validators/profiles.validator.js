const { z } = require('zod');

const profilesSchema = z.object({
  activeProfile: z.enum(['Default', 'Blind', 'Low Vision', 'Dyslexic']),
  customProfiles: z.array(
    z.object({
      name: z.string().min(1),
      config: z.record(z.string(), z.any())
    })
  ).optional()
});

module.exports = {
  profilesSchema
};
