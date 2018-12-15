application = "hello-nodejs"
project = "vchari-sandbox"

openshiftApiURL = "https://api.starter-us-west-2.openshift.com"
openshiftAuthToken = null

contextDir = "/"
gitBranch = env.GIT_BRANCH
gitURL = env.GIT_URL
openshiftTemplatePath = "openshift-templates/nodejs.json"


node('nodejs'){

   getJenkinsSACredentials()
    
    sh """
        set +x
        oc login --token=${openshiftAuthToken} ${openshiftApiURL} >/dev/null 2>&1 || echo 'OpenShift login failed'
    """
    
    //git changelog: false, poll: false, url: 'https://github.com/vidhyachari/openshift-hello-nodejs'
    // Checkout the source code
    checkout scm
    
    sh """
      oc process -f ${openshiftTemplatePath} \
        NAME=${application} \
        SOURCE_REPOSITORY_REF=${gitBranch} \
        SOURCE_REPOSITORY_URL=${gitURL} \
        CONTEXT_DIR="/" \
        -n ${project} | oc apply -f - -n ${project}
      """

    //Start openshift build
    sh """
      oc get bc ${application} -n ${project}

      # Cancel any currently running builds
      oc cancel-build bc/${application} -n ${project}

      # Start build and follow logs
      oc start-build ${application} --follow -n ${project}
    """
    
}//node

def getJenkinsSACredentials(){

  withCredentials([[$class: 'StringBinding',
    credentialsId: 'jenkins-service-account',
    variable: 'authToken']]) {
    openshiftAuthToken = authToken
  }

}
