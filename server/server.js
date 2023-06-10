const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy middleware options
const options = {
  target: 'https://api.replicate.com', // target API server
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/api': '/v1', // rewrite path
  },
  headers: {
    'Access-Control-Allow-Origin': '*', // allow all origins
  },
};

// Create the proxy middleware using the options
const proxy = createProxyMiddleware(options);

// Set up the middleware chain
app.use('/api', proxy);

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});