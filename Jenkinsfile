pipeline {
    agent any
    environment {
        RELEASE_TAG = ''
    }
    stages {
        stage('Build') {
            steps {
                nodejs('Node LTS') {
                    sh ' bash -ex build.sh develop'
                }
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