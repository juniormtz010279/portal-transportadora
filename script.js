const consumoBaseGasolina = 12;
const consumoBaseEtanol = 8.5;

function calcular() {
  const valor = parseFloat(document.getElementById("valor").value);
  const precoGasolina = parseFloat(document.getElementById("precoGasolina").value);
  const precoEtanol = parseFloat(document.getElementById("precoEtanol").value);
  const kmViagem = parseFloat(document.getElementById("kmViagem").value);
  const diasMes = parseInt(document.getElementById("diasMes").value);
  const perfil = parseFloat(document.getElementById("perfilCarro").value);
  const modo = parseFloat(document.getElementById("modoConducao").value);

  if (!valor || !precoGasolina || !precoEtanol || !kmViagem || !diasMes) {
    alert("Preencha todos os campos.");
    return;
  }

  const consumoGasolina = consumoBaseGasolina * perfil * modo;
  const consumoEtanol = consumoBaseEtanol * perfil * modo;

  const litrosGasolina = valor / precoGasolina;
  const litrosEtanol = valor / precoEtanol;

  const kmGasolina = litrosGasolina * consumoGasolina;
  const kmEtanol = litrosEtanol * consumoEtanol;

  const custoViagemGasolina = (kmViagem / consumoGasolina) * precoGasolina;
  const custoViagemEtanol = (kmViagem / consumoEtanol) * precoEtanol;

  const mensalGasolina = custoViagemGasolina * diasMes;
  const mensalEtanol = custoViagemEtanol * diasMes;

  const melhor = mensalGasolina < mensalEtanol ? "⛽ Gasolina é mais vantajosa!" : "🌱 Etanol é mais vantajoso!";
  const economia = Math.abs(mensalGasolina - mensalEtanol).toFixed(2);

  const resultado = `
✔ Com R$ ${valor.toFixed(2)}, você roda aproximadamente:
⛽ Gasolina: ${kmGasolina.toFixed(1)} km
🌱 Etanol: ${kmEtanol.toFixed(1)} km

✔ Gasto por viagem (Gasolina): R$ ${custoViagemGasolina.toFixed(2)}
✔ Gasto por viagem (Etanol): R$ ${custoViagemEtanol.toFixed(2)}

✔ Gasto mensal (Gasolina): R$ ${mensalGasolina.toFixed(2)}
✔ Gasto mensal (Etanol): R$ ${mensalEtanol.toFixed(2)}

${melhor}
💰 Economia mensal aproximada: R$ ${economia}

ℹ Cálculo baseado em consumo médio: Gasolina ${consumoGasolina.toFixed(1)} km/l, Etanol ${consumoEtanol.toFixed(1)} km/l.
`;

  document.getElementById("resultado").innerText = resultado;
  salvarHistorico(resultado);
}

function salvarHistorico(texto) {
  const historico = document.getElementById("historico");
  const item = document.createElement("div");
  item.style.borderTop = "1px solid #1e293b";
  item.style.paddingTop = "10px";
  item.innerText = texto;
  historico.prepend(item);
}