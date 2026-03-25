/*
 *
 * Variables TypeScript
 * 
 */


// Funcionan igual que en javascript pero son tipadas.

let miNumero:number;

miNumero = 24;

miNumero = 'Hola';

let miCadena = 'Adios';

miCadena = new Date().toString();


// Siempre son tipadas, de cualquier tipo, incluso funciones

let miFuncionCalculadora: (x:number) => number;

typeof miFuncionCalculadora;

miFuncionCalculadora = (n) => n*n;

miFuncionCalculadora = (x:number, y:number):number => x + y;


// Los tipos pueden llegar a ser muy complejos

type Libro = {
    titulo: string;
    autor: string;
    editorial?: string;
}

let miLibro: Libro;

miLibro = { titulo: 'Aprende TS', autor:'Jhon Doe'};

miLibro = { editorial: 'O Reilly' };






otraVar = 26;

otraVar = 'Adios';  // JS es dinámicamente tipado y permite cambiar tipos

// const declara constantes locales, NO pueden cambir de valor
const miConstante = 'hola';

miConstante = 'adios';

// Scope de variables
// let y const siempre son scope locales. Es lo que se debe usar.
{
    const saludo = 'hola';
    {
        const saludo = 'adios';
        console.log(saludo);
    }
}

{
    let saludo = 'hola';
    {
        let saludo = 'adios';
        saludo = 'hasta luego';
        console.log(saludo);
    }
    console.log(saludo);
}

// Garbage Collector

a = new Date();

a.toISOString();


