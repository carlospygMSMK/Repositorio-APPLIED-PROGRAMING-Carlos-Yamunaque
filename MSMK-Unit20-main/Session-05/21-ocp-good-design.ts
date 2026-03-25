// ✅ OCP-compliant:
//    - apply() method does not need to be modified to introduce a new discount
//    - We "add" a new implementation, it cannot break previous code.


interface DiscountStrategy {
    apply(amount: number): number;
  }


class NoDiscount implements DiscountStrategy {
    apply(amount: number): number {
        return amount;
    }
}

class FirstPurchaseDiscount implements DiscountStrategy {
    apply(amount: number): number {
        return Math.max(amount - 10, 0);
    }
}

class StudentDiscount implements DiscountStrategy {
    apply(amount: number): number {
        return amount * 0.8;
    }
}


console.log("\n--- Non OCP Compliant Discount System ---");

const catalogPrice = 25;

let discountCalculator:DiscountStrategy;

// Price with different discounts
discountCalculator = new NoDiscount();
console.log(`My price without discount is: ${discountCalculator.apply(catalogPrice)}`);

discountCalculator = new FirstPurchaseDiscount();
console.log(`My price with first purchase discount is: ${discountCalculator.apply(catalogPrice)}`);

discountCalculator = new StudentDiscount();
console.log(`My price with student discount is: ${discountCalculator.apply(catalogPrice)}`);

