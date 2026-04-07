const repo = require('../../repositories/settings.repository');
const { ok } = require('../../utils/http');

async function getSettings(req, res, next) {
  try {
    const data = await repo.getSettings(req.auth.userId);
    return ok(res, data || {});
  } catch (error) {
    return next(error);
  }
}

async function upsertSettings(req, res, next) {
  try {
    const data = await repo.saveSettings(req.auth.userId, req.body);
    return ok(res, data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getSettings,
  upsertSettings
};
