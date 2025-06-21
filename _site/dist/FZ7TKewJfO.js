document.addEventListener("DOMContentLoaded", function () {
    const img = document.querySelector("img.fade-in");
    if (img) {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", () => img.classList.add("loaded"));
      }
    }
  });
lucide.createIcons();