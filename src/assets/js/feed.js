
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


///////////////////////////////////  Novo Post  /////////////////////////////////////////////////////
const btnNewPost = document.getElementById("newPost")
const postNew = document.getElementById("modalPost");
btnNewPost.addEventListener("click", addPost)

function addPost(){
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
/////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////  Curtida  ////////////////////////////////////////////////
const main = document.querySelector(".card");

main.addEventListener("click", e => {
    if(e.target.classList.contains("like")){
        const like = e.target;
        
        const blocoLikes = like.closest(".likes");
        const likeCounter = blocoLikes.querySelector(".likeCounter");

        let contadorLike = Number(likeCounter.innerText);

        if(like.src.includes("coracao-com-like.png")){
            like.src = "/src/assets/img/coracao-sem-like.png";
            contadorLike--;
        } else {
            like.src = "/src/assets/img/coracao-com-like.png";
            contadorLike++;
        }
        
        likeCounter.innerText = contadorLike;

    }
});
///////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////// Comentários /////////////////////////////////////////////////////////
main.addEventListener("click", e => {
    if(e.target.classList.contains("commentsClick")){
        const comment = e.target;
        //console.log(comment);

        const modalComments = document.querySelector(".modalComments");
        modalComments.showModal();

        const commentCounter = main.querySelector(".commentsCounter");
        let contadorComment = Number(commentCounter.innerText);

        
    }
})

///////////////////////////////////   MUSIC  /////////////////////////////////////////////
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


//////////////////////////////////////////// Imagem ///////////////////////////////////////////////////

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

        newURL = createImage.src;
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
        newURL = createImage.src

        dropzone.append(createImage);

    } 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////  POST  ////////////////////////////////////////////////
const btnPost = document.getElementById("btnPhoto");
const card = document.querySelector(".card");
let newURL;

btnPost.addEventListener("click", postar);

function postar(){
    const cardModel = document.querySelector(".photo-card");
    const clearPhoto = document.getElementById("upPhoto")
    const newCard = cardModel.cloneNode(true);
    const newPhoto = newCard.querySelector(".photos");
    const newLikes = newCard.querySelector(".like")
    let couter = newCard.querySelector(".likeCounter");
    const inputDescription = document.getElementById("textInput");
    let newcomments = newCard.querySelector(".description-text");
    
    if(!newURL || newURL === "undefined"){
        window.alert("Insira uma imagem!");
        return;
    }

    if(inputDescription.value.trim() === ""){
        window.alert("Insira uma descrição!");
        return;
    }

    couter.innerText = "0";
    newLikes.src = "/src/assets/img/coracao-sem-like.png";
    newPhoto.src = newURL;
    newcomments.innerText = inputDescription.value; 

    const textElement = newCard.querySelector('.description-text');
    const fullText = textElement.innerText;
    const limit = 150; 

    // Se o texto do post novo for maior que o limite, aplica a máscara nele também
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

    card.appendChild(newCard);

    inputDescription.value = "";
    const previewImg = dropzone.querySelector("img.photos");
    if (previewImg) {
        previewImg.remove();
    }

    postNew.close();

}
