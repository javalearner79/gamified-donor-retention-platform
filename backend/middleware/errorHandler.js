const errorHandler = (error, _request, response, _next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({
      status: 400,
      message: 'Validation failed.',
      errors: Object.values(error.errors).map(({ message }) => message),
    });
  }

  if (error.code === 11000) {
    return response.status(409).json({ status: 409, message: 'A donor with that email already exists.' });
  }

  if (error.name === 'CastError') {
    return response.status(400).json({ status: 400, message: `Invalid ${error.path}.` });
  }

  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) console.error(error);

  return response.status(statusCode).json({
    status: statusCode,
    message: statusCode >= 500 ? 'An unexpected server error occurred.' : error.message,
  });
};

export default errorHandler;
