///////////////////////////////// You Profile ////////////////////////////////////////
const userList = JSON.parse(localStorage.getItem("UsersNexus"));
const list = userList[0];
const nameProfile = document.getElementById("nomeUsuario");
const fotoPerfil = document.getElementById("fotoPerfil");
nameProfile.innerText = list.NameUser;
if (list.fotoPerfilBase64) fotoPerfil.src = list.fotoPerfilBase64;

// Mostra na tela a bio/trabalhos que já estavam salvos (se existirem)
const bioTexto = document.getElementById("bioTexto");
const trabalhosTexto = document.getElementById("trabalhosTexto");

if (list.bio) bioTexto.innerText = list.bio;
if (list.trabalhos) trabalhosTexto.innerText = list.trabalhos;


//////////////////////////////////////////  Follow  //////////////////////////////////////////////
const contadorFollow = document.getElementById("followers")
const btnFollow = document.getElementById("follow");
let cont = 0;
let controlerFollow = false;
let idiomaAtual = "pt-BR"; 

btnFollow.addEventListener("click", e => {
    if (controlerFollow === false) {
        btnFollow.classList.add("followSelect");
        btnFollow.innerText = traducoes[idiomaAtual].seguindoBtn;
        cont++;
        contadorFollow.innerText = cont;
        controlerFollow = true; 
    }
    else {
        btnFollow.classList.remove("followSelect");
        btnFollow.innerText = traducoes[idiomaAtual].seguir;
        cont--;
        contadorFollow.innerText = cont; 
        controlerFollow = false;
    }
});

//////////////////////////////////////////////  Day music  //////////////////////////////////////////////////////////
const btnMusic = document.querySelector(".btn-control");
const song = document.getElementById("daySong");
const capaMusica = document.getElementById("capaMusica");
const tituloMusica = document.getElementById("tituloMusica");
const autorMusica = document.getElementById("autorMusica");
song.src = "../assets/audio/Titanium x Please Me - TRUE CHAD.mp3"

// Se a pessoa já tiver salvo música/capa/foto de perfil próprias, usa elas no lugar das padrão
if (list.musicaPerfilBase64) {
    song.src = list.musicaPerfilBase64;
}
if (list.capaMusicaBase64) {
    capaMusica.src = list.capaMusicaBase64;
}
if (list.musicaTitulo) {
    tituloMusica.innerText = list.musicaTitulo;
}
if (list.musicaAutor) {
    autorMusica.innerText = list.musicaAutor;
}

let musicController = false;

btnMusic.addEventListener("click", e =>{ 
    if(musicController === false){
        song.play();
        btnMusic.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
        musicController = true;
    }
    else{
        song.pause();
        btnMusic.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;  
        musicController = false;
    }
    
})

const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");

// Função auxiliar para formatar segundos em "0:00"
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

song.addEventListener("loadedmetadata", () => {
  progressBar.max = Math.floor(song.duration);
  durationTimeEl.innerText = formatTime(song.duration);
});

song.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(song.currentTime);
  currentTimeEl.innerText = formatTime(song.currentTime);
});

progressBar.addEventListener("input", () => {
  song.currentTime = progressBar.value;
  currentTimeEl.innerText = formatTime(progressBar.value);
});

////////////////////////////////////  New Post  /////////////////////////////////////////////////////////////


/////////////////////////////////  Modal Post  ////////////////////////////////////
const postedMedias = document.querySelector(".postedMedias");
const modalComments = document.querySelector(".modalComments");

if (postedMedias && modalComments) {
    postedMedias.addEventListener("click", e => {
        if (e.target.classList.contains("imgPosts") || e.target.closest(".posts")) {
            const imgClicada = e.target.classList.contains("imgPosts") ? e.target : e.target.querySelector("img");
            
            if (imgClicada) {
                const modalImg = modalComments.querySelector(".photos");
                if (modalImg) modalImg.src = imgClicada.src;
                
                modalComments.showModal();
            }
        }
    });

    modalComments.addEventListener("click", event => {
        const rect = modalComments.getBoundingClientRect();
        const clicouFora = (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        );
        if (clicouFora) modalComments.close();
    });

    ///////////////////////////  Curtida (dentro do modal)  ///////////////////////////
    modalComments.addEventListener("click", e => {
        if (e.target.classList.contains("like")) {
            const botaoLike = e.target;
            const blocoLikes = botaoLike.closest(".likes");
            const likeCounter = blocoLikes.querySelector(".likeCounter");

            let contadorLike = Number(likeCounter.innerText);

            if (botaoLike.src.includes("coracao-com-like.png")) {
                botaoLike.src = "/src/assets/img/coracao-sem-like.png";
                contadorLike--;
            } else {
                botaoLike.src = "/src/assets/img/coracao-com-like.png";
                contadorLike++;
            }

            likeCounter.innerText = contadorLike;
        }
    });

    ///////////////////////////  Novo comentário  ///////////////////////////
    const inputComments = modalComments.querySelector("#inputComments");
    const submitModal = modalComments.querySelector("#submitModal");
    const commentsList = modalComments.querySelector(".comments-list");
    const enviarComments = modalComments.querySelector(".enviarComments");

    function enviarComentario() {
        const texto = inputComments.value.trim();
        if (texto === "") return;

        const novoComentario = document.createElement("div");
        novoComentario.classList.add("descriptionPhone");

        const imgPhone = document.createElement("div");
        imgPhone.classList.add("imgPhone");
        const img = document.createElement("img");
        img.src = list.fotoPerfilBase64 || fotoPerfil.src;
        img.alt = "";
        imgPhone.appendChild(img);

        const infosPhone = document.createElement("div");
        infosPhone.classList.add("infosPhone");
        const nome = document.createElement("p");
        nome.classList.add("profilePhones");
        nome.innerText = list.NameUser;
        const texto2 = document.createElement("p");
        texto2.classList.add("textPhone");
        texto2.innerText = texto;
        infosPhone.appendChild(nome);
        infosPhone.appendChild(texto2);

        novoComentario.appendChild(imgPhone);
        novoComentario.appendChild(infosPhone);

        commentsList.insertBefore(novoComentario, enviarComments);

        const commentsCounter = modalComments.querySelector(".commentsCounter");
        if (commentsCounter) commentsCounter.innerText = Number(commentsCounter.innerText) + 1;

        inputComments.value = "";
        novoComentario.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    submitModal.addEventListener("click", enviarComentario);
    inputComments.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            enviarComentario();
        }
    });
}


///////////////////////////////  Modal Config  /////////////////////////////////
const btnConfig = document.querySelector(".config");
const modalConfig = document.querySelector(".settings");

btnConfig.addEventListener("click", e =>{
    modalConfig.showModal();
})

modalConfig.addEventListener("click", event => {
        if (event.target === modalConfig) modalConfig.close();
    });


///////////////////////////////  Abas do modal de Configurações  /////////////////////////////////
const botoesDeAba = document.querySelectorAll(".optionIcon");
const paineis = document.querySelectorAll(".painelSettings");

function ativarAba(nomeDoPainel) {
    botoesDeAba.forEach(b => b.classList.toggle("active", b.dataset.panel === nomeDoPainel));
    paineis.forEach(painel => painel.classList.toggle("active", painel.id === `painel-${nomeDoPainel}`));
}

botoesDeAba.forEach(botao => {
    botao.addEventListener("click", () => ativarAba(botao.dataset.panel));
});

btnConfig.addEventListener("click", () => {
    ativarAba("perfil"); // abre sempre começando na aba de perfil
});


///////////////////////////////  Painel: Editar Perfil  /////////////////////////////////
const inputUsername = document.getElementById("inputUsername");
const inputFotoPerfil = document.getElementById("inputFotoPerfil");
const inputMusicaTitulo = document.getElementById("inputMusicaTitulo");
const inputMusicaAutor = document.getElementById("inputMusicaAutor");
const inputMusicaPerfil = document.getElementById("inputMusicaPerfil");
const inputCapaMusica = document.getElementById("inputCapaMusica");
const textareaBio = document.getElementById("textareaBio");
const textareaTrabalhos = document.getElementById("textareaTrabalhos");
const contadorBio = document.getElementById("contadorBio");
const contadorTrabalhos = document.getElementById("contadorTrabalhos");
const btnSalvarPerfil = document.getElementById("btnSalvarPerfil");

btnConfig.addEventListener("click", () => {
    inputUsername.value = list.NameUser || "";
    inputMusicaTitulo.value = list.musicaTitulo || "";
    inputMusicaAutor.value = list.musicaAutor || "";
    textareaBio.value = list.bio || "";
    textareaTrabalhos.value = list.trabalhos || "";
    contadorBio.innerText = textareaBio.value.length;
    contadorTrabalhos.innerText = textareaTrabalhos.value.length;
});

textareaBio.addEventListener("input", () => {
    contadorBio.innerText = textareaBio.value.length;
});
textareaTrabalhos.addEventListener("input", () => {
    contadorTrabalhos.innerText = textareaTrabalhos.value.length;
});

function lerArquivoComoBase64(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => resolve(leitor.result);
        leitor.onerror = erro => reject(erro);
        leitor.readAsDataURL(arquivo);
    });
}

btnSalvarPerfil.addEventListener("click", async () => {
    const novoUsername = inputUsername.value.trim();
    if (novoUsername === "") {
        window.alert("O nome de usuário não pode ficar vazio!");
        return;
    }

    list.NameUser = novoUsername;
    list.bio = textareaBio.value.trim();
    list.trabalhos = textareaTrabalhos.value.trim();
    list.musicaTitulo = inputMusicaTitulo.value.trim();
    list.musicaAutor = inputMusicaAutor.value.trim();

    // Só troca a foto de perfil se a pessoa escolheu uma imagem nova
    if (inputFotoPerfil.files.length > 0) {
        try {
            list.fotoPerfilBase64 = await lerArquivoComoBase64(inputFotoPerfil.files[0]);
        } catch (erro) {
            console.error("Erro ao ler a foto de perfil:", erro);
            window.alert("Não deu pra ler a foto, tenta outra.");
            return;
        }
    }

    // Só troca a música se a pessoa escolheu um arquivo novo
    if (inputMusicaPerfil.files.length > 0) {
        try {
            list.musicaPerfilBase64 = await lerArquivoComoBase64(inputMusicaPerfil.files[0]);
        } catch (erro) {
            console.error("Erro ao ler a música do perfil:", erro);
            window.alert("Não deu pra ler o arquivo de música, tenta outro.");
            return;
        }
    }

    // Só troca a capa se a pessoa escolheu uma imagem nova
    if (inputCapaMusica.files.length > 0) {
        try {
            list.capaMusicaBase64 = await lerArquivoComoBase64(inputCapaMusica.files[0]);
        } catch (erro) {
            console.error("Erro ao ler a capa da música:", erro);
            window.alert("Não deu pra ler a imagem, tenta outra.");
            return;
        }
    }

    userList[0] = list;
    try {
        localStorage.setItem("UsersNexus", JSON.stringify(userList));
    } catch (erro) {
        console.error("Erro ao salvar no localStorage:", erro);
        window.alert("Não deu pra salvar (talvez a música/imagem esteja muito grande). Tenta um arquivo menor.");
        return;
    }

    nameProfile.innerText = list.NameUser;
    bioTexto.innerText = list.bio;
    trabalhosTexto.innerText = list.trabalhos;
    tituloMusica.innerText = list.musicaTitulo || tituloMusica.innerText;
    autorMusica.innerText = list.musicaAutor || autorMusica.innerText;
    if (list.fotoPerfilBase64) fotoPerfil.src = list.fotoPerfilBase64;
    if (list.musicaPerfilBase64) song.src = list.musicaPerfilBase64;
    if (list.capaMusicaBase64) capaMusica.src = list.capaMusicaBase64;

    inputFotoPerfil.value = "";
    inputMusicaPerfil.value = "";
    inputCapaMusica.value = "";
    window.alert("Perfil atualizado!");
});


///////////////////////////////  Painel: Segurança (fictício)  /////////////////////////////////
document.querySelectorAll(".btnSairSessao").forEach(botao => {
    botao.addEventListener("click", () => {
        botao.closest(".sessaoItem").remove();
    });
});


///////////////////////////////  Painel: Idioma  /////////////////////////////////
const traducoes = {
    "pt-BR": {
        seguidores: "Seguidores", seguindo: "Seguindo", seguir: "Seguir", seguindoBtn: "Seguindo",
        mensagem: "Mensagem", bio: "Bio", trabalhos: "Trabalhos e competências",
        configuracoes: "Configurações", perfilLabel: "Edite seu perfil",
        segurancaLabel: "Segurança", idiomaLabel: "Idioma", salvar: "Salvar alterações"
    },
    "en": {
        seguidores: "Followers", seguindo: "Following", seguir: "Follow", seguindoBtn: "Following",
        mensagem: "Message", bio: "Bio", trabalhos: "Work & skills",
        configuracoes: "Settings", perfilLabel: "Edit your profile",
        segurancaLabel: "Security", idiomaLabel: "Language", salvar: "Save changes"
    },
    "es": {
        seguidores: "Seguidores", seguindo: "Siguiendo", seguir: "Seguir", seguindoBtn: "Siguiendo",
        mensagem: "Mensaje", bio: "Biografía", trabalhos: "Trabajos y habilidades",
        configuracoes: "Configuración", perfilLabel: "Edita tu perfil",
        segurancaLabel: "Seguridad", idiomaLabel: "Idioma", salvar: "Guardar cambios"
    }
};

function aplicarIdioma(codigoIdioma) {
    const dicionario = traducoes[codigoIdioma] || traducoes["pt-BR"];

    document.documentElement.lang = codigoIdioma;
    idiomaAtual = codigoIdioma;

    document.querySelectorAll("[data-i18n]").forEach(elemento => {
        const chave = elemento.dataset.i18n;
        if (dicionario[chave]) elemento.innerText = dicionario[chave];
    });

    btnFollow.innerText = controlerFollow ? dicionario.seguindoBtn : dicionario.seguir;

    document.querySelectorAll(".idiomaBtn").forEach(botao => {
        botao.classList.toggle("active", botao.dataset.lang === codigoIdioma);
    });

    localStorage.setItem("nexusLang", codigoIdioma);
}

document.querySelectorAll(".idiomaBtn").forEach(botao => {
    botao.addEventListener("click", () => aplicarIdioma(botao.dataset.lang));
});

aplicarIdioma(localStorage.getItem("nexusLang") || "pt-BR");
