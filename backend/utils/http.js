function ok(res, data, meta = {}) {
  return res.status(200).json({
    success: true,
    data,
    meta
  });
}

function created(res, data, meta = {}) {
  return res.status(201).json({
    success: true,
    data,
    meta
  });
}

function fail(res, status, message, details = undefined) {
  return res.status(status).json({
    success: false,
    error: {
      message,
      details
    }
  });
}

module.exports = {
  ok,
  created,
  fail
};
