// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from 'firebase/auth';

import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCgOr8Tm1LITh1p0qiXS5DcQEvRvei5v6I",
	authDomain: "store-e01f2.firebaseapp.com",
	projectId: "store-e01f2",
	storageBucket: "store-e01f2.appspot.com",
	messagingSenderId: "19771890772",
	appId: "1:19771890772:web:6e4c6d316a00bb0db621c1",
	measurementId: "G-PRLW00S9QF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const database = getDatabase();

const firestoreDb = getFirestore(app);

const storage = getStorage(app);

const storageRef = ref(storage, 'products');

export { auth, database, firestoreDb, storage, storageRef };
