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
        <>
            <div className="imageContainer">
              {imageUrl && <img className="image1" src={imageUrl} alt="" />}
            </div>
            <span className="title">{name}</span>
            <span className="price">{price} {currency}</span>
            <button>Add to basket</button>
        </>
    )
  }

  export default CarouselItem