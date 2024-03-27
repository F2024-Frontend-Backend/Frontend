import { ItemProps } from "../../interfaces/interfaces";
import basketUtilities from "./BasketUtilities";
import { useState } from "react";
import "./ShoppingBasket.css";
import { useEffect } from "react";

export const useBasketState = (
  basketItems: ItemProps[],
  setBasketItems: (
    value: ItemProps[] | ((prev: ItemProps[]) => ItemProps[])
  ) => void // Accept either a new state or previouse state.
) => {
  const { initializeItemCounts } = basketUtilities();
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(
    () => {
      console.log("set initialItemCounts");
      return initializeItemCounts(basketItems, 1);
    }
  );
  useEffect(() => {
    console.log("Recalculating itemCounts due to basketItems change");
    const updatedItemCounts = initializeItemCounts(basketItems, 1);
    setItemCounts(updatedItemCounts);
  }, [basketItems]);

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

    setBasketItems((prev: ItemProps[]) =>
      prev.filter((item: ItemProps) => item.id !== itemId)
    );
    setItemCounts((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
    console.log("Inside of handleDelete after return.");
  };

  return { basketItems, itemCounts, handleItemCountChange, handleDelete };
};
