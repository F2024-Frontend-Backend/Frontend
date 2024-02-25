import React, { useState } from 'react';
import './Confirmation.css';


interface BillingProps{
    firstName?: String,
    lastName?: String,
    address?: String,
    city?: String,
    postal?: String,
    email?: String,
    country?: String, 
}
interface PaymentProps {
    cardType?: String,
    cardNo?: String,
    cardExpDate?: String,
    orderTot?: String
}

interface ConfirmationProps {
    billingInfo: BillingProps
    paymentInfo: PaymentProps
}

const Confirmation: React.FC<ConfirmationProps> = ({
    billingInfo,
    paymentInfo
}) => {
    return (
        <>
        <div className = "confirmation-container">
            <div className = "BillingAddr">
                <label htmlFor='BillingInfo'><strong style={{color: '#777373'}}>BILLING ADDRESS</strong></label>
                <hr style={{ margin: '10px 0' }} /> {/* Horizontal line */}
                    <p style={{color: '#777373'}}>Name: {billingInfo.lastName} , {billingInfo.firstName}</p>
                    <p style={{color: '#777373'}}>Address: {billingInfo.address}</p>
                    <p style={{color: '#777373'}}>Email: {billingInfo.email}</p>
                    <p style={{color: '#777373'}}>City: {billingInfo.city},{billingInfo.postal}</p  >
                    <p style={{color: '#777373'}}>Country: {billingInfo.country}</p>
            </div>

            <div className = "PaymentDet" style={{display: 'block', alignItems: 'center', justifyContent:'space-around'}}>
                    <label htmlFor = 'PaymentInfo'><strong style={{color: '#777373'}}>PAYMENT DETAILS</strong></label>
                    <hr style={{ margin: '10px 0' }} /> {/* Horizontal line */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{color: '#777373'}}>Card Type</p>
                        <p style={{color: '#777373'}}>{paymentInfo.cardType}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{color: '#777373'}}>Card Number</p>
                        <p style={{color: '#777373'}}>{paymentInfo.cardNo}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{color: '#777373'}}>Expiration Date</p>
                        <p style={{color: '#777373'}}>{paymentInfo.cardExpDate}</p>
                </div>
            </div>
            <div className = "YourOrd">
                <label htmlFor='OrderInfo'><strong style={{color: '#777373'}}>YOUR ORDER</strong></label>
                <hr style={{ margin: '10px 0' }} /> {/* Horizontal line */}
                <label htmlFor='Total' style={{color: '#777373'}}>Subtotal:</label> <p style={{color: '#777373'}}>{paymentInfo.orderTot}</p>
            </div>
            <div className = "ContinueButn">
                <div className="ContinueBtnPlaceHolder"></div>
            </div>
        </div>
        </>
    );
};

export default Confirmation;
