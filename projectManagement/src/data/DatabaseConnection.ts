import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore/lite';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig = {
    apiKey: "AIzaSyD7WmGI3ixVzy2Ta5k03mqiKGzrc9OFd3U",
    authDomain: "bn-managme.firebaseapp.com",
    projectId: "bn-managme",
    storageBucket: "bn-managme.appspot.com",
    messagingSenderId: "442089881485",
    appId: "1:442089881485:web:a5b5370654e73edcbf07c4",
    measurementId: "G-WQXBWG2VE5"
  };

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db }
