/*
 * Tipos principales de objetos
 * 
 * Arrays
 * 
 * Son colecciones ordenadas de objetos
 */

array=[0, 1, 2 ,3, 4, 5, 6];

typeof array;

secciones = [ 'Prologo', 'Capitulo 1', 'Capitulo 2', 'Indice' ];

typeof secciones;

// Longitud
array.length;

// Troceado
array.slice(1);
array.slice(2, 4);
array.slice(-1);
array.slice(10);

// Mapeado: aplica una función sobre cada elemento de la clase
array.map(x => x**2)

// Filtrado
array.filter(x => (x % 2 == 0))  // verdadero si el numero es par

// Aplanado (reducción)
array.reduce((acumulado, x) => acumulado + x, 0)

// Recorrer array
total=0;
array.forEach(x => { total+= x });
total;


// Saber si un array contiene un elemento
array.includes(3);

// Encontrar un elemento
libros=[
    {titulo: 'Aprender Javascript', autor: 'Juan Pérez'},
    {titulo: 'Tutorial TypeScript', autor: 'David López'},
    {titulo: 'El señor de los anillos', autor: 'J.R.R. Tolkien'}
];

libros.find(libro => libro.titulo === 'El señor de los anillos');

// Añadir elementos

array;
array.push(7);
array;

