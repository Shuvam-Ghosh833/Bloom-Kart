import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productActions.js";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader.js";



/*
const product={
  name: "Red Tshirt",
  images:[{url:"data:image/jpeg;base64,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"}],
  price:"$50",
  _id:"Shuvam",
}
*/
const Home = () => {

  const dispatch=useDispatch();
  const { loading, error, products,productsCount } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  
return (
   <Fragment>
    {loading ? (<Loader/>) : 
    ( <Fragment>
      
    
      <MetaData title="Ecommerce"></MetaData>

      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

     <div className="container" id="container">
      
      
      {products &&
          products.map((product) => (
            <Product product={product} />
          ))}
      </div>
    
</Fragment>)
    
    }
   </Fragment>
  );
};

export default Home;