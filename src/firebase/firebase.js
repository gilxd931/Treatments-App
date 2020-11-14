import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-5YMMQZ0FNX"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default }


// apiKey: "AIzaSyAuhYTzRcQ8YGL907AIrMd39n__QLAyJdA",
// authDomain: "magatal.firebaseapp.com",
// databaseURL: "https://magatal.firebaseio.com",
// projectId: "magatal",
// storageBucket: "magatal.appspot.com",
// messagingSenderId: "61180989728",
// appId: "1:61180989728:web:0e381f318b684d312e4745",