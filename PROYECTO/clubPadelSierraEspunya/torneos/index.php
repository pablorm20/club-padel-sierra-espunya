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
    $sqltorneos = mysqli_query($conexionBD,"SELECT * FROM torneos WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqltorneos) > 0){
        $torneos = mysqli_fetch_all($sqltorneos,MYSQLI_ASSOC);
        echo json_encode($torneos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqltorneos = mysqli_query($conexionBD,"DELETE FROM torneos WHERE id=".$_GET["borrar"]);
    if($sqltorneos){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $max_parejas=$data->max_parejas;
    $parejas_apuntadas=$data->parejas_apuntadas;
    $puntos_campeon=$data->puntos_campeon;
    $puntos_subcampeon=$data->puntos_subcampeon;
    $puntos_semifinal=$data->puntos_semifinal;
    $puntos_cuartos=$data->puntos_cuartos;
    $puntos_octavos=$data->puntos_octavos;
    $puntos_resto=$data->puntos_resto;
    $inscripcion_abierta=$data->inscripcion_abierta;
        if(($nombre!="")){
    $sqltorneos = mysqli_query($conexionBD,"INSERT INTO torneos(nombre,max_parejas,parejas_apuntadas,puntos_campeon,puntos_subcampeon,puntos_semifinal,puntos_cuartos,puntos_octavos,puntos_resto,inscripcion_abierta,foto) VALUES('$nombre',$max_parejas,$parejas_apuntadas,$puntos_campeon,$puntos_subcampeon,$puntos_semifinal,$puntos_cuartos,$puntos_octavos,$puntos_resto,'$inscripcion_abierta',null)");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $max_parejas=$data->max_parejas;
    $parejas_apuntadas=$data->parejas_apuntadas;
    $puntos_campeon=$data->puntos_campeon;
    $puntos_subcampeon=$data->puntos_subcampeon;
    $puntos_semifinal=$data->puntos_semifinal;
    $puntos_cuartos=$data->puntos_cuartos;
    $puntos_octavos=$data->puntos_octavos;
    $puntos_resto=$data->puntos_resto;
    $inscripcion_abierta=$data->inscripcion_abierta;
    $foto=$data->foto;
    
    $sqltorneos = mysqli_query($conexionBD,"UPDATE torneos SET nombre='$nombre',max_parejas=$max_parejas,parejas_apuntadas=$parejas_apuntadas,puntos_campeon=$puntos_campeon,puntos_subcampeon=$puntos_subcampeon,puntos_semifinal=$puntos_semifinal,puntos_cuartos=$puntos_cuartos,puntos_octavos=$puntos_octavos,puntos_resto=$puntos_resto,inscripcion_abierta='$inscripcion_abierta',foto='$foto' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla torneos
$sqltorneos = mysqli_query($conexionBD,"SELECT * FROM torneos");
if(mysqli_num_rows($sqltorneos) > 0){
    $torneos = mysqli_fetch_all($sqltorneos,MYSQLI_ASSOC);
    echo json_encode($torneos);
}
else{ echo json_encode([["success"=>0]]); }


?>