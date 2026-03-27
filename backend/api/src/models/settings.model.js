const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    profile: { type: String, required: true },
    features: { type: mongoose.Schema.Types.Mixed, default: {} },
    preferences: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
