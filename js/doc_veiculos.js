console.log("JS Doc_Veículos carregado");

// Array para armazenar dados dos veículos
let veiculos = [];

// Busca o JSON dos veículos (mesma pasta data)
fetch(`data/veiculos.json?t=${new Date().getTime()}`)
    .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar JSON dos veículos");
        return res.json();
    })
    .then(dados => {
        veiculos = dados.veiculos;
        console.log("Veículos carregados:", veiculos);
        atualizarTabela();
    })
    .catch(err => console.error(err));

// Campo de busca
const inputBusca = document.getElementById("busca-placa");
inputBusca.addEventListener("input", atualizarTabela);

// Função para atualizar tabela
function atualizarTabela() {
    const tbody = document.querySelector("#tabela-veiculos tbody");
    tbody.innerHTML = "";

    const busca = inputBusca.value.trim().toUpperCase();

    veiculos.forEach(v => {
        if (busca && !v.placa.toUpperCase().includes(busca)) return;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${v.placa}</td>
            <td><a href="${v.documento}" target="_blank" class="pdf-link">Abrir PDF</a></td>
        `;
        tbody.appendChild(tr);
    });
}