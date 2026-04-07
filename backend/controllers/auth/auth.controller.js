const { created, ok } = require('../../utils/http');
const { createId } = require('../../utils/ids');

const authMode = process.env.AUTH_MODE || 'anonymous';

function createSession(_req, res) {
  if (authMode === 'token') {
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
