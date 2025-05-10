const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

menuToggle.addEventListener("click", () => {
  const isExpanded =
    menuToggle.getAttribute("aria-expanded") === "true" || false;
  menuToggle.setAttribute("aria-expanded", !isExpanded);
  mainNav.classList.toggle("active");
  menuToggle.innerHTML = mainNav.classList.contains("active") ? "✕" : "☰";
});

function setActiveLink() {
  let currentSectionId = "home"; // Default
  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop - 100; // ajuste de offset
    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    // Ajuste para o link #cardapio-global quando em uma seção de menu de continente
    if (
      currentSectionId.includes("-menu") &&
      link.getAttribute("href") === "#cardapio-global"
    ) {
      link.classList.add("active");
    } else if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
  // Caso especial para o link "Início" quando no topo da página
  if (window.scrollY < document.getElementById("home").offsetHeight / 2) {
    navLinks.forEach((link) => link.classList.remove("active"));
    document.querySelector('.main-nav a[href="#home"]').classList.add("active");
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (mainNav.classList.contains("active") && window.innerWidth <= 768) {
      mainNav.classList.remove("active");
      menuToggle.innerHTML = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }
    // O setActiveLink será chamado no evento de scroll, então não precisa aqui
    // para evitar piscar, mas se quiser marcar imediatamente:
    // navLinks.forEach(navLink => navLink.classList.remove('active'));
    // link.classList.add('active');
  });
});

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink); // Define o link ativo ao carregar
