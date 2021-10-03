/* *** VARIABLES *** */
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
const $searchFlaschard = document.getElementById("search_flashcard");
const $searchTopics = document.getElementById("search_topics");
/* *** FUNCTIONS *** */

// Requests to the bd
function peticion(metodo, param) {
    // create new formdata
    let data = new FormData();
    // add method
    data.append("method", metodo)
    if (param) {
        param.forEach((el, i) => {
            data.append(i, el);
        })

    }
    // requests to de view source
    let response = fetch("https://localhost/Mis%20Proyectos/En%20proceso/FlashCards-v2/php/view.php", {
            method: "POST",
            body: data
        })
        // convert data in json
        .then(resp => resp.json())
        .then(data => data)
        .catch(err => err)
    // return data
    return response;
}
// search flashcards
function searchFlashcard() {

}
// search topics
function searchTopics() {

}
// topics events
function eventoTopics() {
    const topics = Array.from(document.getElementsByClassName("topic"));

    topics.forEach((el) => {
        el.addEventListener("click", () => {
            // add the name and the id to localstorage
            localStorage.setItem("topic", Array.from(el.childNodes)[1].textContent)
            localStorage.setItem("id", el.getAttribute("data-id"))
            // remove class active
            topics.forEach((ele) => {

                ele.classList.remove("active");

            })
            // add class actove
            el.classList.add("active")
            // call getFlashcards method
            getFlashcards();
            // shows customizeFlashcard 
            $customizeFlashcard.classList.remove("hide");
        })
    })

}
// flashcards events
function flashcardsEvents() {
    // flashcards btns
    const $rotateFlashcard = Array.from(document.getElementsByClassName("btn_rotate"));
    const $rotateBackFlashcard = Array.from(document.getElementsByClassName("back"));
    const $flashcards = Array.from(document.getElementsByClassName("flashcard"));
    const $btnDeleteCard = Array.from(document.getElementsByClassName("btn_delete"));
    // rotate flashcard events
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

    // delete event
    $btnDeleteCard.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Deseas eliminar esta flashcard?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                // if you accept
                if (result.isConfirmed) {
                    // create new form data
                    let id = new FormData();
                    // add id to the form data
                    id.append("id", el.getAttribute("data-id"));
                    // call peticion method
                    peticion("deleteFlashcard", id).then((data) => {
                        // refresh flashcards
                        getFlashcards()
                    }).catch(err => console.error(err))
                }
            })

        })
    })
}

// delete topic event
function eventoDeleteTopic() {
    // delete topic btn
    const $deleteTopic = document.getElementById("delete_topic");
    // event
    $deleteTopic.addEventListener("click", (e) => {
        e.preventDefault();
        // creates formData
        let dataFlahscard = new FormData();
        // adds id_temario
        dataFlahscard.append("id_temario", localStorage.getItem("id"))
        // call peticion method
        peticion("deleteTopic", dataFlahscard).then(data => {
            if (data.status) {
                // questions if you wnat delete hat topic
                Swal.fire({
                    title: 'Deseas eliminar este temario?',
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    // if you accept
                    if (result.isConfirmed) {
                        // clear localstorage
                        localStorage.clear();
                        // clear the title
                        $tituloTopic.textContent = "";
                        // call topics method
                        showTopics();
                        // call getFLashcard method
                        getFlashcards()
                        // confirmation alert
                        Swal.fire({
                            position: 'bottom-end',
                            icon: 'success',
                            title: 'Eliminado',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })

            } else {
                // if data.status is false print data
                console.log(data)
            }
        });
    })


}
// get flashcards
function getFlashcards(like = "") {
    // validates if id element exists
    if (localStorage.getItem("id")) {
        // set title 
        $tituloTopic.textContent = localStorage.getItem("topic");
        // creates new formdata
        let id = new FormData();
        // adds id to the formdata
        id.append("id", localStorage.getItem("id"));
        // like to the sql consults
        id.append("like", like);
        // call peticion method
        peticion("getFlashcards", id)
            .then(data => {
                if (data.status) {
                    // shows customizeFlashcard 
                    $customizeFlashcard.classList.remove("hide");
                    // create flashcards div
                    let flashcards = `<div class="container_flashcards scroll">`
                    // convert data in array
                    const arr = [...data.data];
                    for (const key of arr) {
                        // create flashcards elements
                        flashcards += `
                            <div class="flashcard" data-id=${key.id_card} style="background-color:${key.color}">
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
                    // call flashcardsEvents
                    setTimeout(() => flashcardsEvents(), 10);
                    // add flashcards to the main element
                    $main.innerHTML = flashcards;

                } else {
                    // if there aren´t flashcards 
                    $main.innerHTML = `
                    <div class="not-found">
                        <span><ion-icon name="search-outline"></ion-icon></span>
                        <p>No se encontraron flashcards</p>
                    </div>`;
                }
                // add delete topics button
                $main.innerHTML += `
                <div class="delete_topic">
                    <a href="#" class="btn btn_secundary " id="delete_topic">
                    <ion-icon name="trash-outline"></ion-icon>
                    <span>eliminar temario</span>
                    </a>
                </div>`;
                // call deleteTopic event
                eventoDeleteTopic();
            }).catch(err => {
                console.log(err);
            })
    } else {
        // hide customizeFlashcard element
        $customizeFlashcard.classList.add("hide");
        // if did not select a topic element 
        $main.innerHTML = `
                    <div class="not-found">
                        <span><ion-icon name="search-outline"></ion-icon></span>
                        <p>No has seleccionado un temario</p>
                    </div>`;
    }
}
// get topics
function showTopics(like = "") {
    // like to the sql consults
    let param = new FormData();
    param.append("like", like);
    // call peticion method
    peticion("getTopics", param).then(data => {
        if (data.status) {
            // create a list_topics elemtnt
            let topics = `<ul class="list_topics">`
            // convert data in array
            const arr = [...data.data];
            for (const key of arr) {
                // create topics elements
                if (localStorage.getItem("id") == key.id) {
                    topics += `
                    <li class="topic active" data-id=${key.id}>
                      <span>${key.tema}</span>
                      <a href="#" class="delete_topic" data-id=${key.id} style="display:none;">
                        <ion-icon name="trash-outline"></ion-icon>
                      </a>
                    </li>`;
                } else {
                    topics += `
                <li class="topic" data-id=${key.id}>
                  <span>${key.tema}</span>
                  <a href="#" class="delete_topic" data-id=${key.id} style="display:none;">
                    <ion-icon name="trash-outline"></ion-icon>
                  </a>
                </li>`;
                }
            }
            topics += `</ul>`;
            // add data to the containerTopics element
            $containerTopics.innerHTML = topics;
            eventoTopics();
        } else {
            // if there aren´t topics elements 
            $containerTopics.innerHTML = `
            <div class="not-found">
            <span><ion-icon name="search-outline"></ion-icon></span>
            <p>No se encontraron temarios</p>
            </div> `
        }
    }).catch()
}
/* *** EVENTS *** */
// onload element
window.onload = () => {
    // get topics
    showTopics();
    // get flashcards
    getFlashcards();
}
// modal topic event
$openModalTopic.addEventListener("click", (e) => {
    e.preventDefault();
    $overlay.classList.add("visible")
    $titleModal.textContent = "agregar temario";
    $formTopic.classList.remove("hidden");

})
// form topic event
$formTopic.addEventListener("submit", (e) => {
    e.preventDefault();
    let dataTopic = new FormData($formTopic);
    let validacion = true;
    // validate inputs
    dataTopic.forEach(el => {
        if (el.trim() === "") {
            validacion = false;
        }
    })
    if (validacion) {
        // call peticion method to send topic element
        peticion("addTopic", dataTopic).then(data => {
            if (data.status) {
                showTopics();
                getFlashcards();
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Agregado existosamente',
                    showConfirmButton: false,
                    timer: 2000
                })
                $formTopic.reset();
            }
        });
    } else {
        alert("llene todos los campos")
    }
})
// modal flashcard event
$openModalFlashcard.addEventListener("click", (e) => {
    e.preventDefault();
    $overlay.classList.add("visible")
    $titleModal.textContent = "agregar flashcard";
    $formFlashcard.classList.remove("hidden");
})
// close modal event
$closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    $formTopic.classList.add("hidden");
    $formFlashcard.classList.add("hidden");
    $overlay.classList.remove("visible")
})
// form flashcard event
$formFlashcard.addEventListener("submit", (e) => {
    e.preventDefault();
    let dataFlahscard = new FormData($formFlashcard);
    dataFlahscard.append("id_temario", localStorage.getItem("id"))
    // call peticion method
    peticion("addFlashcard", dataFlahscard).then(data => {
        if (data.status) {
            // refresh flashcards
            getFlashcards();
            $formFlashcard.reset();
        } else {
            alert("mal")
        }
    });
})
$searchFlaschard.addEventListener("input", (e) => {
    e.preventDefault();
    getFlashcards($searchFlaschard.value)
})
$searchTopics.addEventListener("input", (e) => {
    e.preventDefault();
    showTopics($searchTopics.value)
})