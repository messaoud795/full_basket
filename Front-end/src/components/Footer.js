import React from "react";

import facebook from "../res/pictures/facebook.png";
import instagram from "../res/pictures/instagram.png";
import youtube from "../res/pictures/youtube.png";
import twitter from "../res/pictures/twitter.png";

import "./Footer.css";

import { Col, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer>
    <Row className="Footer">
      <Col xs={12} sm={12} className="Footer_copyright">
        <p>
          Contact us on our email shoppingOnline@gmail.com or in our social
          medias
        </p>
        <p>Copyright (c) 2020 </p>
      </Col>
      <Col xs={12} sm={12} className="Footer_socialMedia">
        <img src={facebook} alt="" />
        <img src={twitter} alt="" />
        <img src={instagram} alt="" />
        <img src={youtube} alt="" />
      </Col>
    </Row></footer>
  );
}

export default Footer;
