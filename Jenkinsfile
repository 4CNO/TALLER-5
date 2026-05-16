pipeline {
    agent any

    environment {
        REPO_URL     = 'https://github.com/4CNO/TALLER-4.git'
        BRANCH       = 'main'
        DOCKER_IMAGE = 'apidivisionpolitica:latest'
        CONTAINER    = 'dockerapidivisionpolitica'
        NETWORK      = 'reddivisionpolitica'
        HOST_PORT    = '8080'
        APP_PORT     = '3030'
    }

    stages {

        stage('Clonar Repositorio') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh "docker build -t ${DOCKER_IMAGE} ."
                    } else {
                        bat "docker build -t %DOCKER_IMAGE% ."
                    }
                }
            }
        }

        stage('Detener Contenedor Anterior') {
            steps {
                script {
                    if (isUnix()) {
                        sh """
                            docker ps -q --filter name=${CONTAINER} | grep -q . && \
                                docker stop ${CONTAINER} || true
                            docker ps -a -q --filter name=${CONTAINER} | grep -q . && \
                                docker rm ${CONTAINER} || true
                        """
                    } else {
                        bat """
                            docker ps -q --filter "name=%CONTAINER%" | findstr . && docker stop %CONTAINER% || echo No hay contenedor en ejecucion
                            docker ps -a -q --filter "name=%CONTAINER%" | findstr . && docker rm %CONTAINER% || echo No hay contenedor detenido
                        """
                    }
                }
            }
        }

        stage('Crear Red Docker (si no existe)') {
            steps {
                script {
                    if (isUnix()) {
                        sh "docker network inspect ${NETWORK} >/dev/null 2>&1 || docker network create ${NETWORK}"
                    } else {
                        bat "docker network inspect %NETWORK% >nul 2>&1 || docker network create %NETWORK%"
                    }
                }
            }
        }

        stage('Desplegar Contenedor Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh "docker container run --network ${NETWORK} --name ${CONTAINER} -p ${HOST_PORT}:${APP_PORT} -d ${DOCKER_IMAGE}"
                    } else {
                        bat "docker container run --network %NETWORK% --name %CONTAINER% -p %HOST_PORT%:%APP_PORT% -d %DOCKER_IMAGE%"
                    }
                }
            }
        }

    }

    post {
        success {
            echo "✅ Despliegue exitoso — http://localhost:${HOST_PORT}"
        }
        failure {
            echo "❌ Despliegue fallido. Revisa el Console Output."
        }
    }
}
