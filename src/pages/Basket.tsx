import ItemsList from "../components/Basket/ShoppingBasket";
import { useState, useEffect } from "react";
import jsonData from "../data.json";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    fetchItems();
    }, [])

    const fetchItems = async () => {
      try {
        const response = await getItems('src/data.json', 'json');
        setAllItems(response);
        console.log("in basket " + response)
      } catch (error) {
        console.error(error);
      }
   };
   //setBasketItems(allItems.slice(3))
   //console.log("maybe" + basketItems)

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
