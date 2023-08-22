import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD3em6utvk916Qup3bmDaDnxP3VPBGzJpo",
    authDomain: "curso-react-b5ac9.firebaseapp.com",
    projectId: "curso-react-b5ac9",
    storageBucket: "curso-react-b5ac9.appspot.com",
    messagingSenderId: "850850893740",
    appId: "1:850850893740:web:c48c9d6c8ba6bef3e2f409",
    measurementId: "G-G86LZ56RRQ"
  };
  


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export {db, auth}