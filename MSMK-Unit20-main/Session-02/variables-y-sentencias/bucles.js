/*
 * Bucles en JS y TS
 */

// Bucle for
{
    for(let x=1; x<=10; x++) {
        console.log(`5 x ${x} = ${5*x}`);
    }
}

// Bucle while
{
    let x=1;
    while(x<=10) {
        console.log(`5 x ${x} = ${5*x}`);
        x = x + 1;
    }
}


// Bucle do while
/* 
        do {
            xxxx
        } while (condicion)

    Ejercicio: Escribir el bucle anterior en formato do-while
*/


// Bucle for of
{
    const array=['Juan', 'Pedro', 'Maria'];
    for (const nombre of array) {
        console.log('Hola ' + nombre);
    }
}

// Bucle for in
{
    libro={
        titulo: 'Aprender Javascript', 
        autor: 'Juan Pérez'
    };
    
    for(const clave in libro) {
        console.log(`El ${clave} del libro es: ${libro[clave]}`)
    }
}

