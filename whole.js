// modal.js
document.addEventListener('DOMContentLoaded', () => {
    // Price Modal Logic (unchanged)
    const priceModal = document.getElementById("price-modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close-btn");
  
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
    });
  
    closeBtn.addEventListener("click", () => {
      priceModal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === priceModal) {
        priceModal.style.display = "none";
      }
    });
  
    // ✅ Form Success Modal Logic
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('contact-form');
        const successModal = document.querySelector('.form-complete');
        const closeSuccessBtn = document.querySelector('.close-success');
      
        if (form && successModal && closeSuccessBtn) {
          form.addEventListener('submit', function (e) {
            e.preventDefault();
      
            const formData = new FormData(form);
      
            fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(formData).toString()
            })
            .then(() => {
              successModal.style.display = 'flex';
              form.reset();
            })
            .catch(error => alert('Submission error: ' + error));
          });
      
          closeSuccessBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
          });
      
          window.addEventListener('click', (e) => {
            if (e.target === successModal) {
              successModal.style.display = 'none';
            }
          });
        }
      });
      


//projects gallery to carousel
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.project-video');
  
    const isMobile = window.innerWidth <= 768;
  
    videos.forEach(video => {
      if (isMobile) {
        // Tap-to-play logic
        video.addEventListener('click', () => {
          if (video.paused) {
            // Pause all other videos
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
      } else {
        // Hover-to-play (desktop)
        video.addEventListener('mouseenter', () => video.play());
        video.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      }
    });
  });
  