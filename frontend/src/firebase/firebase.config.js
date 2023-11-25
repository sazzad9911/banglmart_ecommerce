// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHjmMsAfkkK9iEwa8EviAUpVAlotGM544",
  authDomain: "banglamart-8ea6a.firebaseapp.com",
  databaseURL: "https://banglamart-8ea6a-default-rtdb.firebaseio.com",
  projectId: "banglamart-8ea6a",
  storageBucket: "banglamart-8ea6a.appspot.com",
  messagingSenderId: "249490552965",
  appId: "1:249490552965:web:3e999ea876b74997ca91ec",
  measurementId: "G-PTX3ZJHQRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

export default app