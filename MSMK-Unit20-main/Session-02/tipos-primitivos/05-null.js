/*
 Tipos primitivos en javascript

 Tipo null

 null es un tipo que indica ausencia de valor
 */


esNull=null;

// CURIOSO  ==> Es un bug histórico de programación de 1995
typeof esNull;

proto = Object.getPrototypeOf(null);  // a pesar de que el typeof diga que es objeto, no lo es

esNull === null;  // La forma de comprobar si una variable es null

// si lo convertimos a boolean, evalua a falso
Boolean(esNull);

if(null) console.log('Evalua a true');  // No evalúa a true

null ? 1: 2  // No evalúa a true


