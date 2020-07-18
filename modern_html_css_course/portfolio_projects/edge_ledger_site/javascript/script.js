(function (exports) {
  "use strict";
  function initMap() {
    exports.map = new google.maps.Map(document.querySelector('.map'), {
      center: {
        lat: 42.360081,
        lng: -71.058884
      },
      zoom: 14
    });
  }
  exports.initMap = initMap;
})((this.window = this.window || {}));

$(document).ready(function () {
  // Add smooth scrolling to all links
  $('.navbar a, .btn-nav').on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      const hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      const scrollTo = $(hash).offset().top - 100;
      $('html, body').animate({
        scrollTop: scrollTo
      }, 900, function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        // window.location.hash = hash; // commented because layout jumping
      });
    } // End if
  });
});

window.addEventListener('scroll', function () {
  if(window.scrollY > 150) {
    document.querySelector('.navbar').style.opacity = 0.9;
  } else {
    document.querySelector('.navbar').style.opacity = 1;
  }
})