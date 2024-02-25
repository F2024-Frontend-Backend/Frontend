import React from 'react'
import {Link} from 'react-router-dom';
import Confirmation from '../components/Confirmation/Confirmation'
import BillingInfo from '../components/BillingInfo'

const Checkout = () => {
    
    return (
    <>
    <h1>I am Checkout</h1>
    <div>    
        <Confirmation firstName = "John" lastName = "Doe" address = "Random Avenue 2B" city = "Copenhagen" email = "john.doe@gsnail.com" country = "Denmark" cardType = "MasterCard" cardNo={1234123412341234} cardExpDate={"Today"} orderTot={100}/> 
    </div>
    <button>
        <Link to={'/receipt'}>Go to Receipt </Link>
    </button>
    </>
    )
}

export default Checkout