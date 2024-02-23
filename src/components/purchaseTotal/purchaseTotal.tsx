import React from 'react'
import './PurchaseTotal.css'

function PurchaseTotal () {
    const purchasePrise = 400;
    const deliveryPrice = 39;
    const currency = "kr."


    return(
    <>
        <span>Ordre #1234</span>
        <div className='itemList'>
            
        </div>

        <div className='totalPrice'>
            <div className='colStart'>
                <span className='bold'>Subtotal</span>
                <div>
                <span className='bold'>Taxes </span>
                <span>(included)</span>
                </div>
                <span className='bold'>Delivery</span>
            </div>
            <div className='colEnd'>
                <span>{purchasePrise} {currency}</span>
                <span>{purchasePrise*0.2} {currency}</span>
                <span>{deliveryPrice} {currency}</span>
            </div>
        </div>

        <div className='deviderLine'></div>

        <div className='totalPrice'>
            <div className='colStart'>
                <span className='bold'>Total</span>
            </div>
            <div className='colEnd'>
                <span>{purchasePrise+deliveryPrice} {currency}</span>
            </div>
        </div>
    </>
    )
}

export default PurchaseTotal