const { getProviderStatus } = require('./provider-registry');

async function proxyRequest({ provider, task, payload, requestId }) {
  const status = getProviderStatus(provider);

  if (!status.enabled) {
    return {
      provider,
      task,
      mode: 'disabled',
      message: status.reason,
      requestId
    };
  }

  return {
    provider,
    task,
    mode: 'enabled',
    requestId,
    message: 'Provider is configured. Integrate real upstream call here.',
    payloadPreview: payload
  };
}

module.exports = {
  proxyRequest
};
