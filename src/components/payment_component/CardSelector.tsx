interface CardSelectorProps {
    selectedCardType: string;
    onCardTypeChange: (newCardType: string) => void;
}

const CardSelector = ({ selectedCardType, onCardTypeChange }: CardSelectorProps) => {
    const cardTypes = ['Visa/Dankort', 'Visa', 'MasterCard',];

    return (
        <div>
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
    );
};

export default CardSelector;
