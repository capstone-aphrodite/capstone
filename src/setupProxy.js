const { createProxyMiddleware } = require('http-proxy-middleware');

// This proxy redirects requests to /api endpoints to
// the Express server running on port 4000.
module.exports = function (app) {
  app.use(
    ['/api', '/auth'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
    })
  );
};
