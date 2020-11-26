import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./CreateForm.css";
import ImageUpload from "./ImageUpload";
import { CategoryList } from "../CategoryList";
import CreateRequest from "./CreateRequest";
import EditRequest from "./EditRequest";

//modal style
function getModalStyle() {
  const top = 45;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
   position: "absolute",
   backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//modal logic
export default function SimpleModal({
  open,
  handleOpen,
  text,
  productId,
  update, display})
  {
  const [inputs, setInputs] = useState({
    price: "",
    stock: "",
    title: "",
    description: "",
    category: "",
  });
  const [image, setimage] = useState(null);
  let tokenAdmin = window.localStorage.getItem("tokenAdmin");

  //get the image file
  function getFile(file) {
    setimage(file);
  }

  //save data from the form to the database
  function handleSubmit(event) {
    event.preventDefault();
    handleOpen();

    const formData = new FormData();
    //include state different from null for the update request
    if (inputs.title.length > 0) formData.append("title", inputs.title);
    if (inputs.price) formData.append("price", inputs.price);
    if (inputs.stock) formData.append("stock", inputs.stock);
    if (inputs.description) formData.append("description", inputs.description);
    if (inputs.category) formData.append("category", inputs.category);
    if (image) formData.append("image", image);
    if (text === "Add") {
      let isValid = CreateRequest(formData, tokenAdmin);
      if (isValid){
        setInputs(
          { title: "", price: "", stock: "", description: "", category: "" } 
        );display(); 
}
    } else {
      let isValid = EditRequest(formData, tokenAdmin, productId);
      if (isValid) {
        setInputs({
          title: "",
          price: "",
          stock: "",
          description: "",
          category: "",
        });
        update();
      }
    }
  }

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{`${text} a product`}</h2>
      <form className="productForm">
        <div className="productForm_infos">
          <h4> Title</h4>
          <input
            className="productForm_title"
            type="text"
            name="title"
            value={inputs.title}
            onChange={(e) =>
              setInputs({ ...inputs, [e.target.name]: e.target.value })
            }
          />
          <h4> Price</h4>
          <input
            className="productForm_number"
            type="number"
            name="price"
            value={inputs.price}
            onChange={(e) =>
              setInputs({ ...inputs, [e.target.name]: e.target.value })
            }
          />
          <h4> Stock</h4>
          <input
            type="number"
            className="productForm_number"
            name="stock"
            value={inputs.stock}
            onChange={(e) =>
              setInputs({ ...inputs, [e.target.name]: e.target.value })
            }
          />
        </div>
        <h4> Category</h4>
        <select
          id="category"
          name="category"
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        > <option>{""}</option>
          {CategoryList.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <h4 className="productForm_description"> Description</h4>
        <input
          type="text"
          className="productForm_description"
          name="description"
          value={inputs.description}
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        />
        <ImageUpload
          id="image"
          className="productForm_picBtn"
          getFile={getFile}
        />
        <div className="createFormButtons">
          <button type="submit" className="create" onClick={handleSubmit}>
            {text}
          </button>
          <button onClick={handleOpen} className="cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
