const admin = require("firebase-admin");
const serviceAccount = require("./conecta-frete-53e03-firebase-adminsdk-fbsvc-f7155c7879.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase inicializado com sucesso!");