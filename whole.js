// whole.js
// whole.js
document.addEventListener('DOMContentLoaded', () => {
    //
    // ─── PRICE MODAL ───────────────────────────────────────────────────────────────
    //
    const priceModal = document.getElementById("price-modal");
    const modalBody  = document.getElementById("modal-body");
    const closeBtn   = document.querySelector(".close-btn");
  
    const prices = {
      dev: `
        <h3>Custom Website Development</h3>
        <p>Starting at <strong>$300</strong> for basic site (up to 3 pages).</p>
        <p>Includes responsive design, basic animations, and a contact form.</p>
      `,
      ux: `
        <h3>UI/UX Design</h3>
        <p>Wireframes starting at <strong>$100</strong></p>
        <p>Mockups starting at <strong>$150</strong></p>
        <p>Bundle: Wireframe + Mockup for <strong>$250</strong></p>
      `
    };
  
    document.querySelectorAll(".price-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const serviceType = btn.getAttribute("data-service");
        modalBody.innerHTML = prices[serviceType] || "<p>Price info not available.</p>";
        priceModal.style.display = "flex";
      });
    });
  
    closeBtn.addEventListener("click", () => {
      priceModal.style.display = "none";
    });
  
    window.addEventListener("click", e => {
      if (e.target === priceModal) {
        priceModal.style.display = "none";
      }
    });
  
  
    //
    // ─── FORM SUCCESS MODAL ─────────────────────────────────────────────────────────
    //
    const form             = document.getElementById("contact-form");
    const successModal     = document.querySelector(".form-complete");
    const closeSuccessBtn  = document.querySelector(".close-success");
  
    if (form && successModal && closeSuccessBtn) {
      form.addEventListener("submit", e => {
        e.preventDefault();
  
        const formData = new FormData(form);
        fetch("/", {
          method : "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body   : new URLSearchParams(formData).toString()
        })
        .then(() => {
          successModal.style.display = "flex";
          form.reset();
        })
        .catch(err => {
          alert("Submission error: " + err);
        });
      });
  
      closeSuccessBtn.addEventListener("click", () => {
        successModal.style.display = "none";
      });
  
      window.addEventListener("click", e => {
        if (e.target === successModal) {
          successModal.style.display = "none";
        }
      });
    }
  
  
    //
    // ─── VIDEO GALLERY (HOVER, TAP, CLICK-TO-ZOOM) ────────────────────────────────
    //
    const videos   = document.querySelectorAll(".project-video");
    const isMobile = window.innerWidth <= 768;
  
    videos.forEach(video => {
      // Hover-to-play on desktop
      if (!isMobile) {
        video.addEventListener("mouseenter", () => video.play());
        video.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
        });
      }
      // Tap-to-play on mobile
      else {
        video.addEventListener("click", () => {
          if (video.paused) {
            videos.forEach(v => {
              if (v !== video) {
                v.pause();
                v.currentTime = 0;
              }
            });
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      }
  
      // Click-to-enlarge (desktop & mobile)
      video.addEventListener("click", e => {
        e.stopPropagation();
        video.classList.toggle("expanded");
  
        if (video.classList.contains("expanded")) {
          video.pause();
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    });
  
    // Click outside any expanded video to shrink
    document.addEventListener("click", () => {
      document.querySelectorAll(".project-video.expanded")
        .forEach(v => v.classList.remove("expanded"));
    });
  
  
    //
    // ─── CAROUSEL ARROW NAVIGATION (DESKTOP & MOBILE) ──────────────────────────────
    //
    const track    = document.querySelector('.carousel-track');
    const prevBtn  = document.querySelector('.prev-btn');
    const nextBtn  = document.querySelector('.next-btn');
  
    if (track && prevBtn && nextBtn) {
      const slides = Array.from(track.children);
      let index    = 0;
  
      const moveToSlide = idx => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * idx}px)`;
      };
  
      prevBtn.addEventListener("click", () => {
        if (index > 0) {
          index--;
          moveToSlide(index);
        }
      });
  
      nextBtn.addEventListener("click", () => {
        if (index < slides.length - 1) {
          index++;
          moveToSlide(index);
        }
      });
  
      window.addEventListener("resize", () => moveToSlide(index));
    }
  });
  