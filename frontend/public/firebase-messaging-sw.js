importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});