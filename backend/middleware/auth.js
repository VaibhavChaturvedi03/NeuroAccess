const authMode = process.env.AUTH_MODE || 'anonymous';
const apiToken = process.env.API_TOKEN || '';

function authMiddleware(req, res, next) {
  if (authMode === 'anonymous') {
    req.auth = {
      mode: 'anonymous',
      userId: req.headers['x-session-id'] || 'anonymous'
    };
    return next();
  }

  const token = req.headers.authorization?.replace('Bearer ', '').trim();
  if (!token || token !== apiToken) {
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
