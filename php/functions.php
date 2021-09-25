<?php
// echo json_encode(array("status"=>http_response_code(200),"ok"=>false));
echo json_encode(array("usuario"=>$_POST["user"],"clave"=>$_POST["clave"],"metodo"=>$_POST["method"]));