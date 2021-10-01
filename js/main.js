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
const $customizeFlashcard = document.getElementById("flashcard_customize");
const $tituloTopic = document.getElementById("topic_title");

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
    // 
    topics.forEach((el) => {
        el.addEventListener("click", () => {
            localStorage.setItem("topic", Array.from(el.childNodes)[1].textContent)
            localStorage.setItem("id", el.getAttribute("data-id"))
            getFlashcards();
            $customizeFlashcard.classList.remove("hide");
        })
    })

}
// rotar flashcards
function rotateFlashcards() {
    // flashcards y sus botones de rotar
    const $rotateFlashcard = Array.from(document.getElementsByClassName("btn_rotate"));
    const $rotateBackFlashcard = Array.from(document.getElementsByClassName("back"));
    const $flashcards = Array.from(document.getElementsByClassName("flashcard"));
    // boton de eliminar
    const $btnDeleteCard = Array.from(document.getElementsByClassName("btn_delete"));
    // eventos para rotar
    $rotateFlashcard.forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            e.preventDefault();
            for (const j of $flashcards) {
                if (j.classList.contains("rotate")) {
                    j.classList.remove("rotate");
                }
            }
            let parent = el.parentNode.parentNode.parentNode;
            parent.classList.toggle("rotate");
        })
    })
    $rotateBackFlashcard.forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            let parent = el.parentNode.parentNode.parentNode;
            parent.classList.remove("rotate");
        })
    })
    // evento para eliminar flashcard

    $btnDeleteCard.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            let id = new FormData();
            id.append("id", el.getAttribute("data-id"));
            peticion("deleteFlashcard", id).then((data) => {
                getFlashcards()
            }).catch(err => console.error(err))
        })
    })
}

function eventoDeleteTopic() {
    const $deleteTopic = document.getElementById("delete_topic");
    $deleteTopic.addEventListener("click", (e) => {
        e.preventDefault();
        let dataFlahscard = new FormData();
        dataFlahscard.append("id_temario", localStorage.getItem("id"))
        peticion("deleteTopic", dataFlahscard).then(data => {
            if (data.status) {
                localStorage.removeItem("id")
                localStorage.removeItem("topic")
                $tituloTopic.textContent = "";
                showTopics();
                getFlashcards();
            } else {
                console.log(data.status)
            }
        });
    })
}
// traer flashcards
function getFlashcards() {
    if (localStorage.getItem("id")) {
        $tituloTopic.textContent = localStorage.getItem("topic");
        let id = new FormData();
        id.append("id", localStorage.getItem("id"));
        peticion("getFlashcards", id)
            .then(data => {
                if (data.status) {
                    $customizeFlashcard.classList.remove("hide");
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
                                <a href="#" class="settings btn_delete" data-id=${key.id_card}>
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
                    setTimeout(() => rotateFlashcards(), 10)
                    $main.innerHTML = flashcards;


                } else {
                    $main.innerHTML = `
                    <div class="not-found">
                        <span><ion-icon name="search-outline"></ion-icon></span>
                        <p>No tienes flashcards</p>
                    </div>`

                }
                $main.innerHTML += `
                <div class="delete_topic">
                    <a href="#" class="btn btn_secundary" id="delete_topic" >
                    <ion-icon name="trash-outline"></ion-icon>
                    <span>eliminar temario</span>
                    </a>
                </div>`;
                eventoDeleteTopic();

            }).catch(err => {
                console.log(err);
            })
    } else {
        // oculta las gestiones de flashcards
        $customizeFlashcard.classList.add("hide");
        // muestra el aviso de que no hay flashcard
        $main.innerHTML = `
                    <div class="not-found">
                        <span><ion-icon name="search-outline"></ion-icon></span>
                        <p>No has seleccionado un temario</p>
                    </div>`;
    }
}
// traer temarios
function showTopics() {
    peticion("getTopics").then(data => {
        if (data.status) {
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
    getFlashcards();
}

$openModalTopic.addEventListener("click", (e) => {
    e.preventDefault();
    $overlay.classList.add("visible")
    $titleModal.textContent = "agregar temario";
    $formTopic.classList.remove("hidden");

})
$formTopic.addEventListener("submit", (e) => {
    e.preventDefault();
    let dataTopic = new FormData($formTopic);
    let validacion = true;
    dataTopic.forEach(el => {
        if (el.trim() === "") {
            validacion = false;
        }
    })
    if (validacion) {
        peticion("addTopic", dataTopic).then(data => {
            if (data.status) {
                showTopics();
                getFlashcards();
            }
        });
    } else {
        alert("llene todos los campos")
    }
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
$formFlashcard.addEventListener("submit", (e) => {
    e.preventDefault();
    let dataFlahscard = new FormData($formFlashcard);
    dataFlahscard.append("id_temario", localStorage.getItem("id"))
    peticion("addFlashcard", dataFlahscard).then(data => {
        if (data.status) {
            getFlashcards();
        }
    });
})