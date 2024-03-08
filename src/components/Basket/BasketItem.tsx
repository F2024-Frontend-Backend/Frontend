import React from "react";
import "./ShoppingBasket.css";

type ItemDetailsProps = {
  name: string;
  price: number | string;
  currency: string;
  count: number;
  totalPrice: number | string;
};

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  name,
  price,
  currency,
  count,
  totalPrice,
}) => (
  <div>
    <ul>
      <li className="name box2">
        <strong>{name}</strong>
      </li>
      <li className="price">{price}</li>
      <li className="currency">{currency}</li>
      <li className="quantity box4">{count}</li>
      <li className="total box5">{totalPrice}</li>
    </ul>
  </div>
);

type BasketItemsProps = {
  subtotal: number;
  discount: number;
  shipping: number;
  totalAfterDiscount: number;
};

export const OrderItems: React.FC<BasketItemsProps> = ({
  subtotal,
  discount,
  //shipping,
  totalAfterDiscount,
}) => (
  <>
    <p className="div1">
      <strong>Subtotal</strong>
      <span className="div2">{subtotal}</span>
    </p>

    {discount > 0 && (
      <p className="div3">
        Discount 10%
        <span className="div4">-{discount}</span>
      </p>
    )}

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
  </>
);
