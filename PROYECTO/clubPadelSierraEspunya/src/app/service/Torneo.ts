import { ParejaTorneo } from "./Pareja_Torneo";
// Objeto para los torneos. Tiene su id, nombre, el máximo de parejas apuntadas, parejas apuntadas actualmente, los puntos desde el campeón hasta los octavos, 
// si tiene la inscripción abierta o no, si está o no finalizado, foto, género, la fecha y la lista de parejas apuntadas
export class Torneo{

    id!:number;
    nombre!:String;
    max_parejas!:number;
    parejas_apuntadas!:number;
    puntos_campeon!:number;
    puntos_subcampeon!:number;
    puntos_semifinal!:number;
    puntos_cuartos!:number;
    puntos_octavos!:number;
    puntos_resto!:number;
    inscripcion_abierta!:String;
    finalizado!:String;
    foto!:String;
    genero!:String;
    fecha!:Date;
    parejas!:ParejaTorneo[]
}