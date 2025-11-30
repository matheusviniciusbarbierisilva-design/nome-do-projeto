const produtos = [
    {
        id: 1,
        nome: "Camiseta Premium Masculina",
        preco: 89.90,
        categoria: "masculino",
        imagem: "assets/img/camisa1.jpg",
        descricao: "Camiseta de algodão premium com estampa exclusiva."
    },
    {
        id: 2,
        nome: "Jaqueta Streetwear",
        preco: 199.90,
        categoria: "masculino",
        imagem: "assets/img/jaqueta.jpg",
        descricao: "Jaqueta moderna ideal para o frio."
    },
    {
        id: 3,
        nome: "Vestido Elegante Feminino",
        preco: 149.90,
        categoria: "feminino",
        imagem: "assets/img/vestido.jpg",
        descricao: "Vestido de luxo perfeito para eventos."
    }
];
function carregarProdutos() {
    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    lista.innerHTML = produtos.map(p => `
        <div class='card'>
            <img src="${p.imagem}">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco.toFixed(2)}</p>
            <button onclick="abrirProduto(${p.id})">Ver mais</button>
        </div>
    `).join("");
}

function abrirProduto(id) {
    window.location.href = `produto.html?id=${id}`;
}

function exibirProduto() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const prod = produtos.find(p => p.id == id);

    if (!prod) return;

    document.getElementById("info-produto").innerHTML = `
        <div class='produto-pagina'>
            <img src="${prod.imagem}">
            <div>
                <h2>${prod.nome}</h2>
                <p>${prod.descricao}</p>
                <h3>R$ ${prod.preco.toFixed(2)}</h3>
                <button onclick="adicionarCarrinho(${prod.id})">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
}
function buscar() {
    const q = document.getElementById("campo-busca").value.toLowerCase();
    const filtrados = produto
