// Simple HTTPS proxy for local development
// Requires: npm install http-proxy-middleware express https

const fs = require('fs');
const https = require('https');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Path to your local cert and key (generate with mkcert or openssl)
const SSL_KEY = './localhost-key.pem';
const SSL_CERT = './localhost.pem';

const app = express();

// Proxy all requests to your Next.js HTTP server (default: 3000)
app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true,
    secure: false,
  })
);

const httpsOptions = {
  key: fs.readFileSync(SSL_KEY),
  cert: fs.readFileSync(SSL_CERT),
};

https.createServer(httpsOptions, app).listen(3001, () => {
  console.log('HTTPS proxy running at https://localhost:3001');
  console.log('Proxying to http://localhost:3000');
});
