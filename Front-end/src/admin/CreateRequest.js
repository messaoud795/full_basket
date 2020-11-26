import Pop_up from "../PopUp";
import axios from "axios";


async function  CreateRequest(formData,tokenAdmin) {
   await axios
    .post("/api/product/create", formData, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    })
    .then(function (response) {
      if (response.data) {
        Pop_up("Product added successfully")
      return (response.data);}
    })
    .catch(function (error) {
      Pop_up("Error, please retry");
    });


    
}

export default CreateRequest
