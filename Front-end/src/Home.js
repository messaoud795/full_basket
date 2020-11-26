import React from 'react'
import  { useState,useEffect } from 'react';
import './Home.css'
import Product from './product/Product'
import Category from './Category'
import axios from 'axios';
import flyer from './res/pictures/flyer.jpg'
import flyer2 from './res/pictures/flyer2.jpg'
import flyer3 from './res/pictures/flyer3.jpg'
import {Carousel} from 'react-bootstrap'



function Home() {
  const [error,setError]=useState(null);
  const[products,setProducts]=useState(null);

  useEffect(()=>{
    axios.get('/api/product/home')
     .then (res=>{setProducts (res.data);
 })
     .catch(err=>{setError(err);
      console.log(error)});
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="home">
         <Category />
         <div className="home_carousel">
         <Carousel>
  <Carousel.Item interval={1500}>
    <img
      className="d-block w-100 home_img"
      src={flyer}
      alt="First slide"
    />
  
  </Carousel.Item>
  <Carousel.Item interval={1500}>
    <img
      className="d-block w-100 home_img"
      src={flyer2}
      alt="Third slide"
    />
 
  </Carousel.Item>
  <Carousel.Item interval={1500}>
    <img
      className="d-block w-100 home_img"
      src={flyer3}
      alt="Third slide"
    />
   
  </Carousel.Item>
</Carousel>
         </div>
           
     <h2>Products from all categories :</h2>

        <div className="home_row">
         
          {products  ? products.map((product)=><Product key={product._id} product={product}/> ):null}     
        </div>
        </div>
    )
}

export default Home



  