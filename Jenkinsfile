pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.59.1-jammy' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm ci --cache .npm-cache'
            sh 'npx playwright test'
         }
      }
   }
}