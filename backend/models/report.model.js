const mongoose = require('mongoose');
const { createId } = require('../utils/ids');

const reportSchema = new mongoose.Schema(
  {
    reportId: { type: String, required: true, unique: true, index: true, default: () => createId('report') },
    userId: { type: String, required: true, index: true },
    pageUrl: { type: String, required: true },
    score: { type: Number, required: true },
    issueCount: { type: Number, required: true },
    fixedCount: { type: Number, required: true },
    details: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
