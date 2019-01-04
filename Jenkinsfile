pipeline {
    agent {
        docker {
            image 'node:lts-alpine'
        }
    }
    environment {
        RELEASE_TAG = ''
    }
    stages {
        when {
            branch 'develop'
        }
        stage('Build') {
            steps {
                sh ' bash -ex build.sh develop'
            }
        }
        stage('Git Tag for Release') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'AravindGitCredentials', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    sh("git tag -a some_tag -m 'Jenkins'")
                    sh("git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/cawstudios/AngularProjectBlueprint --tags")
                }
            }
        }
    }
}
