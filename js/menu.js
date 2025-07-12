document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const navPanel = document.getElementById("navPanel");

  menuButton.addEventListener("click", () => {
    navPanel.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!navPanel.contains(e.target) && !menuButton.contains(e.target)) {
      navPanel.classList.remove("show");
    }
  });
});