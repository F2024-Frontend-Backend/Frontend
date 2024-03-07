import BasketItems from "../components/Basket/ShoppingBasket";
import { useEffect, useState } from "react";
import jsonData from "../data.json";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Basket = () => {
  const [itemCount, setItemCount] = useState<{ [key: string]: number }>({});

  //Take the current stat 'prev' and return a new stat
  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCount((prev) => ({ ...prev, [itemId]: newCount }));
  };

  const [emptyBasket, setBasketEmpty] = useState(false);
  const checkIfBasketIsEmpty = () => {
    const isEmpty =
      Object.keys(itemCount).length === 0 ||
      Object.values(itemCount).every((count) => count === 0);
    setBasketEmpty(isEmpty);
  };

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    checkIfBasketIsEmpty();
    setShowAlert(emptyBasket);
  }, [itemCount]);

  // Debugging
  console.log("I am before return in Basket");
  useEffect(() => {
    checkIfBasketIsEmpty();
    setShowAlert(emptyBasket);
    console.log(`emptyBasket: ${emptyBasket}, showAlert: ${showAlert}`);
  }, [itemCount, emptyBasket, showAlert]);

  return (
    <>
      {/*{emptyBasket && showAlert && (
        <Alert severity="info" onClose={() => setShowAlert(false)}>
          Your basket is empty.
        </Alert>
      )}
      {!emptyBasket && (
        <>
          <BasketItems
            items={jsonData}
            onItemCountChange={handleItemCountChange}
            itemCounts={itemCount}
          />
        </>
      )}
 */}
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
