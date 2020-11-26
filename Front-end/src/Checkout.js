import React from 'react'
import './Checkout.css'
import CheckoutProduct from './product/CheckoutProduct'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';


function Checkout() {
    var { basket, total } = useSelector((state) => ({ ...state.basketReducer }));
  
    
    return (
        <div className='checkout'>
            {basket.length===0?
             (<h2> Your shopping basket is empty</h2>):
             (<Row >
            <Col xs={12}  md={9}  className="checkout_order">
            <h2> You have these items in your Basket :</h2>
              { basket.map((productSelected, i)=>
       <CheckoutProduct key={i} productSelected={productSelected.product} quantityOrdred={productSelected.quantityOrdred}/>)}
           </Col>
           <Col   xs={7}  md={2} className="checkout_ordercart">
                <h3>Your basket: </h3> 
             <h4>{"Total Price : "+ total+"$"}</h4>
             <Link to='/order'>
             <button className="checkout_orderBtn"> Order </button></Link>
             </Col>
           
           </Row>    
    )}
        </div>
    )
}

export default Checkout
