import { useState } from "react";

interface Props {
  min?: number;
  max?: number;
  //onCountChange: (newCount: number) => void;
  onCountChange: (newCount: number) => void;
}

export const CounterButton: React.FC<Props> = ({
  min = 0,
  max = 5,
  onCountChange,
}) => {
  const [count, setCount] = useState(0);

  const handleClickSubtract = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };
  const handleClickAddition = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };
  return (
    <>
      <div className="buttons">
        <button className="btn" onClick={handleClickSubtract}>
          <strong>-</strong>
        </button>
        <span className="btw">{count}</span>
        <button className="btn" onClick={handleClickAddition}>
          <strong>+</strong>
        </button>
      </div>
    </>
  );
};

export default CounterButton;
