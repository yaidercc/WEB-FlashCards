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
        echo json_encode($controller->getTopics($_POST["like"]));
        break;
    case 'getFlashcards':
        echo json_encode($controller->getFlashcards($_POST["id"],$_POST["like"]));
        break;
    case 'deleteFlashcard':
        echo json_encode($controller->deleteFlashcard($_POST["id"]));
        break;
    case 'addFlashcard':
        echo json_encode($controller->addFlashcard($_POST["color"],$_POST["anverso"],$_POST["reverso"],$_POST["id_temario"]));
        break;
    case 'deleteTopic':
        echo json_encode($controller->delTopic($_POST["id_temario"]));
        break;
    case 'addTopic':
        echo json_encode($controller->addTopic($_POST["temario"]));
        break;
    case 'getInfoCard':
        echo json_encode($controller->getInfoCard($_POST["id"]));
        break;
    case 'updateFlashcard':
        echo json_encode($controller->updateFlashcard($_POST["id"],$_POST["anverso"],$_POST["reverso"],$_POST["color"]));
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
