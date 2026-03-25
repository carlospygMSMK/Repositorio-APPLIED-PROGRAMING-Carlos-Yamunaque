/*
 Tipos principales de objetos

 Objeto Plano
 POJO -> Plain Old Java Object
*/


libro = {
    titulo: 'El título',
    editorial: 'La editorial',
    autor: 'El nombre del autor',
    secciones: [ 'Prologo', 'Capitulo 1', 'Capitulo 2', 'Indice' ]
};

libro;

// No es equivalente a una clase

// Se usan para transmitir datos de forma sencilla y segura

// Convertir a JSON
JSON.stringify(libro);

cadenaSerializada='{"titulo":"El título","editorial":"La editorial","autor":"El nombre del autor","secciones":["Prologo","Capitulo 1","Capitulo 2","Indice"]}'

