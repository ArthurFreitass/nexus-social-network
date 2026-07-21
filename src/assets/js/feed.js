//////////////////////////// burguer ///////////////////////////////
const btnBurguer = document.getElementById("navgation");
const styleMenu = document.getElementById("menu");
let menuOpen = false;

btnBurguer.addEventListener("click", e =>{
    styleMenu.classList.toggle("open");
    if(menuOpen === false){
        styleMenu.style.display = "flex";
        menuOpen = true
    }
    else{
        styleMenu.style.display = "none"
        menuOpen = false
    }
    
})

// Mostra o texto que estava escondido
function aplicarLimiteTexto(textElement, limit = 150) {
  const fullText = textElement.innerText;

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
}

document.querySelectorAll('.description-text').forEach((textElement) => {
  aplicarLimiteTexto(textElement);
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
        e.stopPropagation();
        //console.log(comment);

        if(window.innerWidth > 1024){
            const modalComments = document.querySelector(".modalComments");
            modalComments.showModal();

            const commentCounter = main.querySelector(".commentsCounter");
            let contadorComment = Number(commentCounter.innerText);

            modalComments.addEventListener('click', (event) => {
            const rect = modalComments.getBoundingClientRect();
            
            const clicouFora = (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            );
            
            if (clicouFora) {
                modalComments.close();
            }})

            ///////////////////  Colocar a foto exata  /////////////////////////////////////////////
            let cardCompleto = comment.closest('.photo-card'); 
            const modal = modalComments.querySelector(".photos")
            const midiaP = cardCompleto.querySelector(".photos");
            const linkMidia = (midiaP.src);
            modal.src = linkMidia;
            //console.log(midiaP);

            ////////////////////// Descrição exata /////////////////////////////////////////////////
            const descriptionModal = modalComments.querySelector(".descriptionComments");
            const midiaDescripition = cardCompleto.querySelector(".description-text");
            descriptionModal.innerText = (midiaDescripition.textContent.split("... ver mais"));

            ///////////////////////  Perfil   exato  /////////////////////////////////////////////////////

        }
        else{
            const modalPhone = document.querySelector(".modalPhone");
            modalPhone.showModal();
            
        }
    }
        
})

///////////////////////////////////   MUSIC (com corte de trecho)  /////////////////////////////////////////////
let musicURL;
const inputM = document.getElementById("upMusic");
const labelMusic = document.getElementById("labelMusic");
const dropzoneM = document.querySelector(".dropzoneMusic");

let audioCtxTrim, audioBufferTrim;
let startRatioTrim = 0, endRatioTrim = 1;
let draggingHandleTrim = null;
let previewSourceTrim = null;

inputM.addEventListener("change", () => {
    if(inputM.files.length > 0) handleAudioFile(inputM.files[0]);
});

labelMusic.addEventListener("dragenter", onEnterMusic);
labelMusic.addEventListener("dragover", e => {
    e.preventDefault();
    onEnterMusic();
});
labelMusic.addEventListener("dragleave", onLeaveMusic);
labelMusic.addEventListener("drop", e => {
    e.preventDefault();
    onLeaveMusic();

    const arquivos = e.dataTransfer.files;
    if(arquivos.length > 0) handleAudioFile(arquivos[0]);
});

function onEnterMusic(){
    labelMusic.classList.add("active");
}
function onLeaveMusic(){
    labelMusic.classList.remove("active");
}

function handleAudioFile(arquivo){
    const typeM = arquivo.type;
    const allowedAudios = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3', 'audio/webm'];
    if(!allowedAudios.includes(typeM)){
        window.alert("Esse formato não é permitido!");
        return;
    }
    montarTrimmer(arquivo);
}

// Monta a interface de waveform + alças de corte dentro da dropzone
async function montarTrimmer(arquivo){
    const antigo = dropzoneM.querySelector(".audioTrimmer");
    if(antigo) antigo.remove();
    musicURL = undefined;

    audioCtxTrim = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await arquivo.arrayBuffer();
    audioBufferTrim = await audioCtxTrim.decodeAudioData(arrayBuffer);

    startRatioTrim = 0;
    endRatioTrim = 1;

    const wrap = document.createElement("div");
    wrap.className = "audioTrimmer";
    wrap.innerHTML = `
        <button type="button" class="trimClose" title="Trocar áudio">✕</button>
        <div class="trimWaveWrap">
            <canvas class="trimCanvas"></canvas>
            <div class="trimSelection"></div>
            <div class="trimHandle trimHandleStart"></div>
            <div class="trimHandle trimHandleEnd"></div>
        </div>
        <div class="trimControls">
            <button type="button" class="trimPreviewBtn">▶ Ouvir trecho</button>
            <button type="button" class="trimCutBtn">✂ Cortar e usar</button>
            <span class="trimTime">0.00s – 0.00s</span>
        </div>
    `;
    dropzoneM.appendChild(wrap);

    const canvas = wrap.querySelector(".trimCanvas");
    const ctx = canvas.getContext("2d");
    const handleStart = wrap.querySelector(".trimHandleStart");
    const handleEnd = wrap.querySelector(".trimHandleEnd");
    const selection = wrap.querySelector(".trimSelection");
    const waveWrap = wrap.querySelector(".trimWaveWrap");
    const timeLabel = wrap.querySelector(".trimTime");

    function desenharWaveform(){
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const data = audioBufferTrim.getChannelData(0);
        const width = rect.width;
        const height = rect.height;
        const step = Math.ceil(data.length / width);
        const amp = height / 2;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#A78BFA";

        for(let i = 0; i < width; i++){
            let min = 1.0, max = -1.0;
            for(let j = 0; j < step; j++){
                const datum = data[(i * step) + j] || 0;
                if(datum < min) min = datum;
                if(datum > max) max = datum;
            }
            ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
        }
    }

    function atualizarHandles(){
        const width = waveWrap.clientWidth;
        const startX = startRatioTrim * width;
        const endX = endRatioTrim * width;

        handleStart.style.left = startX + "px";
        handleEnd.style.left = (endX - 10) + "px";
        selection.style.left = startX + "px";
        selection.style.width = (endX - startX) + "px";

        const dur = audioBufferTrim.duration;
        timeLabel.textContent = `${(startRatioTrim * dur).toFixed(2)}s – ${(endRatioTrim * dur).toFixed(2)}s`;
    }

    function ratioFromClientX(clientX){
        const rect = waveWrap.getBoundingClientRect();
        let r = (clientX - rect.left) / rect.width;
        return Math.min(1, Math.max(0, r));
    }

    [handleStart, handleEnd].forEach(handle => {
        handle.addEventListener("mousedown", () => draggingHandleTrim = handle);
        handle.addEventListener("touchstart", () => draggingHandleTrim = handle);
    });

    function onMove(clientX){
        if(!draggingHandleTrim) return;
        const r = ratioFromClientX(clientX);
        if(draggingHandleTrim === handleStart){
            startRatioTrim = Math.min(r, endRatioTrim - 0.01);
        } else {
            endRatioTrim = Math.max(r, startRatioTrim + 0.01);
        }
        atualizarHandles();
    }

    window.addEventListener("mousemove", e => onMove(e.clientX));
    window.addEventListener("touchmove", e => { if(draggingHandleTrim) onMove(e.touches[0].clientX); });
    window.addEventListener("mouseup", () => draggingHandleTrim = null);
    window.addEventListener("touchend", () => draggingHandleTrim = null);

    function getTrimmedBuffer(){
        const dur = audioBufferTrim.duration;
        const startTime = startRatioTrim * dur;
        const endTime = endRatioTrim * dur;
        const sampleRate = audioBufferTrim.sampleRate;
        const startSample = Math.floor(startTime * sampleRate);
        const endSample = Math.floor(endTime * sampleRate);
        const frameCount = endSample - startSample;

        const trimmed = audioCtxTrim.createBuffer(
            audioBufferTrim.numberOfChannels,
            frameCount,
            sampleRate
        );

        for(let ch = 0; ch < audioBufferTrim.numberOfChannels; ch++){
            const original = audioBufferTrim.getChannelData(ch);
            const target = trimmed.getChannelData(ch);
            target.set(original.subarray(startSample, endSample));
        }
        return trimmed;
    }

    // Converte o AudioBuffer cortado em WAV (PCM 16-bit) pra virar Blob/URL usável no post
    function bufferToWav(buffer){
        const numChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const length = buffer.length * numChannels * 2 + 44;
        const arrBuf = new ArrayBuffer(length);
        const view = new DataView(arrBuf);

        function writeString(offset, str){
            for(let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
        }

        writeString(0, "RIFF");
        view.setUint32(4, length - 8, true);
        writeString(8, "WAVE");
        writeString(12, "fmt ");
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numChannels * 2, true);
        view.setUint16(32, numChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(36, "data");
        view.setUint32(40, length - 44, true);

        let offset = 44;
        const channels = [];
        for(let ch = 0; ch < numChannels; ch++) channels.push(buffer.getChannelData(ch));

        for(let i = 0; i < buffer.length; i++){
            for(let ch = 0; ch < numChannels; ch++){
                let sample = Math.max(-1, Math.min(1, channels[ch][i]));
                sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
                view.setInt16(offset, sample, true);
                offset += 2;
            }
        }

        return new Blob([arrBuf], { type: "audio/wav" });
    }

    wrap.querySelector(".trimPreviewBtn").addEventListener("click", () => {
        if(previewSourceTrim) previewSourceTrim.stop();
        const trimmed = getTrimmedBuffer();
        previewSourceTrim = audioCtxTrim.createBufferSource();
        previewSourceTrim.buffer = trimmed;
        previewSourceTrim.connect(audioCtxTrim.destination);
        previewSourceTrim.start();
    });

    // Corta de fato e deixa o trecho pronto pra ser usado no post (não faz download)
    wrap.querySelector(".trimCutBtn").addEventListener("click", () => {
        const trimmed = getTrimmedBuffer();
        const blob = bufferToWav(trimmed);
        musicURL = URL.createObjectURL(blob);

        wrap.innerHTML = `
            <button type="button" class="trimClose" title="Trocar áudio">✕</button>
            <p class="trimPronto">✂ Trecho cortado pronto pra postar</p>
            <audio class="musicModal" src="${musicURL}" controls></audio>
        `;
        wrap.querySelector(".trimClose").addEventListener("click", resetarAudio);
    });

    wrap.querySelector(".trimClose").addEventListener("click", resetarAudio);

    desenharWaveform();
    atualizarHandles();
}

// Remove o trimmer/preview e volta pra dropzone vazia, pronta pra outro áudio
function resetarAudio(){
    const antigo = dropzoneM.querySelector(".audioTrimmer");
    if(antigo) antigo.remove();
    musicURL = undefined;
    inputM.value = "";
}

main.addEventListener("click", e => {
    if(e.target.classList.contains("imgSong")){
        let btnAudio = e.target;
        const mainAudio = btnAudio.closest(".post");
        //console.log(mainAudio);
        const imgBtn = mainAudio.querySelector(".imgSong");
        const playSong = mainAudio.querySelector(".playSong");

        if (btnAudio.src.includes("sem-som.png")) {
            imgBtn.src = "/src/assets/img/som.png";
            playSong.play();
        } 
        else{
            imgBtn.src = "/src/assets/img/sem-som.png";
            playSong.pause();
        }
    }

})
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
    const newSong = newCard.querySelector(".playSong");
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

    newSong.src = musicURL;
    couter.innerText = "0";
    newLikes.src = "/src/assets/img/coracao-sem-like.png";
    newPhoto.src = newURL;
    newcomments.innerText = inputDescription.value; 

    const textElement = newCard.querySelector('.description-text');
    aplicarLimiteTexto(textElement);

    card.appendChild(newCard);

    inputDescription.value = "";
    const previewImg = dropzone.querySelector("img.photos");
    if (previewImg) {
        previewImg.remove();
    }
    resetarAudio();

    postNew.close();

}
