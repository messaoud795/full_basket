import React from "react";
import "./Category.css";
import { Link } from "react-router-dom";
import {CategoryList} from './CategoryList'
import {Row, Col} from 'react-bootstrap'


function Category() {
  return (
       <Row  className="category">

        {CategoryList.map((el, i) => (  
            <Col xs={2} key={i}><Link to={`/${el}`} className='catLink' >
              
               <span > {el}</span>
             </Link> </Col>
        
        ))}
      </Row>
  );
}

export default Category;
