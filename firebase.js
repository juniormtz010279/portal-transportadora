// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5iPsX34H7evZiDwTm9CUnl0CRA6iLnpQ",
  authDomain: "conecta-frete-53e03.firebaseapp.com",
  projectId: "conecta-frete-53e03",
  storageBucket: "conecta-frete-53e03.firebasestorage.app",
  messagingSenderId: "558425558991",
  appId: "1:558425558991:web:89069fccbd3b3cf3884cba"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Conectar ao banco
const db = getFirestore(app);

// Exportar banco
export { db };