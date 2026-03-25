/*
 Tipos principales de objetos

 Funciones
*/


// Una función se puede definir como una variable
f = function(x) {  return x * x; }

typeof f;

f(4);

// Se asignan como cualquier variable
cuadrado = f;

cuadrado(5);

// se pueden pasar como parámetro
cubo = function(x) { return x**3; };

cubo (9);

calculador = function(x, funcionDeCalculo) {
    return funcionDeCalculo(x);
}

calculador(2, cuadrado);

calculador(2, cubo);


// Funciones de flecha

// Es una notación muy compacta

cuadrado = (x) => x**2;

mitad = (x) => x*0.5;

calculador(2, cuadrado);

calculador(2, mitad);


