const express = require('express');
const client = require('prom-client');

const app = express();

client.collectDefaultMetrics();

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DevOps CI/CD Dashboard</title>

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #0f172a, #1e293b, #111827);
        color: white;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }

      .container {
        width: 90%;
        max-width: 1100px;
        padding: 40px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(12px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        text-align: center;
      }

      h1 {
        font-size: 52px;
        margin-bottom: 15px;
        color: #38bdf8;
      }

      .subtitle {
        font-size: 20px;
        color: #cbd5e1;
        margin-bottom: 40px;
      }

      .status {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 999px;
        background: rgba(34, 197, 94, 0.2);
        color: #22c55e;
        border: 1px solid #22c55e;
        margin-bottom: 35px;
        font-weight: bold;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }

      .card {
        background: rgba(255,255,255,0.08);
        border-radius: 18px;
        padding: 25px;
        transition: 0.3s ease;
        border: 1px solid rgba(255,255,255,0.08);
      }

      .card:hover {
        transform: translateY(-6px);
        background: rgba(255,255,255,0.12);
      }

      .icon {
        font-size: 40px;
        margin-bottom: 15px;
      }

      .card h3 {
        margin-bottom: 10px;
        color: #38bdf8;
      }

      .footer {
        margin-top: 40px;
        color: #94a3b8;
        font-size: 15px;
      }

      .highlight {
        color: #38bdf8;
        font-weight: bold;
      }
    </style>
  </head>

  <body>

    <div class="container">

      <div class="status">
        ✅ DEPLOYMENT ACTIVE
      </div>

      <h1>🚀 DevOps CI/CD Pipeline</h1>

      <p class="subtitle">
        Automated deployment pipeline using Jenkins, Docker, Kubernetes,
        Prometheus & Grafana
      </p>

      <div class="grid">

        <div class="card">
          <div class="icon">⚡</div>
          <h3>Jenkins CI/CD</h3>
          <p>Automated build & deployment pipeline integrated with GitHub Webhooks.</p>
        </div>

        <div class="card">
          <div class="icon">🐳</div>
          <h3>Docker</h3>
          <p>Containerized Node.js application deployed seamlessly on AWS EC2.</p>
        </div>

        <div class="card">
          <div class="icon">☸️</div>
          <h3>Kubernetes</h3>
          <p>Deployment and scaling managed through Kubernetes orchestration.</p>
        </div>

        <div class="card">
          <div class="icon">📊</div>
          <h3>Monitoring</h3>
          <p>Real-time monitoring using Prometheus metrics and Grafana dashboards.</p>
        </div>

      </div>

      <div class="footer">
        Built & Deployed by <span class="highlight">Samiksha Kamble</span>
      </div>

    </div>

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
