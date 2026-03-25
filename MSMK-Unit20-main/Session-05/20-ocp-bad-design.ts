// ❌ This class VIOLATES the Open–Closed Principle.
//    - Every new discount type requires modifying the method.
//    - High risk of breaking existing behavior.

class DiscountCalculator {
    apply(amount: number, discountType: string): number {
      if (discountType === "none") {
        return amount;
      }
  
      if (discountType === "first-purchase") {
        return Math.max(amount - 10, 0);
      }
  
      if (discountType === "student") {
        return amount * 0.8;
      }
  
      throw new Error("Unknown discount type");
    }
  }


console.log("\n--- Non OCP Compliant Discount System ---");

const catalogPrice = 25;
const discountCalculator = new DiscountCalculator();

// Price with different discounts
console.log(`My price without discount is: ${discountCalculator.apply(catalogPrice, 'none')}`);
console.log(`My price with first purchase discount is: ${discountCalculator.apply(catalogPrice, 'first-purchase')}`);
console.log(`My price with student discount is: ${discountCalculator.apply(catalogPrice, 'student')}`);

