import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBvZrs_iBrWX7jhUnnQLDR44Gx-L2Y2AW4",
    authDomain: "phongtrosinhvien-ac1b0.firebaseapp.com",
    projectId: "phongtrosinhvien-ac1b0",
    storageBucket: "phongtrosinhvien-ac1b0.appspot.com",
    messagingSenderId: "984275443176",
    appId: "1:984275443176:web:9dededc5e1a5dd66c0985d",
    measurementId: "G-CB46NMDMW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);