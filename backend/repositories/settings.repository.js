const SettingsModel = require('../models/settings.model');

async function getSettings(userId) {
  return SettingsModel.findOne({ userId }).lean();
}

async function saveSettings(userId, settings) {
  const updated = await SettingsModel.findOneAndUpdate(
    { userId },
    {
      userId,
      ...settings
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  return {
    ...settings,
    updatedAt: updated.updatedAt
  };
}

module.exports = {
  getSettings,
  saveSettings
};
