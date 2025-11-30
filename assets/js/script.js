document.addEventListener('DOMContentLoaded', () => {
    // 1. DADOS DE PRODUTOS COMPLETOS (Simulação de um Banco de Dados/API)
    // Categoria é adicionada para permitir a filtragem por tipo de produto.
    const productData = [
        { id: 1, name: "Vestido Floral Longo", price: 189.90, oldPrice: 229.90, isPromo: true, category: "vestido", image: "vestido_floral.jpg", tag: "NOVO" },
        { id: 2, name: "Calça Jeans Skinny Azul", price: 99.90, oldPrice: null, isPromo: true, category: "calca", image: "calca_jeans.jpg", tag: "OFERTA" },
        { id: 3, name: "Jaqueta de Couro PU Preta", price: 299.00, oldPrice: 350.00, isPromo: false, category: "jaqueta", image: "jaqueta_couro.jpg", tag: "ESGOTANDO" },
        { id: 4, name: "Camiseta Básica Algodão Branca", price: 49.90, oldPrice: null, isPromo: false, category: "camiseta", image: "camiseta_basica.jpg", tag: "BASICO" },
        { id: 5, name: "Blusa de Lã Feminina", price: 129.90, oldPrice: 150.00, isPromo: true, category: "camiseta", image: "blusa_la.jpg", tag: "PROMO" },
        { id: 6, name: "Tênis Casual Branco Urbano", price: 179.90, oldPrice: null, isPromo: false, category: "acessorio", image: "tenis_casual.jpg", tag: "NOVO" },
        { id: 7, name: "Bermuda Cargo Masculina", price: 85.00, oldPrice: null, isPromo: false, category: "calca", image: "bermuda_cargo.jpg", tag: "MASCULINO" },
        { id: 8, name: "Vestido de Festa Curto", price: 250.00, oldPrice: 290.00, isPromo: false, category: "vestido", image: "vestido_festa.jpg", tag: "FESTA" },
        { id: 9, name: "Cinto de Couro Genuíno", price: 75.00, oldPrice: null, isPromo: false, category: "acessorio", image: "cinto_couro.jpg", tag: "PREMIUM" },
        { id: 10, name: "Suéter de Tricô", price: 145.00, oldPrice: null, isPromo: false, category: "camiseta", image: "sueter_trico.jpg", tag: "INVERNO" }
    ];

    const catalogContainer = document.getElementById('catalog-container');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const noResultsMessage = document.getElementById('noResults');

    // Função para Criar o HTML do Card de Produto (Reutilizada)
    const createProductCard = (product) => {
        const oldPriceHtml = product.oldPrice 
            ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` 
            : '';
        const badgeHtml = product.tag 
            ? `<span class="badge">${product.tag}</span>` 
            : '';

        return `
            <article class="product-card">
                ${badgeHtml}
                <img src="images/${product.image}" alt="Foto do produto: ${product.name}">
                <div class="card-details">
                    <h4>${product.name}</h4>
                    <p class="price">${oldPriceHtml} R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                    <a href="https://wa.me/5543996126966?text=Olá! Tenho interesse no produto ${product.name} (Ref: ${product.id})." target="_blank" class="btn-primary" style="padding: 8px 15px; font-size: 0.9em;">Chamar no Zap</a>
                </div>
            </article>
        `;
    };

    // 2. FUNÇÃO DE FILTRAGEM E RENDERIZAÇÃO
    const renderProducts = (productsToRender) => {
        catalogContainer.innerHTML = '';
        if (productsToRender.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
            productsToRender.forEach(product => {
                catalogContainer.innerHTML += createProductCard(product);
            });
        }
    };

    const applyFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        let filteredProducts = productData.filter(product => {
            // Filtra por termo de pesquisa (nome e tag)
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                  product.tag.toLowerCase().includes(searchTerm);

            // Filtra por categoria
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        renderProducts(filteredProducts);
    };

    // 3. LISTENERS
    searchInput.addEventListener('keyup', applyFilters); // A cada tecla digitada
    categoryFilter.addEventListener('change', applyFilters); // Ao mudar a opção
    
    // RENDERIZAÇÃO INICIAL (mostra todos os produtos ao carregar)
    applyFilters(); 
    
    // Menu responsivo (código duplicado para garantir que o menu funcione nesta página)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
});
