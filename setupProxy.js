const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pokemon-backend.herokuapp.com/pokemon',
      changeOrigin: true,
    })
  );
};
