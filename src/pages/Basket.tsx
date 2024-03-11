import BasketItems from "../components/Basket/ShoppingBasket";
import { useEffect, useState } from "react";

import jsonData from "../data.json";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

//import "./ShoppingBasket.css";

import "./pages.css";

import Carousel from "../components/Carousel/Carousel";
import { ItemProps } from "../interfaces/interfaces";
import { useBasketState } from "../components/Basket/useBasketState";
import basketUtilities from "../components/Basket/BasketUtilities";

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

const Basket = () => {
  const [itemCount, setItemCount] = useState<{ [key: string]: number }>({});

  //Take the current stat 'prev' and return a new stat
  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCount((prev) => ({ ...prev, [itemId]: newCount }));
  };

  const [emptyBasket, setBasketEmpty] = useState(false);
  const [allItems, setAllItems] = useState<ItemProps[]>([]);
  const [basketItems, setBasketItems] = useState<ItemProps[]>([]);
  const [carouselItems, setCarouselItems] = useState<ItemProps[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const { calculateSubtotal } = basketUtilities();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems("src/data.json", "json");
      setAllItems(response);
      setBasketItems(response.slice(0, 5));
      console.log(response);
      generateCarouselItems(response, response.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

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

  const generateCarouselItems = (allItems: any, basketItems: any) => {
    let newCarousel: any = [];
    let upsellIds: string[] = [];
    let basketIds: string[] = [];

    basketItems.map((item: ItemProps) => {
      basketIds.push(item.id);

      if (item.upsellProductId != null) {
        upsellIds.push(item.upsellProductId);
      }
    });

    allItems.map((item: ItemProps) => {
      if (upsellIds.includes(item.id) && !basketIds.includes(item.id)) {
        newCarousel.push(item);
      }
    });
    setCarouselItems(newCarousel);
  };

  const addToBasket = (id: string) => {
    allItems.forEach((item: ItemProps) => {
      if (item.id === id) {
        const newBasket: ItemProps[] = basketItems;
        newBasket.push(item);

        setBasketItems(newBasket);
        generateCarouselItems(allItems, basketItems);
      }
    });
  };

  useEffect(() => {
    const newSubtotal = calculateSubtotal(basketItems, itemCount);
    setSubtotal(newSubtotal); // Recalculate subtotal when itemCount or basketItems change
  }, [itemCount, basketItems]);

  return (
    <div className="pageContainer">
      <BasketItems
        basketItems={basketItems}
        setBasketItems={setBasketItems}
        onItemCountChange={handleItemCountChange}
        itemCount={itemCount}
      />
      <div>Subtotal: {subtotal}</div>
      <button>
        <Link to={`/checkout`}>Go to checkout </Link>
      </button>

      <Carousel itemList={carouselItems} addToBasket={addToBasket}></Carousel>
    </div>
  );
};

export default Basket;
