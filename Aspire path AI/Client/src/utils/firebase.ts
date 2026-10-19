import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyDiZ8HXN3fH1h0VsPQJ7IjV--xT6Ucl86s",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "aspirepath-475c2.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID || "aspirepath-475c2",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "aspirepath-475c2.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "91485100102",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:91485100102:web:a8704060156e7303acd247",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider };