import axios from 'axios'

function GetProducts(setProducts) {
        axios
          .get("/api/product/all")
          .then((res) => {
            setProducts(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
}

export default GetProducts
