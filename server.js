const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 SUA CHAVE FIREBASE
const serviceAccount = require("./conecta-frete-53e03-firebase-adminsdk-fbsvc-546a88190c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 🚀 ROTA PARA ENVIAR NOTIFICAÇÃO
app.get("/enviar-notificacao", async (req, res) => {

  console.log("ROTA CHAMADA!");

  try {

    const snapshot = await db.collection("tokens").get();

    let tokens = [];

    snapshot.forEach(doc => {
      tokens.push(doc.data().token);
    });

    if (tokens.length === 0) {
      return res.json({ msg: "Nenhum token encontrado" });
    }

    const message = {
      notification: {
        title: "🚛 Novo frete disponível!",
        body: "Entre no Conecta Frete e confira agora"
      },
      tokens: tokens
    };

    const response = await admin.messaging().sendEachForMulticast(message);

    // 🔍 LOG DE ERROS (ajuda muito no futuro)
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        console.log("Erro no token:", tokens[idx]);
      }
    });

    res.json({
      sucesso: true,
      enviados: response.successCount
    });

  } catch (e) {
    res.json({
      erro: true,
      detalhe: e.message
    });
  }

});

// 🔥 PORTA CORRETA (FUNCIONA LOCAL + RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});