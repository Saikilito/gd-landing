/*Theme Scripts */

(function($){ "use strict";
             
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });
             
/*=========================================================================
	Header
=========================================================================*/
    var primaryHeader = $('.primary-header'),
        headerClone = primaryHeader.clone();
    $('.header').after('<div class="sticky-header"></div>');
    $('.sticky-header').html(headerClone);
    var headerSelector = document.querySelector(".sticky-header");
    var burgerMenu = headerSelector.querySelectorAll('.line-menu');
    var handleLinkColor = headerSelector.querySelectorAll("a");
    var headroom = new Headroom(headerSelector, {
        offset: 100,
        onTop : function() {
            handleLinkColor.forEach(e=>{
                e.removeAttribute('style');
                e.setAttribute('style','color: white')
            });
            burgerMenu.forEach(e=>{
                e.removeAttribute('style');
                e.setAttribute('style',"background-color:white");
            })
        },
        onNotTop : function() {
            handleLinkColor.forEach((e,i)=>{
                if(handleLinkColor.length-1 === i) return null
                e.removeAttribute('style');
                e.setAttribute('style','color: #263a4f;');
            });
            burgerMenu.forEach(e=>{
                e.removeAttribute('style');
                e.setAttribute('style',"background-color:#000");
            })
        }
    });

    headroom.init();

    if ($('.primary-header').length) {
        $('.header .primary-header .burger-menu').on("click", function () {
            $(this).toggleClass('menu-open');
            $('.header .header-menu-wrap').slideToggle(300);
        });
        $('.sticky-header .primary-header .burger-menu').on("click", function () {
            $(this).toggleClass('menu-open');
            $('.sticky-header .header-menu-wrap').slideToggle(300);
        });
    }

    $('.header-menu-wrap ul li:has(ul)').each(function () {
        $(this).append('<span class="dropdown-plus"></span>');
        $(this).addClass('dropdown_menu');
    });

    $('.header-menu-wrap .dropdown-plus').on("click", function () {
        $(this).prev('ul').slideToggle(300);
        $(this).toggleClass('dropdown-open');
    });
    $('.header-menu-wrap .dropdown_menu a').append('<span></span>');

    // Responsive Classes
    function responsiveClasses() {
        var body = $('body');
        if ($(window).width() < 992) {
            body.removeClass('viewport-lg');
            body.addClass('viewport-sm');
        } else {
            body.removeClass('viewport-sm');
            body.addClass('viewport-lg');
        }
    }

    // Transparent Header
    function transparentHeader(){
        var header = $('.header.header-three'),
            headerHeight = header.height(),
            pageHeader = $('.page-header');
            pageHeader.css('padding-top', headerHeight + 'px');
    }

    //responsiveClasses();
    $(window).on("resize", function () {
        responsiveClasses();
        transparentHeader();
    }).resize();

    // Odometer JS
    $('.odometer').waypoint(
        function() {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        },
        {
            offset: "80%",
            triggerOnce: true
        }
    );

/*=========================================================================
	Main Slider
=========================================================================*/ 
    $(document).ready(function () {

        $('#main-slider').on('init', function(e, slick) {
            var $firstAnimatingElements = $('div.single-slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);    
        });
        $('#main-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
                  var $animatingElements = $('div.single-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
                  doAnimations($animatingElements);    
        });
        $('#main-slider').slick({
           autoplay: true,
           autoplaySpeed: 10000,
           dots: true,
           fade: true,
           prevArrow: '<div class="slick-prev"><i class="fa fa-chevron-left"></i></div>',
                nextArrow: '<div class="slick-next"><i class="fa fa-chevron-right"></i></div>'
        });
        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    });
             
/*=========================================================================
    Service Carousel
=========================================================================*/
    $('#service-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        smartSpeed: 800,
        nav: true,
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        dots: false,
        responsive : {
            0 : {
                items: 1
            },
            480 : {
                items: 1,
            },
            768 : {
                items: 2,
            },
            992 : {
                items: 4,
            }
        }
    });

/*=========================================================================
    Projects Carousel
=========================================================================*/
    $('#projects-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        smartSpeed: 500,
        nav: true,
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        dots: false,
        responsive : {
            0 : {
                items: 1
            },
            580 : {
                items: 2,
            },
            768 : {
                items: 2,
            },
            992 : {
                items: 4,
            }
        }
    });

/*=========================================================================
    Project Single Carousel
=========================================================================*/
    $('#project-single-carousel').owlCarousel({
        loop: true,
        margin: 5,
        autoplay: true,
        smartSpeed: 500,
        nav: false,
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        dots: true,
        responsive : {
            0 : {
                items: 1
            },
            480 : {
                items: 1,
            },
            768 : {
                items: 1,
            },
            992 : {
                items: 1,
            }
        }
    }); 

/*=========================================================================
    Sponsor Carousel
=========================================================================*/
    $('#sponsor-carousel').owlCarousel({
        loop: true,
        margin: 5,
        center: false,
        autoplay: true,
        smartSpeed: 500,
        nav: false,
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        dots: false,
        responsive : {
            0 : {
                items: 2
            },
            480 : {
                items: 3,
            },
            768 : {
                items: 3,
            },
            992 : {
                items: 6,
            }
        }
    });
             
/*=========================================================================
	Initialize smoothscroll plugin
=========================================================================*/
	smoothScroll.init({
		offset: 60
	});
	 
/*=========================================================================
	Scroll To Top
=========================================================================*/ 
    $(window).on( 'scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });

/*=========================================================================
	WOW Active
=========================================================================*/ 
   new WOW().init();

/*=========================================================================
    Active venobox
=========================================================================*/
    $('.img-popup').venobox({
        numeratio: true,
        infinigall: true
    });
    
/*=========================================================================
    Google Map Settings
=========================================================================*/
    if($("body").hasClass("contact-page")){
        google.maps.event.addDomListener(window, 'load', init);

        function init() {

            var mapOptions = {
                zoom: 11,
                center: new google.maps.LatLng(40.6700, -73.9400), 
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: false,
                styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
            };

            var mapElement = document.getElementById('google-map');

            var map = new google.maps.Map(mapElement, mapOptions);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.6700, -73.9400),
                map: map,
                title: 'Location!'
            });
        }
    }
    

})(jQuery);

/*=========================================================================
	FAQ
=========================================================================*/

const items = document.querySelectorAll(".accordion a");

function toggleAccordion(){
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}

items.forEach(item => item.addEventListener('click', toggleAccordion));