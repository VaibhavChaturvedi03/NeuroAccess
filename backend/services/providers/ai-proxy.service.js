const { getProviderStatus } = require('./provider-registry');

const defaultAiServiceUrl = 'https://neuroaccessai.onrender.com';
const aiServiceTimeoutMs = Number(process.env.AI_SERVICE_TIMEOUT_MS || 45000);

function toHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function callLocalAi({ task, payload, requestId }) {
  const baseUrl = process.env.AI_SERVICE_URL || defaultAiServiceUrl;
  const endpoint = `${baseUrl.replace(/\/$/, '')}/api/v1/process`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), aiServiceTimeoutMs);

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-request-id': requestId
      },
      body: JSON.stringify({
        task,
        imageBase64: payload.imageBase64,
        text: payload.text
      }),
      signal: controller.signal
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw toHttpError(504, 'AI service timed out. Please retry.');
    }

    throw toHttpError(502, 'Unable to reach AI service. Please retry.');
  } finally {
    clearTimeout(timeout);
  }

  const body = await response.json().catch(() => ({}));

  if (!response.ok || body.success === false) {
    throw toHttpError(
      502,
      body?.error?.message || `Local AI service returned HTTP ${response.status}`
    );
  }

  return {
    provider: 'localai',
    task,
    mode: 'enabled',
    requestId,
    ...body.data
  };
}

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

  if (provider === 'localai') {
    return callLocalAi({ task, payload, requestId });
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
