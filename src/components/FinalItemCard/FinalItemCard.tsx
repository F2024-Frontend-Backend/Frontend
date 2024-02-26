import { ImBin } from "react-icons/im";

interface Props {
    id: string;
    name: string;
    price: number;
    currency: string;
    imageUrl?: string;
    count: number;
  }

const FinalItemCard: React.FC<Props> = ({name, price, currency, imageUrl, count}) => {
  return (
    <div className="itemCard">
        {imageUrl && <img className="image" src={imageUrl} alt="" />}
        <span>{name}</span>
        <span>{count}</span>
        <span>{price * count} {currency}</span>
    </div>
  );
};
export default FinalItemCard;