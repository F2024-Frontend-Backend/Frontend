import ItemsList from "../components/Basket/ShoppingBasket";
import { useState, useEffect } from "react";
import jsonData from "../data.json";
import { Link } from "react-router-dom";

import Carousel from "../components/Carousel/Carousel";

interface Props {
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number;
  rebatePercent: number;
  imageUrl?: string;
  count: number;
  upsellProductId: string;
}

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


const Basket = () => {
  const [itemCount, setItemCount] = useState<{ [key: string]: number }>({});

  //Take the current stat 'prev' and return a new stat
  const handleItemCountChange = (itemId: string, newCount: number) => {
    setItemCount((prev) => ({ ...prev, [itemId]: newCount }));
  };

  const [allItems, setAllItems] = useState([])
  const [basketItems, setBasketItems] = useState([])
  const [carouselItems, setCarouselItems] = useState([])

  useEffect(() => {
    fetchItems();
    }, [])

    const fetchItems = async () => {
      try {
        const response = await getItems('src/data.json', 'json');
        setAllItems(response)
        setBasketItems(response.slice(0, 5));
        console.log(response)
        generateCarouselItems(response, response.slice(0, 5))
        
      } catch (error) {
        console.error(error);
      }
   };

   const generateCarouselItems = (allItems: any, basketItems: any) => {
    let newCarousel: any = [];

    console.log("basket" + basketItems)

    console.log("all" + allItems)
    console.log("in all: " + allItems[0])

    let upsellIds :string[] = [];

    basketItems.map((item: Props) => {
      if (item.upsellProductId != null) {
        const upsellId = item.upsellProductId;

        upsellIds.push(upsellId)
      }
    }) 

    allItems.map((item: Props) => {
      if (upsellIds.includes(item.id)) {
        newCarousel.push(item);
      }
    })
    console.log("new: " + newCarousel)
    setCarouselItems(newCarousel)

    console.log("upsell: " + upsellIds)
    console.log("new :" + newCarousel)

 }

  return (
    <>
      <ItemsList
        basketItems={basketItems}
        setBasketItems={setBasketItems}
        onItemCountChange={handleItemCountChange}
        itemCounts={itemCount}
      />

      <button>
        <Link to={`/checkout`}>Go to checkout </Link>
      </button>

      <Carousel itemList={carouselItems}></Carousel>
    </>
  );
};



export default Basket;
