pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // Executa os comandos necessários para o build do projeto
                sh 'yarn install'
                sh 'yarn build'
            }
        }

        stage('Test') {
            steps {
                // Executa os comandos necessários para os testes do projeto
                sh 'yarn test:ci'
            }
        }

        stage ('Notifications'){
            steps {
                echo 'Notifications'
                sh '''
                    cd scripts/
                    chmod 777 *
                    ./send_email.sh
                   '''
            }

        }        
    }

    post {
        always ('Salvando artefatos'){
            archiveArtifacts 'coverage/**/*'
        }
    }
}