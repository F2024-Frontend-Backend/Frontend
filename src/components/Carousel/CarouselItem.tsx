import { useState } from "react";

import "./CarouselItem.css"

import { CarouselItemProps } from "../../interfaces/interfaces";

  const CarouselItem: React.FC<CarouselItemProps> = ({
    carouselID,
    id,
    name,
    price,
    currency,
    imageUrl,
    currentCarrousel,
    addToBasket,
  }) => {

    const handleClick = () => {
      addToBasket(id)
    }

    return(
        <>
            <div className="imageContainer">
              {imageUrl && <img className="image1" src={imageUrl} alt="" />}
            </div>
            <span className="title">{name}</span>
            <span className="price">{price} {currency}</span>
            <button onClick={handleClick}>Add to basket</button>
        </>
    )
  }

  export default CarouselItem