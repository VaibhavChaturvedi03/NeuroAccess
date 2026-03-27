function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal server error',
      requestId: req.context?.requestId
    }
  });
}

module.exports = errorHandler;
