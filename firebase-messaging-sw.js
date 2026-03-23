importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// 🔥 CONFIG FIREBASE (mesma do seu sistema)
firebase.initializeApp({
  apiKey: "AIzaSyC5iPsX34H7evZiDwTm9CUnl0CRA6iLnpQ",
  authDomain: "conecta-frete-53e03.firebaseapp.com",
  projectId: "conecta-frete-53e03",
  storageBucket: "conecta-frete-53e03.appspot.com",
  messagingSenderId: "558425558991",
  appId: "1:558425558991:web:89069fccbd3b3cf3884cba"
});

const messaging = firebase.messaging();

// 🔔 RECEBER NOTIFICAÇÃO EM BACKGROUND
messaging.onBackgroundMessage(function(payload) {
  console.log("Notificação recebida:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://cdn-icons-png.flaticon.com/512/1995/1995470.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});