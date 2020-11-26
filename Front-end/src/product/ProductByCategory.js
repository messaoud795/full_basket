import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductByCategory.css";

function SearchProduct() {
  const [productsByCategory, setproductsByCategory] = useState([]);
  const cat = useParams().cat;
  //import products by category
  useEffect(() => {
    axios
      .post("api/product/category/", {
        category: cat,
      })
      .then(function (response) {
        setproductsByCategory(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cat]);
 



  const  sort = () => {
    var method = document.getElementById("sort").value;
    if (method === "Alphabetically") {
      setproductsByCategory([...productsByCategory.sort((a, b) => a.title.localeCompare(b.title))] );
      console.log(productsByCategory);} 
    else if (method === "by price"){
       setproductsByCategory([...productsByCategory.sort((a, b) => a.price.localeCompare(b.price))]
      );
      console.log(productsByCategory);
    }
  };
 

  return (
    <div className="productByCategory">
      <h2 className="p">{"Product in category " + cat}</h2>
      <div className="sort">
        <span>Sort</span>
        <select id="sort" onChange={sort}>
          <option value="">--Please choose an option--</option>
          <option value="Alphabetically">Alphabetically</option>
          <option value="by price">by price</option>
        </select>
      </div>
      <div className="productByCategory_items">
        { (productsByCategory.map((product1, i) => (
    <Product key={i} product={product1} />
  )))}
      </div>
    </div>
  );
}

export default SearchProduct;
