import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Order from "./Order";
import ProductByCategory from "./product/ProductByCategory";
import SearchProduct from "./product/SearchProduct";
import OrderTracking from "./OrderTracking";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Category from "./Category";
import LoginAdmin from "./admin/LoginAdmin";
import CreateProduct from "./admin/CreateProduct";
import OrdersManagement from "./admin/OrdersManagement";
import OrderUpdate from "./admin/OrderUpdate";
import Users from "./admin/Users";
import SaveBasketToDB from "./auth/SaveBasketToDB";


function App() {
  function SecureRoute(props) {
    let token = window.localStorage.getItem("token");
    return (
      <Route
        path={props.path}
        render={() => {
          if (token) return <props.component />;
          else return <Redirect to={{ pathname: "/login" }} />;
        }}
      ></Route>
    );
  }
  function AdminRoute(props) {
    let tokenAdmin = window.localStorage.getItem("tokenAdmin");
    return (
      <Route
        path={props.path}
        render={() => {
          if (tokenAdmin) return <props.component />;
          else return <Redirect to={{ pathname: "/admin" }} />;
        }}
      ></Route>
    );
  }
  function ConnectRoute(props) {
    let token = window.localStorage.getItem("token");
    return (
      <Route
        path={props.path}
        render={() => {
          if (token) {
             SaveBasketToDB(token);
            window.localStorage.removeItem("basketStored");
            window.location.reload();
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("tokenAdmin");
            window.localStorage.removeItem("firstName");
            return <Redirect to={{ pathname: "/" }} />;
          } else {
            return <props.component />;
          }
        }}
      ></Route>
    );
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin" exact component={LoginAdmin} />
          <AdminRoute path="/admin/product" exact component={CreateProduct} />
          <Route path="/checkout" exact>
            <Header />
            <Checkout />
          </Route>
          <ConnectRoute path="/login" exact component={Login}></ConnectRoute>
          <SecureRoute path="/order" exact component={Order} />
          <SecureRoute path="/order/tracking" exact component={OrderTracking} />
          <AdminRoute path="/admin/orders" exact component={OrdersManagement} />
          <AdminRoute path="/admin/users" exact component={Users} />
          <AdminRoute
            path="/admin/orders/:orderId"
            exact
            component={OrderUpdate}
          />

          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/:cat" exact>
            <Header />
            <Category />
            <ProductByCategory />
          </Route>
          <Route path="/search/:id" exact>
            <Header />
            <SearchProduct />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
