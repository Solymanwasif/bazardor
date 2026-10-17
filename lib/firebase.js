import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyDFCHV27HlQZdfsvGPq_OcEy6pQoeXIp1U",

  authDomain: "bazar-dor-8aa90.firebaseapp.com",

  projectId: "bazar-dor-8aa90",

  storageBucket: "bazar-dor-8aa90.firebasestorage.app",

  messagingSenderId: "1048894137904",

  appId: "1:1048894137904:web:3238226881f47e74096ff5"

};



const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);