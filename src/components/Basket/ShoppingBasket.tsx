import jsonData from "../../data.json";
import React, { useState, useEffect } from "react";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import Alert from "@mui/material/Alert";
import Rebate from "../ItemRebate/ItemRebate";
import { ItemProps, ItemListProps } from "../../interfaces/interfaces";

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
const ItemsList: React.FC<ItemListProps> = ({
  basketItems,
  setBasketItems,
  onItemCountChange,
  itemCounts,
}) => {

   const handleDelete = (itemId: string) => {
    console.log("Delete is clicked!");
    const newItems: ItemProps[] = basketItems.filter((item:ItemProps) => item.id !== itemId)
    setBasketItems(newItems)
  };

   const Item: React.FC<ItemProps & ItemListProps> = ({
    id,
    name,
    price,
    currency,
    rebatePercent,
    rebateQuantity,
    imageUrl,
    onItemCountChange,
    count,
    upsellProductId,
  }) => {

    totalPrice = price * count;
    return (
      <>
        <div className="itemContainer" key={id}>
        {imageUrl && <img className="image" src={imageUrl} alt="" />}
          <div className="itemInnerContainer">
            
            <span className="name box2">
              <strong>{name}</strong>
            </span>
            
            
            <span className="price">
              {price}
              <span className="currency">{currency}</span>
            </span>
            <Rebate rebatePercent={rebatePercent} rebateQuantity={rebateQuantity} count={count}></Rebate>
            
            <span className="counterButton">
              
              <CounterButton
                onCountChange={(newCount) => onItemCountChange(id, newCount)}
                min={0}
                max={5}
              />
            </span>
          </div>
          <span className="total box5">{totalPrice}</span>
          <div className="deleteIcon">
                {<DeleteIcon itemId={id} onClick={handleDelete} /> }
                
              </div>
        </div>
      </>
    );
  };

  const subtotal = basketItems.reduce((total, item:ItemProps) => {
    const itemCount = itemCounts[item.id] || 0;
    return total + itemCount * item.price;
  }, 0);
  return (
    <>
      <div className="basketContainer">
        <BaskedLabels />
        {
          basketItems.map((item:ItemProps) => (
            <div key={item.id}>
              <Item
                id={item.id}
                name={item.name}
                price={item.price}
                currency={item.currency}
                rebatePercent={item.rebatePercent}
                rebateQuantity={item.rebateQuantity}
                imageUrl={item.imageUrl}
                count={itemCounts[item.id] || 0}
                onItemCountChange={onItemCountChange}
                upsellProductId={item.upsellProductId}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
                itemCounts={itemCounts}
              />
            </div>
          ))

        }
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

