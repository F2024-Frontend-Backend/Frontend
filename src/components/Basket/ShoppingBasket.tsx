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
  //count?: number;
}

interface BasketItemProps {
  product: Product;
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
  /*
  const handleCloseClick = () => {
    setShowAlert(false);
  };*/
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
        <span className="name box2">
          <strong>{name}</strong>
        </span>
        <span></span>
        <span className="price">
          {price}
          <span className="currency">{currency}</span>
        </span>
        <span className="quantity box4">{count}</span>
        <span className="total box5">{totalPrice}</span>
        <span className="counterButton">
          <CounterButton
            onCountChange={(newCount) => onItemCountChange(id, newCount)}
            min={0}
            max={6}
          />
        </span>
        <button onClick={() => handleDelete(id)} className="deleteIcon">
          x{/*<DeleteIcon />{" "} */}
          {/* Assuming DeleteIcon is just a visual representation */}
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
const BasketItems: React.FC<ItemsListProps> = ({
  //items,
  //itemCounts,
  onItemCountChange,
}) => {
  const [basketItems, setBasketItems] = useState<Product[]>(
    jsonData.slice(0, 4)
  );
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(
    () => {
      const initialCounts: { [key: string]: number } = {};
      jsonData.slice(0, 4).forEach((item) => {
        initialCounts[item.id] = 1;
      });
      return initialCounts;
    }
  );
  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: newCount,
    }));
  };
  const handleDelete = (itemId: string) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== itemId));
    setItemCounts((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
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

  // Check if basket is empty
  const isEmpty =
    Object.values(itemCounts).every((count) => count === 0) ||
    basketItems.length === 0;

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
