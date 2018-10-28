/* import firebaseui from 'firebaseui'
import firebase from 'firebase/app'
import 'firebase/auth'

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID
}

const auth = {
  context: null,
  initContext (context) {
    this.context = context
  },
  initFirebase (cb) {
    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged(cb)
  },
  authForm (container) {
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    ui.start(container, uiConfig)
  },
  isLoggedIn () {
    return localStorage.getItem('user') != null
  },
  updateLoginStorage (user, token) {
    if (token) localStorage.setItem('token', token)
    if (user) localStorage.setItem('user', user)
  },
  user () {
    return this.context ? firebase.auth().currentUser : null
  },
  setCurrentUser (user, app) {
    if (user) {
      app.$store.dispatch('setCurrentUser', user)
    }

    if (!auth.isLoggedIn()) app.$router.push('/')
  },
  logout (cb) {
    firebase.auth().signOut().then(() => {
      this.context.$store.dispatch('setCurrentUser')
      cb()
    })
  }
}

export default auth */
