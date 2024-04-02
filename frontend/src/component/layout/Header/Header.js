import React from "react";
// import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { Addon } from "./Addon";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";



const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "#E5E7E2",
  logoHoverSize: "10px",
  logoHoverColor: "#DEEE22",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconSize:"2vmax",
  searchIconColor:"black",

  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  
 
};

const Header = () => {
  return (<>
  {/* <ReactNavbar {...options} /> */}
  {/* <Addon></Addon> */}
  <Navbar></Navbar>
 
  </>
  )
};

export default Header;