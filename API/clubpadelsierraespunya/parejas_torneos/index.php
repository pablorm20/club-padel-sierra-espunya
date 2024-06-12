<?php
// API PARA LAS ACCIONES RELACIONADAS CON LA TABLA parejas_torneos DE LA BBDD
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
    $sqlparejas_torneos = mysqli_query($conexionBD,"SELECT * FROM parejas_torneos WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlparejas_torneos) > 0){
        $parejas_torneos = mysqli_fetch_all($sqlparejas_torneos,MYSQLI_ASSOC);
        echo json_encode($parejas_torneos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
// Consulta datos y recibe una clave de torneo para consultar los datos que tengan ese torneo
if (isset($_GET["consultarTorneo"])){
    $sqlparejas_torneos = mysqli_query($conexionBD,"SELECT * FROM parejas_torneos WHERE torneo=".$_GET["consultarTorneo"]);
    if(mysqli_num_rows($sqlparejas_torneos) > 0){
        $parejas_torneos = mysqli_fetch_all($sqlparejas_torneos,MYSQLI_ASSOC);
        echo json_encode($parejas_torneos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
// Consulta datos y recibe una clave de torneo para consultar los datos de los socios para las parejas del torneo con dicha clave
if (isset($_GET["consultarSocios"])){
    $sqlparejas_torneos = mysqli_query($conexionBD,"SELECT id, torneo, (SELECT id from socios where id = socio1) as socio1Id, (SELECT CONCAT(nombre, ' ',apellidos, ' - ', dni) from socios where id = socio1) as socio1NombreCompleto, (SELECT id from socios where id = socio2) as socio2Id, (SELECT CONCAT(nombre, ' ',apellidos, ' - ', dni) from socios where id = socio2) as socio2NombreCompleto FROM parejas_torneos WHERE torneo=".$_GET["consultarSocios"]);
    if(mysqli_num_rows($sqlparejas_torneos) > 0){
        $parejas_torneos = mysqli_fetch_all($sqlparejas_torneos,MYSQLI_ASSOC);
        echo json_encode($parejas_torneos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Borra pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlparejas_torneos = mysqli_query($conexionBD,"DELETE FROM parejas_torneos WHERE id=".$_GET["borrar"]);
    if($sqlparejas_torneos){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Borra pero se le debe de enviar una clave de torneo ( para borrado de parejas de ese torneo )
if (isset($_GET["borrarTorneo"])){
    $sqlparejas_torneos = mysqli_query($conexionBD,"DELETE FROM parejas_torneos WHERE torneo=".$_GET["borrarTorneo"]);
    if($sqlparejas_torneos){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recibe en método post los datos necesarios
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $torneo=$data->torneo;
    $socio1=$data->socio1;
    $socio2=$data->socio2;
        if(($torneo!="")){
    $sqlparejas_torneos = mysqli_query($conexionBD,"INSERT INTO parejas_torneos(torneo,socio1,socio2) VALUES($torneo,$socio1,$socio2)");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recibe los datos necesarios y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $torneo=$data->torneo;
    $socio1=$data->socio1;
    $socio2=$data->socio2;
    
    $sqlparejas_torneos = mysqli_query($conexionBD,"UPDATE parejas_torneos SET torneo=$torneo,socio1=$socio1,socio2=$socio2 WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta y devuelve todos los registros de la tabla parejas_torneos
$sqlparejas_torneos = mysqli_query($conexionBD,"SELECT * FROM parejas_torneos");
if(mysqli_num_rows($sqlparejas_torneos) > 0){
    $parejas_torneos = mysqli_fetch_all($sqlparejas_torneos,MYSQLI_ASSOC);
    echo json_encode($parejas_torneos);
}
else{ echo json_encode([["success"=>0]]); }


?>