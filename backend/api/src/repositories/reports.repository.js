const ReportModel = require('../models/report.model');

function normalizeReport(document) {
  if (!document) {
    return null;
  }

  return {
    ...document,
    id: document.reportId
  };
}

async function listReports(userId) {
  const reports = await ReportModel.find({ userId }).sort({ createdAt: -1 }).lean();
  return reports.map(normalizeReport);
}

async function getReportById(reportId) {
  const report = await ReportModel.findOne({ reportId }).lean();
  return normalizeReport(report);
}

async function createReport(userId, payload) {
  const record = await ReportModel.create({ userId, ...payload });
  return normalizeReport(record.toObject());
}

module.exports = {
  listReports,
  getReportById,
  createReport
};
