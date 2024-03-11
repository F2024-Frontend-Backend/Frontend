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

export interface BasketItemProps {
  product: ItemProps;
  count: number;
  onItemCountChange: (itemId: string, newCount: number) => void;
  handleDelete: (itemId: string) => void;
}

const ItemComponent: React.FC<ItemProps & BasketItemProps> = ({
  id,
  name,
  price,
  currency,
  imageUrl,
  count,
  rebatePercent,
  rebateQuantity,
  onItemCountChange,
  handleDelete,
}) => {
  let totalPrice = price * count;
  console.log(
    `Rendering ItemComponent: ${name}, Price: ${price}, Count: ${count}, Total Price: ${totalPrice}`
  );
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (count === 3) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [count]);

  return (
    <div className="itemContainer">
      <div className="imageContainer">
        {imageUrl && <img className="image" src={imageUrl} alt={name} />}
      </div>

      <div className="itemDetails">
        <div className="topSection">
          <span className="itemName">{name}</span>
          <span className="itemPrice">
            {price} {currency}
          </span>
        </div>

        <div className="bottomSection">
          <div className="leftContainer">
            <Rebate
              rebatePercent={rebatePercent}
              rebateQuantity={rebateQuantity}
              count={count}
            ></Rebate>
          </div>
          <div className="rightContainer">
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

            <span className="itemTotalPrice">
              {totalPrice} {currency}
            </span>
          </div>
        </div>
      </div>

      <button onClick={() => handleDelete(id)} className="deleteIcon">
        x
      </button>
      {/*count === 3 && showAlert && (
          <Alert severity="info" onClose={() => setShowAlert(false)}>
            Buy 3 and get one for free!
          </Alert>
        )*/}
    </div>
  );
};

// ItemsList Component
const BasketItems: React.FC<ItemListProps & ItemProps> = ({
  basketItems,
  setBasketItems,
  onItemCountChange,
  itemCount,
}) => {
  //const [subtotal, setSubtotal] = useState<number>(0);

  const { calculateDiscount, calculateSubtotal } = basketUtilities();
  const { itemCounts, handleItemCountChange, handleDelete } = useBasketState(
    basketItems,
    setBasketItems
  );

  //console.log(jsonData.slice(0, 4)); // Check the initial items to ensure they exist and are correctly formatted

  console.log("items: " + basketItems.length + " , " + itemCounts);

  // Calculate subtotal
  const subtotal = calculateSubtotal(basketItems, itemCounts);
  console.log(subtotal);
  useEffect(() => {
    const newSubtotal = calculateSubtotal(basketItems, itemCount);
    //setSubtotal(newSubtotal); // Recalculate subtotal when itemCount or basketItems change
  }, [itemCount, basketItems]);

  // Calculate Discount
  const discount = calculateDiscount(subtotal);
  console.log(discount);
  const totalAfterDiscount = subtotal - discount;

  console.log(totalAfterDiscount);
  // Check if basket is empty
  console.log(
    "itemCounts: ",
    Object.values(itemCounts),
    "basket: ",
    basketItems
  );

  const isEmpty =
    Object.values(itemCounts).every((count) => count === 0) ||
    basketItems.length === 0;
  console.log("empty: " + isEmpty);
  console.log(" Before return Basket Items.");
  return (
    <>
      <BaskedLabels />
      {isEmpty ? (
        <Alert severity="info">Your basket is empty.</Alert>
      ) : (
        <div className="basketContainer">
          {basketItems.map((item) => (
            <ItemComponent key={item.id} {...item} />
          ))}
        </div>
      )}

      {/*<div className="basketContainer">
        {basketItems.map((item) => (
          <ItemComponent
            key={item.id}
            {...item}
            count={itemCounts[item.id] || 0}
            onItemCountChange={handleItemCountChange}
            handleDelete={handleDelete}
          />
        ))}
      </div> */}

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
