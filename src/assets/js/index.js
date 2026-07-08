// Alguns estilos

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');
const linksList = document.getElementById('links');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-active');

        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    linksList?.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            nav.classList.remove('nav-active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            document.body.style.overflow = '';
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            document.body.style.overflow = '';
        }
    });
}

const body = document.body
const btnTheme = document.getElementById("theme")
const themeIcon = document.querySelector("#theme img")

btnTheme.addEventListener("click", () => {

    body.classList.toggle("light-mode")

    if (body.classList.contains("light-mode")) {
        themeIcon.src = "./assets/img/lua.png"
        themeIcon.alt = "Mudar para modo escuro";
        localStorage.setItem("Theme", "light")
    } else {
        themeIcon.src = "./assets/img/sun.png"
        themeIcon.alt = "Mudar para modo claro";
        localStorage.setItem("Theme", "dark")
    }

})

document.addEventListener('DOMContentLoaded', () => {
    
    if (localStorage.getItem("Theme") === "light") {
        body.classList.add("light-mode");
        themeIcon.src = "./assets/img/lua.png"; 
        themeIcon.alt = "Mudar para modo escuro";
    } else {
        themeIcon.src = "./assets/img/sun.png"; 
        themeIcon.alt = "Mudar para modo claro";
    }

});