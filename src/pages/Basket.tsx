import BasketItems from "../components/Basket/ShoppingBasket";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";
import Carousel from "../components/Carousel/Carousel";
import { ItemProps } from "../interfaces/interfaces";
import basketUtilities from "../components/Basket/BasketUtilities";
import { useNavigate } from "react-router-dom";
import { useBasketState } from "../components/Basket/useBasketState";

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
  {
    /**
 const [itemCount, setItemCount] = useState<{ [key: string]: number }>({});

  //Take the current stat 'prev' and return a new stat
  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCount((prev) => ({ ...prev, [itemId]: newCount }));
    console.log("new count for item", itemId, ":", newCount);
  }; */
  }

  //const [emptyBasket, setBasketEmpty] = useState(false);
  const [allItems, setAllItems] = useState<ItemProps[]>([]);
  const [basketItems, setBasketItems] = useState<ItemProps[]>([]);
  //const { basketItems, setBasketItems } = useBasketState();
  const [carouselItems, setCarouselItems] = useState<ItemProps[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const { calculateSubtotal } = basketUtilities();
  const { itemCount, handleItemCountChange } = useBasketState(
    basketItems,
    () => {}
  );

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
    setSubtotal(newSubtotal); // Recalculate subtotal
  }, [itemCount, basketItems]);

  // Make sure that itemCount is updated before navigating to checkout
  // A flag that checks when ready to checkout
  const [readyToNavigate, setReadyToNavigate] = useState(false);

  // Pass Basket items
  const navigate = useNavigate();
  const handleCheckout = () => {
    console.log("Navigating with itemCount:", itemCount);
    {
      /** navigate(`/checkout`, {
      state: { basket: basketItems, itemCount: itemCount || {} },
    }); */
    }
    setReadyToNavigate(true);
    console.log(
      "Navigating with itemCount after setting flag to true:",
      itemCount
    );
  };

  // Litsen to changes, if ready, navigate to checkout
  useEffect(() => {
    if (readyToNavigate) {
      console.log("Final check before navigation:", itemCount, basketItems);
      console.log("Navigating with itemCount:", itemCount);
      console.log("Navigating with basketItems:", basketItems);
      navigate(`/checkout`, {
        state: { basket: basketItems, itemCount: itemCount || {} },
      });
      setReadyToNavigate(false);
    }
  }, [readyToNavigate, itemCount, basketItems, navigate]);
  return (
    <div className="baketPageContainer">
      <BasketItems
        basketItems={basketItems}
        setBasketItems={setBasketItems}
        onItemCountChange={handleItemCountChange}
        itemCount={itemCount}
      />
      <div>Subtotal: {subtotal}</div>
      {/**<button onClick={handleCheckout}>
        <Link to={`/checkout`}>Go to checkout </Link>
      </button> */}
      <button onClick={handleCheckout}>Go to checkout</button>

      <Carousel itemList={carouselItems} addToBasket={addToBasket}></Carousel>
    </div>
  );
};

export default Basket;
