<?php
require_once "model.php";
class Controller{
    private $model;
    public function __construct(){
        $this->model=new model();
    }
    public function Login($username,$clave){
        return $this->model->login($username,$clave);
    }
    public function Signin($username,$email,$clave){
        return $this->model->signin($username,$email,$clave);
    }
    public function getTopics(){
        return $this->model->Topics();
    }
}