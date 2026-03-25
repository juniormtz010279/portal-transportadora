const admin = require("firebase-admin");

// 🔑 SUA CHAVE
const serviceAccount = require("./conecta-frete-53e03-firebase-adminsdk-fbsvc-546a88190c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function enviarNotificacao(){

  const snapshot = await db.collection("tokens").get();

  if(snapshot.empty){
    console.log("Nenhum token encontrado");
    return;
  }

  let tokens = [];

  snapshot.forEach(doc => {
    tokens.push(doc.data().token);
  });

  const message = {
    notification: {
      title: "🚛 Novo frete disponível!",
      body: "Entre no Conecta Frete e confira agora"
    },
    tokens: tokens
  };

  try{
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("Notificações enviadas:", response.successCount);
  }catch(e){
    console.error("Erro ao enviar:", e);
  }

}

enviarNotificacao();