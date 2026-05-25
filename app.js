const express = require('express');
const client = require('prom-client');

const app = express();

client.collectDefaultMetrics();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Node.js CI/CD Pipeline</title>
      </head>
      <body style="font-family: Arial; text-align:center; padding-top:50px;">
        <h1>🚀 Node.js CI/CD Pipeline Running</h1>
        <h2>Deployed by Samiksha kamble</h2>
        <p>Jenkins + Docker + Kubernetes + Prometheus</p>
      </body>
    </html>
  `);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
