(function($) {
    "use strict";
/*--------------------------
Header Top JS
---------------------------- */
    $(".search-icon").on('click', function(){
        $(".header-bottom-search").slideToggle();
        $(".header-setting-inner").css("display","none");
    });
    $(".setting-inner").on('click', function(){
        $(".header-setting-inner").slideToggle();
        $(".header-bottom-search").css("display","none");
    });

/*--------------------------
 scrollUp
---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

/*--------------------------
 collapse
---------------------------- */ 
    $(".panel-heading a").on("click", function(){
        $(".panel-heading a").removeClass("active");
        $(this).addClass("active");
    });

/*----------------------------
 Mobile Menu
------------------------------ */
    if ($(".mobile-menu nav").length > 0) {
        $('.mobile-menu nav').meanmenu({
            meanScreenWidth: "992",
            meanMenuContainer: ".mobile-menu",
        });
    }

/*----------------------------
 BestSeller owl carousel active
------------------------------ */
    //$(".new-product-owl-active").owlCarousel({
    //    autoPlay: false,
    //    slideSpeed: 2000,
    //    pagination: false,
    //    navigation: false,
    //    items: 4,
    //    /* transitionStyle : "fade", */
    //    /* [This code for animation ] */
    //    navigationText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
    //    itemsDesktop: [1199, 4],
    //    itemsDesktopSmall: [991, 3],
    //    itemsTablet: [767, 1],
    //    itemsMobile: [479, 1],
    //});

/*----------------------------
 Testimonial owl carousel active
------------------------------ */
    //$(".active-tesimonial-carousel").owlCarousel({
    //    autoPlay: true,
    //    slideSpeed: 2000,
    //    pagination: false,
    //    navigation: false,
    //    items: 1,
    //    /* transitionStyle : "fade", */
    //    /* [This code for animation ] */
    //    navigationText: ["<i class='pe-7s-way'></i>", "<i class='fa fa-angle-right'></i>"],
    //    itemsDesktop: [1199, 1],
    //    itemsDesktopSmall: [991, 1],
    //    itemsTablet: [767, 1],
    //    itemsMobile: [479, 1],
    //});

/*----------------------------
 Brand Logo owl carousel active
------------------------------ */
    //$(".logo-carousel").owlCarousel({
    //    autoPlay: true,
    //    slideSpeed: 2000,
    //    pagination: false,
    //    navigation: false,
    //    items: 5,
    //    /* transitionStyle : "fade", */
    //    /* [This code for animation ] */
    //    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    //    itemsDesktop: [1199, 4],
    //    itemsDesktopSmall: [991, 3],
    //    itemsTablet: [767, 2],
    //    itemsMobile: [479, 1],
    //});

/*----------------------------
 Home v-3 owl carousel active
------------------------------ */
    //$(".active-slider-carousel").owlCarousel({
    //    autoPlay: true,
    //    slideSpeed: 2000,
    //    pagination: false,
    //    navigation: false,
    //    items: 4,
    //    /* transitionStyle : "fade", */
    //    /* [This code for animation ] */
    //    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    //    itemsDesktop: [1199, 4],
    //    itemsDesktopSmall: [991, 3],
    //    itemsTablet: [767, 2],
    //    itemsMobile: [479, 1],
    //});

/*----------------------------
 Blog Carousel active
------------------------------ */
    //$(".blog-carousel").owlCarousel({
    //    autoPlay: false,
    //    slideSpeed: 2000,
    //    pagination: false,
    //    navigation: true,
    //    items: 1,
    //    /* transitionStyle : "fade", */
    //    /* [This code for animation ] */
    //    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    //    itemsDesktop: [1199, 1],
    //    itemsDesktopSmall: [991, 1],
    //    itemsTablet: [767, 1],
    //    itemsMobile: [479, 1],
    //});

/*----------------------------
 Price Slider active
------------------------------ */
    if ($("#slider-range").length > 0) {
        $("#slider-range").slider({
            range: true,
            min: 40,
            max: 1600,
            values: [100, 999],
            slide: function(event, ui) {
                $("#amount").val("£" + ui.values[0] + " - £" + ui.values[1]);
            }
        });
        $("#amount").val("£" + $("#slider-range").slider("values", 0) +
            " - £" + $("#slider-range").slider("values", 1));
    }

/*----------------------------
 cart-plus-minus-button
------------------------------ */
    $(".cart-plus-minus").append('<div class="dec qtybutton">-</i></div><div class="inc qtybutton">+</div>');

    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find("input").val(newVal);
    });

/*----------------------------
 Slick carousel active
------------------------------ */
    $('.single-thumbnail-big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.single-thumbnail-small'
    });
    $('.single-thumbnail-small').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.single-thumbnail-big',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        arrows: true,
        prevArrow: '<button type="button" class="custom-prev"><i class="fa fa-long-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="custom-next"><i class="fa fa-long-arrow-right"></i></button>'
    });
    
})(jQuery);