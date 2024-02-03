import { useEffect, useState } from "react";
import './App.css';
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"

import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Loader from "./component/layout/Loader/Loader.js";


function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  
  }, []);


  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/sad" element={<Loader />} />  to see the loading animation */}


      
    </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
