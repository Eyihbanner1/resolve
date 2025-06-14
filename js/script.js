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
  }  // Main Contact Form Submission
  const mainContactForm = document.getElementById("mainContactForm");
  if (mainContactForm) {
    mainContactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // Add loading state
      const submitButton = mainContactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;
      
      // Get form data
      const formData = new FormData(mainContactForm);
      
      // Send AJAX request
      fetch('./contact-handler.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showModal(data.message);
          mainContactForm.reset();
        } else {
          showModal('Error: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        const name = formData.get("contactName") || "there";
        showModal(
          "Thank you, " + name + "! Your message is being processed. " +
          "If you don't hear back from us within 24 hours, please email us directly at admin@resolve.ng"
        );
        mainContactForm.reset();
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
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
  }  // FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    question.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = !answer.classList.contains('hidden');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-question i');
          const otherQuestion = otherItem.querySelector('.faq-question');
          otherAnswer.classList.add('hidden');
          otherIcon.classList.remove('fa-chevron-up');
          otherIcon.classList.add('fa-chevron-down');
          otherItem.classList.remove('active');
          otherQuestion.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      if (isOpen) {
        answer.classList.add('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      } else {
        answer.classList.remove('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
    
    // Add keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // Stats Counter Animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statElement = entry.target;
        const targetValue = parseInt(statElement.getAttribute('data-count'));
        let currentValue = 0;
        const increment = targetValue / 100;
        const suffix = statElement.textContent.replace(/[0-9]/g, '');
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }
          
          if (suffix.includes('M')) {
            statElement.textContent = '$' + Math.floor(currentValue / 1000000) + 'M+';
          } else if (suffix.includes('%')) {
            statElement.textContent = Math.floor(currentValue) + '%';
          } else {
            statElement.textContent = Math.floor(currentValue) + '+';
          }
        }, 20);
        
        statsObserver.unobserve(statElement);
      }
    });
  }, { threshold: 0.5 });
    // Observe all stat elements
  document.querySelectorAll('[data-count]').forEach(stat => {
    statsObserver.observe(stat);
  });
  // Sick Interactive Background Effects
  const heroSection = document.querySelector('.hero-section');
  const particles = document.querySelectorAll('.particle');
  const floatingShapes = document.querySelectorAll('.floating-shape');
  const cryptoSymbols = document.querySelectorAll('.crypto-symbol');
  
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Make particles follow mouse subtly
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const xOffset = (x - 0.5) * speed * 10;
        const yOffset = (y - 0.5) * speed * 10;
        
        particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
      
      // Make floating shapes react to mouse
      floatingShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        const xOffset = (x - 0.5) * speed * 5;
        const yOffset = (y - 0.5) * speed * 5;
        
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
      
      // Make crypto symbols react to mouse with subtle movement and glow
      cryptoSymbols.forEach((symbol, index) => {
        const speed = (index + 1) * 0.2;
        const xOffset = (x - 0.5) * speed * 8;
        const yOffset = (y - 0.5) * speed * 8;
        const scale = 1 + (Math.abs(x - 0.5) + Math.abs(y - 0.5)) * 0.1;
        
        symbol.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
        symbol.style.opacity = 0.3 + (Math.abs(x - 0.5) + Math.abs(y - 0.5)) * 0.3;
      });
    });
    
    // Reset positions when mouse leaves
    heroSection.addEventListener('mouseleave', () => {
      particles.forEach(particle => {
        particle.style.transform = '';
      });
      floatingShapes.forEach(shape => {
        shape.style.transform = '';
      });
      cryptoSymbols.forEach(symbol => {
        symbol.style.transform = '';
        symbol.style.opacity = '';
      });
    });
  }

  // Add scroll-triggered animations for hero elements
  const heroElements = document.querySelectorAll('.hero-headline, .hero-subheading, .cta-primary, .cta-secondary');
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    element.style.transitionDelay = `${index * 0.2}s`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 300);
  });
});