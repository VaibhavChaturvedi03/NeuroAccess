const env = require('../config/env');

function authMiddleware(req, res, next) {
  if (env.authMode === 'anonymous') {
    req.auth = {
      mode: 'anonymous',
      userId: req.headers['x-session-id'] || 'anonymous'
    };
    return next();
  }

  const token = req.headers.authorization?.replace('Bearer ', '').trim();
  if (!token || token !== env.apiToken) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Unauthorized'
      }
    });
  }

  req.auth = {
    mode: 'token',
    userId: req.headers['x-user-id'] || 'token-user'
  };

  return next();
}

module.exports = authMiddleware;
