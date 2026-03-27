const ProfilesModel = require('../models/profiles.model');

async function getProfiles(userId) {
  return ProfilesModel.findOne({ userId }).lean();
}

async function saveProfiles(userId, payload) {
  return ProfilesModel.findOneAndUpdate(
    { userId },
    {
      userId,
      ...payload
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
}

module.exports = {
  getProfiles,
  saveProfiles
};
