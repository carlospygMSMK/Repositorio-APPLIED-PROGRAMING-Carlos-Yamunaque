// --------------------------------------------------------------
// 1. Abstraction: high-level policy depends on this, not on details
// --------------------------------------------------------------
interface OrderRepository {
    save(order: string): void;
  }
  
  // --------------------------------------------------------------
  // 2. Low-level modules IMPLEMENT the abstraction
  // --------------------------------------------------------------
  
  class MySqlOrderRepository implements OrderRepository {
    save(order: string): void {
      console.log("[MySQL] Saving order:", order);
    }
  }
  
  class InMemoryOrderRepository implements OrderRepository {
    private storage: string[] = [];
  
    save(order: string): void {
      this.storage.push(order);
      console.log("[InMemory] Order stored:", order);
    }
  }
  
  // --------------------------------------------------------------
  // 3. High-level module depends ONLY on the abstraction
  // --------------------------------------------------------------
  
  class OrderService {
    // Depends on the interface, not the concrete implementation
    constructor(private repo: OrderRepository) {}
  
    placeOrder(order: string): void {
      this.repo.save(order);
    }
  }
  
  // --------------------------------------------------------------
  // 4. Usage: easily swap implementations without touching OrderService
  // --------------------------------------------------------------
  
  const serviceMySQL = new OrderService(new MySqlOrderRepository());
  serviceMySQL.placeOrder("Order #1");
  
  const serviceMemory = new OrderService(new InMemoryOrderRepository());
  serviceMemory.placeOrder("Order #2");
  