/*
 Tipos primitivos en javascript

 Tipo undefined

 undefined es un tipo que indica ausencia de valor
 */


// Es un tipo que indica ausencia de valor, pero no es lo mismo que una variable que no existe.
a=undefined;

typeof a;

typeof nada;

a === undefined;

nada === undefined;  // No se puede operar con una variable que no existe

// Declaramos la variable
nada

let nada;

nada 

nada === undefined;  // Ahora si, porque ya existe la variable

// Undefined es distinto de null, aunque con conversión de tipos las dos evaluan a false
nada === null
nada == null

// Las propiedades que no existen tambien son undefined
juan = { nombre: 'Juan', edad: 25};

typeof juan.apellido;

// Operador optional chain
juan.edad

let otraPersona;

otraPersona.edad;

otraPersona?.edad;

// Operador coalesce
pedro = { nombre: 'Pedro', apellido: 'García'};

persona = pedro;
persona.apellido;

persona.apellido ?? 'Apellido Desconocido'

persona = juan;
persona.apellido ?? 'Apellido Desconocido'


// Tampoco hay prototipo
proto = Object.getPrototypeOf(undefined);  
