import React from "react";

import jsonData from "../../data.json";
import "./PurchaseTotal.css";
import { useLocation } from "react-router-dom";
import { ItemProps } from "../../interfaces/interfaces";
import Basket from "../../pages/Basket";

{
  /**interface Props {
  items: typeof jsonData;
} */
}
{
  /**
const Checkout = () => {
  const location = useLocation();
  const basketData = location.state?.basket; // Access the passed basket data directly here

  return (
    <div>
      <h1>Checkout Page</h1>
      <PurchaseTotal basketData={basketData} />
      </div>
      );
    }; */
}
const PurchaseTotal: React.FC<{
  basketData?: ItemProps[];
  /*Props*/
}> = () => {
  const purchasePrise = 420;
  const deliveryPrice = 39;
  const currency = "kr.";

  const location = useLocation();
  console.log("Received state at checkout:", location.state);
  const { basket, itemCount } = location.state || {};
  console.log("Received basket:", basket);
  console.log("Received itemCount:", itemCount);

  return (
    <>
      <span>Ordre #1234</span>
      <div className="itemList">
        {basket &&
          basket.map((item: ItemProps) => (
            <div key={item.id}>
              {item.name}: {itemCount[item.id]} x {item.price} {currency}
            </div>
          ))}
      </div>

      <div className="totalPrice">
        <div className="colStart">
          <span className="bold">Subtotal</span>
          <div>
            <span className="bold">Taxes </span>
            <span>(included)</span>
          </div>
          <span className="bold">Delivery</span>
        </div>
        <div className="colEnd">
          <span>
            {purchasePrise} {currency}
          </span>
          <span>
            {purchasePrise * 0.2} {currency}
          </span>
          <span>
            {deliveryPrice} {currency}
          </span>
        </div>
      </div>

      <div className="deviderLine"></div>

      <div className="totalPrice">
        <div className="colStart">
          <span className="bold">Total</span>
        </div>
        <div className="colEnd">
          <span>
            {purchasePrise + deliveryPrice} {currency}
          </span>
        </div>
      </div>
    </>
  );
};

export default PurchaseTotal;
