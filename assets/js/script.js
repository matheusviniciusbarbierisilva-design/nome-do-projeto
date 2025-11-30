// ===== PRODUTOS PADRÃO =====
let produtos = JSON.parse(localStorage.getItem("produtos")) || [
  {id:1, nome:"Camisa Premium Black", preco:199, img:"img/camisa1.jpg"},
  {id:2, nome:"Camiseta Gold Edition", preco:249, img:"img/camisa2.jpg"},
  {id:3, nome:"Moletom Ideal Lux", preco:349, img:"img/moletom.jpg"}
];

function salvarProdutos(){
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

// ===== LISTAR PRODUTOS =====
if(document.getElementById("produtosLista")){
  let area = document.getElementById("produtosLista");
  area.innerHTML = produtos.map(p => `
     <div class="card-produto">
        <img src="${p.img}">
        <h3>${p.nome}</h3>
        <p class="preco">R$ ${p.preco}</p>
        <a href="produto.html?id=${p.id}" class="botao">Ver Produto</a>
     </div>
  `).join("");
}

// ===== DETALHES PRODUTO =====
if(document.getElementById("produtoDetalhes")){
  const url = new URLSearchParams(location.search);
  const id = url.get("id");
  const p = produtos.find(x => x.id == id);

  document.getElementById("produtoDetalhes").innerHTML = `
    <img src="${p.img}" class="produto-img">
    <div class="produto-info">
      <h2>${p.nome}</h2>
      <p class="preco">R$ ${p.preco}</p>
      <button onclick="addCarrinho(${p.id})" class="botao">Adicionar ao Carrinho</button>
    </div>
  `;
}

// ===== CARRINHO =====
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function addCarrinho(id){
  carrinho.push(id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Adicionado ao carrinho!");
}

if(document.getElementById("listaCarrinho")){
  let area = document.getElementById("listaCarrinho");

  if(carrinho.length === 0){
    area.innerHTML = "<p>Seu carrinho está vazio.</p>";
  } else {
    area.innerHTML = carrinho.map(id => {
      let p = produtos.find(x => x.id === id);
      return `
        <div class="item-carrinho">
          <img src="${p.img}">
          <p>${p.nome}</p>
          <span>R$ ${p.preco}</span>
        </div>
      `;
    }).join("");
  }
}

function finalizarCompra(){
  alert("Compra finalizada! (simulada)");
  localStorage.removeItem("carrinho");
  location.reload();
}

// ===== LOGIN FAKE =====
function fazerLogin(){
  let email = document.getElementById("loginEmail").value;
  let senha = document.getElementById("loginSenha").value;

  if(email === "" || senha === ""){
    alert("Preencha tudo!");
    return;
  }

  localStorage.setItem("usuario", JSON.stringify({email, nome:"Cliente Ideal"}));
  location.href = "painel-cliente.html";
}

function criarContaFake(){
  alert("Conta criada! (simulado)");
}

if(document.getElementById("nomeCliente")){
  let u = JSON.parse(localStorage.getItem("usuario"));
  if(!u) location.href = "login.html";

  document.getElementById("nomeCliente").innerText = u.nome;
  document.getElementById("emailCliente").innerText = u.email;
}

function logout(){
  localStorage.removeItem("usuario");
  location.href = "index.html";
}

// ===== ADMIN =====
function addProduto(){
  let nome = document.getElementById("admNome").value;
  let preco = parseFloat(document.getElementById("admPreco").value);
  let img = document.getElementById("admImg").value;

  let novo = {
    id: produtos.length + 1,
    nome,
    preco,
    img
  };

  produtos.push(novo);
  salvarProdutos();
  mostrarAdmin();
}

function mostrarAdmin(){
  if(!document.getElementById("produtosAdmin")) return;

  document.getElementById("produtosAdmin").innerHTML = produtos.map(p=>`
    <div class="admin-item">
      <img src="${p.img}">
      <p>${p.nome}</p>
      <span>R$ ${p.preco}</span>
    </div>
  `).join("");
}

mostrarAdmin();
