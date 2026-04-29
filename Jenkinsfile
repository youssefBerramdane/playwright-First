pipeline{
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.59.1-jammy'
        }
    }
    stages {
        stage('Install playwright'){
            steps {
                sh '''
                    npm install playwright@latest
                    npx playwright install
                '''
            }
        }
        stage('Run the test'){
            steps {
                sh '''
                    npx playwrright test
                '''
            }
        }
    }
}
