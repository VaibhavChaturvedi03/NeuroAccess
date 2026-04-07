const repo = require('../../repositories/site-overrides.repository');
const { ok } = require('../../utils/http');

async function getSiteOverride(req, res, next) {
  try {
    const site = req.query.site;
    const data = await repo.getOverride(req.auth.userId, site);
    return ok(res, data || {});
  } catch (error) {
    return next(error);
  }
}

async function upsertSiteOverride(req, res, next) {
  try {
    const data = await repo.upsertOverride(req.auth.userId, req.body.site, req.body.overrides);
    return ok(res, data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getSiteOverride,
  upsertSiteOverride
};
