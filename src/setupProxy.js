const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pokemon-fightgrp3.herokuapp.com',
      changeOrigin: true,
    })
  );
};
