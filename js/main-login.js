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
$formLogin.addEventListener("click", (e) => {
    e.preventDefault();
    alert("login ingresado")
})
$formSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("sign in ingresado")
})