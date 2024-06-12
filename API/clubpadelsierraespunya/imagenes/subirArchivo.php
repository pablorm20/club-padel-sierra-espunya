<?php
// API PARA LAS ACCIONES RELACIONADAS CON LA SUBIDA DE IMÁGENES AL SERVIDOR
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    // RECIBE EL JSON DE ANGULAR
    $json = file_get_contents('php://input');
    // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE
    $params = json_decode($json); 
    
    // PREPARA LAS VARIABLES NECESARIAS CON LOS DATOS DE RESPUESTA
    // SE OBTIENE NOMBRE Y CONTENIDO DE LA IMAGEN Y LA CARPETA EN LA QUE SE QUIERE SUBIR LA IMAGEN
    $nombre = $params->nombre;
    $nombreArchivo = $params->nombreArchivo;
    $carpeta = $params->carpeta;
    $archivo = $params->base64textString;
    $archivo = base64_decode($archivo);
    
    // SEPREPARA LA RUTA DE SUBIDA DE LA IMAGEN CON LA RUTA PRINCIPAL + LA CARPETA DONDE SE GUARDAN LAS IMAGENES + SU CARPETA ESPECÍFICA + EL NOMBRE DE LA IMAGEN
    $filePath = $_SERVER['DOCUMENT_ROOT']."/clubpadelsierraespunya/imagenes/".$carpeta."/".$nombreArchivo;
    // SE SUBE EL ARCHIVO A LA RUTA PREPARADA EN EL PASO ANTERIOR
    file_put_contents($filePath, $archivo);
    
    
    class Result {}
    // GENERA LOS DATOS DE RESPUESTA
    $response = new Result();
    
    $response->resultado = 'OK';
    $response->mensaje = 'SE SUBIO EXITOSAMENTE';
    
    // MUESTRA EL JSON GENERADO 
    header('Content-Type: application/json');
    echo json_encode($response);
    
?>
