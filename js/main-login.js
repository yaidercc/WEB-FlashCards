//variables forms
const $formLogin = document.getElementById("form-login");
const $formSignIn = document.getElementById("form-sign-in");
let $forms = Array.from(document.getElementsByClassName("form"));
let $getIn = Array.from(document.getElementsByClassName("get-in"));
// events
window.onload = $formSignIn.classList.add("hide");
$getIn.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.stopPropagation();
        $forms.forEach((el) => {
            el.classList.toggle("hide")
        })
    })
})

$("#form-login").submit(function (event) {
    event.preventDefault();
    jQuery
        .ajax({
            url: "php/ingreso.php?option=login",
            type: "POST",
            dataType: "json",
            data: $(this).serialize(),
        })
        .done(function (respuesta) {
            if (respuesta) {
                location.href = "index.php";
            } else {
                swal.fire("Error", "Datos incorrectos", "error");
            }
        }).fail((res) => {
            console.log(res);
        })
})
$("#form-sign-in").submit(function (event) {
    event.preventDefault();
    jQuery
        .ajax({
            url: "php/ingreso.php?option=sign",
            type: "POST",
            dataType: "json",
            data: $(this).serialize(),
        })
        .done(function (respuesta) {
            if (respuesta) {
                location.href = "index.php";
            } else {
                swal.fire("Error", "Nombre De Usuario En Uso", "error");
            }
        }).fail((res) => {
            console.log(res);
        })
})