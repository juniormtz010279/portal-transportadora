console.log("JS carregado");

// Variáveis globais
let funcionarios = [];

// Fetch JSON com anti-cache
fetch(`data/dados.json?t=${new Date().getTime()}`)
    .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar JSON");
        return res.json();
    })
    .then(dados => {
        funcionarios = dados.funcionarios;
        console.log("Dados recebidos:", funcionarios);

        popularFiltros();
        atualizarTabela();
    })
    .catch(err => console.error("Erro ao carregar JSON:", err));

// Função para popular os filtros de função
function popularFiltros() {
    const filtroFuncao = document.getElementById("filtro-funcao");
    const funcoes = [...new Set(funcionarios.map(f => f.funcao))].sort();

    funcoes.forEach(f => {
        const option = document.createElement("option");
        option.value = f;
        option.textContent = f;
        filtroFuncao.appendChild(option);
    });

    filtroFuncao.addEventListener("change", atualizarTabela);
    document.getElementById("filtro-status").addEventListener("change", atualizarTabela);
}

// Função para atualizar tabela e cards
function atualizarTabela() {
    const tbody = document.querySelector("#tabela-funcionarios tbody");
    tbody.innerHTML = "";

    const filtroFuncao = document.getElementById("filtro-funcao").value;
    const filtroStatus = document.getElementById("filtro-status").value;

    let ativos = 0, ferias = 0, licenca = 0, semMotorista = 0;

    const statusMap = {
        ativo: "Ativo",
        ferias: "Férias",
        licenca: "Licença do Trabalho",
        "sem-motorista": "Sem Motorista"
    };

    funcionarios.forEach(func => {
        // Aplica filtros
        if (filtroFuncao !== "todas" && func.funcao !== filtroFuncao) return;
        if (filtroStatus !== "todos" && func.status !== filtroStatus) return;

        const tr = document.createElement("tr");
        const nomePlaca = func.placa ? `${func.nome} – ${func.placa}` : func.nome;

        tr.innerHTML = `
            <td>${nomePlaca}</td>
            <td>${func.funcao}</td>
            <td><span class="status ${func.status}">${statusMap[func.status]}</span></td>
        `;
        tbody.appendChild(tr);

        // Atualiza contadores
        if (func.status === "ativo") ativos++;
        else if (func.status === "ferias") ferias++;
        else if (func.status === "licenca") licenca++;
        else if (func.status === "sem-motorista") semMotorista++;
    });

    // Atualiza cards
    document.getElementById("total-ativos").textContent = ativos;
    document.getElementById("total-ferias").textContent = ferias;
    document.getElementById("total-licenca").textContent = licenca;
    document.getElementById("total-sem-motorista").textContent = semMotorista;
}