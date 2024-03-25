import React, { useState, useEffect } from "react";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import Alert from "@mui/material/Alert";
import Rebate from "../ItemRebate/ItemRebate";
import { ItemProps, ItemListProps } from "../../interfaces/interfaces";
import basketUtilities from "./BasketUtilities";
import { useBasketState } from "./useBasketState";
import { OrderItems } from "./BasketItem";

export interface BasketItemProps {
  //product: ItemProps;
  //count: number;
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
                onCountChange={(newCount: number) => {
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
const BasketItems: React.FC<ItemListProps> = ({
  basketItems,
  setBasketItems,
}) => {
  const { calculateDiscount, calculateSubtotal } = basketUtilities();
  const { itemCounts, handleItemCountChange, handleDelete } = useBasketState(
    basketItems,
    setBasketItems
  ); // managing the state of the basket item

  console.log("items: " + basketItems.length + " , " + itemCounts);

  // Calculate subtotal
  const subtotal = calculateSubtotal(basketItems, itemCounts);
  console.log(subtotal);
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
            <ItemComponent
              key={item.id}
              {...item}
              count={itemCounts[item.id] || 0}
              onItemCountChange={handleItemCountChange}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}

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
