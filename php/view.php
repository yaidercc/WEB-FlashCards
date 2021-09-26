<?php 
require_once "controller.php";
// instancia del controlador
$controller= new Controller();
// llamar metodo elejido
switch ($_POST["method"]) {
    case 'iniciar':
        if(validarDatos($_POST["user"],$_POST["clave"])){
            echo json_encode($controller->login($_POST["user"],$_POST["clave"]));
        }else{
            echo json_encode (array("status"=>false,"mensaje"=>"completa todos los campos"));
        }
        break;
    case 'registrar':
        if(validarDatos($_POST["user"],$_POST["email"],$_POST["clave"])){
            echo json_encode($controller->Signin($_POST["user"],$_POST["email"],$_POST["clave"]));
        }else{
            echo json_encode (array("status"=>false,"mensaje"=>"completa todos los campos"));
        }
        break;
    case 'getTopics':
        echo json_encode($controller->getTopics());
        break;
    case 'getFlashcards':
        echo json_encode($controller->getFlashcards($_POST["id"]));
        
        break;
}
// funcion para validar si los campos no estan vacios
function validarDatos(...$data){
    foreach ($data as $key ) {
        if(!isset($key)){
            return false;
        }
    }
    return true;
}
