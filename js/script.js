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
      
      // Create newsletter subscription email
      const subject = "Newsletter Subscription Request";
      const body = `New newsletter subscription request:

Email: ${email}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

---
Sent from Resolve Trading Platform Newsletter Form`;

      // Create mailto link
      const mailtoLink = `mailto:admin@resolve.ng?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      console.log("Newsletter Subscription:", email);
      showModal(
        "Thank you for subscribing to the Resolve newsletter! Your email client should open with the subscription request. Please send the email to complete your subscription."
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
      submitButton.textContent = "Opening Email...";
      submitButton.disabled = true;
      
      // Get form data
      const formData = new FormData(mainContactForm);
      
      // Create email content
      const name = formData.get("contactName") || "";
      const email = formData.get("contactEmail") || "";
      const company = formData.get("contactCompany") || "";
      const inquiryType = formData.get("contactInquiryType") || "";
      const message = formData.get("contactMessage") || "";
      
      const subject = `Trading Inquiry: ${inquiryType} - ${name}`;
      const body = `Name: ${name}
Email: ${email}
Company: ${company}
Inquiry Type: ${inquiryType}

Message:
${message}

---
Sent from Resolve Trading Platform`;

      // Create mailto link
      const mailtoLink = `mailto:admin@resolve.ng?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setTimeout(() => {
        showModal(`Thank you, ${name}! Your default email client should now open with your inquiry pre-filled. If it doesn't open automatically, please send your inquiry directly to admin@resolve.ng`);
        mainContactForm.reset();
        
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1000);
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
  }  // Modern Testimonial Carousel Logic
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  const track = document.querySelector('.testimonial-track');
  const paginationContainer = document.querySelector('.carousel-pagination');
  let dots = [];
  let autoSlideInterval;  // Initialize carousel
  function initCarousel() {
    if (slides.length === 0) {
      return;
    }
    
    // Create pagination dots dynamically
    createPaginationDots();
    
    updateCarousel();
    startAutoSlide();
    
    // Add touch/swipe support for mobile
    addTouchSupport();
  }

  // Create pagination dots based on number of slides
  function createPaginationDots() {
    if (!paginationContainer) return;
    
    // Clear existing dots
    paginationContainer.innerHTML = '';
    dots = [];
    
    // Create dots for each slide
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (i === 0) dot.classList.add('active');
      dot.onclick = () => currentSlide(i + 1);
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      paginationContainer.appendChild(dot);
      dots.push(dot);
    }
  }
  // Update carousel position and active states
  function updateCarousel() {
    if (!track) return;
    
    // Update track position - each slide moves by 100% of container width
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update slide active states
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    
    // Update dot active states
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  // Change slide function - always loops to the right
  window.changeSlide = function(direction) {
    if (direction > 0) {
      // Going forward (right)
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
    } else {
      // Going backward - but we'll make it loop right instead
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
    }
    
    updateCarousel();
    resetAutoSlide();
  };

  // Go to specific slide
  window.currentSlide = function(slideIndex) {
    currentSlide = slideIndex - 1; // Convert to 0-based index
    updateCarousel();
    resetAutoSlide();
  };

  // Auto-slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      changeSlide(1);
    }, 6000); // Change slide every 6 seconds
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Touch/Swipe support for mobile
  function addTouchSupport() {
    if (!track) return;
    
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      track.style.transition = 'none';
    });
      track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      const currentTransform = -currentSlide * 100;
      const movePercent = (diffX / track.offsetWidth) * 100;
      
      track.style.transform = `translateX(${currentTransform - movePercent}%)`;
    });
    
    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      isDragging = false;
      track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const threshold = 50; // Minimum swipe distance
      
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          changeSlide(1); // Swipe left = next slide
        } else {
          changeSlide(-1); // Swipe right = previous slide
        }
      } else {
        updateCarousel(); // Snap back to current slide
      }
    });
  }

  // Initialize the carousel when DOM is ready
  initCarousel();

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
  }  // FAQ Category Accordion Functionality
  const faqCategoryHeaders = document.querySelectorAll('.faq-category-header');
  faqCategoryHeaders.forEach(header => {
    const content = header.nextElementSibling;
    const icon = header.querySelector('i');
    
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = !content.classList.contains('hidden');
      
      // Close all other FAQ categories
      faqCategoryHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          const otherContent = otherHeader.nextElementSibling;
          const otherIcon = otherHeader.querySelector('i');
          otherContent.classList.add('hidden');
          otherIcon.classList.remove('fa-chevron-up');
          otherIcon.classList.add('fa-chevron-down');
          otherHeader.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current category
      if (isOpen) {
        content.classList.add('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        header.setAttribute('aria-expanded', 'false');
      } else {
        content.classList.remove('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        header.setAttribute('aria-expanded', 'true');
      }
    });
    
    // Add keyboard support
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
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

  // === IMAGE OPTIMIZATION ===
  
  // Enhanced lazy loading for crypto logos
  const cryptoLogos = document.querySelectorAll('.crypto-logo img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Add error handling for missing images
        img.addEventListener('error', function() {
          this.style.opacity = '0.5';
          this.alt = 'Logo unavailable';
          console.warn(`Failed to load image: ${this.src}`);
        });
        
        // Add load success animation
        img.addEventListener('load', function() {
          this.style.animation = 'fadeInImage 0.6s ease forwards';
        });
        
        observer.unobserve(img);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  cryptoLogos.forEach(img => {
    imageObserver.observe(img);
  });

  // === ENHANCED FORM VALIDATION ===
  
  // Real-time email validation
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = '#dc3545';
        this.setAttribute('aria-invalid', 'true');
      } else {
        this.style.borderColor = '';
        this.removeAttribute('aria-invalid');
      }
    });
  });

  // === CRYPTO CARD INTERACTIONS ===
  
  // Add click handlers for crypto trading cards
  const cryptoCards = document.querySelectorAll('.market-item-card[role="button"]');
  cryptoCards.forEach(card => {
    card.addEventListener('click', function() {
      const cryptoName = this.querySelector('p').textContent;
      // Scroll to contact form
      const contactSection = document.getElementById('contact-us-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill inquiry type in contact form
        setTimeout(() => {
          const inquirySelect = document.getElementById('contactInquiryType');
          const messageTextarea = document.getElementById('contactMessage');
          if (inquirySelect) {
            inquirySelect.value = 'General Trading Inquiry';
          }
          if (messageTextarea && !messageTextarea.value) {
            messageTextarea.value = `I'm interested in trading ${cryptoName}. Please provide more information about your rates and services.`;
            messageTextarea.focus();
          }
        }, 800);
      }
    });

    // Add keyboard accessibility
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // === PERFORMANCE OPTIMIZATIONS ===
  
  // Debounced scroll handler for better performance
  let scrollTimeout;
  const debouncedScrollHandler = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Update scroll-based animations or effects here if needed
    }, 16); // ~60fps
  };

  window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
});