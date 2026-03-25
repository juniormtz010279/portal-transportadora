const admin = require("firebase-admin");

// 🔑 Sua chave JSON do Firebase
const serviceAccount = require("./conecta-frete-53e03-firebase-adminsdk-fbsvc-f7155c7879.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function enviarTeste() {
  const token = 'ezgiIeTVEOvoYKeKw6VDox:APA91bEdf4qfCj689VA8UcnWl9Zs3uqY4_XrMrl6MrMZDcGzH0C2nXXJ96122s2FFBPBP7YQ-HYnd8kB01oLX3nPhL2SsczEREvGqeyWOcrn2iJSVe-LYhY';

  const message = {
    notification: {
      title: "🚛 Novo frete disponível!",
      body: "Teste de notificação no celular"
    },
    token: token
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notificação enviada! Response:", response);
  } catch (err) {
    console.error("Erro ao enviar notificação:", err);
  }
}

enviarTeste();