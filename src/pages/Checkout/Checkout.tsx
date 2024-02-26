import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./Checkout.css"
import PurchaseTotal from '../../components/purchaseTotal/purchaseTotal'
import BillingInfo from '../../components/BillingInfo/BillingInfo';
import Payment from '../../components/payment_component/PaymentForm'
import Confirmation from '../../components/Confirmation/Confirmation'

interface Props {
    current: String;
  }

const InfoCol: React.FC<Props>=({   
    current = "billing"
}) => {
    const [BI] = useState({
        firstName: 'John',
        lastName: 'Doe',
        address: 'Example Street',
        city: 'Example City',
        postal: '0000',
        email: 'john.doe@example.com',
        country: 'Example Country', 
    })
    const [PI] = useState({
        cardType: 'CardType',
        cardNo: 'xxxx-xxxx-xxxx-1234',
        cardExpDate: '01/01',
        orderTot: '$0'
    }
    )
    if (current === "billing") {
        return (
            <BillingInfo></BillingInfo>
        )
    } else if (current === "payment") {
        return (
            <Payment></Payment>
        )
    } else if (current === "confirm") {
        return (
            <Confirmation billingInfo={BI} paymentInfo={PI}></Confirmation>
        )
    }
}

const Checkout = () => {

    const [currentState, setCurrentState] = useState("billing")

    const navigate = useNavigate()

    return (
    <>
    <div className='pageContainer'>
        <section className='left'>
            <InfoCol current={currentState}></InfoCol>
           
            <button onClick={ () => {
                if (currentState === "billing") {
                    setCurrentState("payment")
                } else if (currentState === "payment") {
                    setCurrentState("confirm")
                } else {
                    navigate('/receipt')
                }
            }}>
                Continue
            </button>
           
        </section>
        <section className='right'>
            <PurchaseTotal></PurchaseTotal>
        </section>
    </div>
    </>
    )
}



export default Checkout