/*
 Tipos principales de objetos

 Expresiones regulares
*/

// Definir una expresión regular

regNumeros=RegExp('[0-9]+');  // Constructor RegExp

regNumeros=/[0-9]+/     // Notación de barra

// Comprobar patrones
regNumeros.test('hola');

regNumeros.test('25');

regNumeros.test('hhh 3 ddd');

// Manipular cadenas
reg1 = /1/;

cadena = 'P1r1ta';

nuevaCadena = cadena.replace(reg1, 'i');

nuevaCadena;

cadena;

// Extraer datos
fecha=new Date();
cadenaFechaISO = fecha.toISOString();

cadenaFechaISO.match(/[012][0-9]:[0-9]{2}:[0-9]{2}/)

cadenaHora=cadenaFechaISO.match(/[012][0-9]:[0-9]{2}:[0-9]{2}/)[0]

