<?php
require "conexion.php";
session_start();
class model {
    private $con;
    public function __construct(){
        $this->con=new Connection("flashcards");
        $this->con=$this->con->connectionBd();
    }
    function login($username,$clave){
        $query= "SELECT * FROM usuario WHERE username='$username' AND clave='$clave'";
        $sql=$this->con->prepare($query);
        $sql->execute();
        $data=$sql->fetch(PDO::FETCH_ASSOC);
        if($sql->rowCount()>0){
            
            $_SESSION['user']=$data['username'];
            $_SESSION['id_user']=$data['id'];
            // echo "SELECT id,username,clave FROM usuario WHERE username='$username' AND clave='$clave'";
            return array("status"=>true);
        }else{
            return array("status"=>false,"mensaje"=>"datos incorrectos");
        }
    }
    function signin($username,$email,$clave){
        $query= "INSERT INTO `usuario`(`username`, `email`, `clave`) VALUES (?,?,?)";
        $sql=$this->con->prepare($query);
        $sql->bindParam(1,$username);
        $sql->bindParam(2,$email);
        $sql->bindParam(3,$clave);
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) {
            return array("response"=>http_response_code(400),"status"=>false);
        }
        
    }
    function Topics($like){
        $query= "SELECT * FROM `tema` WHERE  `id_usuario`=  $_SESSION[id_user] and estado=1 and tema like '%$like%'";
        $sql=$this->con->prepare($query);
        $sql->execute();
        if($sql->rowCount()>0){
            return array("status"=>true,"data"=>$sql->fetchAll());
        }else{
            return array("status"=>false);
        }
    }
    function Flashcards($id,$like){
        $query= "SELECT * FROM flashcard WHERE id_tema_fk=$id and anverso like '%$like%'";
        $sql=$this->con->prepare($query);
        $sql->execute();
        if($sql->rowCount()>0){
            return array("status"=>true,"data"=>$sql->fetchAll());
        }else{
            return array("status"=>false);
        }
    }
    function deleteFlashcard($id){
        $query= "DELETE FROM `flashcard` WHERE id_card=$id";
        $sql=$this->con->prepare($query);
        $sql->execute();
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) {
            return array("status"=>false);
        }
    }
    function newFlashcard($color,$anverso,$reverso,$tema){
        $query= "INSERT INTO `flashcard`(`color`, `anverso`, `reverso`,`id_tema_fk`) VALUES (?,?,?,?)";
        $sql=$this->con->prepare($query);
        $sql->bindParam(1,$color);
        $sql->bindParam(2,$anverso);
        $sql->bindParam(3,$reverso);
        $sql->bindParam(4,$tema);
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) { 
            return array("response"=>http_response_code(400),"status"=>false);
        }
    }
    function deleteTopic($id){
        $query= "UPDATE `tema` SET `estado`=0 WHERE id=$id";
        $sql=$this->con->prepare($query);
        $sql->execute();
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) {
            return array("status"=>false);
        }
    }
    function addTopic($tema){
        $query= "INSERT INTO `tema`(`tema`, `id_usuario`) VALUES (?,?)";
        $sql=$this->con->prepare($query);
        $sql->bindParam(1,$tema);
        $sql->bindParam(2,$_SESSION["id_user"]);
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) { 
            return array("response"=>http_response_code(400),"status"=>false);
        }
    }
    function getInfoCard($id){
        $query= "SELECT * FROM flashcard WHERE id_card=$id";
        $sql=$this->con->prepare($query);
        $sql->execute();
        if($sql->rowCount()>0){
            return array("status"=>true,"data"=>$sql->fetchAll());
        }else{
            return array("status"=>false);
        }
    }
    function updateFlashcard($id,$anverso,$reverso,$color){
        $query= "UPDATE `flashcard` SET `color`='$color',`anverso`='$anverso',`reverso`='$reverso' WHERE id_card=$id";
        $sql=$this->con->prepare($query);
        $sql->execute();
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) {
            return array("status"=>false);
        }
    }
}
