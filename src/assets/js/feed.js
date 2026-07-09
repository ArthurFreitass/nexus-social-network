
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

    postNew.showModal();
}
