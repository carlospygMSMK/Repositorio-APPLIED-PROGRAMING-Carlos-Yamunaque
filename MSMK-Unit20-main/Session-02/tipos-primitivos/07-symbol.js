/*
 Tipos primitivos en javascript

 Tipo symbol

 Se usa para generar identificadores únicos, es muy poco común
 */


S1 = Symbol('S1');

typeof S1;

// No hay dos iguales

Symbol('S1') == Symbol('S1')

// Pero si se pueden referenciar, es útil para un registro global

s1 = Symbol.for('S1');

s2 = Symbol.for('S1');

s1 == s2

s1 === s2

// Los atributos tipo Symbol no son enumerables ni aparecen en las propiedades de un objeto
libro = {
    titulo: 'El título',
    ['editorial']: 'La editorial',
    [Symbol('autor')]: 'El nombre del autor'
}

Object.keys(libro);

// Prototipo
proto = Object.getPrototypeOf(s1);  
Object.getOwnPropertyNames(proto);
