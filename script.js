
gsap.registerPlugin(ScrollTrigger);

/* =========================
   SELECT ELEMENTS
========================= */

const loader = document.querySelector(".loader");
const loaderProgress = document.querySelector(".loader-progress");

const cursor = document.querySelector(".cursor");
const spotlight = document.querySelector(".spotlight");

const heroTitle = document.querySelectorAll(".hero-heading .line > span");
const heroImage = document.querySelector(".hero-visual img");

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");


/* =========================
   PRELOADER ANIMATION
========================= */

const loadingAnimation = gsap.timeline();

loadingAnimation
  .to(loaderProgress, {
    width: "100%",
    duration: 1.8,
    ease: "power2.inOut"
  })
  .to(".loader-content", {
    scale: 1.1,
    opacity: 0,
    duration: 0.4
  })
  .to(loader, {
    yPercent: -100,
    duration: 1,
    ease: "power4.inOut"
  });

  
/* =========================
   HERO TEXT REVEAL
========================= */

gsap.from(heroTitle, {
  yPercent: 120,
  duration: 1.4,
  stagger: 0.15,
  ease: "power4.out",
  delay: 2
});


/* =========================
   HERO IMAGE REVEAL
========================= */

gsap.from(".hero-visual", {
  clipPath: "inset(100% 0% 0% 0%)",
  duration: 1.5,
  ease: "power4.inOut",
  delay: 2.2
});

gsap.to(heroImage, {
  scale: 1,
  duration: 2,
  ease: "power3.out",
  delay: 2.2
});


/* =========================
   CUSTOM CURSOR FOLLOW
========================= */

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

const cursorSpeed = 0.15;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  gsap.to(spotlight, {
    "--x": mouseX + "px",
    "--y": mouseY + "px",
    duration: 0.5,
    ease: "power2.out"
  });
});

function animateCursor() {

  cursorX += (mouseX - cursorX) * cursorSpeed;
  cursorY += (mouseY - cursorY) * cursorSpeed;

  gsap.set(cursor, {
    x: cursorX,
    y: cursorY
  });

  requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================
   CURSOR HOVER ANIMATION
========================= */

const hoverElements = document.querySelectorAll(
  "a, button, .project-image, .service"
);

hoverElements.forEach((element) => {

  element.addEventListener("mouseenter", () => {

    cursor.classList.add("active");

    const cursorText = cursor.querySelector("span");

    if (element.classList.contains("cursor-view")) {
      cursorText.textContent = "VIEW";
    } else {
      cursorText.textContent = "↗";
    }

    gsap.to(cursor, {
      scale: 1,
      duration: 0.4,
      ease: "power3.out"
    });

  });

  element.addEventListener("mouseleave", () => {

    cursor.classList.remove("active");

    gsap.to(cursor, {
      scale: 0,
      duration: 0.3,
      ease: "power2.in"
    });

  });

});


/* =========================
   IMAGE PARALLAX ON SCROLL
========================= */

gsap.to(heroImage, {
  yPercent: 15,

  ease: "none",

  scrollTrigger: {
    trigger: ".hero-visual",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});


/* =========================
   SECTION REVEAL
========================= */

gsap.utils.toArray(".section").forEach((section) => {

  gsap.from(section.querySelectorAll(
    ".section-meta, h2, .about-content, .projects, .services-list, .contact-button"
  ), {
    y: 70,
    opacity: 0,

    duration: 1,
    stagger: 0.15,

    ease: "power3.out",

    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

});


/* =========================
   PROJECT IMAGE REVEAL
========================= */

gsap.utils.toArray(".project-image").forEach((image) => {

  gsap.from(image, {
    clipPath: "inset(0% 0% 100% 0%)",

    duration: 1.2,
    ease: "power4.inOut",

    scrollTrigger: {
      trigger: image,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });

});


/* =========================
   PROJECT IMAGE PARALLAX
========================= */

gsap.utils.toArray(".project-image img").forEach((image) => {

  gsap.to(image, {
    yPercent: -10,
    ease: "none",

    scrollTrigger: {
      trigger: image,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });

});


/* =========================
   SERVICE TEXT REVEAL
========================= */

gsap.utils.toArray(".service").forEach((service, index) => {

  gsap.from(service.children, {
    y: 40,
    opacity: 0,

    duration: 0.8,
    stagger: 0.1,

    ease: "power3.out",

    scrollTrigger: {
      trigger: service,
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });

});


/* =========================
   COUNTER ANIMATION
========================= */

document.querySelectorAll(".counter").forEach((counter) => {

  const target = Number(counter.dataset.target);

  gsap.fromTo(counter, {
    innerText: 0
  }, {
    innerText: target,

    duration: 2,
    ease: "power1.out",

    snap: {
      innerText: 1
    },

    scrollTrigger: {
      trigger: counter,
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });

});


/* =========================
   MAGNETIC BUTTON EFFECT
========================= */

document.querySelectorAll(".scroll-circle, .contact-button").forEach((button) => {

  button.addEventListener("mousemove", (event) => {

    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.2,
      y: y * 0.2,

      duration: 0.4,
      ease: "power2.out"
    });

  });

  button.addEventListener("mouseleave", () => {

    gsap.to(button, {
      x: 0,
      y: 0,

      duration: 0.6,
      ease: "elastic.out(1, 0.4)"
    });

  });

});


/* =========================
   MOBILE MENU
========================= */

let menuOpen = false;

menuButton.addEventListener("click", () => {

  menuOpen = !menuOpen;

  if (menuOpen) {

    navigation.style.display = "flex";

    gsap.fromTo(navigation, {
      opacity: 0,
      y: -20
    }, {
      opacity: 1,
      y: 0,

      duration: 0.4,
      ease: "power3.out"
    });

    navigation.classList.add("mobile-navigation");

    menuButton.innerHTML = "<span>CLOSE</span><span>−</span>";

  } else {

    gsap.to(navigation, {
      opacity: 0,
      y: -20,

      duration: 0.3,

      onComplete: () => {
        navigation.style.display = "none";
        navigation.classList.remove("mobile-navigation");
      }
    });

    menuButton.innerHTML = "<span>MENU</span><span>+</span>";

  }

});


/* CLOSE MOBILE MENU AFTER CLICK */

navigation.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    if (window.innerWidth <= 768) {

      menuOpen = false;

      navigation.style.display = "none";
      navigation.classList.remove("mobile-navigation");

      menuButton.innerHTML = "<span>MENU</span><span>+</span>";

    }

  });

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor => {

  anchor.addEventListener("click", function(event) {

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {

      event.preventDefault();

      gsap.to(window, {
        duration: 1.3,

        scrollTo: {
          y: target,
          offsetY: 0
        },

        ease: "power3.inOut"
      });

    }

  });

});


/* =========================
   REFRESH SCROLL TRIGGERS
========================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
  
