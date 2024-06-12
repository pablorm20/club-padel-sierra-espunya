<?php
// API PARA LAS ACCIONES RELACIONADAS CON LA TABLA historico_premios DE LA BBDD
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "pablo"; $contrasenia = "pablo"; $nombreBaseDatos = "clubtenissierraespunya";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recibe una clave para consultar los datos por el id de la tabla
if (isset($_GET["consultar"])){
    $sqlhistorico_premios = mysqli_query($conexionBD,"SELECT * FROM historico_premios WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlhistorico_premios) > 0){
        $historico_premios = mysqli_fetch_all($sqlhistorico_premios,MYSQLI_ASSOC);
        echo json_encode($historico_premios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
// Consulta datos y recibe una clave de socio para consultar los datos de ese socio
if (isset($_GET["consultarSocio"])){
    $sqlhistorico_premios = mysqli_query($conexionBD,"SELECT * FROM historico_premios WHERE socio=".$_GET["consultarSocio"]);
    if(mysqli_num_rows($sqlhistorico_premios) > 0){
        $historico_premios = mysqli_fetch_all($sqlhistorico_premios,MYSQLI_ASSOC);
        echo json_encode($historico_premios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Borra pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlhistorico_premios = mysqli_query($conexionBD,"DELETE FROM historico_premios WHERE id=".$_GET["borrar"]);
    if($sqlhistorico_premios){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recibe en método post los datos necesarios
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $socio=$data->socio;
    $premio=$data->premio;
        if(($socio!="") && ($premio!="")){
    $sqlhistorico_premios = mysqli_query($conexionBD,"INSERT INTO historico_premios(socio,premio) VALUES($socio,$premio)");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recibe los datos necesarios y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $premio=$data->premio;
    $socio=$data->socio;
    
    $sqlhistorico_premios = mysqli_query($conexionBD,"UPDATE historico_premios SET premio='$premio',socio=$socio WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla historico_premios
$sqlhistorico_premios = mysqli_query($conexionBD,"SELECT * FROM historico_premios");
if(mysqli_num_rows($sqlhistorico_premios) > 0){
    $historico_premios = mysqli_fetch_all($sqlhistorico_premios,MYSQLI_ASSOC);
    echo json_encode($historico_premios);
}
else{ echo json_encode([["success"=>0]]); }


?>