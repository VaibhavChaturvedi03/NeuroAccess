const SiteOverrideModel = require('../models/site-override.model');

async function getOverride(userId, site) {
  return SiteOverrideModel.findOne({ userId, site }).lean();
}

async function upsertOverride(userId, site, payload) {
  return SiteOverrideModel.findOneAndUpdate(
    { userId, site },
    {
      userId,
      site,
      overrides: payload
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
}

module.exports = {
  getOverride,
  upsertOverride
};
