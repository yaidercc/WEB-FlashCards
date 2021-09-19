<?php
    try {
        $conection=new PDO("mysql:host=localhost;dbname=flashcards","root");
        // errmode, obtiene informacion de cualquier error, y errmode_exception lanza la excepcion del error
        $conection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    } catch (PDOException $e) {
        echo "error al conectar a la base de datos: ". $e->getMessage();
    }
    // destruir la conexion
    $conection=null;