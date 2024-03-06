import { Product } from "./ShoppingBasket";

const basketUtilities = () => {
  const initializeItemCounts = (items: Product[], initialCount = 1) => {
    const initialCounts: { [key: string]: number } = {};
    items.forEach((item) => {
      initialCounts[item.id] = initialCount;
    });

    return initialCounts;
  };

  const calculateSubtotal = (
    items: Product[],
    itemCounts: { [key: string]: number }
  ): number => {
    return items.reduce((total, item) => {
      const itemCount = itemCounts[item.id] || 0;
      const effectiveCount = itemCount > 2 ? itemCount - 1 : itemCount;
      return total + item.price * effectiveCount;
    }, 0);
  };

  const calculateDiscount = (
    subtotal: number,
    threshold: number = 300,
    discountRate: number = 0.1
  ): number => {
    return subtotal > threshold ? subtotal * discountRate : 0;
  };

  return { initializeItemCounts, calculateDiscount, calculateSubtotal };
};

export default basketUtilities;
