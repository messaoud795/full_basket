import React from "react";
import { useSelector, useDispatch } from "react-redux";
import './Order.css'
import Header from "./Header";
import PopUp from './PopUp'
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Row , Col ,Button} from "react-bootstrap"

function Order() {
var { basket, total } = useSelector((state) => ({ ...state.basketReducer }));
let token=  window.localStorage.getItem('token');
const history=useHistory();
const dispatch=useDispatch();

//delete basket after order validation
const removeBasket=()=>{
  axios.delete("/api/basket",{ headers: { Authorization: `Bearer ${token}` }})
    dispatch({type:"RemoveBasket"});
}
  
  //save order to the database 
 async function saveOrder() {
       axios.post("/api/order/create",{
         basket:basket,
         time: new Date().toLocaleString("en-GB", {timeZone: "CET"}),
         price:total},
         { headers: { Authorization: `Bearer ${token}` }})
         .then(  function(response){   
           PopUp ("Order launched");
          history.push('/order/tracking')
        removeBasket()})
           .catch(function (error) {
            PopUp ("Error , please try again")})
      }
  return (
    <div > 
    <Header/>    
    <div className="order">
      <h2>Your order is ready : </h2>
      <Row className="order_content">
        <Col xs={12} sm={9}>
      <table className="order_table">
            <thead><tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th></tr></thead>
        <tbody>
        {basket.map((productSelected, i) => { return(
            <tr key={i+1}>
              <td> <strong>{productSelected.product.title}</strong></td>
              <td>{productSelected.product.price}</td>
              <td>{productSelected.quantityOrdred}</td>
            </tr>
            )
        })}</tbody>
    
      </table> </Col>
      <Col xs={6} sm={2} className="order_total">
    <span>{ "Total price  " + total+ "$"}</span> 
    <Button variant="primary" onClick={saveOrder}>Confirm</Button></Col>
    </Row>
    </div>
    </div>
  );
}

export default Order;
