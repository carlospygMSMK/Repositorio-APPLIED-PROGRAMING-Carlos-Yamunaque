// ✅ Each interface has a single responsibility.
//    Classes now depend ONLY on the capabilities they actually use.

interface Workable {
    work(): void;
}
  
interface CustomerService {
    attendCustomers(): void;
}
  
interface MachineryOperator {
    driveForklift(): void;
}
  
// --- Concrete classes ----------------------------------------------------
class Cashier implements Workable, CustomerService {
    work(): void {
      console.log("Cashier working at the register.");
    }
  
    attendCustomers(): void {
      console.log("Cashier attending customers.");
    }
}
  
class WarehouseOperator implements Workable, MachineryOperator {
    work(): void {
      console.log("Warehouse operator preparing orders.");
    }
  
    driveForklift(): void {
      console.log("Warehouse operator driving a forklift.");
    }
}
  
  // --- Usage ---------------------------------------------------------------
  function performWork(worker: Workable) {
    worker.work();
  }
  
  const cashier = new Cashier();
  const warehouse = new WarehouseOperator();
  
  performWork(cashier);   // OK
  performWork(warehouse); // OK


  // -----------------------------------
  function performDesktopCashWork(worker: CustomerService) {
    worker.attendCustomers();
  }

  performDesktopCashWork(cashier);   // OK
  //performCustomerServiceWork(warehouse); // Compiler error


  // -----------------------------------
  function performWarehouseWork(worker: WarehouseOperator) {
    worker.driveForklift();
  }

  // performWarehouseWork(cashier);   // OK
  performWarehouseWork(warehouse); // Compiler error

