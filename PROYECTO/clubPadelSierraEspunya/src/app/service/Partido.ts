// Objeto para los partidos. Tiene su id, los ids de los 4 socios, pista, fecha, hora, si está o no abierto, si está o no finalizado y la pareja ganadora del partido 
export class Partido{

    id!:number;
    socio1!:number;
    socio2!:number;
    socio3!:number;
    socio4!:number;
    pista!:String;
    fecha!:Date;
    hora!:String;
    abierto!:String;
    finalizado!:String;
    pareja_ganadora!:String;
}