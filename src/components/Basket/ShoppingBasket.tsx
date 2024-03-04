import jsonData from "../../data.json";
import React, { useState, useEffect } from "react";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import DeleteIcon from "../Basket/DeleteIcon"; // Ensure DeleteIcon supports onClick prop

// Fetch Items from file
const getItems = async (filePath: RequestInfo, fileType: String) => {
  try {
    const response = await fetch(filePath);
    switch (fileType.toUpperCase()) {
      case "JSON":
        return response.json();
      default:
        return response;
    }
  } catch (error) {
    return error;
  }
};
// Define Props interfaces for TypeScript
interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  rabatQuantity: number;
  rabatPercent: number;
  imageUrl?: string;
}

interface BasketItemProps {
  count: number;
  onItemCountChange: (itemId: string, newCount: number) => void;
  handleDelete: (itemId: string) => void;
}

interface ItemsListProps {
  items: Product[];
  itemCounts: { [key: string]: number };
  onItemCountChange: (itemId: string, newCount: number) => void;
}

const ItemComponent: React.FC<Product & BasketItemProps> = ({
  id,
  name,
  price,
  currency,
  imageUrl,
  count,
  onItemCountChange,
  handleDelete,
}) => {
  let totalPrice = price * count;
  return (
    <div className="item-container">
      {imageUrl && <img className="image" src={imageUrl} alt={name} />}
      <div className="item-details">
        <strong>{name}</strong>
        <div>{`${price} ${currency}`}</div>
        <div>Quantity: {count}</div>
        <div>
          Total Price: {totalPrice} {currency}
        </div>
        <CounterButton
          onCountChange={(newCount) => onItemCountChange(id, newCount)}
          min={0}
          max={5}
        />
        <button onClick={() => handleDelete(id)} className="deleteIcon">
          <DeleteIcon />{" "}
          {/* Assuming DeleteIcon is just a visual representation */}
        </button>
      </div>
    </div>
  );
};

// ItemsList Component
const BasketItems: React.FC<ItemsListProps> = ({
  items,
  itemCounts,
  onItemCountChange,
}) => {
  //const [basketItems, setBasketItems] = useState<Product[]>(jsonData);

  const [basketItems, setBasketItems] = useState<Product[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems("src/data.json", "json");
      setBasketItems(response.slice(0, 4));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  /*
  useEffect(() => {
    // Fetch items logic if necessary or simply use jsonData
    // For simplicity, assuming items are initially set from jsonData or similar
  }, []);*/

  const handleDelete = (itemId: string) => {
    const newItems = basketItems.filter((item) => item.id !== itemId);
    setBasketItems(newItems);
  };

  const subtotal = basketItems.reduce((total, item) => {
    const itemCount = itemCounts[item.id] || 0;
    return total + item.price * itemCount;
  }, 0);

  return (
    <>
      <div className="basket-container">
        <BaskedLabels />
        {basketItems.map((item) => (
          <ItemComponent
            key={item.id}
            {...item}
            count={itemCounts[item.id] || 0}
            onItemCountChange={onItemCountChange}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="subTotal">Subtotal: {subtotal}</div>
    </>
  );
};

export default BasketItems;
