import { useState } from "react";

import CarouselItem from "./CarouselItem";
import "./Carousel.css";

import {ItemProps, CarouselItemProps} from "../../interfaces/interfaces";

interface CarouselProps {
    itemList: ItemProps[];
    addToBasket: (id : string) => void;
  }

  const Carousel: React.FC<CarouselProps> = ({
    itemList,
    addToBasket,
  }) => {

    let carouselID = 0;
    const carouselMax = itemList.length;
    const [currentCarrousel, setCurrentCarousel] = useState([0,1,2])
    

    const goForward = () => {
      if(currentCarrousel[2] < carouselMax) {
        const newCarousel: number[] = currentCarrousel.map((e: number) => {
          return e+1
        })
        setCurrentCarousel(newCarousel)
      }
    }

    const goBack = () => {
      if(currentCarrousel[0] > 0) {
        const newCarousel: number[] = currentCarrousel.map((e: number) => {
          return e-1
        })
        setCurrentCarousel(newCarousel)
      }
   }

    return(
        <div className="carouselSection">
          <button onClick={goBack}>〈</button>

          {itemList.map((item:ItemProps)=>(
             <div className={currentCarrousel.includes(carouselID) ? "carouselItem" : "inactive carouselItem"} key={carouselID++}>
             <CarouselItem
               carouselID={item.id}
               id={item.id}
               name={item.name}
               price={item.price}
               currency={item.currency}
               imageUrl={item.imageUrl}
               currentCarrousel={currentCarrousel}
               addToBasket={addToBasket}
             />
           </div>
          ))}
          <button onClick={goForward}>〉</button>
        </div>
    )
    
  }

  export default Carousel