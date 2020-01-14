/*Theme Scripts */

(function($) {
  "use strict";

  $(window).on("load", function() {
    $("body").addClass("loaded");

    if (window.location.pathname.split("/")[2] === "home.html") {
      var band = false;
      $(window).on("scroll", function() {
        var countBand = document.getElementById("count");
        var position = countBand.getBoundingClientRect().top;

        if (position < 0 && !band) {
          band = true;
          $("#modal-3").modal("show");
        }
      });
    }
  });

  /*=========================================================================
	Header
=========================================================================*/
  var primaryHeader = $(".primary-header"),
    headerClone = primaryHeader.clone();
  $(".header").after('<div class="sticky-header"></div>');
  $(".sticky-header").html(headerClone);
  var headerSelector = document.querySelector(".sticky-header");
  var burgerMenu = headerSelector.querySelectorAll(".line-menu");
  var handleLinkColor = headerSelector.querySelectorAll("a");
  var headroom = new Headroom(headerSelector, {
    offset: 100,
    onTop: function() {
      handleLinkColor.forEach(e => {
        e.removeAttribute("style");
        e.setAttribute("style", "color: white");
      });
      burgerMenu.forEach(e => {
        e.removeAttribute("style");
        e.setAttribute("style", "background-color:white");
      });
    },
    onNotTop: function() {
      handleLinkColor.forEach((e, i) => {
        if (handleLinkColor.length - 1 === i) return null;
        e.removeAttribute("style");
        e.setAttribute("style", "color: #263a4f;");
      });
      burgerMenu.forEach(e => {
        e.removeAttribute("style");
        e.setAttribute("style", "background-color:#263a4fb8");
      });
    }
  });

  headroom.init();

  if ($(".primary-header").length) {
    $(".header .primary-header .burger-menu").on("click", function() {
      $(this).toggleClass("menu-open");
      $(".header .header-menu-wrap").slideToggle(300);
    });
    $(".sticky-header .primary-header .burger-menu").on("click", function() {
      $(this).toggleClass("menu-open");
      $(".sticky-header .header-menu-wrap").slideToggle(300);
    });
  }

  $(".header-menu-wrap ul li:has(ul)").each(function() {
    $(this).append('<span class="dropdown-plus"></span>');
    $(this).addClass("dropdown_menu");
  });

  $(".header-menu-wrap .dropdown-plus").on("click", function() {
    $(this)
      .prev("ul")
      .slideToggle(300);
    $(this).toggleClass("dropdown-open");
  });
  $(".header-menu-wrap .dropdown_menu a").append("<span></span>");

  // Responsive Classes
  function responsiveClasses() {
    var body = $("body");
    if ($(window).width() < 992) {
      body.removeClass("viewport-lg");
      body.addClass("viewport-sm");
    } else {
      body.removeClass("viewport-sm");
      body.addClass("viewport-lg");
    }
  }

  // Transparent Header
  function transparentHeader() {
    var header = $(".header.header-three"),
      headerHeight = header.height(),
      pageHeader = $(".page-header");
    pageHeader.css("padding-top", headerHeight + "px");
  }

  //responsiveClasses();
  $(window)
    .on("resize", function() {
      responsiveClasses();
      transparentHeader();
    })
    .resize();

  // Odometer JS
  $(".odometer").waypoint(
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

  $(document).ready(function() {
    $("#main-slider").on("init", function(e, slick) {
      var $firstAnimatingElements = $("div.single-slide:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    $("#main-slider").on("beforeChange", function(
      e,
      slick,
      currentSlide,
      nextSlide
    ) {
      var $animatingElements = $(
        'div.single-slide[data-slick-index="' + nextSlide + '"]'
      ).find("[data-animation]");
      doAnimations($animatingElements);
    });
    $("#main-slider").slick({
      autoplay: true,
      autoplaySpeed: 10000,
      dots: true,
      fade: true,
      prevArrow:
        '<div class="slick-prev"><i class="fa fa-chevron-left"></i></div>',
      nextArrow:
        '<div class="slick-next"><i class="fa fa-chevron-right"></i></div>'
    });
    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function() {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay
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
  $("#service-carousel").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: false,
    smartSpeed: 800,
    nav: true,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>'
    ],
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 4
      }
    }
  });

  /*=========================================================================
    Projects Carousel
=========================================================================*/
  $("#projects-carousel").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: false,
    smartSpeed: 500,
    nav: true,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>'
    ],
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      580: {
        items: 2
      },
      768: {
        items: 2
      },
      992: {
        items: 4
      }
    }
  });

  /*=========================================================================
    Project Single Carousel
=========================================================================*/
  $("#project-single-carousel").owlCarousel({
    loop: true,
    margin: 5,
    autoplay: true,
    smartSpeed: 500,
    nav: false,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>'
    ],
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 1
      }
    }
  });

  /*=========================================================================
    Sponsor Carousel
=========================================================================*/
  $("#sponsor-carousel").owlCarousel({
    loop: true,
    margin: 5,
    center: false,
    autoplay: true,
    smartSpeed: 500,
    nav: false,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>'
    ],
    dots: false,
    responsive: {
      0: {
        items: 2
      },
      480: {
        items: 3
      },
      768: {
        items: 3
      },
      992: {
        items: 6
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

  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 100) {
      $("#scroll-to-top").fadeIn();
    } else {
      $("#scroll-to-top").fadeOut();
    }
  });

  /*=========================================================================
	WOW Active
=========================================================================*/

  new WOW().init();

  /*=========================================================================
    Active venobox
=========================================================================*/
  $(".img-popup").venobox({
    numeratio: true,
    infinigall: true
  });

  /*=========================================================================
    Google Map Settings
=========================================================================*/
  if ($("body").hasClass("contact-page")) {
    google.maps.event.addDomListener(window, "load", init);

    function init() {
      var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(40.67, -73.94),
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [{ saturation: "-100" }]
          },
          {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              { saturation: -100 },
              { lightness: 65 },
              { visibility: "on" }
            ]
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              { saturation: -100 },
              { lightness: "50" },
              { visibility: "simplified" }
            ]
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: "-100" }]
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }]
          },
          {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [{ lightness: "30" }]
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [{ lightness: "40" }]
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ saturation: -100 }, { visibility: "simplified" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              { hue: "#ffff00" },
              { lightness: -25 },
              { saturation: -97 }
            ]
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [{ lightness: -25 }, { saturation: -100 }]
          }
        ]
      };

      var mapElement = document.getElementById("google-map");
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.67, -73.94),
        map: map,
        title: "Location!"
      });
    }
  }
})(jQuery);

/*=========================================================================
	FAQ
=========================================================================*/

const items = document.querySelectorAll(".accordion a");

function toggleAccordion() {
  this.classList.toggle("active");
  this.nextElementSibling.classList.toggle("active");
}

/*=========================================================================
	Footer
=========================================================================*/

items.forEach(item => item.addEventListener("click", toggleAccordion));
var year = new Date().getFullYear();
document.getElementById("footer-year").innerHTML = year;

/*=========================================================================
	Fake Instagram Data
=========================================================================*/

if (window.location.pathname.split("/")[2] === "home.html") {
  let instagramContainer = document.getElementById("instagram-items");
  const token = "2106374724.1677ed0.6dafced7f08244ba9572a4ae97280e84";
  const endpoint = "https://api.instagram.com/v1/users/self/media/recent";
  const limit = 12;
  axios
    .get(`${endpoint}?access_token=${token}&count=${limit}`)
    .then(({ data: { data: posts } }) => {
      //console.log(posts);
      instagramContainer.innerHTML = ``;
      posts.forEach(e => {
        instagramContainer.innerHTML += post(
          e.images.low_resolution.url,
          e.link,
          e.videos
        );
      });
    })
    .catch(e => {
      console.error(e);
    });

  $(function() {
    axios
      .get(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
      .then(({ data: { data: data } }) => {
        document.getElementById("bio-ig").innerHTML = `${data.bio}`;
      })
      .catch(e => {
        console.error(e);
      });
  });
}

const post = (urlImage, linkPost, isVideo) => {
  return `<div class="col-lg-4 col-sm-6 padding-15">
        <a href="${linkPost}" target="_blank" class="view-icon ajax-popup-link">
        <div class="project-item">
            ${(isVideo &&
              `<svg class="Svg-instagram-video-icon" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="play" role="img" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>`) ||
              ``}
                <img src="${urlImage}" class="ig-post-img" alt="projects">
                <!--div class="overlay"></div>
                <a href="${linkPost}" target="_blank" class="view-icon ajax-popup-link"> <i class="fas fa-expand"></i></a>
                <div class="projects-content">
                    <a href="${linkPost}" class="category">GD Instagram</a>
                    <h3><a href="${linkPost}" class="tittle">Go to Instagram</a></h3>
                </div-->            
            </div>
            </a>    
        </div>`;
};

/*=========================================================================
	Modals
=========================================================================*/
var modal1Form = document.getElementById("modal-1-form");
modal1Form.addEventListener("submit", function(e) {
  e.preventDefault();

  var service = modal1Form["service"].value;
  var fullname = modal1Form["fullname"].value;
  var adress = modal1Form["adress"].value;
  var zip = modal1Form["zip"].value;
  var emailModal1 = modal1Form["email"].value;
  var phone = modal1Form["phone"].value;

  var data = {
    service,
    fullname,
    adress,
    zip,
    email: emailModal1,
    phone
  };
  modal1Form.reset();
  $("#modal-1").modal("toggle");
  $("#modal-2").modal("show");
});

if (window.location.pathname.split("/")[2] === "home.html") {
  var estimateModal = document.getElementById("get-estimate-modal");
  estimateModal.addEventListener("click", function() {
    $("#modal-3").modal("toggle");
    $("#modal-1").modal("show");
  });
}

/*=========================================================================
	Contractor Form
=========================================================================*/
if (window.location.pathname.split("/")[2] === "contractor.html") {
  
  var contractForm = document.getElementById("contractor-form");
  var messenger = document.getElementById("contract-form-messages");

  contractForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var companyName = contractForm["company-name"].value;
    var name = contractForm["name"].value;
    var email = contractForm["email"].value;
    var phone = contractForm["phone"].value;
    var altPhone = contractForm["alt-phone"].value;
    var specialties = contractForm["specialties"].value;
    var location = contractForm["location"].value;
    var licenseNumber = contractForm["license-number"].value;
    var financing = contractForm["financing"].value;
    var zipCode = contractForm["zip-code"].value;

    if (name.length < 4) {
      messenger.innerHTML = "";
      messenger.innerHTML = "The name should have at least four (4) letters";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }

    var data = {
      companyName,
      name,
      email,
      phone,
      altPhone,
      specialties,
      location,
      licenseNumber,
      financing,
      zipCode
    };
    
    messenger.innerHTML = "";

    if (companyName.length < 4) {
      messenger.innerHTML = "The name should have at least four (4) letters";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }

    if (name.length < 4) {
      messenger.innerHTML = "The name should have at least four (4) letters";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }

    if (phone.length < 7) {
      messenger.innerHTML = "The phone should have at least four (7) numbers";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }

    if (altPhone.length < 7) {
      messenger.innerHTML = "The alternative phone should have at least four (7) numbers";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }
  
    if (specialties.length < 5) {
      messenger.innerHTML = "The Specialties must be at least 5 characters long";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }

    if (location.length < 5) {
      messenger.innerHTML = "The Location must be at least 5 characters long";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }

    if (licenseNumber.length < 12) {
      messenger.innerHTML = "The License Number must be at least 12 characters long";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }

    console.log(data)
    messageSuccess(messenger);
    contractForm.reset();
  });
}

/*=========================================================================
	Contact Form
=========================================================================*/
if (window.location.pathname.split("/")[2] === "home.html"){
  var contactForm = document.getElementById("contact-form");
  var messenger = document.getElementById("contact-form-messages");
  
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
  
    var name = contactForm["name"].value;
    var email = contactForm["email"].value;
    var message = contactForm["message"].value;
  
    if (name.length < 4) {
      messenger.innerHTML = "";
      messenger.innerHTML = "The name should have at least four (4) letters";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }
  
    if (message.length < 20) {
      messenger.innerHTML = "";
      messenger.innerHTML = "The message must be at least 20 characters long";
      messenger.classList.remove("d-none");
      return setTimeout(function(){clearMessageError(messenger)}, 8000);
    }
    /*
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(email) === false){
      messenger.innerHTML = "";
      messenger.innerHTML = "Invalid Email";
      messenger.classList.remove("d-none");
    }
    */
  
    var data = {
      name,
      email,
      message
    };
    //console.log(data);
  
    messageSuccess(messenger);
    contactForm.reset();
  });
}

function clearMessageError(e) {
  e.innerHTML = "";
  e.classList.add("d-none");
}

function messageSuccess(e){
  console.log(e)
  $('#modal-4').modal('show');
  e.classList.remove('alert-danger');
  e.classList.add('alert-success');
  e.innerHTML = 'Your message has been sent successfully, we will contact you soon.';
}