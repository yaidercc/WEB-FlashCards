// variables
const $btnOpenTopics = document.getElementById("btn_open-topics");
const $lisTopics = document.getElementById("submenu_topics");
const $openModalTopic = document.getElementById("btn_new-Topic");
const $openModalFlashcard = document.getElementById("btn_new-flashcard");
const $overlay = document.getElementById("overlay");
const $modal = document.getElementById("modal");
const $closeModal = document.getElementById("btn_close");
const $titleModal = document.getElementById("title_modal");
const $formTopic = document.getElementById("form_topic");
const $formFlashcard = document.getElementById("form_flashcards");
const $containerTopics = document.getElementById("topics_container");
const $main = document.getElementById("main");
// functions

// peticiones
function peticion(metodo, param) {
    let data = new FormData();
    data.append("method", metodo)
    if (param) {
        param.forEach((el, i) => {
            data.append(i, el);
        })

    }
    let topics = fetch("https://localhost/Mis%20Proyectos/En%20proceso/FlashCards-v2/php/view.php", {
            method: "POST",
            body: data
        })
        .then(resp => resp.json())
        .then(data => data)
        .catch(err => err)
    return topics;
}
// aplicar eventos a la lista de temas
function eventoTopics() {
    const topics = Array.from(document.getElementsByClassName("topic"));
    topics.forEach((el) => {
        el.addEventListener("click", () => {
            localStorage.setItem("topic", Array.from(el.childNodes)[1].textContent)
            localStorage.setItem("id", el.getAttribute("data-id"))
            getFlashcards();
        })
    })
}
// rotar flashcards
function rotateFlashcards() {
    const $rotateFlashcard = Array.from(document.getElementsByClassName("btn_rotate"));
    const $rotateBackFlashcard = Array.from(document.getElementsByClassName("back"));
    const $flashcards = Array.from(document.getElementsByClassName("flashcard"));
    $rotateFlashcard.forEach(el => {
        el.addEventListener("click", function () {
            alert("hola")
        })
    })
    // for (const i of $rotateFlashcard) {
    //     i.addEventListener("click", (e) => {
    //         alert("hola")
    //         e.preventDefault();
    //         for (const j of $flashcards) {

    //             if (j.classList.contains("rotate")) {
    //                 j.classList.remove("rotate");
    //             }
    //         }
    //         let parent = i.parentNode.parentNode.parentNode;
    //         parent.classList.toggle("rotate");

    //     })
    // }
    // for (const i of $rotateBackFlashcard) {
    //     i.addEventListener("click", (e) => {
    //         e.preventDefault();
    //         let parent = i.parentNode.parentNode.parentNode;
    //         parent.classList.remove("rotate");
    //     })
    // }
}
// traer flashcards
function getFlashcards() {
    if (localStorage.getItem("id")) {
        let id = new FormData();
        id.append("id", localStorage.getItem("id"));
        peticion("getFlashcards", id)
            .then(data => {
                if (data.status) {
                    console.log(data)
                    let flashcards = `<div class="container_flashcards scroll">`
                    const arr = [...data.data];
                    for (const key of arr) {
                        flashcards += `
                            <div class="flashcard" data-id=${key.id_card}>
                            <div class="face anverse">
                            <div class="flashcards_settings">
                                <a href="#" class="settings btn_palette" >
                                    <ion-icon name="color-palette"></ion-icon>
                                </a>
                                <a href="#" class="btn_rotate">
                                    <ion-icon name="refresh-outline"></ion-icon>
                                </a>
                                <a href="#" class="settings btn_delete" >
                                    <ion-icon name="trash-outline"></ion-icon>
                                </a>
                            </div>
                            <div class="inpt_question">
                            <p>${key.anverso}</p>
                            </div>
                        </div>
                        <div class="face overse">
                            <div class="flashcards_settings">
                                <a href="#" class="btn_rotate back">
                                    <ion-icon name="refresh-outline"></ion-icon>
                                </a>
                            </div>
                            <div class="inpt_question">
                                <p>${key.reverso}</p>
                            </div>
                        </div>
                        
                        </div>`;
                    }
                    flashcards += `</div>`;

                    $main.innerHTML = flashcards;
                    rotateFlashcards()
                } else {
                    $main.innerHTML = `
                    <div class="not-found">
                        <span><ion-icon name="search-outline"></ion-icon></span>
                        <p>No tienes flashcards</p>
                    </div>`

                }
                $main.innerHTML += `
                <div class="delete_topic">
                    <a href="#" class="btn btn_secundary">
                    <ion-icon name="trash-outline"></ion-icon>
                    <span>eliminar temario</span>
                    </a>
                </div>`
            }).catch(err => {
                console.log(err);
            })
    } else {

    }
}
// SELECT * FROM flashcard f inner join flashcard_tema ft on ft.id_flashcard=f.id_card where ft.id_tema=1
// traer temarios
function showTopics() {
    peticion("getTopics").then(data => {

        if (data.status) {
            console.log(data);
            let topics = `<ul class="list_topics">`
            const arr = [...data.data];
            for (const key of arr) {
                topics += `
                <li class="topic" data-id=${key.id}>
                  <span>${key.tema}</span>
                  <a href="#">
                    <ion-icon name="trash-outline"></ion-icon>
                  </a>
                </li>`;
            }
            topics += `</ul>`;
            $containerTopics.innerHTML = topics;
            eventoTopics();
        } else {
            $containerTopics.innerHTML = `
            <div class="not-found">
            <span><ion-icon name="search-outline"></ion-icon></span>
            <p>No tienes temarios</p>
            </div> `
        }
    }).catch()
}
// Events

window.onload = () => {
    showTopics();
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
let b = new FormData()
b.append("ac", 2)
let a = new FormData();
a.append("datos", b.get("ac"));