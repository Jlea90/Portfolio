document.addEventListener('DOMContentLoaded', () => {
  //
  // ─── PRICE MODAL ───────────────────────────────────────────────────────────────
  //
  const priceModal = document.getElementById("price-modal");
  const modalBody  = document.getElementById("modal-body");
  const closeBtn   = document.querySelector(".close-btn");

  // only run this code if all the pieces are on the page
  if (priceModal && modalBody && closeBtn) {
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
  }

  //
  // ─── (other page-specific scripts go here, each wrapped in their own `if`) ────
  //

}); // ← closes the DOMContentLoaded listener
