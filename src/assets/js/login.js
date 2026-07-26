let users = [];

try {
    const data = localStorage.getItem("UsersNexus");

    if (!data) {
        users = [];
    } else {
        const convert = JSON.parse(data);
        users = Array.isArray(convert) ? convert : [];
    }
} catch {
    console.log("Error reading users!");
    users = [];
}

document.addEventListener("DOMContentLoaded", () => {
    const testLogin = JSON.parse(localStorage.getItem("logged-in-User")) || JSON.parse(sessionStorage.getItem("logged-in-User"));

    if (testLogin && localStorage.getItem("rememberMe") === JSON.stringify(true)) {
        window.location.href = "feed.html"
    }
})

const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {

    event.preventDefault()

    const login = document.getElementById("email").value.trim()
    const password = document.getElementById("senha").value.trim()
    const rememberMe = document.getElementById("lembrar").checked

    if (checkLogin(login) === false) {
        return
    }

    const user = findUserByLogin(login);

    if (!user) {
        const emailErrorMsg = document.getElementById("emailError")
        emailErrorMsg.innerHTML = isUsername(login)
            ? "<strong>Nome de usuário não encontrado</strong>"
            : "<strong>E-mail não encontrado</strong>"
        return;
    }

    if (user.Password !== password) {
        document.getElementById("senhaError").innerHTML = "<strong>Senha inválida</strong>"
        return;
    }

    if (rememberMe) {
        localStorage.setItem("logged-in-User", JSON.stringify({
            Email: user.Email
        }))
        localStorage.setItem("rememberMe", true)
    } else {
        sessionStorage.setItem("logged-in-User", JSON.stringify({
            Email: user.Email
        }))
        localStorage.setItem("rememberMe", false)
    }
    window.location.href = "feed.html"

});

const isUsername = (value) => {
    return value.startsWith("@");
}

const findUserByLogin = (value) => {
    if (isUsername(value)) {
        return users.find(u => u.NameUser === value);
    }
    return users.find(u => u.Email === value);
}

const checkLogin = (value) => {
    if (isUsername(value)) {
        return true;
    }

    if (!isValidEmail(value)) {
        const emailErrorMsg = document.getElementById("emailError")
        emailErrorMsg.innerHTML = "<strong>Entre com um e-mail válido ou um nome de usuário começando com @!</strong>"
        return false
    }
    return true;
}


const isValidEmail = (value) => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return regex.test(value)
}

document.getElementById("email").addEventListener("input", () => {
    document.getElementById("emailError").textContent = "";
});

document.getElementById("senha").addEventListener("input", () => {
    document.getElementById("senhaError").textContent = "";
});
