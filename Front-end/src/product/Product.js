import React, { useState, useEffect } from "react";
import "./Product.css";
import { useDispatch , useSelector} from "react-redux";


function Product({ product }) {
  const [stockText, setStockText] = useState("")
  var { basket } = useSelector((state) => ({ ...state.basketReducer }));
  var dispatch = useDispatch();
useEffect(()=>{
product.stock>0? setStockText("In stock"):setStockText("Not available")
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  useEffect(() => {

  }, [basket]);

  const addProduct = () => {
        dispatch({
          type: "addToBasket",
          payload: {product: product, quantityOrdred:1},
        });
        dispatch({type:"updateTotal"})
  };


  return (
    <div className="product">
      <div className="product_info">
        <p>{product.title}</p>
        <p>{product.price + "$"}</p>
      </div>
      <img title={product._id} src={`https://full-basket-demo.herokuapp.com/${product.image}`} alt="" />

      <div className="product_description">
        <p>{product.description}</p>
      </div>
      <div className="product_stock"><span>{stockText}</span></div>
      <button onClick={addProduct}>Add to basket </button>
    </div>
  );
}

export default Product;
