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
                    sh label: '', script: '''rm -rf "node_modules"'''
                    sh label: '', script: '''find ./ -mindepth 1 -name dist -prune -o -exec rm -rf {} +'''
                    sh label: '', script: '''cp -R dist/AngularProjectBlueprint/** .'''
                    sh label: '', script: '''rm -rf "dist"'''
                    azureUpload blobProperties: [cacheControl: '', contentEncoding: '', contentLanguage: '', contentType: '', detectContentType: true], cleanUpContainerOrShare: true, containerName: '$web', fileShareName: '', filesPath: '**', storageCredentialId: 'angseed-storage-account', storageType: 'blobstorage', uploadArtifactsOnlyIfSuccessful: true
                }
            }
        }
    }
    post {
      success {
           slackSend channel: 'cashflo-builds', message: "Success Job Name:${env.JOB_NAME}, Build Number:${env.BUILD_NUMBER}", tokenCredentialId: 'Slack Token'
       }
       failure {
            slackSend channel: 'cashflo-builds', message: "Failed Job Name:${env.JOB_NAME}, Build Number:${env.BUILD_NUMBER}", tokenCredentialId: 'Slack Token'
       }
 }
}
