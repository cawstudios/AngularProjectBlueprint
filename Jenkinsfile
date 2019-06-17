pipeline {
    agent any
    environment {
        RELEASE_TAG = ''
    }
    stages {
        stage('Build') {
            steps {
                nodejs('Node LTS') {
                    sh 'bash -ex build.sh develop'
                }
                azureUpload blobProperties: [cacheControl: '', contentEncoding: '', contentLanguage: '', contentType: '', detectContentType: true], cleanUpContainerOrShare: true, containerName: '$web', fileShareName: '', filesPath: '**', storageCredentialId: 'angseed-storage-account', storageType: 'blobstorage', uploadArtifactsOnlyIfSuccessful: true
            }
        }
        // stage('Git Tag for Release') {
        //     steps {
        //         withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'AravindGitCredentials', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]]) {
        //             sh("git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/cawstudios/AngularProjectBlueprint.git --tags")
        //         }
        //     }
        // }
    }
}
