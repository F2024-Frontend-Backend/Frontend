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
  const [itemCount, setItemCounts] = useState<{ [key: string]: number }>(() => {
    console.log("set initialItemCounts");
    return initializeItemCounts(basketItems, 1);
  });
  useEffect(() => {
    console.log("Recalculating itemCounts due to basketItems change");
    const updatedItemCounts = initializeItemCounts(basketItems, 1);
    setItemCounts(updatedItemCounts);
  }, [basketItems]);

  console.log("Initial itemCounts:", itemCount);
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
    setBasketItems((prev: ItemProps[]) =>
      prev.filter((item: ItemProps) => item.id !== itemId)
    );
    setItemCounts((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
  };

  return {
    basketItems,
    setBasketItems,
    itemCount,
    handleItemCountChange,
    handleDelete,
  };
};
{
  /** initialBasketItems: ItemProps[] = [] // default to an empty array if no argument is provided
) => {
  const [basketItems, setBasketItems] =
    useState<ItemProps[]>(initialBasketItems);
  const [itemCount, setItemCount] = useState<{ [key: string]: number }>({});

  // Initialize itemCount based on basketItems
  useEffect(() => {
    const initialCounts = basketItems.reduce((counts, item) => {
      counts[item.id] = (counts[item.id] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });
    setItemCount(initialCounts);
  }, [basketItems]);

  const handleItemCountChange = (itemId: string, newCount: number) => {
    console.log("Inside of handleItemCountChange.");
    setItemCount((prevCounts) => ({
      ...prevCounts,
      [itemId]: newCount,
    }));
    console.log("Inside of handleItemCountChange after return.");
  };
    const handleDelete = (itemId: string) => {
    setBasketItems((prev: ItemProps[]) =>
      prev.filter((item: ItemProps) => item.id !== itemId)
    );
    setItemCount((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
  };
 */
}
