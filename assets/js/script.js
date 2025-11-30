let produtos = JSON.parse(localStorage.getItem("produtos")) || [
    {
        id: 1,
        nome: "Camisa Premium Ideal Gold",
        preco: 299.90,
        imagem: "assets/img/camisa1.jpg",
        descricao: "Modelo exclusivo com detalhes dourados."
    }
];

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// LISTAR PRODUTOS
function renderProdutos() {
    let area = document.getElementById("lista-produtos");
    if (!area) return;

    area.innerHTML = "";

    produtos.forEach(p => {
        area.innerHTML += `
            <div class="produto">
                <img src="${p.imagem}">
                <h3>${p.nome}</h3>
                <p>R$ ${p.preco}</p>
                <a href="produto.html?id=${p.id}">
                    <button>Ver mais</button>
                </a>
            </div>
        `;
    });
}

renderProdutos();

// PÁGINA DE PRODUTO
function renderProduto() {
    let area = document.getElementById("info-produto");
    if (!area) return;

    let params = new URLSearchParams(window.location.search);
    let id = parseInt(params.get("id"));

    let p = produtos.find(x => x.id === id);

    area.innerHTML = `
        <div class="produto">
            <img src="${p.imagem}">
            <h2>${p.nome}</h2>
            <h3>R$ ${p.preco}</h3>
            <p>${p.descricao}</p>
            <button onclick="addCarrinho(${p.id})">Adicionar ao carrinho</button>
        </div>
    `;
}

// CARRINHO
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function addCarrinho(id) {
    let p = produtos.find(x => x.id === id);
    carrinho.push(p);
    salvarCarrinho();
    alert("Adicionado ao carrinho!");
}

function renderCarrinho() {
    let area = document.getElementById("lista-carrinho");
    if (!area) return;

    area.innerHTML = "";
    let total = 0;

    carrinho.forEach((p, i) => {
        total += p.preco;
        area.innerHTML += `
            <div class="produto">
                <img src="${p.imagem}">
                <h3>${p.nome}</h3>
                <p>R$ ${p.preco}</p>
                <button onclick="remover(${i})">Remover</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

function remover(i) {
    carrinho.splice(i, 1);
    salvarCarrinho();
    renderCarrinho();
}

// LOGIN
function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    localStorage.setItem("usuario", email);
    window.location.href = "painel-cliente.html";
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

// PAINEL CLIENTE
function painelCliente() {
    let span = document.getElementById("cliente-email");
    if (span) span.innerText = localStorage.getItem("usuario");
}

// ADMIN
function cadastrarProduto() {
    let nome = document.getElementById("p-nome").value;
    let preco = parseFloat(document.getElementById("p-preco").value);
    let imagem = document.getElementById("p-imagem").value;
    let descricao = document.getElementById("p-desc").value;

    let novo = { id: Date.now(), nome, preco, imagem, descricao };

    produtos.push(novo);
    salvarProdutos();
    listarAdmin();
}

function listarAdmin() {
    let area = document.getElementById("lista-admin");
    if (!area) return;

    area.innerHTML = "";

    produtos.forEach(p => {
        area.innerHTML += `
            <div class="produto">
                <img src="${p.imagem}">
                <h3>${p.nome}</h3>
                <p>R$ ${p.preco}</p>
            </div>
        `;
    });
}
