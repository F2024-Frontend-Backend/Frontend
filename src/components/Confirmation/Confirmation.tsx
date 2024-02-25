import React, { useState } from 'react';
import './Confirmation.css';


interface BillingProps{
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    postal: String,
    email: String,
    country: String, 
}
interface PaymentProps {
    cardType: String,
    cardNo: Number,
    cardExpDate: String,
    orderTot: Number
}

const Confirmation: React.FC<BillingProps & PaymentProps> = ({
    firstName,
    lastName,
    address,
    city,
    postal,
    country,
    email,
    cardType,
    cardNo,
    cardExpDate,
    orderTot
}) => {
    return (
        <>
        <div className = "confirmation-container">
            <div className = "BillingAddr">
                <label htmlFor='BillingInfo'><strong>BILLING ADDRESS</strong></label>
                <hr style={{ margin: '10px 0' }} /> {/* Horizontal line */}
                    <p>Name: {lastName} , {firstName}</p>
                    <p>Address: {address}</p>
                    <p>Email: {email}</p>
                    <p>City: {city},{postal}</p>
                    <p>Country: {country}</p>
            </div>

            <div className = "PaymentDet" style={{display: 'block', alignItems: 'center', justifyContent:'space-around'}}>
                    <label htmlFor = 'PaymentInfo'><strong>PAYMENT DETAILS</strong></label>
                    <hr style={{ margin: '10px 0' }} /> {/* Horizontal line */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>Card Type</p>
                        <p>{cardType}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>Card Number</p>
                        <p>{cardNo + ""}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>Expiration Date</p>
                        <p>{cardExpDate + ""}</p>
                </div>
            </div>
            <div className = "YourOrd">
                <label htmlFor='OrderInfo'><strong>YOUR ORDER</strong></label>
                <hr style={{ margin: '10px 0' }} /> {/* Horizontal line */}
                <label htmlFor='Total'>Subtotal:</label> <p>{orderTot + ""}</p>
            </div>
            <div className = "ContinueButn">
            </div>
        </div>
        </>
    );
};

export default Confirmation;
