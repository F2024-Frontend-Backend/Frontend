import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import Confirmation from '../components/Confirmation/Confirmation'

const Checkout = () => {
    const [BillingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        postal:'',
        city: '',
        email: '',
        country: ''
    })
    const [PaymentInfo] = useState({
        cardType: '',
        cardNo: '',
        cardExpDate: '',
        orderTot: ''
    })
    return (
    <>
    <h1>I am Checkout</h1>
    <div>    
        <Confirmation billingInfo={BillingInfo} paymentInfo={PaymentInfo}/> 
    </div>
    <button>
        <Link to={'/receipt'}>Go to Receipt </Link>
    </button>
    </>
    )
}

export default Checkout