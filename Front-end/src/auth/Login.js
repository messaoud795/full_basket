import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import "./Login.css";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(" ");
  const [isValid, setisValid] = useState(false);
  var { basket } = useSelector((state) => ({ ...state.basketReducer }));
  const dispatch = useDispatch();
  const history = useHistory();
//verify email and password in the database
  const login = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/signIn", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.id) {
          window.localStorage.setItem("token", response.data.token);
          window.localStorage.setItem("firstName", response.data.firstName);
          setisValid(true);
        } else {
          setErrorMsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //save the database to the user database if he was logged in
  useEffect(
    () => {
      if (isValid) {
        let token = localStorage.getItem("token");
        if (basket.length > 0) {
          axios
            .post(
              "/api/basket",
              {
                basket: basket,
                time: new Date().toLocaleString("en-GB", { timeZone: "CET" }),
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(function (response) {
              console.log(response.data.productsSelected);
              dispatch({
                type: "saveBasket",
                payload: response.data.productsSelected,
              });
              window.localStorage.removeItem("basketStored");
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios
            .get("/api/basket", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              window.localStorage.removeItem("basketStored");
              if (response.data.productsSelected.length> 0)
              dispatch({
                type: "saveBasket",
                payload: response.data.productsSelected,
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        history.push("/");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isValid]
  );

  return (
    <div className="login">
      <Link to="/">
        <img
          className="logo"
          src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h1>Sign in</h1>
        <p id="errorMsg">{errorMsg}</p>
        <form action="" autoComplete="on">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login_signInButton" onClick={login} type="submit">
            Sign in
          </button>
        </form>
        <p>Not registred yet?</p>
        <Link to="/Register">
          <button className="login_signUpButton">
            Create your own account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
