import React, { useState } from "react";
import "./ProductAdmin.css";
import SimpleModal from "./CreateForm";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import Pop_up from "../PopUp";
import ConfirmModal from "./ConfirmModal";

const tokenAdmin = window.localStorage.getItem("tokenAdmin");

function ProductAdmin({ product, updateProducts }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  //open and close the edit form
  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  const handleOpendelete = () => {
    setOpenDelete(!openDelete);
  };
  const editProduct = () => {
    handleOpenEdit();
  };
  const update = () => updateProducts();
  const deleteConfirm = (x) => {
    if (x) {
      axios
        .delete(`/api/product/delete/${product._id}`, {
          headers: { Authorization: `Bearer ${tokenAdmin}` },
        })
        .then(function (response) {
          if (response.data) {
            Pop_up("Product deleted");
            updateProducts();
          }
        })
        .catch(function (error) {
          Pop_up("Error, please retry");
        });
    }}

    //delete a product
    const deleteProduct = () => {
      handleOpendelete();
    };
  return (
    <div className="product">
      <div className="productOperations">
        {/* Edit a product */}
        <EditIcon onClick={editProduct} />
        <SimpleModal
          open={openEdit}
          handleOpen={handleOpenEdit}
          productId={product._id}
          text={"Edit"}
          update={update}
        />
        {/* delete a product from the database */}
        <DeleteIcon onClick={deleteProduct} />
        <ConfirmModal
          open={openDelete}
          handleOpen={handleOpendelete}
          Confirm={deleteConfirm}
          text={"Please confirm to delete this product"}
        />
      </div>
      <div className="product_info">
        <p>{product.title}</p>
        <p>{product.price + "$"}</p>
      </div>
      <img src={`https://full-basket-demo.herokuapp.com/${product.image}`} alt="" />

      <div className="product_description">
        <p>{product.description}</p>
        <p id='productAdmin_stock'>{"Stock : " +product.stock}</p>
      </div>
    </div>
  );
}

export default ProductAdmin;
