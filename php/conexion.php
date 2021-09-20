<?php
    class Connection{
        public static function connectionBd($dbname){
            try {
                $conection=new PDO("mysql:host=localhost;dbname=$dbname","root");
                // errmode, obtiene informacion de cualquier error, y errmode_exception lanza la excepcion del error
                $conection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conection;
            } catch (PDOException $e) {
                echo "error al conectar a la base de datos: ". $e->getMessage();
            }
        }
    }
