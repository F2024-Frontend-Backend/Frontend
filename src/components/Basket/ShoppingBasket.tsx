import jsonData from "../../data.json";
import React, { useState, useEffect } from "react";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import DeleteIcon from "../Basket/DeleteIcon"; // Ensure DeleteIcon supports onClick prop
import Alert from "@mui/material/Alert";

import basketUtilities from "./BasketUtilities";
import { useBasketState } from "./useBasketState";
import { ItemDetails, OrderItems } from "./BasketItem";

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  rabatQuantity: number;
  rabatPercent: number;
  imageUrl?: string;
  //count?: number;
}

export interface BasketItemProps {
  product: Product;
  count: number;
  onItemCountChange: (itemId: string, newCount: number) => void;
  handleDelete: (itemId: string) => void;
}

export interface ItemsListProps {
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

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (count === 3) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [count]);

  return (
    <div className="item-container">
      {imageUrl && <img className="image" src={imageUrl} alt={name} />}
      <div className="item-details">
        <ItemDetails
          name={name}
          price={price}
          currency={currency}
          count={count}
          totalPrice={totalPrice}
        />
        <span className="counterButton">
          <CounterButton
            onCountChange={(newCount) => {
              console.log(`Changing count for item ${id}`);
              onItemCountChange(id, newCount);
            }}
            min={0}
            max={6}
          />
        </span>
        <button onClick={() => handleDelete(id)} className="deleteIcon">
          x
        </button>
        {count === 3 && showAlert && (
          <Alert severity="info" onClose={() => setShowAlert(false)}>
            Buy 3 and get one for free!
          </Alert>
        )}
      </div>
    </div>
  );
};

// ItemsList Component
const BasketItems: React.FC<ItemsListProps> = ({}) => {
  const { calculateDiscount, calculateSubtotal } = basketUtilities();
  const { itemCounts, basketItems, handleItemCountChange, handleDelete } =
    useBasketState(jsonData.slice(0, 4));

  console.log(jsonData.slice(0, 4)); // Check the initial items to ensure they exist and are correctly formatted

  // Calculate subtotal
  const subtotal = calculateSubtotal(basketItems, itemCounts);
  console.log(subtotal);

  // Calculate Discount
  const discount = calculateDiscount(subtotal);
  console.log(discount);
  const totalAfterDiscount = subtotal - discount;

  console.log(totalAfterDiscount);
  // Check if basket is empty
  const isEmpty =
    Object.values(itemCounts).every((count) => count === 0) ||
    basketItems.length === 0;
  console.log(isEmpty);
  console.log(" Before return Basket Items.");
  return (
    <>
      <BaskedLabels />

      {isEmpty ? (
        <Alert severity="info">Your basket is empty.</Alert>
      ) : (
        <div className="basket-container">
          {basketItems.map((item) => (
            <ItemComponent
              key={item.id}
              {...item}
              count={itemCounts[item.id]}
              onItemCountChange={handleItemCountChange}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {/*
      <div className="basket-container">
        {basketItems.map((item) => (
          <ItemComponent
            key={item.id}
            {...item}
            count={itemCounts[item.id]}
            onItemCountChange={handleItemCountChange}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      */}
      <div className="subTotal">
        <OrderItems
          subtotal={subtotal}
          discount={discount}
          totalAfterDiscount={totalAfterDiscount}
        />
      </div>
    </>
  );
};

export default BasketItems;
