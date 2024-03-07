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
  console.log("Initial itemCounts:", itemCounts);
  console.log("Initial basketItems:", basketItems);

  const handleItemCountChange = (itemId: string, newCount: number) => {
    console.log("Inside of handleItemCountChange.");
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: newCount,
    }));
    console.log("Inside of handleItemCountChange after return.");
  };

  const handleDelete = (itemId: string) => {
    console.log("Inside of handleDelete.");
    setBasketItems((prev) => prev.filter((item) => item.id !== itemId));
    setItemCounts((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
    console.log("Inside of handleDelete after return.");
  };

  return { basketItems, itemCounts, handleItemCountChange, handleDelete };
};
