const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const detailsEls = document.querySelectorAll(".faq-list details");
detailsEls.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    detailsEls.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
