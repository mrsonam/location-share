import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyBpgMmRa0WRIYWqf8sWza-2nbllGFoWM8c',
  authDomain: 'location-share-18909.firebaseapp.com',
  projectId: 'location-share-18909',
  storageBucket: 'location-share-18909.appspot.com',
  messagingSenderId: '998344962375',
  appId: '1:998344962375:web:a270dbfa79855100b6dc62',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firebaseDb = getFirestore(app);

export {firebaseAuth, firebaseDb};