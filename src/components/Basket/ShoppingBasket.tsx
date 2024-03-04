/*
import jsonData from "../../data.json";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import { ImBin } from "react-icons/im";
import DeleteIcon from "../Basket/DeleteIcon";
import { useState, useEffect } from "react";

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

interface Props {
  id: string;
  name: string;
  price: number;
  currency: string;
  rabatQuantity: number;
  rabatPercent: number;
  imageUrl?: string;
  count: number;
}

interface itemProps {
  items: typeof jsonData; // An array of items
  itemCounts: { [key: string]: number };
  onItemCountChange: (itemId: string, newCount: number) => void;
}

const ItemsList: React.FC<itemProps> = ({
  items,
  onItemCountChange,
  itemCounts,
}) => {
  const [basketItems, setBasketItems] = useState(items.slice(0, 4)); // Assuming 'items' is initially jsonData
  //const [itemCount, setItemCounts] = useState<{ [key: String]: number }>({});

  useEffect(() => {
    const fetchAndSetItems = async () => {
      try {
        // Assuming 'src/data.json' is the correct path and 'json' is the fileType
        const fetchedItems = await getItems("src/data.json", "json");
        setBasketItems(fetchedItems.slice(0, 4)); // Update to match dynamic fetching logic
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndSetItems();
  }, []);

  const handleDelete = (itemId: string) => {
    const newItems = basketItems.filter((item) => item.id !== itemId);
    setBasketItems(newItems);
  };

  let totalPrice: number;

  const Item: React.FC<Props & itemProps> = ({
    id,
    name,
    price,
    currency,
    imageUrl,
    onItemCountChange,
    count,
  }) => {
    totalPrice = price * count;
    return (
      <>
        <div className="item-container" key={id}>
          <div>
            {imageUrl && <img className="image" src={imageUrl} alt="" />}
            <span className="name box2">
              <strong>{name}</strong>
            </span>
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
                max={5}
              />
              <div className="deleteIcon" onClick={() => handleDelete(id)}>
                <DeleteIcon itemId={id} onClick={() => handleDelete(id)} />
                <ImBin />
              </div>
            </span>
          </div>
        </div>
      </>
    );
  };

  const subtotal = basketItems.reduce((total, item) => {
    const itemCount = itemCounts[item.id] || 0;
    return total + itemCount * item.price;
  }, 0);

  return (
    <>
      <div className="basket-container">
        <BaskedLabels />
        {basketItems.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            currency={item.currency}
            rabatPercent={item.rabatPercent}
            rabatQuantity={item.rabatQuantity}
            imageUrl={item.imageUrl}
            count={itemCounts[item.id] || 0}
            onItemCountChange={onItemCountChange}
            items={items}
            itemCounts={itemCounts}
          />
        ))}
      </div>
      <div className="subTotal">{subtotal}</div>
    </>
  );
};
export default ItemsList;
*/
/*
import jsonData from "../../data.json";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import { ImBin } from "react-icons/im";
import { useState, useEffect } from "react";
import DeleteIcon from "../Basket/DeleteIcon";

let totalPrice: number;
let shoppingItems: number;
shoppingItems = 4;

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

interface Props {
  id: string;
  name: string;
  price: number;
  currency: string;
  rabatQuantity: number;
  rabatPercent: number;
  imageUrl?: string;
  count: number;
  //handleDelete: (itemId: string) => void;
}

interface itemProps {
  items: typeof jsonData; // An array of items
  itemCounts: { [key: string]: number };
  onItemCountChange: (itemId: string, newCount: number) => void;
}

const handleDelete = (itemId: string) => {
  console.log("Delete is clicked!");
  //const newItem= Item.filter()
};

const Item: React.FC<Props & itemProps & { handleDelete: (itemId: string) => void }> = ({
  id,
  name,
  price,
  currency,
  imageUrl,
  onItemCountChange,
  count,
  handleDelete,
}) => {
  totalPrice = price * count;
  return (
    <>
      <div className="item-container" key={id}>
        <div>
          {imageUrl && <img className="image" src={imageUrl} alt="" />}
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
              max={5}
            />
            <div className="deleteIcon">
              {<DeleteIcon itemId={id} onClick={() => handleDelete(id)} />}
              <ImBin />
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

const ItemsList: React.FC<itemProps> = ({
  items,
  onItemCountChange,
  itemCounts,
}) => {
  const subtotal = items.slice(0, shoppingItems).reduce((total, item) => {
    const itemCount = itemCounts[item.id] || 0;
    return total + itemCount * item.price;
  }, 0);

  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems("src/data.json", "json");
      setBasketItems(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (itemId: string) => {
    console.log("Delete is clicked!");
    const newItems = basketItems.filter((item: Props) => item.id !== itemId);
    setBasketItems(newItems);
  };

  return (
    <>
      <div className="basket-container">
        <BaskedLabels />
        {items.slice(0, shoppingItems).map((item) => (
          <div key={item.id}>
            <Item
              id={item.id}
              name={item.name}
              price={item.price}
              currency={item.currency}
              rabatPercent={item.rebatePercent}
              rabatQuantity={item.rebateQuantity}
              imageUrl={item.imageUrl}
              count={itemCounts[item.id] || 0}
              onItemCountChange={onItemCountChange}
              items={items}
              itemCounts={itemCounts}
              handleDelete={() => handleDelete(item.id)}
            />
          </div>
        ))}
      </div>
      <div className="subTotal">
        <p className="div1">
          <strong>Subtotal</strong>
          <span className="div2">{subtotal}</span>
        </p>

        <p className="div3">
          Discount
          <span className="div4"></span>
        </p>
        <p className="div5">
          Shipping
          <span className="div6">-</span>
        </p>
      </div>
      <div>
        <p className="div7">
          <strong>Total</strong>
          <span className="div8">
            <strong>{subtotal}</strong>
          </span>
        </p>
      </div>
    </>
  );
};

export default ItemsList;
*/

// Assuming jsonData is correctly imported and contains your items
import jsonData from "../../data.json";
import React, { useState, useEffect } from "react";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import DeleteIcon from "../Basket/DeleteIcon"; // Ensure DeleteIcon supports onClick prop

// Define Props interfaces for TypeScript
interface Item {
  id: string;
  name: string;
  price: number;
  currency: string;
  rabatQuantity: number;
  rabatPercent: number;
  imageUrl?: string;
}

interface ItemProps extends Item {
  count: number;
  onItemCountChange: (itemId: string, newCount: number) => void;
  handleDelete: (itemId: string) => void;
}

interface ItemsListProps {
  items: Item[];
  itemCounts: { [key: string]: number };
  onItemCountChange: (itemId: string, newCount: number) => void;
}

// Item Component
const ItemComponent: React.FC<ItemProps> = ({
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
const ItemsList: React.FC<ItemsListProps> = ({
  items,
  itemCounts,
  onItemCountChange,
}) => {
  const [basketItems, setBasketItems] = useState<Item[]>(jsonData); // Initially set to jsonData

  useEffect(() => {
    // Fetch items logic if necessary or simply use jsonData
    // For simplicity, assuming items are initially set from jsonData or similar
  }, []);

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

export default ItemsList;
