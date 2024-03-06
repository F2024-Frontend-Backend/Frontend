import { useState } from "react";

import CarouselItem from "./CarouselItem";
import "./Carousel.css";

interface CarouselProps {
    itemList: never[];
  }

interface CarouselItemProps {
    carouselID: number;  
    id: string;
    name: string;
    price: number;
    currency: string;
    imageUrl?: string;
    currentCarrousel: number[];
  }

  const Carousel: React.FC<CarouselProps> = ({
    itemList,
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

          {itemList.map((item:CarouselItemProps)=>(
             <div key={carouselID++}>
             <CarouselItem
               carouselID={carouselID}
               id={item.id}
               name={item.name}
               price={item.price}
               currency={item.currency}
               imageUrl={item.imageUrl}
               currentCarrousel={currentCarrousel}
             />
           </div>
          ))}
          <button onClick={goForward}>〉</button>
        </div>
    )
    
  }

  export default Carousel