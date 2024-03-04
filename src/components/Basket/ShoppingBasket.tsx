import jsonData from "../../data.json";
import React, { useState, useEffect } from "react";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import DeleteIcon from "../Basket/DeleteIcon"; // Ensure DeleteIcon supports onClick prop
import Alert from "@mui/lab/Alert";

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
  const [showAlert, setShowAlert] = useState(true);
  const handleCloseClick = () => {
    setShowAlert(false);
  };
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
          {/*<DeleteIcon />{" "} */}
          {/* Assuming DeleteIcon is just a visual representation */}
        </button>
        {count === 3 && showAlert && (
          <Alert severity="info" onClose={handleCloseClick}>
            Køb 3 få en gratis!
          </Alert>
        )}
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

  const [promotionApplied, setPropmitionApplied] = useState(false);

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

  const handleDelete = (itemId: string) => {
    const newItems = basketItems.filter((item) => item.id !== itemId);
    setBasketItems(newItems);
  };

  const subtotal: number = basketItems.reduce((total, item) => {
    const itemCount = itemCounts[item.id] || 0;
    /* if (itemCount > 2) {
      return total + item.price * (itemCount - 1);
    } else {
      return total + item.price * itemCount;
    }*/
    const effectiveCount = itemCount > 2 ? itemCount - 1 : itemCount;
    return total + item.price * effectiveCount;
  }, 0);
  const discount = subtotal > 300 ? subtotal * 0.1 : 0;
  const totalAfterDiscount = subtotal - discount;

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
        {promotionApplied && <div>Køb 3, få 1 gratis!</div>}
      </div>
      {/*<div className="subTotal">Subtotal: {subtotal}</div> */}
      <div className="subTotal">
        <p className="div1">
          <strong>Subtotal</strong>
          <span className="div2">{subtotal}</span>
        </p>

        <p className="div3">
          Discount
          <span className="div4">-{discount}</span>
        </p>
        <p className="div5">
          Shipping
          <span className="div6">-</span>
        </p>

        <div>
          <p className="div7">
            <strong>Total</strong>
            <span className="div8">
              <strong>{totalAfterDiscount}</strong>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default BasketItems;
