import { useState, FormEvent, ChangeEvent} from 'react';
import CardSelector from "./CardSelector.tsx";
import {validateCardNumber} from './creditCardUtils.ts'
import './PaymentForm.css'


function PaymentForm() {
    const [selectedCardType, setSelectedCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('')
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const [cardNumberFocused, setCardNumberFocused] = useState(false);
    const [cardNumberValid, setCardNumberValid] = useState(true);

    const [expDateFocused, setExpDateFocused] = useState(false);
    const [expDateValid, setExpDateValid] = useState(true);

    const [cvvNumberFocused, setCvvNumberFocused] = useState(false);
    const [cvvNumberValid, setCvvNumberValid] = useState(true);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const cardValidation = validateCardNumber(cardNumber)

        if (!cardValidation.isValid) {
            console.log("Error: ", cardValidation.message);
        } else {
            console.log("Payment Info Submitted", { selectedCardType, cardNumber, expMonth, expYear, cvv, cardHolderName });
        }
    };

    const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, '');

        const parts = [];
        for (let i = 0; i < value.length; i += 4) {
            parts.push(value.substring(i, i + 4));
        }
        value = parts.join(' ');

        setCardNumber(value);
        setCardNumberValid(value.length === 16);
    };

    const handleCVVNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[0-9]*$/.test(value)) {
            setCvv(value);
        }
    };

    const handleExpDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/[^\d/]/g, '');

        if (!value.includes('/') && value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }

        value = value.slice(0, 5);

        const [month, year] = value.split('/');

        if (month) {
            setExpMonth(month.padStart(2, '0'));
        }

        if (year) {
            setExpYear(year);
        }
        setExpDate(value);
    };

    const handleCardNumberFocus = () => {
        setCardNumberFocused(true);
    };

    const handleCardNumberBlur = () => {
        setCardNumberFocused(false);

        const value = cardNumber.replace(/\s/g, '');
        setCardNumberValid(value.length === 16);
    };

    const handleExpDateFocus = () => {
        setExpDateFocused(true);
    };

    const handleExpDateBlur = () => {
        setExpDateFocused(false);
        const value = expDate.replace(/\//g, '');
        setExpDateValid(value.length === 4);
    };

    const handleCvvNumberFocus = () => {
        setCvvNumberFocused(true);
    };

    const handleCvvNumberBlur = () => {
        setCvvNumberFocused(false);
        setCvvNumberValid(cvv.length === 3);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <CardSelector
                    selectedCardType={selectedCardType}
                    onCardTypeChange={setSelectedCardType}
                />
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        onFocus={handleCardNumberFocus}
                        onBlur={handleCardNumberBlur}
                        className={`${!cardNumberValid && !cardNumberFocused ? 'input-error' : ''}`}
                        />
                </div>
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="MM/YY"
                        value={expDate}
                        onChange={handleExpDateChange}
                        onFocus={handleExpDateFocus}
                        onBlur={handleExpDateBlur}
                        className={`${!expDateValid && !expDateFocused ? 'input-error' : ''}`}
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="000"
                        value={cvv}
                        onChange={handleCVVNumberChange}
                        onFocus={handleCvvNumberFocus}
                        onBlur={handleCvvNumberBlur}
                        className={`${!cvvNumberValid && !cvvNumberFocused ? 'input-error' : ''}`}
                    />
                </div>
                <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                        type="text"
                        inputMode="text"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}/>
                </div>
                <button type="submit">Submit Payment Info</button>
            </form>
        </div>
    );
}

export default PaymentForm;
