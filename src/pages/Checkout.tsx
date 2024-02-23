import React from 'react'
import {Link} from 'react-router-dom';

const Checkout = () => {
    
    return (
    <>
    <h1>I am Checkout</h1>

    <button>
        <Link to={'/receipt'}>Go to Receipt </Link>
    </button>
    </>
    )
}

export default Checkout