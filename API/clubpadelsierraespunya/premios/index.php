<?php
// API PARA LAS ACCIONES RELACIONADAS CON LA TABLA premios DE LA BBDD
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "pablo"; $contrasenia = "pablo"; $nombreBaseDatos = "clubtenissierraespunya";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recibe una clave para consultar los datos por el id de la tabla
if (isset($_GET["consultar"])){
    $sqlpremios = mysqli_query($conexionBD,"SELECT * FROM premios WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlpremios) > 0){
        $premios = mysqli_fetch_all($sqlpremios,MYSQLI_ASSOC);
        echo json_encode($premios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Borra pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlpremios = mysqli_query($conexionBD,"DELETE FROM premios WHERE id=".$_GET["borrar"]);
    if($sqlpremios){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recibe en método post los datos necesarios
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $puntos=$data->puntos;
    $foto=$data->foto;
        if(($nombre!="") && ($puntos!="")){
    $sqlpremios = mysqli_query($conexionBD,"INSERT INTO premios(nombre,puntos,foto) VALUES('$nombre',$puntos,'$foto')");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recibe los datos necesarios y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $puntos=$data->puntos;
    $foto=$data->foto;
    
    $sqlpremios = mysqli_query($conexionBD,"UPDATE premios SET nombre='$nombre',puntos=$puntos,foto='$foto' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla premios
$sqlpremios = mysqli_query($conexionBD,"SELECT * FROM premios");
if(mysqli_num_rows($sqlpremios) > 0){
    $premios = mysqli_fetch_all($sqlpremios,MYSQLI_ASSOC);
    echo json_encode($premios);
}
else{ echo json_encode([["success"=>0]]); }


?>