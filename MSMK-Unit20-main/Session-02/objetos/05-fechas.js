/*
 Tipos principales de objetos

 Fechas
*/

// Crear una fecha
fecha = new Date();

fecha;

fecha.toISOString();   // Representación ISO

fecha.getTime();       // Tiempo unix en milisegundos

// Se pueden comparar a traves del tiempo unix (epoch)
fecha2 = new Date('2026/01/01 13:00');

fecha2.getTime() < fecha.getTime();

// Se puede operar con el tiempo unis
fecha1 = new Date('2026/01/01 12:00');

fecha2.getTime() - fecha1.getTime();


// Extraer partes
fecha.getFullYear();

fecha.getMonth();

fecha.getDate();

fecha.getSeconds();

// Modificar
fecha.setFullYear(2020);

fecha;
