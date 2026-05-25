
# 🚀 DevOps CI/CD Pipeline Project

## 📌 Project Overview

This project demonstrates a complete end-to-end DevOps CI/CD pipeline using modern DevOps tools and cloud technologies.

The application is built using **Node.js** and deployed on **AWS EC2** using **Docker** and **Kubernetes**. The project also integrates **Jenkins** for CI/CD automation, **Prometheus** and **Grafana** for monitoring, and a **custom domain** configured through Hostinger DNS management.

---

# 🛠️ Technologies Used

| Tool / Technology | Purpose |
|---|---|
| Git | Version Control |
| GitHub | Source Code Repository |
| Jenkins | CI/CD Automation |
| Docker | Containerization |
| DockerHub | Docker Image Registry |
| AWS EC2 | Cloud Hosting |
| Kubernetes | Container Orchestration |
| Prometheus | Monitoring |
| Grafana | Visualization Dashboard |
| Hostinger | Domain & DNS Management |
| Node.js | Backend Application |

---

# 🏗️ CI/CD Architecture

```text
Developer Push Code
        ↓
GitHub Repository
        ↓
GitHub Webhook
        ↓
Jenkins Pipeline
        ↓
Checkout Source Code
        ↓
Build Docker Image
        ↓
Run Tests
        ↓
Push Image to DockerHub
        ↓
Deploy to EC2 / Kubernetes
        ↓
Monitoring with Prometheus & Grafana
```

---

# 📂 Project Structure

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

# 🌐 Live Application

```text
http://samikshadevops.online
```

---

# 🔗 GitHub Repository

```text
https://github.com/Samiksha-Kamble39/nodejs-cicd-pipeline
```

---

# ⚙️ Step 1: Clone Repository

```bash
git clone https://github.com/Samiksha-Kamble39/nodejs-cicd-pipeline.git

cd nodejs-cicd-pipeline
```

---

# 🚀 Step 2: Node.js Application Setup

## Install Dependencies

```bash
npm install
```

## Run Application

```bash
node app.js
```

## Access Application

```text
http://localhost:3000
```

---

# 📦 Step 3: Docker Setup

## Dockerfile

```dockerfile
FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","app.js"]
```

---

## Build Docker Image

```bash
docker build -t samikshakamble39/nodejs-cicd:latest .
```

---

## Run Docker Container

```bash
docker run -d \
--name nodejs-app \
-p 80:3000 \
samikshakamble39/nodejs-cicd:latest
```

---

# ☁️ Step 4: DockerHub Setup

## Login to DockerHub

```bash
docker login
```

---

## Push Docker Image

```bash
docker push samikshakamble39/nodejs-cicd:latest
```

---

# 🖥️ Step 5: AWS EC2 Setup

## EC2 Configuration

| Configuration | Value |
|---|---|
| OS | Ubuntu |
| Instance Type | t2.medium |

---

## Open Security Group Ports

| Port | Purpose |
|---|---|
| 22 | SSH |
| 80 | Application |
| 8080 | Jenkins |
| 9090 | Prometheus |
| 3001 | Grafana |
| 30080 | Kubernetes NodePort |

---

# 🐳 Step 6: Install Docker on EC2

```bash
sudo apt update

sudo apt install docker.io -y

sudo systemctl start docker

sudo systemctl enable docker
```

---

## Add Docker Permissions

```bash
sudo usermod -aG docker ubuntu

sudo usermod -aG docker jenkins
```

---

# ⚙️ Step 7: Install Jenkins

## Install Java

```bash
sudo apt install openjdk-21-jdk -y
```

---

## Install Jenkins

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update

sudo apt install jenkins -y
```

---

## Start Jenkins

```bash
sudo systemctl start jenkins

sudo systemctl enable jenkins
```

---

# 🔄 Step 8: Jenkins Pipeline

## Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        IMAGE_NAME = "samikshakamble39/nodejs-cicd"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Samiksha-Kamble39/nodejs-cicd-pipeline.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-creds') {
                        docker.image("${IMAGE_NAME}:latest").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop nodejs-app || true

                docker rm nodejs-app || true

                docker pull samikshakamble39/nodejs-cicd:latest

                docker run -d \
                  --name nodejs-app \
                  -p 80:3000 \
                  samikshakamble39/nodejs-cicd:latest
                '''
            }
        }
    }
}
```

---

# ☸️ Step 9: Kubernetes Setup

## Install Kubernetes

```bash
sudo swapoff -a

sudo apt update

sudo apt install -y kubelet kubeadm kubectl
```

---

## Initialize Kubernetes Cluster

```bash
sudo kubeadm init --pod-network-cidr=192.168.0.0/16
```

---

## Configure kubectl

```bash
mkdir -p $HOME/.kube

sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

---

# 🚀 Step 10: Kubernetes Deployment

## deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: nodejs-cicd

spec:
  replicas: 2

  selector:
    matchLabels:
      app: nodejs-cicd

  template:
    metadata:
      labels:
        app: nodejs-cicd

    spec:
      containers:
      - name: nodejs-cicd
        image: samikshakamble39/nodejs-cicd:latest

        ports:
        - containerPort: 3000
```

---

## service.yaml

```yaml
apiVersion: v1
kind: Service

metadata:
  name: nodejs-cicd-service

spec:
  type: NodePort

  selector:
    app: nodejs-cicd

  ports:
    - port: 80
      targetPort: 3000
      nodePort: 30080
```

---

## Deploy Kubernetes Resources

```bash
kubectl apply -f deployment.yaml

kubectl apply -f service.yaml
```

---

# 📊 Step 11: Monitoring Setup

## Prometheus

```bash
docker run -d \
--name prometheus \
-p 9090:9090 \
prom/prometheus
```

### Access Prometheus

```text
http://EC2_PUBLIC_IP:9090
```

---

## Grafana

```bash
docker run -d \
--name grafana \
-p 3001:3000 \
grafana/grafana
```

### Access Grafana

```text
http://EC2_PUBLIC_IP:3001
```

---

## Grafana Default Credentials

```text
Username: admin
Password: admin
```

---

# 🌍 Step 12: Domain Configuration

The application is exposed using a custom domain configured through Hostinger DNS management.

DNS records are mapped to the AWS EC2 public IP.

## Domain

```text
samikshadevops.online
```

---


# 🔄 Final CI/CD Workflow

```text
Git Push
    ↓
GitHub Webhook
    ↓
Jenkins Pipeline
    ↓
Build Docker Image
    ↓
Push Docker Image
    ↓
Deploy to EC2 / Kubernetes
    ↓
Monitoring with Prometheus & Grafana
```

---

# ✅ Deliverables

| Deliverable | Status |
|---|---|
| GitHub Repository | Completed |
| Dockerfile | Completed |
| Jenkinsfile | Completed |
| DockerHub Image | Completed |
| Kubernetes Deployment | Completed |
| Monitoring Setup | Completed |
| Domain Configuration | Completed |

---

# 👩‍💻 Author

## Samiksha Kamble

DevOps & Cloud Computing Project
