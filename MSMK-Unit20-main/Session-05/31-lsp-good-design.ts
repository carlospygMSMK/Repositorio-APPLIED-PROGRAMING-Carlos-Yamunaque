// ✅ LSP-compliant:
//    - "Bird" does not promise flying anymore.
//    - "Flyer" is a separate capability (interface).
//    - Functions requiring flight depend on the Flyer abstraction, not on Bird.

interface Flyer {
    fly(): string;
  }
  
  abstract class Bird {
    constructor(public readonly name: string) {}
  
    move(): string {
      return `${this.name} is moving…`;
    }
  
    // Common bird behavior that applies to all birds:
    eat(): string {
      return `${this.name} is pecking food.`;
    }
  }
  
  class Sparrow extends Bird implements Flyer {
    fly(): string {
      return `${this.name}: swift takeoff!`;
    }
  }
  
  class Penguin extends Bird {
    // Penguins don't implement Flyer because they don't fly.
    swim(): string {
      return `${this.name} is swimming.`;
    }
  }
  
  // A function that requires the "flying" capability, not "any bird".
  function performAirShow(flyer: Flyer): void {
    console.log(flyer.fly());
  }
  
  // A function that works for any bird without assuming flying:
  function observeBird(bird: Bird): void {
    console.log(bird.move());
    console.log(bird.eat());
  }
  
  // --- Usage ---
  const jack = new Sparrow("Jack the Sparrow");
  const pingu = new Penguin("Pingu");
  
  // Safe: Sparrow is a Flyer
  performAirShow(jack);      // OK
  observeBird(jack);         // OK
  
  // Safe: Penguin is a Bird but not a Flyer
  // performAirShow(pingu);  // ❌ Compile error (as desired)
  observeBird(pingu);        // OK
  