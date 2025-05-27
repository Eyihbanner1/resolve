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
      }
    });
  });

  const modal = document.getElementById("responseModal");
  const modalMessage = document.getElementById("modalMessage");

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
  const heroButtonsContainer = document.querySelector(
    ".hero-content .flex-col.sm\\:flex-row"
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
        heroAnimationTimeout = setTimeout(typeHeadline, 50);
      } else {
        // Typing complete, remove cursor from final text
        heroHeadlineElement.innerHTML = textSoFar;

        if (heroParagraph) {
          heroParagraph.style.opacity = "0";
          heroParagraph.classList.add("hero-content-item");
          // Trigger reflow for animation - already handled by adding class and CSS transition
          // The void offsetWidth is a common trick to force reflow,
          // but adding the class with the transition property
          // before setting opacity is usually sufficient.
          // Keeping it here for robustness, but it might not be strictly necessary.
          void heroParagraph.offsetWidth;
          heroParagraph.style.opacity = "1";
        }
        if (heroButtonsContainer) {
          heroButtonsContainer.style.opacity = "0";
          heroButtonsContainer.classList.add("hero-content-item");
          void heroButtonsContainer.offsetWidth;
          setTimeout(
            () => (heroButtonsContainer.style.opacity = "1"),
            150
          ); // Stagger slightly
        }
      }
    }
  }

  function resetHeroAnimations() {
    if (heroAnimationTimeout) clearTimeout(heroAnimationTimeout);
    charIndex = 0;
    if (heroHeadlineElement) {
      heroHeadlineElement.innerHTML = "";
      heroHeadlineElement.classList.add("opacity-0");
    }
    if (heroParagraph) {
      heroParagraph.classList.remove("hero-content-item");
      heroParagraph.style.opacity = "0";
    }
    if (heroButtonsContainer) {
      heroButtonsContainer.classList.remove("hero-content-item");
      heroButtonsContainer.style.opacity = "0";
    }
  }

  resetHeroAnimations();
  heroAnimationTimeout = setTimeout(() => {
    typeHeadline();
  }, 500); // End of Hero Content Animation Logic

  // Hamburger Menu Logic
  const hamburgerButton = document.getElementById("hamburgerButton");
  const mobileNavLinks = document.getElementById("mobileNavLinks");
  const hamburgerIconOpen = document.getElementById("hamburgerIconOpen");
  const hamburgerIconClose =
    document.getElementById("hamburgerIconClose");

  if (
    hamburgerButton &&
    mobileNavLinks &&
    hamburgerIconOpen &&
    hamburgerIconClose
  ) {
    const navLinksForMenuClose = mobileNavLinks.querySelectorAll("a");

    hamburgerButton.addEventListener("click", () => {
      const isExpanded =
        hamburgerButton.getAttribute("aria-expanded") === "true";
      hamburgerButton.setAttribute("aria-expanded", !isExpanded);
      mobileNavLinks.classList.toggle("hidden");
      // mobileNavLinks.classList.toggle('flex'); // flex-col is already part of its classes

      if (!isExpanded) {
        // Was closed, now opening
        hamburgerIconOpen.classList.remove("block");
        hamburgerIconOpen.classList.add("hidden");
        hamburgerIconClose.classList.remove("hidden");
        hamburgerIconClose.classList.add("block");
      } else {
        // Was open, now closing
        hamburgerIconOpen.classList.remove("hidden");
        hamburgerIconOpen.classList.add("block");
        hamburgerIconClose.classList.remove("block");
        hamburgerIconClose.classList.add("hidden");
      }
    });

    navLinksForMenuClose.forEach((link) => {
      link.addEventListener("click", () => {
        const isMobileView =
          window.getComputedStyle(hamburgerButton.parentElement)
            .display !== "none";
        if (
          isMobileView &&
          !mobileNavLinks.classList.contains("hidden")
        ) {
          hamburgerButton.setAttribute("aria-expanded", "false");
          mobileNavLinks.classList.add("hidden");
          // mobileNavLinks.classList.remove('flex');

          hamburgerIconOpen.classList.remove("hidden");
          hamburgerIconOpen.classList.add("block");
          hamburgerIconClose.classList.add("hidden");
          hamburgerIconClose.classList.remove("block");
        }
      });
    });
  } // End of Hamburger Menu Logic
});