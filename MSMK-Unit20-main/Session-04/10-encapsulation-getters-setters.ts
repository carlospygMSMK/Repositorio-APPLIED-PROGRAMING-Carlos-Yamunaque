/*******************************************
 *  
 * Example without getters and setters
 * 
 *******************************************/

class Rectangle {
    width?: number;
    height?: number;

    calculateArea():number{
        if(this.width === undefined || this.height === undefined) {
            throw new Error('Cannot calculate area. Rectangle dimensions unknown')
        }
        return this.width * this.height;
    }
}


const rectangle1 = new Rectangle();

rectangle1.height = 3;
rectangle1.width = 10;


console.log(`--------------- Rectangle example with direct property access --------------`);
console.log(`Rectangle width is ${rectangle1.width}`);
console.log(`Rectangle height is ${rectangle1.width}`);
console.log(`Rectangle area is ${rectangle1.calculateArea()}`);






/**************************************************************** 
 * 
 * Example with getters and setters  => Better encapsulation
 * 
 ***************************************************************/

class NewRectangle {
    private width?: number;
    private height?: number;

    public getWidth(): number | undefined {
        return this.width;
    }

    public setWidth(w: number): void{
        this.width = w;
    }

    public getHeight(): number | undefined {
        return this.height;
    }

    public setHeight(height: number): void{
        this.height = height;
    }

    public calculateArea():number{
        if(this.width === undefined || this.height === undefined) {
            throw new Error('Cannot calculate area. Rectangle dimensions unknown')
        }
        return this.width * this.height;
    }
}



const rectangle2 = new NewRectangle();

rectangle2.setHeight(3);
rectangle2.setWidth(10);


console.log(`--------------- Rectangle example with getters and setters --------------`);
console.log(`Rectangle width is ${rectangle2.getWidth()}`);
console.log(`Rectangle height is ${rectangle2.getHeight()}`);
console.log(`Rectangle area is ${rectangle2.calculateArea()}`);


