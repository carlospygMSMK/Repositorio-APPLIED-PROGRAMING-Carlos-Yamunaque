// ❌ LSP violation:
//    - The base class "promises" that every Bird can fly().
//    - A Penguin is a Bird, but it throws when fly() is called.
//    - Substituting Penguin where a Bird is expected causes runtime failure.

class Bird {
    // The "contract" here implicitly states that every Bird can fly.
    fly(): string {
      return "Flapping wings… taking off!";
    }
  }
  
  class Sparrow extends Bird {
    fly(): string {
      return "Sparrow: swift takeoff!";
    }
  }
  
  class Penguin extends Bird {
    fly(): string {
      // Violates the base-class expectation. IT SMELLS!!
      throw new Error("Penguin can't fly");
    }
  }
  
  // A function that relies on the Bird contract.
  function makeItFly(bird: Bird): void {
    // Caller expects this NEVER to throw for a valid Bird.
    console.log(bird.fly());
  }
  
  makeItFly(new Sparrow()); // OK
  makeItFly(new Penguin()); // 💥 Runtime error (LSP violated)