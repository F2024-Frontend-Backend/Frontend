import React from 'react'
import {Link} from 'react-router-dom';

const Basket = () => {
    return (
        <>
        <h1>I am basket</h1>

        <button>
            <Link to={`/checkout`}>Go to checkout </Link>
        </button>
        </>
    )
}

export default Basket