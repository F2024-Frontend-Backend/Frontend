import { Product, ItemsListProps } from "./ShoppingBasket";
import basketUtilities from "./BasketUtilities";
import { useState } from "react";
import jsonData from "../../data.json";

export const useBasketState = (intialProducts: Product[]) => {
  const { initializeItemCounts } = basketUtilities();
  const [basketItems, setBasketItems] = useState<Product[]>(intialProducts);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(
    () => {
      return initializeItemCounts(jsonData.slice(0, 4));
    }
  );

  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: newCount,
    }));
  };

  const handleDelete = (itemId: string) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== itemId));
    setItemCounts((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
  };

  return { basketItems, itemCounts, handleItemCountChange, handleDelete };
};
