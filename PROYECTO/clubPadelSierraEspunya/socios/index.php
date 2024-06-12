<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "pablo"; $contrasenia = "pablo"; $nombreBaseDatos = "clubtenissierraespunya";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlSocios = mysqli_query($conexionBD,"SELECT * FROM socios WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlSocios) > 0){
        $socios = mysqli_fetch_all($sqlSocios,MYSQLI_ASSOC);
        echo json_encode($socios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlSocios = mysqli_query($conexionBD,"DELETE FROM socios WHERE id=".$_GET["borrar"]);
    if($sqlSocios){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $apellidos=$data->apellidos;
    $dni=$data->dni;
    $telefono=$data->telefono;
    $usuario=$data->usuario;
    $contrasenya=$data->usuario;
        if(($nombre!="")&&($apellidos!="")&&($dni!="")&&($telefono!="")&&($usuario!="")&&($contrasenya!="")){
    $sqlSocios = mysqli_query($conexionBD,"INSERT INTO socios(nombre,apellidos,dni,telefono,usuario,contrasenya,puntos_premios,puntos_ranking,torneos_jugados,torneos_ganados,partidos_jugados,partidos_ganados,premios_canjeados,foto) VALUES('$nombre','$apellidos','$dni',$telefono,'$usuario','$contrasenya',0,0,0,0,0,0,0,null) ");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $apellidos=$data->apellidos;
    $dni=$data->dni;
    $telefono=$data->telefono;
    $usuario=$data->usuario;
    $contrasenya=$data->contrasenya;
    $puntos_premios=$data->puntos_premios;
    $puntos_ranking=$data->puntos_ranking;
    $torneos_jugados=$data->torneos_jugados;
    $torneos_ganados=$data->torneos_ganados;
    $partidos_jugados=$data->partidos_jugados;
    $partidos_ganados=$data->partidos_ganados;
    $premios_canjeados=$data->premios_canjeados;
    $foto=$data->foto;
    
    $sqlSocios = mysqli_query($conexionBD,"UPDATE socios SET nombre='$nombre',apellidos='$apellidos',dni='$dni',telefono=$telefono,usuario='$usuario',contrasenya='$contrasenya',puntos_premios=$puntos_premios,puntos_ranking=$puntos_ranking,torneos_jugados=$torneos_jugados,torneos_ganados=$torneos_ganados,partidos_jugados=$partidos_jugados,partidos_ganados=$partidos_ganados,premios_canjeados=$premios_canjeados,foto='$foto' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla socios
$sqlSocios = mysqli_query($conexionBD,"SELECT * FROM socios WHERE id <> 1");
if(mysqli_num_rows($sqlSocios) > 0){
    $socios = mysqli_fetch_all($sqlSocios,MYSQLI_ASSOC);
    echo json_encode($socios);
}
else{ echo json_encode([["success"=>0]]); }


?>