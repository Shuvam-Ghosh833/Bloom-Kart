import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import { useSelector } from "react-redux";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
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





import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";




import store from './store'
import { loadUser } from "./actions/userActions.js";
 import UserOptions from "./component/layout/Header/UserOptions.js"
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";

function App() {
  const { isAuthenticated,user } = useSelector((state) => state.user);
  const [stripeApiKey,setstripeApiKey] = useState("");

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
    getStripeApiKey();
  }, []);


  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
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
      <Route path="/order/confirm" element={
        <ProtectedRoute>
       <ConfirmOrder/>
        </ProtectedRoute>
     }/>
     {stripeApiKey &&(<Route path="/process/payment" element={
      <Elements stripe={loadStripe(stripeApiKey)}> 
        <ProtectedRoute>
      <Payment/>
       </ProtectedRoute>
       </Elements>
       
     }/>)}

      <Route path="/success" element={
        <ProtectedRoute>
       <OrderSuccess/>
        </ProtectedRoute>
     }/>
        <Route path="/" element={<Home />} />
        {/* <Route path="/sad" element={<Loader />} />  to see the loading animation */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        {/* <Route path="/account" element={<Profile/>} />
        <Route path="/me/update" element={<UpdateProfile/>}/> */}
        {/* <Route path="/account" element={<ProtectedRoute element={<Profile />}/>}/> */}
        <Route path="/login" element={<LoginSignUp/>} />
        <Route path="/password/forgot" element={ <ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={ <ResetPassword/>}/>
        <Route path="/cart" element={<Cart/>} />






      

      
    </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
