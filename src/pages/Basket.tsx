import ItemsList from "../components/Basket/ShoppingBasket";
import { useState, useEffect } from "react";
import jsonData from "../data.json";
import { Link } from "react-router-dom";

import Carousel from "../components/Carousel/Carousel";
import {ItemProps} from "../interfaces/interfaces"



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

  const [allItems, setAllItems] = useState<ItemProps[]>([])
  const [basketItems, setBasketItems] = useState<ItemProps[]>([])
  const [carouselItems, setCarouselItems] = useState<ItemProps[]>([])

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
    let upsellIds :string[] = [];
    let basketIds :string[] = [];

    basketItems.map((item: ItemProps) => {
      basketIds.push(item.id)

      if (item.upsellProductId != null) {
        upsellIds.push(item.upsellProductId)
      }
    }) 

    allItems.map((item: ItemProps) => {
      if (upsellIds.includes(item.id) && !basketIds.includes(item.id)) {
        
        newCarousel.push(item);
      }
    })
    setCarouselItems(newCarousel)

 }

 const addToBasket = (id: string) => {
    allItems.forEach((item:ItemProps) => {
      if (item.id === id) {
        const newBasket: ItemProps[] = basketItems
        newBasket.push(item)

        setBasketItems(newBasket)
        generateCarouselItems(allItems, basketItems)
      }
    })
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

      <Carousel itemList={carouselItems} addToBasket={addToBasket}></Carousel>
    </>
  );
};



export default Basket;
