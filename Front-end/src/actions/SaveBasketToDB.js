import axios from 'axios'


 function SaveBasketToDB(token) {
let basket = localStorage.getItem("basketStored");
if (basket)
    axios
    .post(
      "/api/basket",
      {
        basket: basket,
        time: new Date().toLocaleString("en-GB", { timeZone: "CET" }),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then( function (response) {
      console.log(response.data.productsSelected);
      return (response.data.productsSelected)
    })
    .catch(function (error) {
      console.log(error);
    });
  else return [];
}

export default SaveBasketToDB
