// ❌ Violates DIP:
//    OrderService directly depends on a low-level detail: MySqlOrderRepository.
//    Replacing the storage mechanism requires modifying OrderService.

class MySqlOrderRepository {
    save(order: string): void {
        console.log("Saving order to MySQL:", order);
    }
}
  
class OrderService {
    // Direct dependency on a concrete class
    constructor(private repo: MySqlOrderRepository) {}
  
    placeOrder(order: string): void {
      this.repo.save(order);
    }
}
  
// Usage
const service = new OrderService(new MySqlOrderRepository());
service.placeOrder("Order #1");