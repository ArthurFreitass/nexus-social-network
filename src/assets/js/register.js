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

document.getElementById("cadastroForm").addEventListener("submit", function (event) {

    document.querySelectorAll('.mensagem-erro').forEach(span => span.textContent = '');

    const name = document.getElementById("nome").value.trim()
    const nameUser = document.getElementById("usuario").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("senha").value.trim()
    const confirmPassword = document.getElementById("confirmarSenha").value.trim()
    const terms = document.getElementById("termos")

    if (isNameEmpty(name)) {
        const nameErrorMessage = document.getElementById("nomeError")
        nameErrorMessage.innerHTML = "<strong>Nome não pode ser nulo!</strong>"
        event.preventDefault();
        return
    }

    if (!checkNameUser()) {
        event.preventDefault()
        return
    }

    if (!isValidEmail(email)) {
        document.getElementById("emailError").innerHTML = "<strong>Formato de e-mail inválido!</strong>"
        event.preventDefault()
        return
    }

    if (!isPasswordValid(password, document.getElementById("senhaError"))) {
        event.preventDefault()
        return
    }

    if (!checkPassword(password, confirmPassword)) {
        event.preventDefault();
        return
    }

    if (!termsChecked(terms)) {
        event.preventDefault()
        return
    }

    const user = newUser(name, nameUser, email, password);

    const emailExists = checkEmailRegistered(user)

    if (emailExists) {
        const emailErrorMessage = document.getElementById("emailError")
        emailErrorMessage.textContent = "Erro este E-mail já foi cadastrado!"
        event.preventDefault()
        return
    } else {
        users.push(user)
        localStorage.setItem("UsersNexus", JSON.stringify(users))

        alert("Conta criada com sucesso!")
        event.preventDefault();

        window.location.href = "login.html"
    }
})

function isPasswordValid(password, errorSpanId) {

    if (!password) {
        errorSpanId.innerHTML = "<strong>A senha é obrigatória.</strong>";
        return false;
    }

    if (password.length < 6) {
        errorSpanId.innerHTML = "<strong>A senha deve ter pelo menos 6 caracteres.</strong>";
        return false;
    }
    return true;
}

function checkPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        document.getElementById("confirmarSenhaError").innerHTML = "<strong>As duas senhas são diferentes</strong>"
        return false;
    }
    return true;
}

function checkNameUser() {

    const nameUser = document.getElementById("usuario").value.trim()

    if (nameUser === "") {
        document.getElementById("usuarioError").innerHTML = "<strong>Nome do usuário não pode ser nulo!</strong>";
        return false
    }

    if (nameUser === "@") {
        document.getElementById("usuarioError").innerHTML = "<strong>Nome do usuário deve conter outro caractere!</strong>";
        return false
    }

    let userArr = nameUser.split("")

    if (userArr[0] !== "@") {
        document.getElementById("usuarioError").innerHTML = "<strong>O nome de um usuário deve começar com @!</strong>"
        return false
    }

    return true;
}

const newUser = (name, nameUser, email, password) => {
    const newUser = {
        Name: name,
        NameUser: nameUser,
        Email: email,
        Password: password,
    };

    return newUser;
}

const termsChecked = (terms) => {
    if (!terms.checked) {
        document.getElementById("termosError").innerHTML = "<strong>Você precisa aceitar os termos para continuar.</strong>";
        return false;
    }
    return true;
}

const isValidEmail = (value) => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return regex.test(value)
}


const checkEmailRegistered = (obj) => {
    return users.some(u => u.Email === obj.Email);
}

const isNameEmpty = (value) => {
    return value === ""
}
