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
            return array("response"=>http_response_code(400),"status"=>true);
        }
        
    }
    function Topics(){
        $query= "SELECT * FROM `tema` WHERE  `id_usuario`=  $_SESSION[id_user]";
        $sql=$this->con->prepare($query);
        $sql->execute();
        if($sql->rowCount()>0){
            return array("status"=>true,"data"=>$sql->fetchAll());
        }else{
            return array("status"=>false);
        }
    }
}
