import React, { useState,useEffect} from "react";
import "./CheckoutProduct.css";
import { useDispatch , useSelector} from "react-redux";
import PopUp from '../PopUp'
import DeleteIcon from "@material-ui/icons/Delete";




function CheckoutProduct({ productSelected, quantityOrdred }) {
  var { basket } = useSelector((state) => ({ ...state.basketReducer }));
  const [quantity, setQuantity] = useState(quantityOrdred);
  var dispatch = useDispatch();
  //asign quantity ordred to the basket and update total
  useEffect(() => {
for(let i in basket){
  if (basket[i].product.title===productSelected.title){
    basket[i].quantityOrdred=quantity
  }
}
    window.localStorage.setItem('basketStored',JSON.stringify(basket))
    dispatch({type:"updateTotal"});
  }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [quantity])

  return (
    <div className="checkoutproduct">
      <div className="checkoutproduct_deleteBtn">
       <DeleteIcon
          onClick={() => {
            dispatch({
              type: "RemoveFromBasket",
              payload: productSelected.title,
            });
            dispatch({type:"updateTotal"});
          }} 

        >
        </DeleteIcon></div>
      <img className="chekoutproduct_img" src={productSelected.image} alt="" />
      <div className="checkoutproduct_info">
        <h3>{productSelected.title}</h3>
        <h4>{productSelected.price + "$"}</h4>
        <p>{productSelected.description}</p>
        <div className="checkoutproduct_quantity">
          <span>Quantity</span>
          <input
            type="number"
            id="Quantity" 
            value={quantity}
            min="1"
            onChange={(e) => {if ((e.target.value)>(productSelected.stock)){console.log('hii')
               PopUp (" Out of stock");}
              else if (((e.target.value)>=1)&& ((e.target.value)<=productSelected.stock))
               setQuantity(e.target.value);
              }}
          />  

       
        </div>

      </div>
    </div>
  );
}

export default CheckoutProduct;
