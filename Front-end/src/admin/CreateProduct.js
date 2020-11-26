import HeaderAdmin from "./HeaderAdmin";
import React from "react";
import { useState, useEffect } from "react";
import ProductAdmin from "./ProductAdmin";
import Category from "../Category";
import "./CreateProduct.css";
import SimpleModal from "./CreateForm";
import GetProducts from'./GetProducts';
import {Button} from 'react-bootstrap'

function CreateProduct() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] =useState(false);
  //open the modal for create and edit product
  const handleOpen = () => {
    setOpen(!open);
  };
  //update product rendreing after add , edit and delete
  const updateProducts = () => {
   GetProducts(setProducts)
 };
  //get all products from database when rendring this component
  useEffect(() => {
    GetProducts(setProducts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    GetProducts(setProducts)
  }, [products]);


  return (
    <div>
      <HeaderAdmin />
      <Category />
      <div className="add">
        <Button variant="success" onClick={handleOpen}>Add a product</Button>
        <SimpleModal open={open} handleOpen={handleOpen}  text={"Add"} display={updateProducts}/>
      </div>
      <div className="createProduct_list">
        <h2>All products in Store :</h2>
        <div className="home_row">
          {products.map((product, i) => (
            <ProductAdmin key={i} product={product} updateProducts={updateProducts} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
