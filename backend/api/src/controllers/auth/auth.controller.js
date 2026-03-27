const env = require('../../config/env');
const { created, ok } = require('../../utils/http');
const { createId } = require('../../utils/ids');

function createSession(_req, res) {
  if (env.authMode === 'token') {
    return ok(res, {
      authMode: 'token',
      message: 'Token auth enabled. Send Authorization: Bearer <API_TOKEN>.'
    });
  }

  return created(res, {
    authMode: 'anonymous',
    sessionId: createId('sess')
  });
}

module.exports = {
  createSession
};
