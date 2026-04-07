const { createId } = require('../utils/ids');

function requestContext(req, res, next) {
  req.context = {
    requestId: req.headers['x-request-id'] || createId('req'),
    startedAt: Date.now()
  };

  res.setHeader('x-request-id', req.context.requestId);
  next();
}

module.exports = requestContext;
