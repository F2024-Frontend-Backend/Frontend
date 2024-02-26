import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import Confirmation from '../components/Confirmation/Confirmation'

const Checkout = () => {
    const [BillingInfo] = useState({
        firstName: 'John',
        lastName: 'Doe',
        address: 'Example Street',
        city: 'Example City',
        postal: '0000',
        email: 'john.doe@example.com',
        country: 'Example Country', 
    })
    const [PaymentInfo] = useState({
        cardType: 'CardType',
        cardNo: 'xxxx-xxxx-xxxx-1234',
        cardExpDate: '01/01',
        orderTot: '$0'
    }
    )
    return (
    <>
    <h1>I am Checkout</h1>
    <div>    
     <Confirmation billingInfo={BillingInfo} paymentInfo = {PaymentInfo}/> 
    </div>
    <button>
        <Link to={'/receipt'}>Go to Receipt </Link>
    </button>
    </>
    )
}

export default Checkout