import { useState } from "react";

import "./CarouselItem.css"

interface CarouselItemProps {
    carouselID: number;  
    id: string;
    name: string;
    price: number;
    currency: string;
    imageUrl?: string;
    currentCarrousel: number[];
  }

  const CarouselItem: React.FC<CarouselItemProps> = ({
    carouselID,
    id,
    name,
    price,
    currency,
    imageUrl,
    currentCarrousel,
  }) => {
    return(
        <div className={currentCarrousel.includes(carouselID) ? "active carouselItem" : "carouselItem"}>
            <span>{carouselID} {name}</span>
        </div>
    )
  }

  export default CarouselItem