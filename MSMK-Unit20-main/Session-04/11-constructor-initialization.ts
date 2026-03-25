
/**************************************************************** 
 * 
 * Example with getters and setters  => Better encapsulation
 * 
 ***************************************************************/

class GetSetRectangle {
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



const rectangle2 = new GetSetRectangle();

rectangle2.setHeight(3);
rectangle2.setWidth(10);


console.log(`--------------- Rectangle example with getters and setters --------------`);
console.log(`Rectangle width is ${rectangle2.getWidth()}`);
console.log(`Rectangle height is ${rectangle2.getHeight()}`);
console.log(`Rectangle area is ${rectangle2.calculateArea()}`);



/**************************************************************** 
 * 
 * Example with 
 * 
 * getters and setters  => Better encapsulation
 * Use constructor for initialization
 * 
 ***************************************************************/

 class RectangleWithConstructor {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

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
        return this.width * this.height;
    }
}



const rectangle3 = new RectangleWithConstructor(3, 10);

console.log(`--------------- Rectangle initialized on constructor --------------`);
console.log(`Rectangle width is ${rectangle3.getWidth()}`);
console.log(`Rectangle height is ${rectangle3.getHeight()}`);
console.log(`Rectangle area is ${rectangle3.calculateArea()}`);


