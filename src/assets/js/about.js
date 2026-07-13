(function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
        hamburger.classList.toggle('active');
        nav.classList.toggle('nav-active');
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
})();

// tema

const body = document.body
const icon = document.querySelector("#theme img")
const themeToggle = document.getElementById('theme');

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("Theme") === "light") {
        body.classList.add("light-mode")
        icon.alt = "Mudar para modo escuro";
    } else {
        icon.src = "../assets/img/sun.png"
        icon.alt = "Mudar para modo claro";
    }
})

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-mode")

    if (body.classList.contains("light-mode")) {
        icon.src = "../assets/img/lua.png"
        icon.alt = "Mudar para modo escuro";
        localStorage.setItem("Theme", "light")
    } else {
        icon.src = "../assets/img/sun.png"
        icon.alt = "Mudar para modo claro";
        localStorage.setItem("Theme", "dark")
    }
})

const elements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15
});

elements.forEach(el => observer.observe(el));
