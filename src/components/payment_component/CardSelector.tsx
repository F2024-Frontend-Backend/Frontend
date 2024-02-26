import './CardSelector.css'
interface CardSelectorProps {
    selectedCardType: string;
    onCardTypeChange: (newCardType: string) => void;
}

const CardSelector = ({ selectedCardType, onCardTypeChange }: CardSelectorProps) => {
    const cardTypes = ['Visa/Dankort', 'Visa', 'MasterCard',];

    return (
        <div className="card-selector-container">
        <div className="card-selector">
            {cardTypes.map(cardType => (
                <label key={cardType}>
                    <input
                        type="radio"
                        name="cardType"
                        value={cardType}
                        checked={selectedCardType === cardType}
                        onChange={() => onCardTypeChange(cardType)}
                    /> {cardType}
                </label>
            ))}
        </div>
        </div>
    );
};

export default CardSelector;
