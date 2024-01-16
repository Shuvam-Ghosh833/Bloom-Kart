import { useEffect, useState } from "react";
import './App.css';
import WebFont from "webfontloader";
import Header from "./component/layout/Header.js"
import { BrowserRouter as Router} from "react-router-dom";

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
    </Router>
    
  );
}

export default App;
