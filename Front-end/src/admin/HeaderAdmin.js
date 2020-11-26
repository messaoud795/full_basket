import React, { useEffect, useState } from "react";
import "../Header.css";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { Row, Col } from "react-bootstrap";
import './HeaderAdmin.css'

function HeaderAdmin() {
  var userFistName = window.localStorage.getItem("firstName");
  const [searchInput, setsearchInput] = useState("");
  const [connect, setConnect] = useState("");
  var history = useHistory();

  //switch to sign in and out
  useEffect(() => {
    userFistName ? setConnect("Sign out") : setConnect("Sign in");
  }, [userFistName]);
  //search product
  const findProduct = (e) => {
    e.preventDefault();
    history.push(`/search/${searchInput}`);
    setsearchInput("");
  };
  return (
    <Row className="header">
      {/* logo on the left   */}
      <Col xs={{span:1, order:1}} md={{span:2, order:1}} >
        <Link to="/">
          <img
            className="header-logo"
            src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
            alt=""
          />
        </Link>
      </Col>
      {/* search box */}
      <Col xs={{span:12, order:3}} md={{span:4, order:2}} className="header_search">
        <form className="header_search_form" onSubmit={findProduct}>
          <input
            type="text"
            className="header_searchInput"
            placeholder="Search for a product"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
          />

          <button type="submit">
            <SearchIcon className="header_searchIcon" />
          </button>
        </form>
      </Col>

      <Col xs={{span:9, order:2}} md={{span:6, order:3}} className="header_nav" style={{justifyContent:'center'}}>
         {/* Product */}      
         <Link to="/admin/product" className="header_link">
          <div className="header_option">
            <span className="hearder_optionLineTwo">Products </span>
          </div>
        </Link>
         
        {/* Order */}
        <Link to="/admin/orders" className="header_link">
          <div className="header_option">
            <span className="hearder_optionLineTwo">Orders </span>
          </div>
        </Link>
         {/* Order */}
         <Link to="/admin/users" className="header_link">
          <div className="header_option">
            <span className="hearder_optionLineTwo">Users </span>
          </div>
        </Link>
        {/* Name of the user connected */}
        <div className="header_link">
          {userFistName && (
            <div className="header_option">
              <span className="hearder_optionLineTwo">
                {"Welcome " + userFistName}
              </span>
            </div>
          )}
          {/* Sign In and out */}
          <Link to="/login" className="header_link">
            <div className="header_option">
              <span className="hearder_optionLineTwo">{connect}</span>
            </div>
          </Link>
        </div>
      </Col>
    </Row>
  );
}

export default HeaderAdmin;
