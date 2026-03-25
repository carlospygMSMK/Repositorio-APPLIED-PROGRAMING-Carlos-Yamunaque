/*
 *
 * Variables en Javascript 
 * 
 */


// Recipientes que contienen valores o referencias a tipos complejos
// En Javascript, como no es tipado, no es obligatorio declararlas.
miVariable = 2;

miVariable * 10;

// Declaración de variables
// var, let, const

var unaVariable;  // var, está obsoleto, define variables globales => NO USAR

typeof unaVariable;

unaVariable = 'hola';

typeof unaVariable;

// let, declara variables locales que pueden cambiar de valor
let otraVar = 24;

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


