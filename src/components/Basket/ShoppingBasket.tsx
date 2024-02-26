import jsonData from "../../data.json";
import "./ShoppingBasket.css";
import CounterButton from "./CounterButton";
import { BaskedLabels } from "./BasketLabel";
import { ImBin } from "react-icons/im";
import DeleteIcon from "../Basket/DeleteIcon";

let totalPrice: number;
let shoppingItems: number;
shoppingItems = 4;

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

/**
 * TODO
 */
const handleDelete = (itemId: string) => {
  console.log("Delete is clicked!");
  //const item= Item.filter()
};

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
              {/*<DeleteIcon itemId={id} onClick={handleDelete} />*/}
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
