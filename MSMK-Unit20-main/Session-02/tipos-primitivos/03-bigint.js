/*
 Tipos primitivos en javascript

 Tipo BigInt
*/


a=1234567890123456789;  // number

typeof a;

a=12345678901234567890123;  // number

a=12345678901234567890123n; //  bigint  (ver n al final)

typeof a;

a=10n;

typeof a;

// constructor
b=BigInt('12345678901234567890123');

// Aritmetica

a=100000000000000000n;
b=100000000n;

c= a/b;

typeof c;

a/10000000    // Error, no se puede operar BigInt con Number

100n / 3n    // Es aritmetica entera


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

// Conversión con constructores
big=10n;
num=Number(big);
otroBig=BigInt(10);

// Prototipo
proto = Object.getPrototypeOf(10n);
Object.getOwnPropertyNames(proto);

