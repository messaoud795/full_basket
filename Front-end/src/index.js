import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import PopUp from "./PopUp";
import 'bootstrap/dist/css/bootstrap.min.css';


//create the basket state
//initialize the basket state with the local storage
const initialValue = () =>
 ( JSON.parse(window.localStorage.getItem("basketStored")) || []);
let i = initialValue();
let s = i.reduce(
  (sum, item) => sum + item.product.price * item.quantityOrdred,
  0
);

function basketReducer(state = { basket: i, total: s }, action) {
  switch (action.type) {
    case "saveBasket": return state={...state, basket:action.payload}
    case "addToBasket":
      if (
        state.basket?.filter(
          (el) => el.product.title === action.payload.product.title
        ).length === 0
      ) {
        let newBasket= [
          ...state.basket,
          {
            product: action.payload.product,
            quantityOrdred: action.payload.quantityOrdred,
          },
        ];
        window.localStorage.setItem('basketStored',JSON.stringify(newBasket))
        return {
          basket: newBasket,
        };
      } else {
         PopUp("Product already added to Basket");
      } 
      /* falls through */
    case "updateTotal": {
      let S = state.basket?.reduce(
        (sum, item) => sum + item.product.price * item.quantityOrdred,
        0
      );
      return { ...state, total: S }; /* falls through */
    }
    case "RemoveFromBasket":
      let newBasket=state.basket?.filter(
        (el) => el.product.title !== action.payload
      );
      window.localStorage.setItem('basketStored',JSON.stringify(newBasket))
      return {
        basket: newBasket
      };/* falls through */
      case "RemoveBasket":
        window.localStorage.removeItem('basketStored');
        window.location.reload();
       return state.basket=[];/* falls through */
    default:
      return state;/* falls through */
  } 

}
//search product
function searchReducer(state = { productFound: [] }, action) {
  switch (action.type) {
    case "searchProduct":
      return { productFound: [action.payload] }; /* falls through */
    default:
      return state;
  }
}

// combine reducers
const rootreducer = combineReducers({ basketReducer, searchReducer });

//create the store
const store = createStore(
  rootreducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
