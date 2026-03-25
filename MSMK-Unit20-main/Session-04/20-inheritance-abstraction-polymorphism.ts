/**
 * OOP examples.  Example with geometric figures
 * 
 * Abstract classes
 * Inheritance
 * Polymorphism
 * 
 */


// 1. Parent Class: GeometricFigure
// This abstract class defines common characteristics and behaviors for all figures.

abstract class GeometricFigure {
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    // Concrete method: A common behavior for all figures
    displayColor(): string {
        return `The ${this.name} figure is ${this.color}.`;
    }

    // Abstract methods: Each figure will have its own way of calculating these
    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;

    // Concrete method that uses abstract methods
    describe(): string {
        return `${this.displayColor()} Its area is ${this.calculateArea()} and its perimeter ${this.calculatePerimeter()}.`;
    }
}

// 2. Child Class: Square

class Square extends GeometricFigure {
    side: number;

    constructor(color: string, side: number) {
        // Calls the parent class constructor
        super("Square", color);
        this.side = side; // Specific property of a Square
    }

    // Implementation of the abstract calculateArea method for Square
    calculateArea(): number {
        return this.side * this.side;
    }

    // Implementation of the abstract calculatePerimeter method for Square
    calculatePerimeter(): number {
        return 4 * this.side;
    }

    // Specific method for Square
    getDiagonal(): number {
        return Math.sqrt(2) * this.side;
    }
}

// 3. Child Class (Subclass): Circle
// 'Circle' extends 'GeometricFigure'. A Circle "is a type of" GeometricFigure.

class Circle extends GeometricFigure {
    radius: number;

    constructor(color: string, radius: number) {
        // Calls the parent class constructor
        super("Circle", color);
        this.radius = radius; // Specific property of a Circle
    }

    // Implementation of the abstract calculateArea method for Circle
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    // Implementation of the abstract calculatePerimeter method for Circle
    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    // Specific method for Circle
    getDiameter(): number {
        return 2 * this.radius;
    }
}

// 4. Child Class (Subclass): Triangle (Equilateral for simplicity)
// 'Triangle' extends 'GeometricFigure'. A Triangle "is a type of" GeometricFigure.
class Triangle extends GeometricFigure {
    base: number;
    height: number; // Assuming a triangle with base and height for area
    side: number;   // For perimeter, assuming equilateral for simplicity

    constructor(color: string, base: number, height: number, side: number) {
        // Calls the parent class constructor
        super("Triangle", color);
        this.base = base;
        this.height = height;
        this.side = side;
    }

    // Implementation of the abstract calculateArea method for Triangle
    calculateArea(): number {
        return (this.base * this.height) / 2;
    }

    // Implementation of the abstract calculatePerimeter method for Triangle (equilateral)
    calculatePerimeter(): number {
        return 3 * this.side; // For an equilateral triangle, it's side + side + side
    }
    
    // Specific method for Triangle (e.g., calculate hypotenuse if it were a right triangle)
    getTriangleType(): string {
        if (this.base === this.height && this.base === this.side) {
            return "It is an equilateral triangle.";
        }
        return "It is a non-equilateral triangle.";
    }
}

/**
 * Demonstration of Inheritance and Polymorphism
 */

// Inheritance: Create Figures that inherit from GeometricFigure

console.log("--- Creating geometric figures ---");

const mySquare = new Square("blue", 5);
console.log(mySquare.describe());           
console.log(`Square diagonal: ${mySquare.getDiagonal().toFixed(2)}\n`); 

const myCircle = new Circle("red", 3);
console.log(myCircle.describe());     
console.log(`Circle diameter: ${myCircle.getDiameter()}\n`); 

const myTriangle = new Triangle("green", 4, 6, 4); 
console.log(myTriangle.describe()); 
console.log(`${myTriangle.getTriangleType()}\n`)

console.log("\n--- Demonstration of Polymorphism ---");

// We can have a collection of GeometricFigure (polymorphism)
const myFigures: GeometricFigure[] = [mySquare, myCircle, myTriangle];

myFigures.forEach(figure => {
    console.log(`Figure: ${figure.name}`);
    console.log(figure.displayColor());
    console.log(`Area: ${figure.calculateArea().toFixed(2)}`);
    console.log(`Perimeter: ${figure.calculatePerimeter().toFixed(2)}`);
    console.log("---");
});
