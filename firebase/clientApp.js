import firebase from 'firebase/app'
// import 'firebase/auth' // If you need it
import 'firebase/firestore' // If you need it
// import 'firebase/storage' // If you need it
// import 'firebase/analytics' // If you need it
// import 'firebase/performance' // If you need it

const clientCredentials = {
  apiKey: "AIzaSyCJbxvhSVnXFDqNwyRO48v_zP73k6Hhx3U",
  authDomain: "wonder-b37d2.firebaseapp.com",
  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: "wonder-b37d2",
  storageBucket: "wonder-b37d2.appspot.com",
  messagingSenderId: "394899969305",
  appId: "1:394899969305:web:9f0e029a0e7d661530a188"
}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== 'undefined') {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ('measurementId' in clientCredentials) {
      firebase.analytics()
      firebase.performance()
    }
  }
}

export default firebase