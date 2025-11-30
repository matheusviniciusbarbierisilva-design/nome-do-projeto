ascript
/*
* Ideal Store - Main JS
* Versão: 1.0.0
* Autor: Matheus Vinicius
* Website: www.idealstore.com.br
*/

(function($) {
    'use strict';

    // Variáveis Globais
    var $window = $(window),
        $body = $('body'),
        $document = $(document);

    /*=================================================
      Função de Inicialização
    ==================================================*/
    function init() {
        preloaderInit();
        headerSticky();
        mobileMenuInit();
        searchOverlayInit();
        heroSliderInit();
        productCarouselInit();
        tabsInit();
        backToTopInit();
        modalInit();
        formValidationInit();
        quantityButtonsInit();
        filterInit();
        animationsInit();
        cookieConsentInit();
        newsletterPopupInit();
        toastInit();
        // Inicializar AOS - Animate on Scroll
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    /*=================================================
      Preloader
    ==================================================*/
    function preloaderInit() {
        // Simular carregamento da página
        setTimeout(function() {
            $('.preloader').fadeOut(300);
        }, 300);

        // Ou usar o evento load
        $window.on('load', function() {
            $('.preloader').fadeOut(300);
        });
    }

    /*=================================================
      Header Sticky
    ==================================================*/
    function headerSticky() {
        var headerHeight = $('.main-header').outerHeight();
        
        $window.on('scroll', function() {
            if ($window.scrollTop() > headerHeight) {
                $('.main-header').addClass('sticky');
            } else {
                $('.main-header').removeClass('sticky');
            }
        });
    }

    /*=================================================
      Mobile Menu
    ==================================================*/
    function mobileMenuInit() {
        // Abrir Menu Mobile
        $('.mobile-menu-toggle').on('click', function() {
            $(this).toggleClass('active');
            $('.mobile-menu').toggleClass('active');
            $('body').toggleClass('menu-open');
            
            // Adicionar overlay
            if(!$('.mobile-menu-overlay').length) {
                $body.append('<div class="mobile-menu-overlay"></div>');
            }
            
            setTimeout(function() {
                $('.mobile-menu-overlay').toggleClass('active');
            }, 50);
        });
        
        // Fechar Menu Mobile quando clicar no overlay
        $document.on('click', '.mobile-menu-overlay, .close-mobile-menu', function() {
            $('.mobile-menu-toggle').removeClass('active');
            $('.mobile-menu').removeClass('active');
            $('.mobile-menu-overlay').removeClass('active');
            $('body').removeClass('menu-open');
            
            setTimeout(function() {
                $('.mobile-menu-overlay').remove();
            }, 300);
        });
        
        // Dropdown Menu Mobile
        $('.mobile-nav .has-dropdown > a').on('click', function(e) {
            e.preventDefault();
            
            var $this = $(this);
            var $parent = $this.parent();
            
            if ($parent.hasClass('active')) {
                $parent.removeClass('active');
                $parent.find('.mobile-submenu').slideUp(300);
            } else {
                $('.mobile-nav .has-dropdown').removeClass('active');
                $('.mobile-nav .mobile-submenu').slideUp(300);
                $parent.addClass('active');
                $parent.find('.mobile-submenu').slideDown(300);
            }
        });
    }

    /*=================================================
      Search Overlay
    ==================================================*/
    function searchOverlayInit() {
        $('.search-toggle').on('click', function() {
            $('.search-overlay').addClass('active');
            setTimeout(function() {
                $('.search-overlay input').focus();
            }, 300);
        });
        
        $('.close-search').on('click', function() {
            $('.search-overlay').removeClass('active');
        });
        
        // Fechar ao pressionar ESC
        $document.keyup(function(e) {
            if (e.key === "Escape") { 
                $('.search-overlay').removeClass('active');
            }
        });
    }

    /*=================================================
      Hero Slider
    ==================================================*/
    function heroSliderInit() {
        $('.hero-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            animateOut: 'fadeOut',
            responsive: {
                0: {
                    nav: false
                },
                768: {
                    nav: false
                }
            }
        });
        
        // Custom Navigation
        $('.slider-prev').on('click', function() {
            $('.hero-carousel').trigger('prev.owl.carousel');
        });
        
        $('.slider-next').on('click', function() {
            $('.hero-carousel').trigger('next.owl.carousel');
        });
    }

    /*=================================================
      Product Carousel
    ==================================================*/
    function productCarouselInit() {
        $('.produtos-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            autoplay: false,
            smartSpeed: 800,
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
    }

    /*=================================================
      Tabs
    ==================================================*/
    function tabsInit() {
        $('.tab-nav li').on('click', function() {
            var tabId = $(this).data('tab');
            
            // Ativar tab nav
            $('.tab-nav li').removeClass('active');
            $(this).addClass('active');
            
            // Mostrar conteúdo da tab
            $('.tab-pane').removeClass('active');
            $('#' + tabId).addClass('active');
        });
    }

    /*=================================================
      Back to Top
    ==================================================*/
    function backToTopInit() {
        var $backToTop = $('.back-to-top');
        
        $window.on('scroll', function() {
            if ($window.scrollTop() > 300) {
                $backToTop.addClass('show');
            } else {
                $backToTop.removeClass('show');
            }
        });
        
        $backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 800);
        });
    }

    /*=================================================
      Modals
    ==================================================*/
    function modalInit() {
        // Quick View Modal
        $('.quick-view').on('click', function(e) {
            e.preventDefault();
            
            // Em um site real, você carregaria os dados do produto via AJAX
            // Aqui estamos simulando isso
            var productId = $(this).data('product-id');
            var productName = "Nome do Produto";
            var productPrice = "R$ 89,90";
            var productDesc = "Descrição do produto será exibida aqui com detalhes sobre o material, estilo e outras características relevantes.";
            var productImg = "assets/img/produtos/produto-1.jpg";
            var productCategory = "Feminino";
            var productSku = "IS-1234";
            
            // Preencher o modal com os dados
            $('#quick-view-title').text(productName);
            $('#quick-view-price').text(productPrice);
            $('#quick-view-description').text(productDesc);
            $('#quick-view-image').attr('src', productImg);
            $('#quick-view-category').text(productCategory);
            $('#quick-view-sku').text(productSku);
            
            // Mostrar o modal
            $('#quickViewModal').fadeIn(300);
            $body.addClass('modal-open');
        });
        
        // Fechar Modal
        $('.close-modal, .modal-overlay').on('click', function() {
            $('#quickViewModal').fadeOut(300);
            $body.removeClass('modal-open');
        });
        
        // Impedir fechamento do modal quando clicar no conteúdo
        $('.modal-content').on('click', function(e) {
            e.stopPropagation();
        });
        
        // Fechar ao pressionar ESC
        $document.keyup(function(e) {
            if (e.key === "Escape") { 
                $('#quickViewModal').fadeOut(300);
                $body.removeClass('modal-open');
            }
        });
    }

    /*=================================================
      Form Validation
    ==================================================*/
    function formValidationInit() {
        // Validação básica de formulário
        $('form').on('submit', function(e) {
            var $form = $(this);
            var valid = true;
            
            // Verificar campos obrigatórios
            $form.find('[required]').each(function() {
                if ($(this).val() === '') {
                    valid = false;
                    $(this).addClass('is-invalid');
                } else {
                    $(this).removeClass('is-invalid');
                }
            });
            
            // Verificar e-mails
            $form.find('[type="email"]').each(function() {
                var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if ($(this).val() !== '' && !emailRegex.test($(this).val())) {
                    valid = false;
                    $(this).addClass('is-invalid');
                }
            });
            
            // Formulário de newsletter
            if ($form.attr('id') === 'newsletter-form' || $form.attr('id') === 'popup-newsletter-form') {
                e.preventDefault();
                
                if (valid) {
                    // Simular envio de formulário
                    var email = $form.find('input[type="email"]').val();
                    
                    // Em um site real, você enviaria o e-mail para o backend
                    console.log('Email cadastrado: ' + email);
                    
                    // Limpar formulário
                    $form[0].reset();
                    
                    // Mostrar mensagem de sucesso
                    showToast('success', 'Cadastro realizado com sucesso! Em breve você receberá nossas novidades.');
                    
                    // Fechar popup se for o formulário do popup
                    if ($form.attr('id') === 'popup-newsletter-form') {
                        $('.newsletter-popup').fadeOut(300);
                        
                        // Se a opção "não mostrar novamente" estiver marcada
                        if ($('#dont-show-again').is(':checked')) {
                            // Salvar no localStorage para não mostrar novamente
                            localStorage.setItem('newsletter_popup', 'hidden');
                        }
                    }
                }
            }
            
            // Formulário de contato
            if ($form.hasClass('contact-form')) {
                e.preventDefault();
                
                if (valid) {
                    // Simular envio de formulário
                    var name = $form.find('input[name="name"]').val();
                    
                    // Em um site real, você enviaria os dados para o backend
                    console.log('Formulário de contato enviado por: ' + name);
                    
                    // Limpar formulário
                    $form[0].reset();
                    
                    // Mostrar mensagem de sucesso
                    showToast('success', 'Mensagem enviada com sucesso! Responderemos em breve.');
                }
            }
            
            return valid;
        });
        
        // Remover classe is-invalid quando o usuário começa a digitar
        $('input, textarea, select').on('input focus', function() {
            $(this).removeClass('is-invalid');
        });
    }

    /*=================================================
      Quantity Buttons
    ==================================================*/
    function quantityButtonsInit() {
        // Diminuir quantidade
        $document.on('click', '.qty-btn.minus', function() {
            var $input = $(this).siblings('.qty-input');
            var currentValue = parseInt($input.val(), 10);
            
            if (currentValue > 1) {
                $input.val(currentValue - 1);
            }
        });
        
        // Aumentar quantidade
        $document.on('click', '.qty-btn.plus', function() {
            var $input = $(this).siblings('.qty-input');
            var currentValue = parseInt($input.val(), 10);
            
            $input.val(currentValue + 1);
        });
        
        // Impedir valores negativos ou não numéricos
        $('.qty-input').on('input', function() {
            var value = $(this).val();
            
            if (value <= 0 || isNaN(value)) {
                $(this).val(1);
            }
        });
    }

    /*=================================================
      Filter Initialize
    ==================================================*/
    function filterInit() {
        // Filtro de produtos por categoria
        $('.filter-btn').on('click', function() {
            var filterValue = $(this).data('filter');
            
            // Ativar botão
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            
            // Filtrar produtos
            if (filterValue === 'all') {
                $('.produto-card').show();
            } else {
                $('.produto-card').hide();
                $('.produto-card[data-category="' + filterValue + '"]').show();
            }
        });
        
        // Ordenar produtos
        $('#sort-products').on('change', function() {
            var sortValue = $(this).val();
            var $products = $('.produtos-grid');
            var $items = $products.children('.produto-card').get();
            
            // Ordenar por preço (baixo para alto)
            if (sortValue === 'price-low') {
                $items.sort(function(a, b) {
                    var priceA = parseFloat($(a).data('price'));
                    var priceB = parseFloat($(b).data('price'));
                    return priceA - priceB;
                });
            }
            
            // Ordenar por preço (alto para baixo)
            else if (sortValue === 'price-high') {
                $items.sort(function(a, b) {
                    var priceA = parseFloat($(a).data('price'));
                    var priceB = parseFloat($(b).data('price'));
                    return priceB - priceA;
                });
            }
            
            // Ordenar por nome (A-Z)
            else if (sortValue === 'name-asc') {
                $items.sort(function(a, b) {
                    var nameA = $(a).data('name').toLowerCase();
                    var nameB = $(b).data('name').toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
            }
            
            // Ordenar por nome (Z-A)
            else if (sortValue === 'name-desc') {
                $items.sort(function(a, b) {
                    var nameA = $(a).data('name').toLowerCase();
                    var nameB = $(b).data('name').toLowerCase();
                    if (nameA > nameB) return -1;
                    if (nameA < nameB) return 1;
                    return 0;
                });
            }
            
            // Atualizar a ordem dos produtos no DOM
            $.each($items, function(index, item) {
                $products.append(item);
            });
        });
    }

    /*=================================================
      Animations
    ==================================================*/
    function animationsInit() {
        // Links com animação de scroll suave
        $('a[href^="#"]:not([href="#"])').on('click', function(e) {
            e.preventDefault();
            
            var target = $(this.hash);
            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        });
        
        // Animação para ações de produto
        $('.add-to-cart').on('click', function(e) {
            e.preventDefault();
            
            var productName = $(this).closest('.produto-card').find('.produto-nome').text();
            
            // Atualizar contador do carrinho
            var currentCount = parseInt($('.action-btn a[aria-label="Carrinho de Compras"] .count').text());
            $('.action-btn a[aria-label="Carrinho de Compras"] .count').text(currentCount + 1);
            
            // Mostrar notificação
            showToast('success', productName + ' adicionado ao carrinho!');
        });
        
        // Animação para favoritos
        $('.add-to-wishlist').on('click', function(e) {
            e.preventDefault();
            
            var $this = $(this);
            var productName = $this.closest('.produto-card').find('.produto-nome').text();
            
            // Alternar ícone de coração
            if ($this.find('i').hasClass('far')) {
                $this.find('i').removeClass('far').addClass('fas');
                
                // Atualizar contador de favoritos
                var currentCount = parseInt($('.action-btn a[aria-label="Favoritos"] .count').text());
                $('.action-btn a[aria-label="Favoritos"] .count').text(currentCount + 1);
                
                showToast('success', productName + ' adicionado aos favoritos!');
            } else {
                $this.find('i').removeClass('fas').addClass('far');
                
                // Atualizar contador de favoritos
                var currentCount = parseInt($('.action-btn a[aria-label="Favoritos"] .count').text());
                $('.action-btn a[aria-label="Favoritos"] .count').text(currentCount - 1);
                
                showToast('info', productName + ' removido dos favoritos.');
            }
        });
        
        // Animação para botões de variação
        $('.size-btn, .color-btn').on('click', function() {
            var $this = $(this);
            var $siblings = $this.siblings();
            
            $siblings.removeClass('active');
            $this.addClass('active');
        });
    }

    /*=================================================
      Cookie Consent
    ==================================================*/
    function cookieConsentInit() {
        // Verificar se o usuário já aceitou os cookies
        var cookieConsent = localStorage.getItem('cookie_consent');
        
        if (!cookieConsent) {
            // Mostrar o aviso de cookies após 2 segundos
            setTimeout(function() {
                $('.cookie-consent').fadeIn(300);
            }, 2000);
        }
        
        // Aceitar cookies
        $('#cookie-accept').on('click', function() {
            localStorage.setItem('cookie_consent', 'accepted');
            $('.cookie-consent').fadeOut(300);
        });
        
        // Configurações de cookies (em um site real, abriria um modal de configuração)
        $('#cookie-settings').on('click', function() {
            // Aqui você abriria um modal de configuração de cookies
            console.log('Abrir configurações de cookies');
        });
    }

    /*=================================================
      Newsletter Popup
    ==================================================*/
    function newsletterPopupInit() {
        // Verificar se o usuário já fechou o popup
        var newsletterPopup = localStorage.getItem('newsletter_popup');
        
        if (!newsletterPopup) {
            // Mostrar o popup após 5 segundos
            setTimeout(function() {
                $('.newsletter-popup').fadeIn(300);
            }, 5000);
        }
        
        // Fechar popup
        $('.close-popup').on('click', function() {
            $('.newsletter-popup').fadeOut(300);
            
            // Se a opção "não mostrar novamente" estiver marcada
            if ($('#dont-show-again').is(':checked')) {
                localStorage.setItem('newsletter_popup', 'hidden');
            }
        });
    }

    /*=================================================
      Toast Notifications
    ==================================================*/
    function toastInit() {
        // Fechar toast ao clicar no botão fechar
        $('.toast-close').on('click', function() {
            $('.notification-toast').removeClass('show');
        });
    }

    // Função para mostrar toast
    function showToast(type, message) {
        var $toast = $('.notification-toast');
        var icon;
        
        // Definir ícone com base no tipo
        switch (type) {
            case 'success':
                icon = 'check-circle';
                $toast.removeClass('toast-error toast-info toast-warning').addClass('toast-success');
                break;
            case 'error':
                icon = 'times-circle';
                $toast.removeClass('toast-success toast-info toast-warning').addClass('toast-error');
                break;
            case 'info':
                icon = 'info-circle';
                $toast.removeClass('toast-success toast-error toast-warning').addClass('toast-info');
                break;
            case 'warning':
                icon = 'exclamation-circle';
                $toast.removeClass('toast-success toast-error toast-info').addClass('toast-warning');
                break;
            default:
                icon = 'info-circle';
                $toast.removeClass('toast-success toast-error toast-warning').addClass('toast-info');
        }
        
        // Atualizar ícone e mensagem
        $toast.find('.toast-icon i').attr('class', 'fas fa-' + icon);
        $toast.find('.toast-message').text(message);
        
        // Mostrar toast
        $toast.addClass('show');
        
        // Esconder toast após 4 segundos (1s a mais que a animação da barra de progresso)
        setTimeout(function() {
            $toast.removeClass('show');
        }, 4000);
    }

    /*=================================================
      Lightbox Para Galeria de Produtos
    ==================================================*/
    $(document).ready(function() {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'disableScrolling': true,
            'positionFromTop': 100,
            'fitImagesInViewport': true
        });
    });

    /*=================================================
      Inicializar tudo quando o documento estiver pronto
    ==================================================*/
    $(document).ready(function() {
        init();
        
        // Código para carregamento AJAX de páginas
        // (simulação - em um site real, isso carregaria páginas via AJAX)
        $('.ajax-page-load').on('click', function(e) {
            e.preventDefault();
            var pageUrl = $(this).attr('href');
            
            // Simular carregamento da página
            $('body').addClass('page-loading');
            $('.preloader').fadeIn(300);
            
            setTimeout(function() {
                // Em um site real, você faria uma requisição AJAX para carregar o conteúdo
                console.log('Página carregada via AJAX: ' + pageUrl);
                
                $('.preloader').fadeOut(300);
                $('body').removeClass('page-loading');
            }, 1000);
        });
        
        // Funcionalidades específicas para páginas de produto
        if ($('.produto-single').length) {
            // Galeria de imagens do produto
            $('.produto-gallery-thumbs').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.produto-gallery-main',
                dots: false,
                focusOnSelect: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3
                        }
                    }
                ]
            });
            
            $('.produto-gallery-main').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.produto-gallery-thumbs'
            });
        }
        
        // Verificar se há parâmetros na URL para filtrar produtos
        if ($('.produtos-grid').length) {
            var urlParams = new URLSearchParams(window.location.search);
            var categoria = urlParams.get('categoria');
            
            if (categoria) {
                // Ativar filtro correspondente
                $('.filter-btn[data-filter="' + categoria + '"]').trigger('click');
            }
        }
    });

})(jQuery);
