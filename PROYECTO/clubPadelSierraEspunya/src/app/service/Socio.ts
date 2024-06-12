// Objeto para los socios. Tiene su id, nombre, apellidos, dni, correo, telefono, genero, usuario, contraseña
// puntos premios y ranking, torneos jugador y ganados, partidos jugados y ganados, número de premios canjeados y foto
export class Socio{

    id!:number;
    nombre!:String;
    apellidos!:String;
    dni!:String;
    correo!:String;
    telefono!:number;
    genero!:string;
    usuario!:String;
    contrasenya!:String;
    puntos_premios!:number;
    puntos_ranking!:number;
    torneos_jugados!:number;
    torneos_ganados!:number;
    partidos_jugados!:number;
    partidos_ganados!:number;
    premios_canjeados!:number;
    foto!:String;
}