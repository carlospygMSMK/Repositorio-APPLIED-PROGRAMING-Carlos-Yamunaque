// ❌ This interface VIOLATES the Interface Segregation Principle.
//    It forces every worker to implement ALL methods,
//    regardless of whether they make sense for that concrete class.

interface Worker {
    work(): void;
    driveForklift(): void;  // Not every worker can drive machinery
    attendCustomers(): void; // Not every worker deals with clients
}
  
class Cashier implements Worker {
    work(): void {
        console.log("Cashier working at the register.");
    }

    // This method makes no sense for a cashier: IT SMELLS!
    driveForklift(): void {
        throw new Error("Cashier cannot drive a forklift!"); // 🚨 Bad design
    }

    attendCustomers(): void {
        console.log("Cashier attending customers.");
    }
}

class WarehouseOperator implements Worker {
    work(): void {
        console.log("Warehouse operator preparing orders.");
    }

    // This method makes no sense for a warehouse operator: IT SMELLS!
    attendCustomers(): void {
        throw new Error("Warehouse operator doesn't attend customers!"); // 🚨 Wrong
    }

    driveForklift(): void {
        console.log("Warehouse operator driving a forklift.");
    }
}



// --- Usage ---------------------------------------------------------------

const cashier = new Cashier();
const warehouse = new WarehouseOperator();

function performWork(worker: Worker) {
  worker.work();
}

performWork(cashier);   // OK
performWork(warehouse); // OK

  // -----------------------------------
function performDesktopCashWork(worker: Worker) {
worker.attendCustomers();
}

performDesktopCashWork(cashier);   // OK
performDesktopCashWork(warehouse); // Runtime error


// -----------------------------------
function performWarehouseWork(worker: Worker) {
worker.driveForklift();
}

performWarehouseWork(cashier);   // Runtime error
performWarehouseWork(warehouse); // OK

