pipeline {
    agent any

    environment {
        IMAGE_NAME = "samikshakamble39/nodejs-cicd"
    }

    stages {

        stage('Checkout Code') {
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

        stage('Run Tests') {
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

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop nodejs-app || true
                docker rm nodejs-app || true

                docker pull ${IMAGE_NAME}:latest

                docker run -d \
                  --name nodejs-app \
                  -p 3000:3000 \
                  ${IMAGE_NAME}:latest
                '''
            }
        }
    }
}
