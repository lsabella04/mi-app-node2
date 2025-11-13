pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando repositorio...'
                git branch: 'main', url: 'https://github.com/lsabella04/express-mongo-estudiantesApi.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Construyendo imagen Docker...'
                sh 'docker build -t estudiantes-api .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando contenedor...'
                sh 'docker stop estudiantes-api || true'
                sh 'docker rm estudiantes-api || true'
                sh 'docker run -d -p 3033:3033 --name estudiantes-api estudiantes-api'
            }
        }
    }

    post {
        success {
            echo 'Pipeline exitoso'
        }
        failure {
            echo 'El pipeline falló'
        }
    }
}
