<?php
require "conexion.php"; 
session_start();
$conexion=Connection::connectionBd("flashcards");
switch ($_REQUEST["function"]) {
    case 'consultTopics':
        $consultaTopics=$conexion->prepare("SELECT * FROM tema WHERE id_usuario='$_SESSION[id]'")
        break;
    
    default:
        # code...
        break;
}