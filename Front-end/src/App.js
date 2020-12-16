import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/user/Home";
import Checkout from "./pages/user/Checkout";
import Login from "./pages/user/auth/Login";
import Register from "./pages/user/auth/Register";
import Order from "./pages/user/Order";
import ProductByCategory from "./pages/user/ProductByCategory";
import SearchProduct from "./pages/user/SearchProduct";
import OrderTracking from "./pages/user/OrderTracking";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Category from "./components/Category";
import LoginAdmin from "./pages/admin/LoginAdmin";
import CreateProduct from "./pages/admin/CreateProduct";
import OrdersManagement from "./pages/admin/OrdersManagement";
import OrderUpdate from "./pages/admin/OrderUpdate";
import Users from "./pages/admin/Users";
import SaveBasketToDB from "./actions/SaveBasketToDB";


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
    let tokenAdmin = window.localStorage.getItem("tokenAdmin");
    return (
      <Route
        path={props.path}
        render={() => {
          if ((token)||(tokenAdmin)) {
             SaveBasketToDB(token);
            window.localStorage.removeItem("basketStored");   
             window.localStorage.removeItem("tokenAdmin");     
             window.localStorage.removeItem("token");
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
