const notFound = (request, response) => {
  response.status(404).json({ status: 404, message: `Route not found: ${request.method} ${request.originalUrl}` });
};

export default notFound;
