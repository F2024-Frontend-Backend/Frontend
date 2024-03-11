import { ItemProps } from "../../interfaces/interfaces";
import basketUtilities from "./BasketUtilities";
import { useState } from "react";
import jsonData from "../../data.json";
import "./ShoppingBasket.css";

export const useBasketState = (basketItems: ItemProps[], setBasketItems: (value: ItemProps[]) => void) => {
  const { initializeItemCounts } = basketUtilities();
  //const [basketItems, setBasketItems] = useState<ItemProps[]>(intialProducts);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(
    () => {
      console.log("set initialItemCounts")
      return initializeItemCounts(basketItems);
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
