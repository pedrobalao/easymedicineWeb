# easymedweb [![Build Status](https://dev.azure.com/pedrochavs/easypedweb/_apis/build/status/easypedweb-CI)](https://dev.azure.com/pedrochavs/easypedweb/_build/latest?definitionId=8)

> De médico para médico

## Configuration

#### Environment variables

Environment variables can be placed inside *.env.<environment_name>* file.

In the root of this repository, there is a *.env.example* file that contains an example of the env file:

```
FIREBASE_API_KEY="x"
FIREBASE_AUTH_DOMAIN="xxx.firebaseapp.com"
FIREBASE_DATABASE_URL="https://xxx.firebaseio.com"
FIREBASE_PROJECT_ID="xxx"
FIREBASE_STORAGE_BUCKET="xxx.appspot.com"
FIREBASE_MSG_SENDING_ID="123"
API_BASE_URL="http://localhost:3000/api/v1"
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
