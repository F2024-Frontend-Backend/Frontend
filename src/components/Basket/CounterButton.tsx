import { useEffect, useState } from "react";
import "./ShoppingBasket.css";
import basketUtilities from "./BasketUtilities";

interface CounterButton {
  count: number;
  min?: number;
  max?: number;
  //onCountChange: (newCount: number) => void;
  onCountChange: (newCount: number) => void;
}

export const CounterButton: React.FC<CounterButton> = ({
  count,
  min = 1,
  max = 5,
  onCountChange,
}) => {
  const [localCount, setLocalCount] = useState(count);

  // Synchroze local state with prop
  useEffect(() => {
    setLocalCount(count);
  }, [count]);

  // Function to handle decrement
  const handleDecrement = () => {
    const newCount = count - 1;
    if (newCount >= min) {
      setLocalCount(newCount);
      onCountChange(newCount);
    }
  };

  // Function to handle increment
  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount <= max) {
      setLocalCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <>
      <div className="buttons">
        <button className="btn" onClick={handleDecrement}>
          <strong>-</strong>
        </button>
        <span className="btw">{localCount}</span>
        <button className="btn" onClick={handleIncrement}>
          <strong>+</strong>
        </button>
      </div>
    </>
  );
};

export default CounterButton;
