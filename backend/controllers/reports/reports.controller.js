const repo = require('../../repositories/reports.repository');
const { created, fail, ok } = require('../../utils/http');

async function listReports(req, res, next) {
  try {
    const data = await repo.listReports(req.auth.userId);
    return ok(res, data);
  } catch (error) {
    return next(error);
  }
}

async function getReport(req, res, next) {
  try {
    const data = await repo.getReportById(req.params.reportId);
    if (!data || data.userId !== req.auth.userId) {
      return fail(res, 404, 'Report not found');
    }

    return ok(res, data);
  } catch (error) {
    return next(error);
  }
}

async function createReport(req, res, next) {
  try {
    const data = await repo.createReport(req.auth.userId, req.body);
    return created(res, data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listReports,
  getReport,
  createReport
};
