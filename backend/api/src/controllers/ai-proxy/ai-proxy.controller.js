const { ok } = require('../../utils/http');
const aiProxyService = require('../../services/providers/ai-proxy.service');

async function proxy(req, res, next) {
  try {
    const data = await aiProxyService.proxyRequest({
      provider: req.body.provider,
      task: req.body.task,
      payload: req.body.payload,
      requestId: req.context.requestId
    });

    return ok(res, data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  proxy
};
