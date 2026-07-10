
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

// Colocar foto e musica
const labelMusic = document.getElementById("labelMusic");
labelMusic.addEventListener("dragenter", onEnterMusic);
labelMusic.addEventListener("drop", onLeaveMusic);
labelMusic.addEventListener("dragover", onEnterMusic);
labelMusic.addEventListener("dragleave", onLeaveMusic);

function onEnterMusic(){
    labelMusic.classList.add("active");
}
function onLeaveMusic(){
    labelMusic.classList.remove("active");
}

const labelPhoto = document.getElementById("labelPhoto");
labelPhoto.addEventListener("dragenter", onEnterPhoto);
labelPhoto.addEventListener("drop", onLeavePhoto);
labelPhoto.addEventListener("dragover", onEnterPhoto);
labelPhoto.addEventListener("dragleave", onLeavePhoto);

function onEnterPhoto(){
    labelPhoto.classList.add("active");
}
function onLeavePhoto(){
    labelPhoto.classList.remove("active");
}

//Imagem 
/*const input = document.getElementById("upPhoto");
input.addEventListener("change", event => {
  if(input.files.length > 0)

    //console.log(input.files);
    const type = input.files[0].type
    console.log(type);
})*/
