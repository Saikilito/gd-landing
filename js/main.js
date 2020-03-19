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
    autoplay: true,
    smartSpeed: 300,
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

  $('.owl-carousel').owlCarousel({loop: true,
    margin: 0,
    autoplay: true,
    smartSpeed: 300,
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
  })

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
  window.onload = async function() {
    new WOW({
      offset: 150
    }).init();

    $('#h-description').addClass("animated bounceInLeft");

    const hCarousel = $('#h-s-carousel')
    let timeClass = 1800;

    let hItems = document.querySelectorAll('.mh-item');
    hItems.forEach((e,i)=>{
      if(window.screen.width < 1200){
        hCarousel.addClass('d-none');
        timeClass = 500
      }
        e.classList.add('animated');
        e.classList.add('bounceInUp');
        e.classList.add(`h-delay-${i}`);
      });

    setTimeout(()=>{
      hCarousel.removeClass('d-none')
      hCarousel.addClass('owl-carousel owl-theme none-animation');
      hCarousel.stop()

      hCarousel.owlCarousel({
        loop:true,
        center:true,
        animateOut: false,
        animateIn: false,
        margin:0,
        autoplay: true,
        smartSpeed: 250,
        fallbackEasing:false,
        nav:false,
        responsive:{
          0: {
            items: 2
          },
          480: {
            items: 3
          },
          768: {
            items: 5
          },
          992: {
            items: 6
          }
        }
    });
    },timeClass)

  };
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
  Instagram
=========================================================================*/

if (window.location.pathname.split("/")[2] === "home.html") {
  const token = "2106374724.1677ed0.6dafced7f08244ba9572a4ae97280e84";
  const endpoint = "https://api.instagram.com/v1/users/self";

  let igContainer = $("#instagram-items");
  let indexIgItem = 0;

  // Call API Self and Set Info Instagram
  $(function() {
    axios
      .get(`${endpoint}/?access_token=${token}`)
      .then(({ data: { data: data } }) => {
        document.getElementById("bio-ig").innerHTML = `${data.bio}`;
      })
      .catch(err => {
        console.error(err);
      });
  });

  try {
    // Call API Media
    let postsArray = axios
      .get(`${endpoint}/media/recent?access_token=${token}`)
      .then(({ data: { data: posts } }) => posts)
      .catch(err => {
        console.error(err);
        throw new Error();
      });

    // Set firts posts
    postsArray &&
      postsArray
        .then(posts => {
          igContainer.empty();
          posts.forEach((e, i) => {
            if (window.screen.width < 500 && i < 4) {
              igContainer.append(
                post(e.images.low_resolution.url, e.link, e.videos)
              );
              indexIgItem = indexIgItem + 1;
            }
            if (window.screen.width > 500 && i < 9) {
              igContainer.append(
                post(e.images.low_resolution.url, e.link, e.videos)
              );
              indexIgItem = indexIgItem + 1;
            }
          });
        })
        .catch(err => {
          console.error(err);
          throw new Error();
        });

    // Set post per click
    indexIgItem = indexIgItem - 4;
    const loadButton = $("#loadMoreButton");
    loadButton.click(() => {
      loadButton.addClass('wow slideInDown')
      postsArray.then(posts => {
        posts.forEach((e, i) => {
          if (window.screen.width < 500) {
            if (
              indexIgItem + 1 < i &&
              i < indexIgItem + 4 &&
              i < posts.length
            ) {
              igContainer.append(
                post(e.images.low_resolution.url, e.link, e.videos, true)
              );
            }
          }
          if (window.screen.width > 500) {
            if (indexIgItem < i && i < indexIgItem + 4 && i < posts.length) {
              igContainer.append(
                post(e.images.low_resolution.url, e.link, e.videos,true)
              );
            }
          }
          if (indexIgItem + 3 >= posts.length - 1) {
            loadButton.addClass("d-none");
          }
        });
      });
      if (window.screen.width > 500) {
        indexIgItem = indexIgItem + 3;
      } else {
        indexIgItem = indexIgItem + 2;
      }
    });
  } catch (err) {
    console.error("Catch error: ", err);
  }
}

const post = (urlImage, linkPost, isVideo, animated) => {
  return `<div class="col-lg-4 col-sm-6 padding-15 loadMore ${animated? 'wow slideInUp':''}" ${animated? 'data-wow-delay="0.4s"':''}>
        <a href="${linkPost}" target="_blank" class="view-icon ajax-popup-link">
        <div class="project-item">
            ${(isVideo &&
              `<svg class="Svg-instagram-video-icon" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="play" role="img" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>`) ||
              ``}
                <img src="${urlImage}" data-original="${urlImage}" class="lazyload ig-post-img" alt="instagram-item" width="350" height="350" >
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
var spinnerModal1 = document.getElementById("spinner-loader-modal-1");
var btnModal1 = document.getElementById('form-1-btn-go');
var modalData = {};

modal1Form.addEventListener("submit", function(e) {
  e.preventDefault();

  var messenger = document.getElementById("messages-form");

  var service = modal1Form["service"].value;
  var fullname = modal1Form["fullname"].value;
  var adress = modal1Form["adress"].value;
  var zip = modal1Form["zip"].value;
  var emailModal1 = modal1Form["email"].value;
  var phone = modal1Form["phone"].value;

  if (service === "none") {
    console.log("service");
    messageError(messenger, "Please choose a service");
    return modal1Form["service"].focus();
  }
  if (fullname.length < 4) {
    console.log("fullname");
    messageError(messenger, "The name should have at least four (4) letters");
    return modal1Form["fullname"].focus();
  }
  if (adress.length < 10) {
    console.log("adress");
    messageError(messenger, "The adress should have at least ten (10) letters");
    return modal1Form["adress"].focus();
  }

  if (zip.length < 3 || zip === "") {
    console.log("zip");
    messageError(messenger, "The zip code is not valid");
    return modal1Form["zip"].focus();
  }
  if (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailModal1
    ) === false
  ) {
    console.log("email");
    messageError(messenger, "The email is not valid");
    return modal1Form["email"].focus();
  }
  if (phone.length < 9) {
    console.log("phone");
    messageError(
      messenger,
      "The phone should have <br> at least nine (9) digits"
    );
    return modal1Form["phone"].focus();
  }

  modalData = {
    service,
    fullname,
    adress,
    zip,
    email: emailModal1,
    phone
  };

  console.log(modalData);

  try {
    requestData("estimate_1", modalData, "modal-1", spinnerModal1);
  } catch (error) {
    console.error(error);
  }

  modal1Form.reset();
});

var modal1twoForm = document.getElementById("modal-1-two-form");
var spinnerModal2 = document.getElementById("spinner-loader-modal-2");

modal1twoForm.addEventListener("submit", function(e) {
  e.preventDefault();

  var messenger = document.getElementById("messages-form-two");
  var emergency = modal1twoForm["inputEmergencySelect"].value;
  var owner = modal1twoForm["inputOwnerSelect"].value;
  var project = modal1twoForm["textAreaProject"].value;

  if (project.length < 15) {
    console.log("Project");
    messageError(
      messenger,
      "The text should have <br> at least fifteen (15) letters"
    );
    return modal1twoForm["textAreaProject"].focus();
  }

  modalData = {
    ...modalData,
    emergency,
    owner,
    project
  };

  console.log(modalData);

  try {
    requestData("estimate_2", modalData, "modal-2", spinnerModal2);
  } catch (error) {
    console.error(error);
  }

  modal1twoForm.reset();
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
  var spinnerContracttor = document.getElementById("spinner-contractor");

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

    messenger.innerHTML = "";

    if (companyName.length < 4) {
      return messageError(
        messenger,
        "The name should have at least four (4) letters"
      );
    }
    if (name.length < 4) {
      return messageError(
        messenger,
        "The name should have at least four (4) letters"
      );
    }
    if (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) === false
    ) {
      return messageError(messenger, "Invalid Email");
    }
    if (phone.length < 7) {
      return messageError(
        messenger,
        "The phone should have at least four (7) numbers"
      );
    }
    if (altPhone.length < 7) {
      return messageError(
        messenger,
        "The alternative phone should have at least four (7) numbers"
      );
    }
    if (specialties.length < 5) {
      return messageError(
        messenger,
        "The Specialties must be at least five (5) characters long"
      );
    }
    if (location.length < 5) {
      return messageError(
        messenger,
        "The Location must be at least five (5) characters long"
      );
    }
    if (licenseNumber.length < 7) {
      return messageError(
        messenger,
        "The License Number must be at least seven (7) characters long"
      );
    }
    if (zipCode < parseInt(9)) {
      return messageError(messenger, "The Zip Code is not valid");
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

    try {
      requestData("contractor", data, messenger, spinnerContracttor);
    } catch (error) {
      console.error(error);
    }

    contractForm.reset();
  });
}

/*=========================================================================
	Contact Form
=========================================================================*/
if (window.location.pathname.split("/")[2] === "home.html") {
  var contactForm = document.getElementById("contact-form");
  var messenger = document.getElementById("contact-form-messages");
  var spinnerContact = document.getElementById("spinner-contact");
  contactForm.addEventListener("submit", function(e) {
    console.log(spinnerContact);
    e.preventDefault();

    var name = contactForm["name"].value;
    var email = contactForm["email"].value;
    var message = contactForm["message"].value;

    messenger.innerHTML = "";

    if (name.length < 4) {
      return messageError(
        messenger,
        "The name should have at least four (4) letters"
      );
    }

    if (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) === false
    ) {
      return messageError(messenger, "Invalid Email");
    }

    if (message.length < 20) {
      return messageError(
        messenger,
        "The message must be at least 20 characters long"
      );
    }

    const data = {
      name,
      email,
      message
    };

    try {
      requestData("message", data, messenger, spinnerContact);
    } catch (error) {
      console.error(error);
    }

    contactForm.reset();
  });
}

function messageSuccess(e) {
  $("#modal-4").modal("show");
  e.classList.remove("alert-danger");
  e.classList.add("alert-success");
  e.innerHTML =
    "Your message has been sent successfully, we will contact you soon.";
}

function messageError(e, message) {
  e.innerHTML = message;
  e.classList.remove("d-none");
  return setTimeout(function() {
    e.innerHTML = "";
    e.classList.add("d-none");
  }, 8000);
}

async function requestData(URI, data, messenger, spinner) {
  var URI_PROD = `https://nextgraphtest.firebaseapp.com/api/landing/email/${URI}`;
  //var URI_DEV = `http://localhost:5000/api/landing/email/${URI}`;
  //var URI_TEST = `http://localhost:5001/nextgraphtest/us-central1/app/api/landing/email/${URI}`;

  console.log(messenger);
  spinner.classList.remove("d-none");

  try {
    await fetch(URI_PROD, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ ...data })
    })
      .then(res => {
        console.log("Message Success: ", res);
        spinner.classList.add("d-none");

        if (messenger === "modal-1") {
          $("#modal-1").modal("hide");
          $("#modal-1-two").modal("show");
        } else if (messenger === "modal-2") {
          $("#modal-1-two").modal("toggle");
          $("#modal-2").modal("show");
        } else {
          return messageSuccess(messenger);
        }

        if (res.status >= 400) {
          $("#modal-5").modal("show");
        }
      })
      .catch(err => {
        $("#modal-5").modal("show");
        console.log("Dimelo flow");
        console.error(err);
        spinner.classList.add("d-none");
      });
  } catch (error) {
    console.log(error);
    $("#modal-5").modal("show");
  }
}

$("hause-services").fadeIn();
