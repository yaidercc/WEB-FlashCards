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
    public function getTopics($like){
        return $this->model->Topics($like);
    }
    public function getFlashcards($id,$like){
        return $this->model->Flashcards($id,$like);
    }
    public function deleteFlashcard($id){
        return $this->model->deleteFlashcard($id);
    }
    public function addFlashcard($color,$anverso,$reverso,$temario){
        return $this->model->newFlashcard($color,$anverso,$reverso,$temario);
    }
    public function delTopic($id){
        return $this->model->deleteTopic($id);
    }
    public function addTopic($tema){
        return $this->model->addTopic($tema);
    }
}