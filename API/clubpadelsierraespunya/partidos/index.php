<?php
// API PARA LAS ACCIONES RELACIONADAS CON LA TABLA partidos DE LA BBDD
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
    $sqlpartidos = mysqli_query($conexionBD,"SELECT * FROM partidos WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlpartidos) > 0){
        $partidos = mysqli_fetch_all($sqlpartidos,MYSQLI_ASSOC);
        echo json_encode($partidos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
// Borra pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlpartidos = mysqli_query($conexionBD,"DELETE FROM partidos WHERE id=".$_GET["borrar"]);
    if($sqlpartidos){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recibe en método post los datos necesarios
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $socio1=$data->socio1;
    $socio2=$data->socio2;
    $socio3=$data->socio3;
    $socio4=$data->socio4;
    $pista=$data->pista;
    $fecha=$data->fecha;
    $hora=$data->hora;
        if(($socio1!="")){
    $sqlpartidos = mysqli_query($conexionBD,"INSERT INTO partidos(socio1,socio2,socio3,socio4,pista,fecha,hora,pareja_ganadora,abierto,finalizado) VALUES($socio1,$socio2,$socio3,$socio4,'$pista','$fecha','$hora', null, 'S', 'N')");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recibe los datos necesarios y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $socio1=$data->socio1;
    $socio2=$data->socio2;
    $socio3=$data->socio3;
    $socio4=$data->socio4;
    $pista=$data->pista;
    $fecha=$data->fecha;
    $hora=$data->hora;
    $pareja_ganadora=$data->pareja_ganadora;
    $abierto=$data->abierto;
    $finalizado=$data->finalizado;
    
    $sqlpartidos = mysqli_query($conexionBD,"UPDATE partidos SET socio1=$socio1,socio2=$socio2,socio3=$socio3,socio4=$socio4,pista='$pista',fecha='$fecha',hora='$hora',pareja_ganadora='$pareja_ganadora',abierto='$abierto',finalizado='$finalizado' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla partidos
$sqlpartidos = mysqli_query($conexionBD,"SELECT * FROM partidos ORDER BY hora ASC");
if(mysqli_num_rows($sqlpartidos) > 0){
    $partidos = mysqli_fetch_all($sqlpartidos,MYSQLI_ASSOC);
    echo json_encode($partidos);
}
else{ echo json_encode([["success"=>0]]); }


?>