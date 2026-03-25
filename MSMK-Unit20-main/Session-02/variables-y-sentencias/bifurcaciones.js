/* 
 * Sentencias de Control de flujo: Bifurcaciones
 */


// if

if( 1 < 2) 
    console.log('uno es menor que dos');

if(1 > 2)
    console.log('uno es mayor que dos');

// if else

if( 1 < 2) 
    console.log('uno es menor que dos');
else
    console.log('uno es mayor que dos');

// Reglas de estilo

// Nunca poner un if en una sola línea
if( 1 < 2) console.log('uno es menor que dos');  // NO HACER ESTO, Aunque funcione.

// Usad siempre bloques, aunque el bloque 
// solo tenga una sentencia
if( 1 < 2) {
    console.log('uno es menor que dos');
}


// else if
// Evitar en lo posible, es dificil de leer y depurar
// Complica el testing unitario, como veremos.
if(coche.estaEncendido()) {
    coche.apagar();
    coche.ponerFrenoDeMano();
} else if (coche.frenoDeManoPuesto()) {
    coche.ponerFrenoDeMano();
}

// Ejercicio: Reescribid este bloque con if simple

