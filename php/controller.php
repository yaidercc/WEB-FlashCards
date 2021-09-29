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
    public function getFlashcards($id){
        return $this->model->Flashcards($id);
    }
    public function deleteFlashcard($id){
        return $this->model->deleteFlashcard($id);
    }
    public function addFlashcard($color,$anverso,$reverso){
        return $this->model->newFlashcard($color,$anverso,$reverso);
    }
}