/*
 *  Funciones en JS y TS
 */

// Declaración normal
function saludar(nombre) {
    return 'Hola ' + nombre;
}

// Expresión de función
let saludar2 = function(nombre) {
    return 'Hola ' + nombre;
}

// Función flecha
 saludar2 = (nombre) => { return 'Hola ' + nombre; }

// Función flecha compacta (es equivalente, pero más compacta)
 saludar2 = (nombre) => 'Hola ' + nombre;


// Scope de una función
{ 
    const apellido = 'Herrero';
    const nombre = 'Carolina';
    const saludar = (nombre) =>  'Hola ' + nombre + ' ' + apellido;

    {
        const apellido = 'Panadero';
        saludar(nombre);
    }
}

// Ejercicio: reescribir el código anterior con una declaración de función normal
