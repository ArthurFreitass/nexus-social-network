
// Mostra o texto que estava escondido
document.querySelectorAll('.description-text').forEach((textElement) => {
const fullText = textElement.innerText;
const limit = 150; // Limite de letras

if (fullText.length > limit) {
    const part1 = fullText.substring(0, limit);
    const part2 = fullText.substring(limit);

    textElement.innerHTML = `
      ${part1}<span class="dots">... </span><span class="view-more-btn">ver mais</span><span class="more-text" style="display: none;">${part2}</span>
    `;

    const btn = textElement.querySelector('.view-more-btn');
    btn.addEventListener('click', () => {
      textElement.querySelector('.more-text').style.display = "inline";
      textElement.querySelector('.dots').style.display = "none";
      btn.style.display = "none";
    });
  }
});


// Novo Post
const btnNewPost = document.getElementById("newPost")
btnNewPost.addEventListener("click", addPost)

function addPost(){
    const postNew = document.getElementById("modalPost")
    postNew.style.transition = "all ease 1s"

    postNew.addEventListener('click', (event) => {
    const rect = postNew.getBoundingClientRect();
    
    const clicouFora = (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    );

    // Se o clique foi fora, fecha o modal
    if (clicouFora) {
        postNew.close();
    }
});

    postNew.showModal();
}


/////////////   MUSIC  /////////////////////
const inputM = document.getElementById("upMusic");
inputM.addEventListener("change", FMusic);

function FMusic(){
    if(inputM.files.length > 0){

        const arquivo = inputM.files[0];
        const typeM = arquivo.type;
        const allowedAudios = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3', 'audio/webm'];
        if(!allowedAudios.includes(typeM)){
            window.alert("Esse formato não é permitido!");
            return;
        }

        const createMusic = document.createElement("audio");
        createMusic.classList.add("musicModal");
        createMusic.src = URL.createObjectURL(arquivo);
        createMusic.controls = true;
        const dropzoneM = document.querySelector(".dropzoneMusic");

        dropzoneM.appendChild(createMusic);

    }
    
}

const labelMusic = document.getElementById("labelMusic");
labelMusic.addEventListener("dragenter", onEnterMusic);
labelMusic.addEventListener("drop", e =>{
    e.preventDefault();
    onLeaveMusic();

    const arquivos = e.dataTransfer.files;
    if(arquivos.length > 0){
        const arquivo = arquivos[0];
        const type = arquivo.type;
        const allowedAudios = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3', 'audio/webm'];
        if(!allowedAudios.includes(type)){
            window.alert("Esse formato não é permitido!")
            return;
        }
        else{
            window.alert("Yes");
        }
    }
    

});

labelMusic.addEventListener("dragover", e =>{
    e.preventDefault();
    onEnterMusic();
});
labelMusic.addEventListener("dragleave", onLeaveMusic);

function onEnterMusic(){
    labelMusic.classList.add("active");
}
function onLeaveMusic(){
    labelMusic.classList.remove("active");
}
////////////////////////////////////////////////////////////////////////////////////////


//Imagem

const labelPhoto = document.getElementById("labelPhoto");
labelPhoto.addEventListener("dragenter", onEnterPhoto);
labelPhoto.addEventListener("drop", e => {
    e.preventDefault(); // Impede o navegador de tentar abrir o áudio/imagem na aba
    onLeavePhoto();    

    // Pega o arquivo que foi arrastado e solto ali dentro
    const arquivos = e.dataTransfer.files;

    if (arquivos.length > 0) {
        const arquivo = arquivos[0];
        const typeP = arquivo.type;
        const allowedPhoto = ["image/jpeg", "image/png", "image/jpg"];

        if (!allowedPhoto.includes(typeP)) {
            window.alert("Não é permitido esse formato (apenas imagens)!");
            return; 
        }

        const createImage = document.createElement("img");
        createImage.classList.add("photos");
        createImage.src = URL.createObjectURL(arquivo);

        dropzone.append(createImage);
}});

// Para aceitar que faça a verificação
labelPhoto.addEventListener("dragover", e => {
    e.preventDefault(); 
    onEnterPhoto();
});
labelPhoto.addEventListener("dragleave", onLeavePhoto);

function onEnterPhoto(){
    labelPhoto.classList.add("active");
}
function onLeavePhoto(){
    labelPhoto.classList.remove("active");
}

const inputP = document.getElementById("upPhoto");
const dropzone = document.querySelector(".dropzonePhoto")
inputP.addEventListener("change", FPhoto);

function FPhoto(){

    if(inputP.files.length > 0){

        const typeP = inputP.files[0].type;
        const allowedPhoto = ["image/jpeg" , "image/png" , "image/jpg"];
        if(!allowedPhoto.includes(typeP)){
            window.alert("Não é permitido esse formato");
            inputP.innerText = "";
            return;
        }

        const createImage = document.createElement("img");
        createImage.classList.add("photos")
        createImage.src = URL.createObjectURL(inputP.files[0]);

        dropzone.append(createImage);
        console.log(createImage);

    }
}
