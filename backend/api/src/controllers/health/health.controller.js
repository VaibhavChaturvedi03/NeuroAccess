const { ok } = require('../../utils/http');

function liveness(_req, res) {
  return ok(res, { status: 'live' });
}

function readiness(_req, res) {
  return ok(res, {
    status: 'ready',
    service: 'neuroaccess-backend-api',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  liveness,
  readiness
};
