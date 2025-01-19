/* =====================================================
   Resume section tabs and tab contents
===================================================== */
const resumeTabs = document.querySelector(".resume-tabs");
const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
const resumeTabContents = document.querySelectorAll(".resume-tab-content");

var resumeTabNav = function(resumeTabClick){
   resumeTabContents.forEach((resumeTabContent) => {
      resumeTabContent.style.display = "none";
      resumeTabContent.classList.remove("active");
   });

   resumePortfolioTabBtns.forEach((resumePortfolioTabBtn) => {
      resumePortfolioTabBtn.classList.remove("active");
   });

   resumeTabContents[resumeTabClick].style.display = "flex";

   setTimeout(() => {
      resumeTabContents[resumeTabClick].classList.add("active");
   }, 100);

   resumePortfolioTabBtns[resumeTabClick].classList.add("active");
}

resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
   resumePortfolioTabBtn.addEventListener("click", () => {
      resumeTabNav(i);
   });
});
/* =====================================================
   Service modal open/close function
===================================================== */
const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

serviceCardWithModals.forEach((serviceCardWithModal) => {
   const serviceCard = serviceCardWithModal.querySelector(".service-card");
   const serviceBackDrop = serviceCardWithModal.querySelector(".service-modal-backdrop");
   const serviceModal = serviceCardWithModal.querySelector(".service-modal");
   const modalCloseBtn = serviceCardWithModal.querySelector(".modal-close-btn");

   serviceCard.addEventListener("click", () => {
      serviceBackDrop.style.display = "flex";

      setTimeout(() => {
         serviceBackDrop.classList.add("active");
      }, 100);
      
      setTimeout(() => {
         serviceModal.classList.add("active");
      }, 100);
   });

   modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
         serviceBackDrop.style.display = "none";
      }, 500);

      setTimeout(() => {
         serviceBackDrop.classList.remove("active");
         serviceModal.classList.remove("active");
      }, 100);
   });
});
/* =====================================================
   Portfolio modals, tabs and cards
===================================================== */

// Filter portfolio cards according to portfolio tabs.
document.addEventListener("DOMContentLoaded", () => {
   const portfolioTabs = document.querySelector(".portfolio-tabs");
   const portfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
   const cardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

   portfolioTabBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
         const filter = tabBtn.getAttribute("data-filter");

         cardsWithModals.forEach((cardWithModal) => {
            if(filter === "all" || cardWithModal.classList.contains(filter)){   
               cardWithModal.classList.remove("hidden");

               setTimeout(() => {
                  cardWithModal.style.opacity = "1";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            }
            else{              
               cardWithModal.classList.add("hidden");

               setTimeout(() => {
                  cardWithModal.style.opacity = "0";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            }
         });
         // add active class to the clicked tab button.
         portfolioTabBtns.forEach((tabBtn) => tabBtn.classList.remove("active"));
         tabBtn.classList.add("active")
      });
   });
});


// close smooth

document.addEventListener("DOMContentLoaded", function () {
  const modalBackdrop = document.querySelector("#modal-backdrop");
  const modal = modalBackdrop.querySelector(".portfolio-modal");
  const closeModalBtn = document.querySelector("#close-modal");
  const openModalBtn = document.querySelector(".card-img i");
  const modalVideo = document.querySelector("#modal-video");

  // Buka Modal
  openModalBtn.addEventListener("click", function () {
    modalBackdrop.classList.add("active");
    modal.classList.add("active");

    // Reset Video
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  });

  // Tutup Modal
  closeModalBtn.addEventListener("click", function () {
    modal.classList.remove("active");
    modalBackdrop.classList.remove("active");

    // Pause Video
    if (modalVideo) {
      modalVideo.pause();
    }
  });
});


// Seleksi semua elemen card dengan modal
const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

portfolioCardsWithModals.forEach((portfolioCardWithModal) => {
  // Elemen-elemen di dalam setiap card
  const portfolioCard = portfolioCardWithModal.querySelector(".portfolio-card");
  const portfolioBackdrop = portfolioCardWithModal.querySelector(".portfolio-modal-backdrop");
  const portfolioModal = portfolioCardWithModal.querySelector(".portfolio-modal");
  const modalCloseBtn = portfolioCardWithModal.querySelector(".modal-close-btn");
  const videoElement = portfolioCardWithModal.querySelector("video");

  // Event untuk membuka modal
  portfolioCard.addEventListener("click", () => {
    portfolioBackdrop.style.visibility = "visible";

    setTimeout(() => {
      portfolioBackdrop.classList.add("active");
      portfolioModal.classList.add("active");

      // Memulai video
      if (videoElement) {
        videoElement.play();
      }
    }, 10); // Jeda 10ms untuk memulai animasi
  });

  // Event untuk menutup modal
  modalCloseBtn.addEventListener("click", () => {
    portfolioModal.classList.remove("active");
    portfolioBackdrop.classList.remove("active");

    // Reset video (berhenti dan kembali ke awal)
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }

    setTimeout(() => {
      portfolioBackdrop.style.visibility = "hidden";
    }, 500); // Durasi transisi sesuai CSS (0.5s)
  });
});

/* =====================================================
   Testimonial Swiper
===================================================== */
var swiper = new Swiper(".sue-client-swiper", {
   slidesPerView: 1,
   spaceBetween: 30,
   loop: true,
   pagination: {
     el: ".swiper-pagination",
     clickable: true,
   },
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
 });

/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */
(function() {
   // https://dashboard.emailjs.com/admin/account
   emailjs.init({
     publicKey: "GSdyejg9mg-vhLq9l",
   });
})();

sueContactForm = document.getElementById("sue-contact-form");
sueContactFormAlert = document.querySelector(".contact-form-alert");

sueContactForm.addEventListener('submit', function(event) {
   event.preventDefault();
   // these IDs from the previous steps
   emailjs.sendForm('service_ejuhl2j', 'template_llk2xm8', '#sue-contact-form')
       .then(() => {
         //   console.log('SUCCESS!');
         sueContactFormAlert.innerHTML = "<span>Your message sent successfully!</span> <i class='ri-checkbox-circle-fill'></i>";
         sueContactForm.reset();

         setTimeout(() => {
            sueContactFormAlert.innerHTML = "";
         }, 2000);
       }, (error) => {
         //   console.log('FAILED...', error);
         sueContactFormAlert.innerHTML = "<span>Message not sent</span> <i class='ri-error-warning-fill'></i>";
         sueContactFormAlert.title = error;
       });
});

/* =====================================================
   Shrink the height of the header on scroll
===================================================== */
window.addEventListener("scroll", () => {
   const sueHeader = document.querySelector(".sue-header");

   sueHeader.classList.toggle("shrink", window.scrollY > 0);
});

/* =====================================================
   Bottom navigation menu
===================================================== */

// Each bottom navigation menu items active on page scroll.
window.addEventListener("scroll", () => {
   const navMenuSections = document.querySelectorAll(".nav-menu-section");
   const scrollY = window.pageYOffset;

   navMenuSections.forEach((navMenuSection) => {
      let sectionHeight = navMenuSection.offsetHeight;
      let sectionTop = navMenuSection.offsetTop - 50;
      let id = navMenuSection.getAttribute("id");

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.add("current");
      }else{
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.remove("current");
      }
   });
});

// Javascript to show bottom navigation menu on home(page load).
window.addEventListener("DOMContentLoaded", () => {
   const bottomNav = document.querySelector(".bottom-nav");

   bottomNav.classList.toggle("active", window.screenY < 10);
});

// Javascript to show/hide bottom navigation menu on home(scroll).
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

window.addEventListener("scroll", () => {
   bottomNav.classList.add("active");
   menuShowBtn.classList.remove("active");

   if(window.scrollY < 10){
      menuHideBtn.classList.remove("active");

      function scrollStopped(){
         bottomNav.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
   }

   if(window.scrollY > 10){
      menuHideBtn.classList.add("active");

      function scrollStopped(){
         bottomNav.classList.remove("active");
         menuShowBtn.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
   }
});

// Hide bottom navigation menu on click menu-hide-btn.
menuHideBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.toggle("active");
   menuShowBtn.classList.toggle("active");
});

// Show bottom navigation menu on click menu-show-btn.
menuShowBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.add("active");
   menuShowBtn.classList.toggle("active");
});


/* =====================================================
   To-top-button with scroll indicator bar
===================================================== */
window.addEventListener("scroll", () => {
   const toTopBtn = document.querySelector(".to-top-btn");

   toTopBtn.classList.toggle("active", window.scrollY > 0);

   // Scroll indicator bar
   const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

   const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
   const  height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

   const scrollValue = (pageScroll / height) * 100;

   scrollIndicatorBar.style.height = scrollValue + "%";
});

/* =====================================================
   Customized cursor on mousemove
===================================================== */
const cursor = document.querySelector(".cursor");
const cursorDot = cursor.querySelector(".cursor-dot");
const cursorCircle = cursor.querySelector(".cursor-circle");

// Posisi target dan posisi saat ini untuk animasi
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
const speed = 0.1; // Kecepatan interpolasi (semakin kecil, semakin halus)

document.addEventListener("mousemove", (e) => {
   targetX = e.clientX;
   targetY = e.clientY;
});

// Fungsi animasi untuk pergerakan halus
function animateCursor() {
   // Lerp (Linear Interpolation) untuk mendekati posisi target
   currentX += (targetX - currentX) * speed;
   currentY += (targetY - currentY) * speed;

   // Perbarui posisi elemen
   cursorDot.style.top = currentY + "px";
   cursorDot.style.left = currentX + "px";
   cursorCircle.style.top = currentY + "px";
   cursorCircle.style.left = currentX + "px";

   requestAnimationFrame(animateCursor); // Panggil ulang animasi
}

// Mulai animasi
animateCursor();

const cursorHoverlinks = document.querySelectorAll(
   "body a, .theme-btn, .sue-main-btn, .portfolio-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .service-card, .contact-social-links li, .contact-form, .submit-btn, .menu-show-btn, .menu-hide-btn"
);

cursorHoverlinks.forEach((cursorHoverlink) => {
   cursorHoverlink.addEventListener("mouseover", () => {
      cursorDot.classList.add("large");
      cursorCircle.style.display = "none";
   });

   cursorHoverlink.addEventListener("mouseout", () => {
      cursorDot.classList.remove("large");
      cursorCircle.style.display = "block";
   });
});

document.addEventListener("click", () => {
   cursorCircle.style.display = "none";
   setTimeout(() => {
      cursorCircle.style.display = "block";
   }, 200);
});


/* =====================================================
   Website dark/light theme
===================================================== */

// Change theme and save current theme on click the theme button.
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
   // Change theme icon and theme on click theme button.
   themeBtn.classList.toggle("active-sun-icon");
   document.body.classList.toggle("light-theme");

   // Save theme icon and theme on click theme button.
   const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
   const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";

   localStorage.setItem("sue-saved-icon", getCurrentIcon());
   localStorage.setItem("sue-saved-theme", getCurrentTheme());
});

// Get saved theme icon and theme on document loaded.
const savedIcon = localStorage.getItem("sue-saved-icon");
const savedTheme = localStorage.getItem("sue-saved-theme");

document.addEventListener("DOMContentLoaded", () => {
   themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
   document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});

/* =====================================================
   ScrollReveal JS animations
===================================================== */
ScrollReveal({
   reset: true,
   distance: '60px',
   duration: 2500,
   delay: 400
});

// Common reveal options to create reveal animations.

// Target elements and specify options to create reveal animations.
ScrollReveal().reveal('.avatar-img', { delay: 100, origin: 'top' });
ScrollReveal().reveal('.avatar-info, .section-title', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.home-social, .home-scroll-btn', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.about-img', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.about-info', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.pro-card, .about-buttons .sue-main-btn, .resume-tabs .tab-btn, .portfolio-tabs .tab-btn', { delay: 200, origin: 'right', interval: 100 });
ScrollReveal().reveal('#resume .section-content', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.service-card,.contact-item, .contact-social-links li', { delay: 200, origin: 'bottom', interval: 200 });
// ScrollReveal().reveal('.portfolio-card', { delay: 100, origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.sue-client-swiper, .contact-form-body', { delay: 200, origin: 'right' });
ScrollReveal().reveal('.contact-info h3', { delay: 100, origin: 'bottom', interval: 200 });

document.addEventListener("DOMContentLoaded", () => {
   const portfolioCards = document.querySelectorAll(".portfolio-card");
 
   // Buat observer untuk mendeteksi visibilitas elemen
   const observer = new IntersectionObserver((entries) => {
     entries.forEach((entry) => {
       if (entry.isIntersecting) {
         // Tambahkan kelas "active" jika elemen terlihat
         entry.target.classList.add("active");
       } else {
         // Hapus kelas "active" jika elemen tidak terlihat
         entry.target.classList.remove("active");
       }
     });
   }, {
     threshold: 0.1, // Aktif saat 10% elemen terlihat
   });
 
   // Observasi setiap kartu
   portfolioCards.forEach((card) => observer.observe(card));
 });
 
