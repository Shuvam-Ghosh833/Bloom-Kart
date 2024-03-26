import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes,Route,useLocation } from "react-router-dom";

import Loader from "./component/layout/Loader/Loader.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import LoginSignUp from "./component/User/LoginSignUp.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";







import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";




import store from './store'
import { loadUser } from "./actions/userActions.js";
 import UserOptions from "./component/layout/Header/UserOptions.js"
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UserList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import About from "./component/about/about.js";
import Contact from "./component/contact/contact.js";
import NotFound from "./component/layout/NotFound/NotFound.js";



function App() {
  const { isAuthenticated,user } = useSelector((state) => state.user);
  const [stripeApiKey,setstripeApiKey] = useState("");

  function ScrollToTop() {
   const { pathname } = useLocation();
 
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
 
   return null;
 }


  async function getStripeApiKey(){
    const {data} =await axios.get("/api/v1/stripeapikey");
    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
     store.dispatch(loadUser());
      if(isAuthenticated) getStripeApiKey();
  }, []);

// window.addEventListener("contextmenu",(e)=> e.preventDefault());
  return (
    <div>
      
    <Router>
    <ScrollToTop />
      <Header/>

      {isAuthenticated && <UserOptions user={user}/>}
      

      <Routes>
      { (<Route path="/process/payment" element={
      <Elements stripe={loadStripe("pk_test_51OxtTsSEbFgQOvThy2AGkpVeQy2xQCwjUH61yzDQCzCcLexlR0S0EtaIjhdLYVQWbkaehfQJxMOaVue42N2WGSll00iUOMIaXr      ")}> 
        <ProtectedRoute>
      <Payment/>
       </ProtectedRoute>
       </Elements>
       
     }/>)}
     
      <Route path="/account" element={
        <ProtectedRoute>
        <Profile/>
        </ProtectedRoute>
     }/>
     <Route path="/me/update" element={
        <ProtectedRoute>
       <UpdateProfile/>
        </ProtectedRoute>
     }/>
     <Route path="/password/update" element={
        <ProtectedRoute>
       <UpdatePassword/>
        </ProtectedRoute>
     }/>
     <Route path="/shipping" element={
        <ProtectedRoute>
       <Shipping/>
        </ProtectedRoute>
     }/>
     
    
      <Route path="/success" element={
        <ProtectedRoute>
       <OrderSuccess/>
        </ProtectedRoute>
     }/>
       <Route path="/orders" element={
        <ProtectedRoute>
       <MyOrders/>
        </ProtectedRoute>
     }/>
     <Route path="/order/:id" element={
        <ProtectedRoute>
       <OrderDetails/>
        </ProtectedRoute>
     }/>
      <Route path="/order/confirm" element={
        <ProtectedRoute>
       <ConfirmOrder/>
        </ProtectedRoute>
     }/>
     <Route path="/admin/dashboard" element={
        <ProtectedRoute isAdmin={true}>
       <Dashboard/>
        </ProtectedRoute>
     }/>
     <Route path="/admin/products" element={
        <ProtectedRoute isAdmin={true}>
       <ProductList/>
        </ProtectedRoute>
     }/>
     <Route path="/admin/product" element={
        <ProtectedRoute isAdmin={true}>
       <NewProduct/>
        </ProtectedRoute>
     }/>
     <Route path="/admin/product/:id" element={
        <ProtectedRoute isAdmin={true}>
       <UpdateProduct/>
        </ProtectedRoute>
     }/>
      <Route path="/admin/orders" element={
        <ProtectedRoute isAdmin={true}>
       <OrderList/>
        </ProtectedRoute>
     }/>
     <Route path="/admin/order/:id" element={
        <ProtectedRoute isAdmin={true}>
       <ProcessOrder/>
        </ProtectedRoute>
     }/>
     <Route path="/admin/users" element={
        <ProtectedRoute isAdmin={true}>
       <UsersList/>
        </ProtectedRoute>
     }/>
     <Route path="/admin/user/:id" element={
        <ProtectedRoute isAdmin={true}>
       <UpdateUser/>
        </ProtectedRoute>
     }/>
     <Route path="/admin/reviews" element={
        <ProtectedRoute isAdmin={true}>
       <ProductReviews/>
        </ProtectedRoute>
     }/>
      <Route element={
         window.location.pathname==="/process/payment"? null:NotFound
      }
        />
        <Route path="/" element={<Home />} />
        {/* <Route path="/sad" element={<Loader />} />  to see the loading animation */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/About" element={<About/>} />
        <Route path="/Contact" element={<Contact/>} />

        <Route path="/products/:keyword" element={<Products />} />
        {/* <Route path="/account" element={<Profile/>} />
        <Route path="/me/update" element={<UpdateProfile/>}/> */}
        {/* <Route path="/account" element={<ProtectedRoute element={<Profile />}/>}/> */}
        <Route path="/login" element={<LoginSignUp/>} />
        <Route path="/password/forgot" element={ <ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={ <ResetPassword/>}/>
        <Route path="/cart" element={<Cart/>} />






      

      
    </Routes>
      
    </Router>
    
<Footer/>
    </div>
  );
}

export default App;
