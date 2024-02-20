import ItemsList from "../components/Basket/ShoppingBasket";
import { useState } from "preact/hooks";
import jsonData from "../data.json";
import { Link } from "react-router-dom";

const Basket = () => {
  const [itemCount, setItemCount] = useState<{ [key: string]: number }>({});

  //Take the current stat 'prev' and return a new stat
  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCount((prev) => ({ ...prev, [itemId]: newCount }));
  };

  return (
    <>
      <ItemsList
        items={jsonData}
        onItemCountChange={handleItemCountChange}
        itemCounts={itemCount}
      />

      <button>
        <Link to={`/checkout`}>Go to checkout </Link>
      </button>
    </>
  );
};

export default Basket;
