pipeline{
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.59.1-jammy'
        }
    }
    stages {
      stage('e2e-tests') {
         steps {
            sh 'sudo chown -R $(id -u):$(id -g) /.npm || true'
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
}
