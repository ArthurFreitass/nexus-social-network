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
song.src = "/src/assets/audio/Titanium x Please Me - TRUE CHAD.mp3"

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
let postIdAtual = null;

// Mesma chave usada no feed.js: assim os comentários feitos em uma página aparecem na outra
const CHAVE_COMENTARIOS = "nexusComentariosPorPost";

function carregarTodosComentarios() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_COMENTARIOS)) || {};
    } catch (erro) {
        return {};
    }
}

function salvarTodosComentarios(todos) {
    try {
        localStorage.setItem(CHAVE_COMENTARIOS, JSON.stringify(todos));
    } catch (erro) {
        console.error("Não foi possível salvar os comentários:", erro);
    }
}

function carregarComentariosDoPost(postId) {
    return carregarTodosComentarios()[postId] || [];
}

function salvarComentariosDoPost(postId, comentarios) {
    const todos = carregarTodosComentarios();
    todos[postId] = comentarios;
    salvarTodosComentarios(todos);
}

// Usa o nome do arquivo da imagem como ID, igual ao feed.js, pra reconhecer o mesmo post nas duas páginas
function obterPostId(imgSrc) {
    if (imgSrc && !imgSrc.startsWith("data:")) {
        try {
            return new URL(imgSrc, window.location.href).pathname.split("/").pop();
        } catch (erro) {
            return imgSrc;
        }
    }
    return imgSrc || "post-desconhecido";
}

function criarComentarioEl(nome, foto, texto) {
    const novoComentario = document.createElement("div");
    novoComentario.classList.add("descriptionPhone");

    const imgPhone = document.createElement("div");
    imgPhone.classList.add("imgPhone");
    const img = document.createElement("img");
    img.src = foto;
    img.alt = "";
    imgPhone.appendChild(img);

    const infosPhone = document.createElement("div");
    infosPhone.classList.add("infosPhone");
    const nomeEl = document.createElement("p");
    nomeEl.classList.add("profilePhones");
    nomeEl.innerText = nome;
    const textoEl = document.createElement("p");
    textoEl.classList.add("textPhone");
    textoEl.innerText = texto;
    infosPhone.appendChild(nomeEl);
    infosPhone.appendChild(textoEl);

    novoComentario.appendChild(imgPhone);
    novoComentario.appendChild(infosPhone);
    return novoComentario;
}

if (postedMedias && modalComments) {
    const inputComments = modalComments.querySelector("#inputComments");
    const submitModal = modalComments.querySelector("#submitModal");
    const commentsList = modalComments.querySelector(".comments-list");
    const enviarComments = modalComments.querySelector(".enviarComments");
    const commentsCounter = modalComments.querySelector(".commentsCounter");

    // Os comentários fixos no HTML do modal eram só demonstração. Viram o "seed" do primeiro post
    // do feed (Design sem nome.png) só se ainda não existir nada salvo de verdade pra ele.
    (function carregarComentariosDemo() {
        const primeiraImgFeed = document.querySelector('.postedMedias .posts img');
        if (!primeiraImgFeed) return;
        const idDemo = obterPostId(primeiraImgFeed.src);
        if (carregarComentariosDoPost(idDemo).length > 0) return;

        const demo = [];
        commentsList.querySelectorAll(".descriptionPhone").forEach(div => {
            demo.push({
                nome: div.querySelector(".profilePhones").innerText,
                foto: div.querySelector(".imgPhone img").src,
                texto: div.querySelector(".textPhone").innerText
            });
        });
        salvarComentariosDoPost(idDemo, demo);
    })();

    // Preenche o modal só com os comentários do post que foi clicado
    function renderizarComentarios(postId) {
        commentsList.querySelectorAll(".descriptionPhone").forEach(el => el.remove());

        const comentarios = carregarComentariosDoPost(postId);
        comentarios.forEach(c => {
            const el = criarComentarioEl(c.nome, c.foto, c.texto);
            commentsList.insertBefore(el, enviarComments);
        });

        if (commentsCounter) commentsCounter.innerText = comentarios.length;
    }

    postedMedias.addEventListener("click", e => {
        if (e.target.classList.contains("imgPosts") || e.target.closest(".posts")) {
            const imgClicada = e.target.classList.contains("imgPosts") ? e.target : e.target.querySelector("img");
            
            if (imgClicada) {
                const modalImg = modalComments.querySelector(".photos");
                if (modalImg) modalImg.src = imgClicada.src;

                postIdAtual = obterPostId(imgClicada.src);
                renderizarComentarios(postIdAtual);
                
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
    function enviarComentario() {
        const texto = inputComments.value.trim();
        if (texto === "" || !postIdAtual) return;

        const comentarios = carregarComentariosDoPost(postIdAtual);
        comentarios.push({
            nome: list.NameUser,
            foto: list.fotoPerfilBase64 || fotoPerfil.src,
            texto
        });
        salvarComentariosDoPost(postIdAtual, comentarios);

        renderizarComentarios(postIdAtual);

        inputComments.value = "";
        const comentariosEls = commentsList.querySelectorAll(".descriptionPhone");
        const ultimo = comentariosEls[comentariosEls.length - 1];
        if (ultimo) ultimo.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
