document.addEventListener("DOMContentLoaded", function () {
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector("nav").offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });

        // Close mobile menu if open
        const mobileMenu = document.getElementById("mobileMenu");
        const mobileMenuButton =
          document.getElementById("mobileMenuButton");
        const hamburgerIcon = document.getElementById("hamburgerIcon");
        if (mobileMenu && mobileMenu.classList.contains("menu-open")) {
          mobileMenu.classList.remove("menu-open");
          mobileMenuButton.setAttribute("aria-expanded", "false");
          if (hamburgerIcon) {
            hamburgerIcon.classList.remove("fa-times");
            hamburgerIcon.classList.add("fa-bars");
          }
        }
      }
    });
  });

  const modal = document.getElementById("responseModal");
  const modalMessage = document.getElementById("modalMessage");

  // Hamburger Menu Toggle Logic
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburgerIcon = document.getElementById("hamburgerIcon");

  window.showModal = function (message) {
    if (modalMessage) modalMessage.textContent = message;
    if (modal) modal.style.display = "block";
  };

  window.closeModal = function () {
    if (modal) modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) closeModal();
  };

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(newsletterForm);
      const email = formData.get("newsletterEmail");
      console.log("Newsletter Subscription:", email);
      showModal(
        "Thank you for subscribing to the Resolve newsletter, " +
          email +
          "!"
      );
      newsletterForm.reset();
    });
  }

  // Main Contact Form Submission
  const mainContactForm = document.getElementById("mainContactForm");
  if (mainContactForm) {
    mainContactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(mainContactForm);
      const name = formData.get("contactName");
      console.log(
        "Main Contact Form Data:",
        Object.fromEntries(formData)
      );
      showModal(
        "Thank you, " +
          name +
          "! Your message has been sent. Our team will get back to you shortly."
      );
      mainContactForm.reset();
    });
  }

  if (mobileMenuButton && mobileMenu && hamburgerIcon) {
    mobileMenuButton.addEventListener("click", () => {
      const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true" ||
        false;
      mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("menu-open");

      // Toggle icon
      if (mobileMenu.classList.contains("menu-open")) {
        hamburgerIcon.classList.remove("fa-bars");
        hamburgerIcon.classList.add("fa-times");
      } else {
        hamburgerIcon.classList.remove("fa-times");
        hamburgerIcon.classList.add("fa-bars");
      }
    });
  }

  const animatedElements =
    document.querySelectorAll(".animate-on-scroll");
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }

  // Testimonial Carousel Logic
  let currentTestimonialSlide = 0;
  const testimonialSlidesContainer = document.querySelector(
    ".testimonial-slides"
  );
  const testimonialSlides = document.querySelectorAll(
    ".testimonial-slides .testimonial-card"
  );
  const testimonialDotsContainer = document.getElementById(
    "testimonialCarouselDots"
  );
  let testimonialInterval;

  window.showTestimonialSlide = function (index) {
    if (!testimonialSlidesContainer || testimonialSlides.length === 0)
      return;

    if (index >= testimonialSlides.length) {
      currentTestimonialSlide = 0;
    } else if (index < 0) {
      currentTestimonialSlide = testimonialSlides.length - 1;
    } else {
      currentTestimonialSlide = index;
    }
    testimonialSlidesContainer.style.transform =
      "translateX(" + -currentTestimonialSlide * 100 + "%)";
    updateTestimonialDots();
  };

  window.moveTestimonialSlide = function (n) {
    showTestimonialSlide(currentTestimonialSlide + n);
    resetTestimonialInterval();
  };

  window.currentTestimonialDot = function (n) {
    showTestimonialSlide(n);
    resetTestimonialInterval();
  };

  function updateTestimonialDots() {
    if (!testimonialDotsContainer) return;
    testimonialDotsContainer.innerHTML = "";
    testimonialSlides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("carousel-dot");
      if (index === currentTestimonialSlide) {
        dot.classList.add("active");
      }
      dot.setAttribute("aria-label", "Go to slide " + (index + 1));
      dot.setAttribute("onclick", "currentTestimonialDot(" + index + ")");
      testimonialDotsContainer.appendChild(dot);
    });
  }

  function startTestimonialInterval() {
    testimonialInterval = setInterval(() => {
      moveTestimonialSlide(1);
    }, 5000);
  }

  function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    startTestimonialInterval();
  }

  if (testimonialSlides.length > 0) {
    showTestimonialSlide(currentTestimonialSlide);
    startTestimonialInterval();
  }

  // Hero Content Animation Logic
  const heroHeadlineElement = document.getElementById("heroHeadline");
  const heroParagraph = document.querySelector(".hero-content p");
  // Updated selector to match the current HTML structure for the buttons' container
  const heroButtonsContainer = document.querySelector(
    ".hero-content .flex.flex-row.justify-center.gap-4.hero-content-item"
  );
  const heroBenefitSnippets = document.querySelector(
    ".hero-content > .hero-content-item.mt-10" // Targets the container of the benefit snippets
  );

  const headlineText =
    'Secure & Instant OTC Trading with <span class="accent-color">Resolve</span> <span class="secondary-accent-color animate-instantly">Instantly.</span>';
  let charIndex = 0;
  let heroAnimationTimeout;

  function typeHeadline() {
    if (heroHeadlineElement) {
      heroHeadlineElement.classList.remove("opacity-0");

      let textSoFar = heroHeadlineElement.innerHTML.replace(
        /<span class="typewriter-cursor"><\/span>$/,
        ""
      );
      const cursorHtml = '<span class="typewriter-cursor"></span>';

      if (charIndex < headlineText.length) {
        if (headlineText.substring(charIndex).startsWith("<span")) {
          const closingSpanIndex =
            headlineText.indexOf("</span>", charIndex) + 7;
          textSoFar += headlineText.substring(
            charIndex,
            closingSpanIndex
          );
          charIndex = closingSpanIndex;
        } else {
          textSoFar += headlineText.charAt(charIndex);
          charIndex++;
        }
        heroHeadlineElement.innerHTML = textSoFar + cursorHtml;
        heroAnimationTimeout = setTimeout(typeHeadline, 15); // Further reduced delay for even faster typing
      } else {
        // Typing complete, remove cursor from final text
        heroHeadlineElement.innerHTML = textSoFar;

        if (heroParagraph) {
          // Assumes hero-content-item is on the element via HTML,
          // which sets initial opacity: 0 and transition.
          // Force reflow to ensure transition plays smoothly.
          void heroParagraph.offsetWidth;
          heroParagraph.style.opacity = "1";
        }
        if (heroButtonsContainer) {
          // Assumes hero-content-item is on the element via HTML.
          void heroButtonsContainer.offsetWidth;
          setTimeout(
            () => (heroButtonsContainer.style.opacity = "1"),
            150
          ); // Stagger slightly
        }
        if (heroBenefitSnippets) {
          // Assumes hero-content-item is on the element via HTML.
          void heroBenefitSnippets.offsetWidth; // Force reflow
          setTimeout(() => { // Stagger after buttons
            heroBenefitSnippets.style.opacity = "1";
          }, 300); // Appears 150ms after buttons start animating
        } // Closes if (heroBenefitSnippets)
      } // Closes else (typing complete)
    } // Closes if (heroHeadlineElement)
} // Closes typeHeadline function

  function resetHeroAnimations() {
    if (heroAnimationTimeout) clearTimeout(heroAnimationTimeout);
    charIndex = 0;
    if (heroHeadlineElement) {
      heroHeadlineElement.innerHTML = "";
      heroHeadlineElement.classList.add("opacity-0");
    }
    if (heroParagraph) {
      // Elements with hero-content-item have opacity: 0 set by the class.
      // Setting style.opacity = '0' ensures they are reset for the next animation.
      heroParagraph.style.opacity = "0";
    }
    if (heroButtonsContainer) {
      heroButtonsContainer.style.opacity = "0";
    }
    if (heroBenefitSnippets) {
      heroBenefitSnippets.style.opacity = "0";
    }
  }

  // Scroll to top button logic
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function toggleScrollTopButton() {
    if (scrollTopBtn) {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    }
  }

  window.addEventListener("scroll", toggleScrollTopButton);

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  resetHeroAnimations();
  heroAnimationTimeout = setTimeout(() => {
    typeHeadline();
  }, 500);
});