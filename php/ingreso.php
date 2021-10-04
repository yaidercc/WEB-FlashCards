<?php
    require "conexion.php"; 
    session_start();
    $GLOBALS['conexion']=Connection::connectionBd("flashcards");
    
    switch ($_REQUEST["option"]) {
        case 'login':
            if(isset($_POST["user"]) && isset($_POST["clave"])){
                $searchUser= $conexion->prepare("SELECT username,clave FROM usuario WHERE username='$_POST[user]' AND clave='$_POST[clave]'");
                $searchUser->execute();
                $datos=$searchUser->fetch(PDO::FETCH_ASSOC);
                if($searchUser->rowCount()>0){
                    $_SESSION['user']=$datos['username'];
                    $_SESSION['id']=getId($_SESSION['user']);
                    echo json_encode(true);
                }else{
                    echo json_encode(false);
                }
            }
            break;
            case 'sign':
                if(isset($_POST["user"]) && isset($_POST["clave"]) &&  isset($_POST["email"])){
                    try {
                        $registerUser=$GLOBALS['conexion']->prepare("INSERT INTO `usuario`(`username`, `email`, `clave`) VALUES (?,?,?)");
                        $registerUser->bindParam(1,$_POST["user"]);
                        $registerUser->bindParam(2,$_POST["email"]);
                        $registerUser->bindParam(3,$_POST["clave"]);
                        $registerUser->execute();
                        $_SESSION['user']=$datos['username'];
                        echo json_encode(true);
                    } catch (PDOException $e) {
                        echo json_encode(false);
                    }
                    
                }
    }
    // obtener id de un usuario
    function getId($username){
        $searchId=$GLOBALS['conexion']->prepare("SELECT id FROM usuario WHERE username='yaider'");
        $searchId->execute();
        $id=$searchId->fetch(PDO::FETCH_ASSOC);
        return $id["id"];
    }
