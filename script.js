let modoDetalhadoAtivo = true;

const toggleTheme = document.getElementById("toggleTheme");
const toggleModo = document.getElementById("toggleModo");
const modoDetalhado = document.getElementById("modoDetalhado");
const historicoDiv = document.getElementById("historico");
const btnLimparHistorico = document.getElementById("limparHistorico");

function carregarPreferencias() {
  const tema = localStorage.getItem("tema");
  const modo = localStorage.getItem("modo");

  if (tema === "light") document.body.classList.add("light");

  if (modo === "rapido") {
    modoDetalhadoAtivo = false;
    modoDetalhado.classList.add("hidden");
    toggleModo.innerText = "🧠 Modo Completo";
  }

  carregarHistorico();
}

toggleTheme.onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem("tema", document.body.classList.contains("light") ? "light" : "dark");
};

toggleModo.onclick = () => {
  modoDetalhadoAtivo = !modoDetalhadoAtivo;
  modoDetalhado.classList.toggle("hidden");

  toggleModo.innerText = modoDetalhadoAtivo ? "⚡ Modo Rápido" : "🧠 Modo Completo";
  localStorage.setItem("modo", modoDetalhadoAtivo ? "completo" : "rapido");
};

btnLimparHistorico.onclick = () => {
  if (confirm("Deseja realmente apagar todo o histórico?")) {
    localStorage.removeItem("historicoRodamais");
    carregarHistorico();
  }
};

function calcular() {
  const valor = Number(document.getElementById("valor").value);
  const precoGas = Number(document.getElementById("precoGasolina").value);
  const precoEta = Number(document.getElementById("precoEtanol").value);

  if (!valor || !precoGas || !precoEta) {
    alert("Preencha os valores principais!");
    return;
  }

  let consumoGasBase = 12;
  let consumoEtaBase = 8.5;

  let consumoGas = consumoGasBase;
  let consumoEta = consumoEtaBase;

  let kmViagem = 0;
  let diasMes = 0;

  if (modoDetalhadoAtivo) {
    const perfil = Number(document.getElementById("perfilCarro").value);
    const modo = Number(document.getElementById("modoConducao").value);

    consumoGas *= perfil * modo;
    consumoEta *= perfil * modo;

    kmViagem = Number(document.getElementById("kmViagem").value || 0);
    diasMes = Number(document.getElementById("diasMes").value || 0);
  }

  const litrosGas = valor / precoGas;
  const litrosEta = valor / precoEta;

  const kmGas = litrosGas * consumoGas;
  const kmEta = litrosEta * consumoEta;

  let texto = `✔ Com R$ ${valor.toFixed(2)}, você roda aproximadamente:\n`;
  texto += `⛽ Gasolina: ${kmGas.toFixed(1)} km\n`;
  texto += `🌱 Etanol: ${kmEta.toFixed(1)} km\n\n`;

  if (modoDetalhadoAtivo && kmViagem > 0 && diasMes > 0) {
    const custoKmGas = precoGas / consumoGas;
    const custoKmEta = precoEta / consumoEta;

    const gastoViagemGas = kmViagem * custoKmGas;
    const gastoViagemEta = kmViagem * custoKmEta;

    const kmMes = kmViagem * diasMes;

    const gastoMesGas = kmMes * custoKmGas;
    const gastoMesEta = kmMes * custoKmEta;

    texto += `✔ Gasto por viagem (Gasolina): R$ ${gastoViagemGas.toFixed(2)}\n`;
    texto += `✔ Gasto por viagem (Etanol): R$ ${gastoViagemEta.toFixed(2)}\n\n`;

    texto += `✔ Gasto mensal (Gasolina): R$ ${gastoMesGas.toFixed(2)}\n`;
    texto += `✔ Gasto mensal (Etanol): R$ ${gastoMesEta.toFixed(2)}\n\n`;

    const economia = Math.abs(gastoMesGas - gastoMesEta).toFixed(2);
    const melhorMes = gastoMesGas < gastoMesEta ? "⛽ Gasolina é mais vantajosa!" : "🌱 Etanol é mais vantajoso!";

    texto += `${melhorMes}\n`;
    texto += `💰 Economia mensal aproximada: R$ ${economia}\n\n`;

    texto += `ℹ Cálculo baseado em consumo médio: Gasolina ${consumoGas.toFixed(1)} km/l, Etanol ${consumoEta.toFixed(1)} km/l.`;
  } else {
    const melhor = kmGas > kmEta ? "⛽ Gasolina é mais vantajosa!" : "🌱 Etanol é mais vantajoso!";
    texto += melhor;
  }

  document.getElementById("resultado").innerText = texto;
  salvarHistorico(texto);
}

function salvarHistorico(texto) {
  let hist = JSON.parse(localStorage.getItem("historicoRodamais") || "[]");
  hist.unshift({ data: new Date().toLocaleString(), texto });
  hist = hist.slice(0, 20);
  localStorage.setItem("historicoRodamais", JSON.stringify(hist));
  carregarHistorico();
}

function carregarHistorico() {
  const hist = JSON.parse(localStorage.getItem("historicoRodamais") || "[]");
  historicoDiv.innerText = hist.map(h => `📅 ${h.data}\n${h.texto}\n\n`).join("");
}

carregarPreferencias();
