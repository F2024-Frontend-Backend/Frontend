import { ItemProps } from "../../interfaces/interfaces";
import basketUtilities from "./BasketUtilities";
import { useState } from "react";
import "./ShoppingBasket.css";
import { useEffect } from "react";

/**
 *
 * @param basketItems
 * @param setBasketItems
 * @returns
 * - The hook returns:
 * - basketItems: The current array of items in the basket.
 * - itemCounts: itemId and the count of that item in the basket.
 * - handleItemCountChange: Updating the count of a specific item in the basket.
 * - handleDelete: Removing an item from the basket.
 */

export const useBasketState = (
  basketItems: ItemProps[],
  // Get an array of ItemProps or a function thate takes an array of ItemProps
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
