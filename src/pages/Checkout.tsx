import React from 'react'
import {Link} from 'react-router-dom';

import PurchaseTotal from '../components/purchaseTotal/purchaseTotal'

const Checkout = () => {
    
    return (
    <>
    <section className='left'>
        <h1>I am Checkout</h1>

        <button>
            <Link to={'/receipt'}>Go to Receipt </Link>
        </button>
    </section>
    <section className='right'>
        <PurchaseTotal></PurchaseTotal>
    </section>
    </>
    )
}

export default Checkout