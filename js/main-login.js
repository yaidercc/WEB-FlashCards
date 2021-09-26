//variables forms
const $formLogin = document.getElementById("form-login");
const $formSignIn = document.getElementById("form-sign-in");
let $forms = Array.from(document.getElementsByClassName("form"));
let $getIn = Array.from(document.getElementsByClassName("get-in"));
const $inputEmail = document.getElementById("inpt_email");
const $inputClave = document.getElementById("inpt_clave");
const $inputUser = document.getElementById("inpt_user");
// events
// ocultar formulario de registro
window.onload = $formSignIn.classList.add("hide");
// evento a los botones de cambio de formulario
$getIn.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.stopPropagation();
        $forms.forEach((el) => {
            el.classList.toggle("hide")
        })
    })
})
// evento del formulario login
$formLogin.addEventListener("submit", (event) => {
    // previene la redireccion
    event.preventDefault();
    // valida la promesa
    transferenciaDatos("POST", "iniciar", $formLogin).then(resp => {
        // si el estado de la promesa es verdadero, redirecciona
        if (resp.status) {
            location.href = "index.php";
        } else {
            // si los datos de la promesa son falsos, manda error
            swal.fire("Error", resp.mensaje, "error");
        }
        // si hubo algun error en la peticion, imprime el error
    }).catch(err => console.log(err));
})


// evento del formulario registro
$formSignIn.addEventListener("submit", (event) => {
    // previene la redireccion
    event.preventDefault();
    // valida la promesa
    if (validarCampos($inputUser.value, $inputEmail.value, $inputClave.value)) {
        transferenciaDatos("POST", "registrar", $formSignIn)
            .then(resp => {
                // si el estado de la promesa es verdadero, abre el formulario login
                if (resp.status) {
                    // limpia el formulario de registro
                    $formSignIn.reset();
                    // oculta el formulario de registro
                    $formSignIn.classList.add("hide");
                    // muestra el formulario de login
                    $formLogin.classList.remove("hide");
                    // quita las clases a los input
                    $inputEmail.className = "";
                    $inputClave.className = "";
                    $inputUser.className = "";
                } else {
                    // si los datos de la promesa son falsos, manda error
                    swal.fire("Error", resp.mensaje, "error");
                }
                // si hubo algun error en la peticion, imprime el error
            }).catch(err => console.log(err))
    } else {
        swal.fire("Error", "algunos datos son incorrectos", "error");
    }

})
// funcion para validar los campos de formulario de registro
function validarCampos(username, email, clave) {
    // variable que contiene la validacion de los campos
    let validacion;
    // valida el campo de username y le asigna una clase
    $inputUser.className = /^[A-Za-z0-9-\S]{5,}$/gi.test(username) ? "good" : "bad";
    // dependiendo de la clase que se le asigno a username se le asigna un valor a validacion
    validacion = $inputUser.className === "good" ? true : false;
    // si la validacion es falsa, se validan los demas elementos
    if (!validacion) {
        // valida el campo de email
        $inputEmail.className = /^[a-zA-Z0-9-_.;:\[\]áéíóú+!|°\/\\*]+@[a-zA-Z0-9-_.;:\[\]áéíóú]+\.[a-zA-Z]{2,}$/gi.test(email) ? "good" : "bad";
        // valida el campo clave
        $inputClave.className = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi.test(clave) ? "good" : "bad";
        // retorna la validacion
        return validacion;
    } else {
        // si la validacion es verdadera, valida el campo email
        $inputEmail.className = /^[a-zA-Z0-9-_.;:\[\]áéíóú+!|°\/\\*]+@[a-zA-Z0-9-_.;:\[\]áéíóú]+\.[a-zA-Z]{2,}$/gi.test(email) ? "good" : "bad";
        // dependiendo de la clase que se le asigno a inputEmail se le asigna un valor a validacion
        validacion = $inputEmail.className === "good" ? true : false;
        // si la validacion del email es falsa
        if (!validacion) {
            // se valida el campo de clave
            $inputClave.className = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi.test(clave) ? "good" : "bad";
            // y se retorna la validacion
            return validacion;
        }
        // si la validacion de email es verdadera, valida la clave
        $inputClave.className = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi.test(clave) ? "good" : "bad";
        // dependiendo de la clase que se le asigno a inputClave se le asigna un valor a validacion
        validacion = $inputClave.className === "good" ? true : false;
        // retorna la validacion
        return validacion;

    }

}

function transferenciaDatos(evento, metodo, form) {
    let formulario = new FormData(form);
    let datos;
    formulario.append("method", metodo);
    datos = fetch("https://localhost/Mis%20Proyectos/En%20proceso/FlashCards-v2/php/view.php", {
            method: evento,
            body: formulario,
        })
        .then(resp => resp.json())
        .then(data => data)
        .catch(err => err)
    return datos;
}