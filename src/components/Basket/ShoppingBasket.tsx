import jsonData from "../../data.json";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import { ImBin } from "react-icons/im";
import DeleteIcon from "../Basket/DeleteIcon";
import { useState, useEffect } from "react";

import Rebate from "../ItemRebate/ItemRebate";

import Carousel from "../Carousel/Carousel";

let totalPrice: number;
let shoppingItems: number;
shoppingItems = 4;



  // Fetch Items from file
  const getItems = async (filePath: RequestInfo, fileType: String) => {
    try{ 
      const response = await fetch(filePath);
      switch (fileType.toUpperCase()) {
          case 'JSON':
             return response.json();
          default:
             return response;
             
      }
  } catch (error) {
      return error;
  }
  }

interface Props {
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number;
  rebatePercent: number;
  imageUrl?: string;
  count: number;
}

interface itemProps {
  items: typeof jsonData; // An array of items
  itemCounts: { [key: string]: number };
  onItemCountChange: (itemId: string, newCount: number) => void;
}

/**
 * TODO
 */




const ItemsList: React.FC<itemProps> = ({
  items,
  onItemCountChange,
  itemCounts,
}) => {

  const [basketItems, setBasketItems] = useState([])

  useEffect(() => {
    fetchItems();
    }, [])

    const fetchItems = async () => {
      try {
        const response = await getItems('src/data.json', 'json');
        setBasketItems(response);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
   };

   const handleDelete = (itemId: string) => {
    console.log("Delete is clicked!");
    const newItems = basketItems.filter((item:Props) => item.id !== itemId)
    setBasketItems(newItems)
  };

   const Item: React.FC<Props & itemProps> = ({
    id,
    name,
    price,
    currency,
    rebatePercent,
    rebateQuantity,
    imageUrl,
    onItemCountChange,
    count,
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

  const subtotal = items.slice(0, shoppingItems).reduce((total, item) => {
    const itemCount = itemCounts[item.id] || 0;
    return total + itemCount * item.price;
  }, 0);
  return (
    <>
      <div className="basket-container">
        <BaskedLabels />
        {
          basketItems.map((item:Props) => (
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
                items={items}
                itemCounts={itemCounts}
              />
            </div>
          ))

        }
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
        <Carousel itemList={basketItems}></Carousel>
    </>
  );
};




export default ItemsList;
