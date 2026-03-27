const mongoose = require('mongoose');

const profilesSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    activeProfile: {
      type: String,
      enum: ['Default', 'Blind', 'Low Vision', 'Dyslexic'],
      required: true
    },
    customProfiles: [
      {
        name: { type: String, required: true },
        config: { type: mongoose.Schema.Types.Mixed, default: {} }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profiles', profilesSchema);
