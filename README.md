#  Node.js CI/CD Pipeline Project

## Project Overview

This project demonstrates a complete DevOps CI/CD pipeline using:

- Git & GitHub
- Jenkins
- Docker
- DockerHub
- Kubernetes
- Prometheus
- Grafana
- AWS EC2
- Custom Domain

The pipeline automatically:
- Pulls code from GitHub
- Builds Docker image
- Runs tests
- Pushes image to DockerHub
- Deploys application automatically
- Monitors application metrics

---

#  Live Application

http://samikshadevops.online

---

#   Tech Stack

| Tool | Purpose |
|------|----------|
| GitHub | Source Code Management |
| Jenkins | CI/CD Automation |
| Docker | Containerization |
| Kubernetes | Container Orchestration |
| Prometheus | Monitoring |
| Grafana | Visualization Dashboard |
| AWS EC2 | Cloud Hosting |
| Node.js | Backend Runtime |

---

#  CI/CD Pipeline Flow

```text
Developer Push Code
        ↓
GitHub Repository
        ↓
GitHub Webhook
        ↓
Jenkins Pipeline
        ↓
Docker Build
        ↓
DockerHub Push
        ↓
Deployment
        ↓
Monitoring with Prometheus & Grafana
```

---

#  Project Structure

```text
nodejs-cicd-pipeline/
│
├── Dockerfile
├── Jenkinsfile
├── app.js
├── package.json
├── deployment.yaml
├── service.yaml
├── README.md
└── screenshots/
```

---

# Docker Setup

Build image:

```bash
docker build -t samikshakamble39/nodejs-cicd .
```

Run container:

```bash
docker run -d -p 80:3000 samikshakamble39/nodejs-cicd
```

---

#  Kubernetes Deployment

Deploy application:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Check resources:

```bash
kubectl get pods
kubectl get svc
```

---

#  Monitoring Setup

## Prometheus

Access:

```text
http://YOUR_EC2_IP:9090
```

## Grafana

Access:

```text
http://YOUR_EC2_IP:3001
```

Default credentials:

```text
Username: admin
Password: admin
```

---

#  Screenshots

## GitHub Repository

![GitHub Repo](screenshots/github-repo.png)

---

## Jenkins Pipeline Success

![Jenkins Success](screenshots/jenkins-success.png)

---

## Jenkins Console Output

![Jenkins Console](screenshots/jenkins-console.png)

---

## Docker Containers

![Docker Containers](screenshots/docker-containers.png)

---

## Kubernetes Pods

![Kubernetes Pods](screenshots/k8s-pods.png)

---

## Kubernetes Services

![Kubernetes Services](screenshots/k8s-services.png)

---

## Application Dashboard

![Application UI](screenshots/app-dashboard.png)

---

## Prometheus Dashboard

![Prometheus](screenshots/prometheus-dashboard.png)

---

## Grafana Dashboard

![Grafana](screenshots/grafana-dashboard.png)

---

# 👩‍💻 Author

Samiksha Kamble
