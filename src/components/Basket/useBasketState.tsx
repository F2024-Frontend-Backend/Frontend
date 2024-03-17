import { ItemProps } from "../../interfaces/interfaces";
import basketUtilities from "./BasketUtilities";
import { useState } from "react";
import "./ShoppingBasket.css";
import { useEffect } from "react";
import axios, { AxiosError, CanceledError } from "axios";

export const useBasketState = (
  basketItems: ItemProps[],
  setBasketItems: (value: ItemProps[]) => void
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
  const [error, setError] = useState("");
  const handleDelete = (itemId: string) => {
    console.log("Inside of handleDelete.");
    const originalItems = [...basketItems];
    setBasketItems((prev: ItemProps[]) =>
      prev.filter((item) => item.id !== itemId)
    );
    setItemCounts((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
    axios
      .delete("http://127.0.0.1:8000/api/products/" + itemId)
      .catch((error) => {
        setError(error.message);
        setBasketItems(originalItems);
      });
  };

  return { basketItems, itemCounts, handleItemCountChange, handleDelete };
};
