const mongoose = require('mongoose');

const siteOverrideSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    site: { type: String, required: true, index: true },
    overrides: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

siteOverrideSchema.index({ userId: 1, site: 1 }, { unique: true });

module.exports = mongoose.model('SiteOverride', siteOverrideSchema);
