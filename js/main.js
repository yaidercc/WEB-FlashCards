// variables
const $btnOpenTopics = document.getElementById("btn_open-topics");
const $lisTopics = document.getElementById("submenu_topics");
let $rotateFlashcard = document.getElementsByClassName("btn_rotate");
let $rotateBackFlashcard = document.getElementsByClassName("back");
let $flashcards = document.getElementsByClassName("flashcard");
const $openModalTopic = document.getElementById("btn_new-Topic");
const $openModalFlashcard = document.getElementById("btn_new-flashcard");
const $overlay = document.getElementById("overlay");
const $modal = document.getElementById("modal");
const $closeModal = document.getElementById("btn_close");
const $titleModal = document.getElementById("title_modal");
const $formTopic = document.getElementById("form_topic");
const $formFlashcard = document.getElementById("form_flashcards");
const $containerTopics = document.getElementById("topics_container");
// functions

// Events
for (const i of $rotateFlashcard) {
    i.addEventListener("click", (e) => {
        e.preventDefault();
        for (const j of $flashcards) {

            if (j.classList.contains("rotate")) {
                j.classList.remove("rotate");
            }
        }
        let parent = i.parentNode.parentNode.parentNode;
        parent.classList.toggle("rotate");

    })
}

for (const i of $rotateBackFlashcard) {
    i.addEventListener("click", (e) => {
        e.preventDefault();
        let parent = i.parentNode.parentNode.parentNode;
        parent.classList.remove("rotate");
    })
}
$openModalTopic.addEventListener("click", (e) => {
    e.preventDefault();
    $overlay.classList.add("visible")
    $titleModal.textContent = "agregar temario";
    $formTopic.classList.remove("hidden");
})
$openModalFlashcard.addEventListener("click", (e) => {
    e.preventDefault();
    $overlay.classList.add("visible")
    $titleModal.textContent = "agregar flashcard";
    $formFlashcard.classList.remove("hidden");
})
$closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    $formTopic.classList.add("hidden");
    $formFlashcard.classList.add("hidden");
    $overlay.classList.remove("visible")
})

window.onload = () => {

}