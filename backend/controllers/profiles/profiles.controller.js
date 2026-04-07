const repo = require('../../repositories/profiles.repository');
const { ok } = require('../../utils/http');

async function getProfiles(req, res, next) {
  try {
    const data = await repo.getProfiles(req.auth.userId);
    return ok(res, data || {});
  } catch (error) {
    return next(error);
  }
}

async function upsertProfiles(req, res, next) {
  try {
    const data = await repo.saveProfiles(req.auth.userId, req.body);
    return ok(res, data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProfiles,
  upsertProfiles
};
