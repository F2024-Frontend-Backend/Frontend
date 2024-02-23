import React from 'react';
import './order_received.css';

interface Props {
  orderDetails?: {
    orderNumber: string;
    orderDate: string;
    userName: string;
    address: string;
    subtotal: number;
    orderTotal: number;
    cardnummber: number; 

    
  };
}
  const OrderReceived: React.FC<Props> = ({ orderDetails }) => {
    const printIconUrl = 'https://www.thoughtco.com/thmb/ZMxDFGSTlhHnMixURvVe-NQQBhg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-512803768-590a58a05f9b586470463c04.jpg';
  
    return (
      <div className="order-received-container" >
         <div style={{ display: 'flex', flexDirection: 'row', alignItems: "flex-start" }}>
         <h1>Your Receipt</h1>

          <button
            onClick={() => window.print()}
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <img
              src={printIconUrl}
              alt="Print"
              style={{ width: '80px', height: '80px' }}
            />
          </button>
          <hr style={{ margin: '20px 0' }} /> {/* Horizontal line */}
  
          </div>

        <div className="thank-you-message" style={{ display: 'flex', flexDirection: 'row', alignItems:"center" }}>
          <p>Thank you for shopping in our app!</p>
          <p>Her under kan du se din info</p>
        </div>
  
        <div className="order-summary">
          <h2>ORDER SUMMARY</h2>
          <hr style={{ margin: '10px 0' }} /> {/* Horizontal line */}
          <p>Order #: #{orderDetails?.orderNumber}</p>
          <p>Date: {orderDetails?.orderDate}</p>
          <p>Card Number: xxxx-xxxx-xxxx-{orderDetails?.cardnummber?.toString().slice(-4)}</p>
          <p>Order Total: {orderDetails?.orderTotal} DKK</p>
        </div>
  
        <div className="billing-address">
          <h2>BILLING ADDRESS</h2>
          <hr style={{ margin: '10px 0' }} /> {/* Horizontal line */}
  
          <p>Name: {orderDetails?.userName}</p>
          <p>Address: {orderDetails?.address}</p>
        </div>
  
        <div className="your-order">
          <h2>YOUR ORDER</h2>
          <div className="order-item">
            <p>Subtotal</p>
            <p>{orderDetails?.subtotal} DKK</p>
          </div>
  
          <div className="order-total">
            <p>ORDER TOTAL</p>
            <p>{orderDetails?.orderTotal} DKK</p>
          </div>
        </div>
      </div>  
    );
  };
  
  export default OrderReceived;
  
  
  



////////////////////////////////////////////////////////////////////////////
//                                                                        //                        
//                                                                        //
//   YOUR RECEIPT                                      button             //     
//   -------------------------------------------------------------------  //
//   Thank you for you shopping in our app                                // 
//      Her under kan du se din info                                      //
//                                                                        //  
//    ORDER SUMMARY                              BITTING ADDRESS          //      
//   --------------------                        ----------------------   //   
//    Order: #                                   FirstLast Name           // 
//    Date:                                      123 Address #10          //
//    Card Number: xxxx-xxxx-xxxx-1234           Vedbeak   2950           //               
//    Order Total:                               Denmark                  //                                     
//                                                                        //                        
//                                                                        //
//                                                                        //
//     YOUE ORDER                                                         //
//     ------------------------------------          ORDER TOTAL          // 
//                                                                        // 
//     ------------------------------------               200 DKK         // 
//     | Subtotal                 200 DKK  |                              //
//     ------------------------------------                               // 
//                                                                        // 
//                                                                        //                        
//                                                                        //
////////////////////////////////////////////////////////////////////////////     
