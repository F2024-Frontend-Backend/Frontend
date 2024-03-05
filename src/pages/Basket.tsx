import BasketItems from "../components/Basket/ShoppingBasket";
import { useEffect, useState } from "react";
import jsonData from "../data.json";
import { Link } from "react-router-dom";
import Alert from "@mui/lab/Alert";

const Basket = () => {
  const [itemCount, setItemCount] = useState<{ [key: string]: number }>({});

  //Take the current stat 'prev' and return a new stat
  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCount((prev) => ({ ...prev, [itemId]: newCount }));
  };

  return (
    <>
      <BasketItems
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
