import BasketItems from "../components/Basket/ShoppingBasket";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";
import Carousel from "../components/Carousel/Carousel";
import { ItemProps } from "../interfaces/interfaces";
import basketUtilities from "../components/Basket/BasketUtilities";
import axios from "axios";
import { error } from "console";
import { fetchProducts } from "../api/FetchDataFromDjangoApi";

const Basket = () => {
  const [itemCount, setItemCount] = useState<{ [key: string]: number }>({});

  //Take the current stat 'prev' and return a new stat
  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCount((prev) => ({ ...prev, [itemId]: newCount }));
  };

  //const [emptyBasket, setBasketEmpty] = useState(false);
  //const [allItems, setAllItems] = useState<ItemProps[]>([]);
  const [basketItems, setBasketItems] = useState<ItemProps[]>([]);
  const [carouselItems, setCarouselItems] = useState<ItemProps[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const { calculateSubtotal } = basketUtilities();

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const products = await fetchProducts();
        setBasketItems(products.slice(0, 5));
        generateCarouselItems(products, products.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchAndSetProducts();
  }, []);

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

  return (
    <div className="baketPageContainer">
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
