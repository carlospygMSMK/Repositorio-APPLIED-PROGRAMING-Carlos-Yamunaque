/*
 Tipos primitivos en javascript

 Tipo Number
*/


a=1.36
b=45

// No hay distinción entre enteros y números en coma flotante
// Internamente todos los números son IEEE 754 de 64 bits, coma flotante
a=1
b=1.0
a === b

typeof a
typeof b

Number.isInteger(a)
Number.isInteger(b)

// Aritmetica
a-b
b/3
b ** 3

// Constructor
c=Number(23)
d=Number('23')

c === d

a=1.2345678901234567890123

a.toString()

a.toFixed(6)

typeof a.toFixed(6)

// El tipo Number tambien tiene prototipo
proto = Object.getPrototypeOf(a);
Object.getOwnPropertyNames(proto);

