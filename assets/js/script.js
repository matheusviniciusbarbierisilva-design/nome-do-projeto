const produtos = [
    { id: 1, nome: "Camisa Premium", preco: 129.90, img: "assets/img/p1.jpg" },
    { id: 2, nome: "Moletom Luxo", preco: 249.90, img: "assets/img/p2.jpg" },
    { id: 3, nome: "Relógio Gold", preco: 399.90, img: "assets/img/p3.jpg" },
];
function carregarProdutos() {
    const area = document.getElementById("lista-produtos");
    if (!area) return;

    area.innerHTML = produtos.map(p => `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco.toFixed(2)}</p>
            <a href="produto.html?id=${p.id}">
                <button>Ver mais</button>
            </a>
        </div>
    `).join("");
}

carregarProdutos();
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function exibirCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");

    lista.innerHTML = carrinho.map(p => `
        <div class="card">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco.toFixed(2)}</p>
        </div>
    `).join("");

    const soma = carrinho.reduce((acc, p) => acc + p.preco, 0);
    total.innerText = soma.toFixed(2);
}

exibirCarrinho();
