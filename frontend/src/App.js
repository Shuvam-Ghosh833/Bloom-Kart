import { useEffect, useState } from "react";
import './App.css';
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


import store from './store'
import { loadUser } from "./actions/userActions.js";
 import UserOptions from "./component/layout/Header/UserOptions.js"
import ProtectedRoute from "./component/Route/ProtectedRoute.js";

function App() {
  const { isAuthenticated,user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
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
        <Route path="/" element={<Home />} />
        {/* <Route path="/sad" element={<Loader />} />  to see the loading animation */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        {/* <Route path="/account" element={<Profile/>} />
        <Route path="/me/update" element={<UpdateProfile/>}/> */}
        {/* <Route path="/account" element={<ProtectedRoute element={<Profile />}/>}/> */}
        <Route path="/login" element={<LoginSignUp/>} />



      

      
    </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
