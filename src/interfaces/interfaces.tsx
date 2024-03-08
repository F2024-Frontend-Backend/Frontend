interface ItemProps {
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

  interface ItemListProps {
    basketItems: ItemProps[];
    setBasketItems: (value: ItemProps[]) => void;
    itemCounts: { [key: string]: number };
    onItemCountChange: (itemId: string, newCount: number) => void;
  }


  interface CarouselItemProps {
    carouselID: string;  
    id: string;
    name: string;
    price: number;
    currency: string;
    imageUrl?: string;
    currentCarrousel: number[];
    addToBasket: (id : string) => void;
  }

  export type {ItemProps, ItemListProps, CarouselItemProps}