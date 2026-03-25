/*
 Tipos primitivos en javascript

 Tipo  String
*/


unaCadena = 'Esta es una cadena';

console.log(unaCadena);

otraCadena = 'Esta es una cadena';

// como es un tipo primitivo, se pueden comparar distintas cadenas
unaCadena === otraCadena;

// si modificamos una ya no son iguales
unaCadena = unaCadena + ' alargada';

unaCadena === otraCadena;

otraCadena += ' alargada';

unaCadena === otraCadena;

// Extraer un caracter
unaCadena[0]
unaCadena.charAt(0)

// No funciona la notación de array, como en python
unaCadena[8:11]   // Error de sintaxis

// Para trocear se usa slice
unaCadena.slice(8,11)

// Prototipo del tipo String
proto = Object.getPrototypeOf(unaCadena);
Object.getOwnPropertyNames(proto);

