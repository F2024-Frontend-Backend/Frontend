import { useState } from "preact/hooks";
import { ImBin } from "react-icons/im";

interface Props {
  itemId: string;
  onClick: (itemId: string) => void;
}

const DeleteIcon: React.FC<Props> = ({ itemId, onClick }) => {
  return (
    <button className="deleteBtn" onClick={() => onClick(itemId)}>
      <ImBin />
    </button>
  );
};
export default DeleteIcon;
