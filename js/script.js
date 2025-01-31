$(window).on("load", function () {
  $(".loader .inner").fadeOut(500, function () {
    $(".loader").fadeOut(750);
  });

  $(".items").isotope({
    filter: "*",
    animationOptions: {
      duration: 1500,
      easing: "linear",
      queue: false,
    },
  });
});

// superslides code for slider header
$(document).ready(function () {
  $("#slides").superslides({
    Animation: "fade",
    play: 5000,
    pagination: false,
  });

  // Typed
  var typed = new Typed(".typed", {
    // Dynamic Skills
    strings: [
      "Software Engineer.",
      "Web Developer.",
      "MS Computer Science.",
      "Full Stack Developer",
      "Database System",
    ],
    typeSpeed: 70,
    loop: true,
    startDelay: 1000,
    showCursor: false,
  });

  // owlCarousel
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4,
    // margin: 10,
    // nav: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      938: {
        items: 4,
      },
    },
  });

  // easy pie chart jquery
  $(".chart").easyPieChart({
    easing: "easeInOut",
    barColor: "#fff",
    trackColor: false,
    scaleColor: false,
    lineWidth: 4,
    size: 152,
    onStep: function (from, to, percent) {
      $(this.el).find(".percent").text(Math.round(percent));
    },
  });

  // make skills roll after scrolling down to it
  var skillsTopOffset = $(".skills-section").offset().top;
  var statsTopOffset = $(".stats-section").offset().top;
  var countUpFinished = false;

  $(window).scroll(function () {
    if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
      $(".chart").easyPieChart({
        easing: "easeInOut",
        barColor: "#fff",
        trackColor: false,
        // scaleColor: false,
        lineWidth: 4,
        size: 152,
        onStep: function (from, to, percent) {
          $(this.el).find(".percent").text(Math.round(percent));
        },
      });
    }

    // countup plugin  here =============================
    // make number count up
    if (
      !countUpFinished &&
      window.pageYOffset > statsTopOffset - $(window).height() + 200
    ) {
      $(".counter").each(function () {
        var element = $(this);
        var endVal = parseInt(element.text());
        element.countup(endVal);
      });

      countUpFinished = true;
    }
  });

  // fancybox js here
  $("[data-fancybox]").fancybox();

  // filter portfolio items
  $("#filters a").click(function () {
    $("#filters .current").removeClass("current");
    $(this).addClass("current");
    var selector = $(this).attr("data-filter");

    //  call isotope
    $(".items").isotope({
      filter: selector,
      animationOptions: {
        duration: 1500,
        easing: "linear",
        queue: false,
      },
    });

    return false;
  });

  // Transition b/w nav
  $("#navigation li a").click(function (e) {
    e.preventDefault();

    var targetElement = $(this).attr("href");
    var targetPosition = $(targetElement).offset().top;
    $("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");
  });

  // nav stickyNavigation here;
  const nav = $("#navigation");
  const navTop = nav.offset().top;

  $(window).on("scroll", stickyNavigation);

  function stickyNavigation() {
    var body = $("body");

    if ($(window).scrollTop() >= navTop) {
      body.css("padding-top", nav.outerHeight() + "px");
      body.addClass("fixedNav");
    } else {
      body.css("padding-top", 0);
      body.removeClass("fixedNav");
    }
  }
});

//  <==================    GREETING SECTION ========================================================>
// Greeting Section
function celsiusToFahr(temperature) {
  let fahr = (temperature * 9) / 5 + 32; // f = (c * 9/5) + 32
  return fahr;
}

/**
 * Functions
 * to get degree symbol, hold alt + 0176
 */
function greetingHandler() {
  // celsiusToFahr(34); // call the function
  let currentHour = new Date().getHours();
  let greetingText;
  if (currentHour < 12) {
    greetingText = "Good Morning!";
  } else if (currentHour < 19) {
    greetingText = "Good Afternoon";
  } else if (currentHour < 24) {
    greetingText = "Good Evening";
  } else {
    greetingText = "Welcome";
  }

  console.log(currentHour);

  const weatherCondition = "sunny";
  const userLocation = "Ankeny, Iowa";
  let temperature = 36;
  let celsiusText = `The weather is ${weatherCondition}  in ${userLocation} and it's ${temperature.toFixed(
    1
  )}°C outside here.`;

  let fahrText = `The weather is ${weatherCondition}  in ${userLocation} and it's ${celsiusToFahr(
    temperature
  ).toFixed(1)}°F outside here.`;

  document.querySelector("#greeting").innerHTML = greetingText;
  document.querySelector("p#weather").innerHTML = celsiusText;

  document
    .querySelector(".weather-group")
    .addEventListener("click", function (e) {
      // (e) = means event
      if (e.target.id == "celsius") {
        document.querySelector("p#weather").innerHTML = celsiusText;
      } else if (e.target.id == "fahr") {
        document.querySelector("p#weather").innerHTML = fahrText;
      }
    });
}

//  <==================    LOCAL TIME SECTION ====================================================>
// working on local time
//  .toString().padStart(2,"0") add '0' to the beginning of the time
// if the time has only one digit ( eg. 1 = 01)
function clockHandler() {
  setInterval(function () {
    let localTime = new Date(); // create a new local time
    document.querySelector("span[data-time=hours]").textContent = localTime
      .getHours()
      .toString()
      .padStart(2, "0"); // get only the hour
    document.querySelector("span[data-time=minutes]").textContent = localTime
      .getMinutes()
      .toString()
      .padStart(2, "0"); //get the minutes
    document.querySelector("span[data-time=seconds]").textContent = localTime
      .getSeconds()
      .toString()
      .padStart(2, "0"); // get the seconds
  }, 1000); // 1000 = miliseconds, which is == 1 second
}

greetingHandler();
clockHandler();
