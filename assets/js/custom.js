(function($) {
    "use strict";
    var WEA = {};
    var plugin_track = 'assets/vendor/';
    $.fn.exists = function() {
        return this.length > 0;
    };



    /*--------------------
        * Menu Close
    ----------------------*/
    WEA.MenuClose = function() {
        $(".toggler-menu").on('click', function() {
            $(this).toggleClass('open');
            $('.header-left-fixed, .header-top-fixed').stop().toggleClass('menu-open menu-open-desk');
        });
        $('.header-left-fixed a, .header-top-fixed a').on('click', function() {
            var toggle = $('.toggler-menu').is(':visible');
            if (toggle) {
                $('.header-left-fixed, .header-top-fixed').removeClass('menu-open');
                $('.toggler-menu').removeClass('open');
            }
        });

        $('.navbar-nav a').on('click', function() {
            var toggle = $('.navbar-toggler').is(':visible');
            if (toggle) {
                $('.navbar-collapse').collapse('hide');
            }
        });
    }


    /* ---------------------------------------------- /*
     * Header Fixed
    /* ---------------------------------------------- */
    WEA.HeaderFixd = function() {
        var HscrollTop = $(window).scrollTop();
        if (HscrollTop >= 100) {
            $('body').addClass('fixed-header');
        } else {
            $('body').removeClass('fixed-header');
        }
    }


    /*--------------------
    * OwlSlider
    ----------------------*/
    WEA.Owl = function() {
        var owlslider = $("div.owl-carousel");
        if (owlslider.length > 0) {
            loadScript(plugin_track + 'owl-carousel/js/owl.carousel.min.js', function() {
                owlslider.each(function() {
                    var $this = $(this),
                        $items = ($this.data('items')) ? $this.data('items') : 1,
                        $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
                        $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                        $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
                        $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
                        $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
                        $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
                        $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                        $CenterSlider = ($this.data('center')) ? $this.data('center') : false,
                        $space = ($this.attr('data-space')) ? $this.data('space') : 30;

                    $(this).owlCarousel({
                        loop: $loop,
                        items: $items,
                        responsive: {
                            0: { items: $this.data('xs-items') ? $this.data('xs-items') : 1 },
                            480: { items: $this.data('sm-items') ? $this.data('sm-items') : 1 },
                            768: { items: $this.data('md-items') ? $this.data('md-items') : 1 },
                            980: { items: $this.data('lg-items') ? $this.data('lg-items') : 1 },
                            1200: { items: $items }
                        },
                        dots: $navdots,
                        autoplayTimeout: $autospeed,
                        smartSpeed: $smartspeed,
                        autoHeight: $autohgt,
                        center: $CenterSlider,
                        margin: $space,
                        nav: $navarrow,
                        navText: ["<i class='bi-chevron-left'></i>", "<i class='bi-chevron-right'></i>"],
                        autoplay: $autoplay,
                        autoplayHoverPause: true
                    });
                });
            });
        }
    }

    /* ---------------------------------------------- /*
       * lightbox gallery
      /* ---------------------------------------------- */
    WEA.Gallery = function() {
        if ($(".lightbox-gallery").exists() || $(".popup-youtube, .popup-vimeo, .popup-gmaps, .px_modal").exists()) {
            loadScript(plugin_track + 'magnific/jquery.magnific-popup.min.js', function() {
                if ($(".lightbox-gallery").exists()) {
                    $('.lightbox-gallery').magnificPopup({
                        delegate: '.gallery-link',
                        type: 'image',
                        tLoading: 'Loading image #%curr%...',
                        mainClass: 'mfp-fade',
                        fixedContentPos: true,
                        closeBtnInside: false,
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1] // Will preload 0 - before current, and 1 after WEA current image
                        }
                    });
                }
                if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
                    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                        disableOn: 700,
                        type: 'iframe',
                        mainClass: 'mfp-fade',
                        removalDelay: 160,
                        preloader: false,
                        fixedContentPos: false
                    });
                }
                if ($(".px_modal").exists()) {
                    $('.px_modal').magnificPopup({
                        type: 'inline',
                        midClick: true,
                        mainClass: 'mfp-fade'
                    });
                }
            });
        }
    }

    /*--------------------
    * Masonry
    ----------------------*/
    WEA.masonry = function() {
        var portfolioWork = $('.portfolio-content');
        if ($(".portfolio-content").exists()) {
            loadScript(plugin_track + 'isotope/isotope.pkgd.min.js', function() {
                if ($(".portfolio-content").exists()) {
                    $(portfolioWork).isotope({
                        resizable: false,
                        itemSelector: '.grid-item',
                        layoutMode: 'masonry',
                        filter: '*'
                    });
                    //Filtering items on portfolio.html
                    var portfolioFilter = $('.filter li');
                    // filter items on button click
                    $(portfolioFilter).on('click', function() {
                        var filterValue = $(this).attr('data-filter');
                        portfolioWork.isotope({ filter: filterValue });
                    });
                    //Add/remove class on filter list
                    $(portfolioFilter).on('click', function() {
                        $(this).addClass('active').siblings().removeClass('active');
                    });
                }
            });
        }
    }

    /*--------------------
          * Progress Bar 
      ----------------------*/
    WEA.ProgressBar = function() {
        $(".skill-bar .skill-bar-in").each(function() {
            var bottom_object = $(this).offset().top + $(this).outerHeight();
            var bottom_window = $(window).scrollTop() + $(window).height();
            var progressWidth = $(this).attr('aria-valuenow') + '%';
            if (bottom_window > bottom_object) {
                $(this).css({
                    width: progressWidth
                });
            }
        });
    }

    /*--------------------
        * particles
    ----------------------*/
    WEA.particles = function() {
        if ($("#particles-box").exists()) {
            loadScript(plugin_track + 'particles/particles.min.js', function() {});
            loadScript(plugin_track + 'particles/particles-app.js', function() {});
        }
    }


    /*--------------------
        * Type It
    ----------------------*/
    WEA.mTypeIt = function() {
        if ($("#type-it").exists()) {
            loadScript(plugin_track + 'typeit-master/typeit.js', function() {
                new TypeIt('#type-it', {
                    speed: 200,
                    loop: true,
                    strings: [
                        'Designer',
                        'Developer'
                    ],
                    breakLines: false
                });
            });
        }
    }
    WEA.one_page = function() {
        //var HHeight = $('.navbar').outerHeight();
        var $one_page_nav = $('.one-page-nav');
        if ($one_page_nav.length > 0) {
            $one_page_nav.each(function() {
                $.scrollIt({
                    upKey: 38, // key code to navigate to the next section
                    downKey: 40, // key code to navigate to the previous section
                    easing: 'linear', // the easing function for animation
                    scrollTime: 600, // how long (in ms) the animation takes
                    activeClass: 'active', // class given to the active nav element
                    onPageChange: null, // function(pageIndex) that is called when page is changed
                    topOffset: 0 // offste (in px) for fixed top navigation
                });
            });
        }
    }

    /*--------------------
    * Counter JS
    ----------------------*/
    WEA.Counter = function() {
        var counter = jQuery(".counter");
        var $counter = $('.counter');
        if (counter.length > 0) {
            loadScript(plugin_track + 'counter/jquery.countTo.js', function() {
                $counter.each(function() {
                    var $elem = $(this);
                    $elem.appear(function() {
                        $elem.find('.count').countTo({
                            speed: 2000,
                            refreshInterval: 10
                        });
                    });
                });
            });
        }
    }

    /*--------------------
    * Portfolio Loading Animation
    ----------------------*/
    WEA.PortfolioLoading = function() {
        var $workBoxes = $('.work-box');
        var totalProjects = $workBoxes.length;
        
        // Masquer tous les projets au chargement
        $workBoxes.css({
            'opacity': '0',
            'transform': 'translateY(30px)',
            'transition': 'all 0.6s ease'
        });
        
        // Afficher tous les projets progressivement
        function showAllProjects() {
            $workBoxes.each(function(index) {
                var $this = $(this);
                setTimeout(function() {
                    $this.css({
                        'opacity': '1',
                        'transform': 'translateY(0)'
                    });
                }, index * 150); // 150ms entre chaque projet
            });
        }
        
        // Afficher tous les projets quand la section est visible
        var sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    showAllProjects();
                    sectionObserver.disconnect();
                }
            });
        }, {
            threshold: 0.1
        });
        
        var portfolioSection = document.querySelector('.portfolio-section');
        if (portfolioSection) {
            sectionObserver.observe(portfolioSection);
        }
        
        // Alternative : démarrer après un court délai
        setTimeout(function() {
            if ($workBoxes.first().css('opacity') === '0') {
                showAllProjects();
            }
        }, 1000);
    }

    /*--------------------
    * Contact Form with WhatsApp
    ----------------------*/
    WEA.ContactForm = function() {
        $('#contact-form').on('submit', function(e) {
            e.preventDefault();
            
            var name = $('#name').val();
            var email = $('#email').val();
            var phone = $('#phone').val();
            var subject = $('#subject').val();
            var message = $('#message').val();
            
            // Validation simple
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs obligatoires (*).');
                return;
            }
            
            // Créer le message pour WhatsApp
            var whatsappMessage = encodeURIComponent(
                `*Nouveau message de contact*\n\n` +
                `*Nom:* ${name}\n` +
                `*Email:* ${email}\n` +
                (phone ? `*Téléphone:* ${phone}\n` : '') +
                `*Sujet:* ${subject}\n\n` +
                `*Message:* ${message}`
            );
            
            // Numéro WhatsApp (remplacez avec votre numéro)
            var whatsappNumber = '+22899326333';
            
            // Créer l'URL WhatsApp
            var whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`;
            
            // Ouvrir WhatsApp dans un nouvel onglet
            window.open(whatsappUrl, '_blank');
            
            // Message de confirmation
            alert('Merci pour votre message ! Vous allez être redirigé vers WhatsApp pour l\'envoyer.');
            
            // Réinitialiser le formulaire
            this.reset();
        });
    }

    /*--------------------
    * CV Download Progress
    ----------------------*/
    WEA.CVDownload = function() {
        $('.cv-download-btn').on('click', function(e) {
            e.preventDefault();
            
            var $btn = $(this);
            var cvUrl = $btn.attr('href');
            var originalText = $btn.html();
            
            // Créer et afficher la modal de progression
            var progressModal = `
                <div class="cv-download-modal" id="cvDownloadModal">
                    <div class="cv-download-content">
                        <div class="cv-download-header">
                            <h4>Téléchargement du CV</h4>
                            <button class="cv-download-close">&times;</button>
                        </div>
                        <div class="cv-download-body">
                            <div class="progress-container">
                                <div class="progress-bar">
                                    <div class="progress-fill" id="progressFill"></div>
                                </div>
                                <div class="progress-text">
                                    <span id="progressPercent">0</span>%
                                    <span id="progressStatus">Préparation du téléchargement...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Ajouter la modal au body
            $('body').append(progressModal);
            
            // Afficher la modal avec animation
            setTimeout(function() {
                $('#cvDownloadModal').addClass('show');
            }, 100);
            
            // Simuler le téléchargement avec progression
            simulateDownload($btn, cvUrl, originalText);
        });
        
        // Fermer la modal
        $(document).on('click', '.cv-download-close', function() {
            $('#cvDownloadModal').removeClass('show');
            setTimeout(function() {
                $('#cvDownloadModal').remove();
            }, 300);
        });
        
        // Fermer en cliquant à l'extérieur
        $(document).on('click', '#cvDownloadModal', function(e) {
            if (e.target === this) {
                $(this).removeClass('show');
                setTimeout(function() {
                    $('#cvDownloadModal').remove();
                }, 300);
            }
        });
    }
    
    function simulateDownload($btn, cvUrl, originalText) {
        let progress = 0;
        const progressFill = $('#progressFill');
        const progressPercent = $('#progressPercent');
        const progressStatus = $('#progressStatus');
        
        const statusMessages = [
            'Préparation du téléchargement...',
            'Connexion au serveur...',
            'Téléchargement en cours...',
            'Presque terminé...',
            'Finalisation...'
        ];
        
        const interval = setInterval(function() {
            progress += Math.random() * 15 + 5; // Progression aléatoire entre 5 et 20%
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                progressFill.css('width', progress + '%');
                progressPercent.text(Math.round(progress));
                progressStatus.text('Téléchargement terminé !');
                
                // Démarrer le téléchargement réel
                setTimeout(function() {
                    // Créer un lien temporaire pour le téléchargement
                    const link = document.createElement('a');
                    link.href = cvUrl;
                    link.download = 'ASSIA E. Rodrigue CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Fermer la modal et réinitialiser le bouton
                    setTimeout(function() {
                        $('#cvDownloadModal').removeClass('show');
                        setTimeout(function() {
                            $('#cvDownloadModal').remove();
                            $btn.html(originalText).prop('disabled', false);
                        }, 300);
                    }, 1000);
                }, 500);
                
            } else {
                progressFill.css('width', progress + '%');
                progressPercent.text(Math.round(progress));
                
                // Mettre à jour le statut en fonction de la progression
                const statusIndex = Math.min(Math.floor(progress / 20), statusMessages.length - 1);
                progressStatus.text(statusMessages[statusIndex]);
            }
        }, 200);
    }

    /* ---------------------------------------------- /*
     * All Functions
    /* ---------------------------------------------- */
    // loadScript
    var _arr = {};

    function loadScript(scriptName, callback) {
        if (!_arr[scriptName]) {
            _arr[scriptName] = true;
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptName;
            // WEAn bind WEA event to WEA callback function
            // WEAre are several events for cross browser compatibility
            // script.onreadystatechange = callback;
            script.onload = callback;
            // fire WEA loading
            body.appendChild(script);
        } else if (callback) {
            callback();
        }
    };

    // Window on Load
    $(window).on("load", function() {
        WEA.masonry();
    });
    // Document on Ready
    $(document).ready(function() {
        WEA.particles(),
            WEA.HeaderFixd(),
            WEA.MenuClose(),
            WEA.Gallery(),
            WEA.ProgressBar(),
            WEA.mTypeIt(),
            WEA.PortfolioLoading(),
            WEA.ContactForm(),
            WEA.CVDownload(),
            WEA.one_page(),
            WEA.Counter(),
            WEA.Owl();
    });

    // Document on Scrool
    $(window).on("scroll", function() {
        WEA.ProgressBar(),
            WEA.HeaderFixd();
    });

    // Window on Resize
    $(window).on("resize", function() {});


})(jQuery);