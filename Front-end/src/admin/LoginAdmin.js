import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
   const history=useHistory();
  
    const login = (e) => {
      e.preventDefault();
      axios
      .post("/api/user/admin", {
        email: email,
        password: password
      })
      .then(function (response) {
    
        if (response.data.id) {
          window.localStorage.setItem('tokenAdmin',response.data.token);
          window.localStorage.setItem('firstName',response.data.firstName);
          history.push("/admin/product");
        }
        else{setErrorMsg(response.data.msg) }
  
  
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
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
              onChange={(e) => setEmail(e.target.value)
                
              }
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)
              }
            />
            <button className="login_signInButton" onClick={login} type="submit">
              Sign in
            </button>
          </form>
          <p>Not registred yet?</p>
          <Link to='/Register'>
          <button className="login_signUpButton" >
            Create your own account
          </button>
          </Link>
        </div>
      </div>
    )
}

export default LoginAdmin
