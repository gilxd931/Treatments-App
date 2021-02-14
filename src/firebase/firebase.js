import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

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


//db
const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


// storage

const storage = firebase.storage();

export { firebase, googleAuthProvider, storage, db as default }



