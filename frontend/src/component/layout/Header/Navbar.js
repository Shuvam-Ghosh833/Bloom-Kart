import React, { useState } from 'react'
//import {images} from '../../constants/index.js';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import './Navbar.css';
import SearchBar from './SearchBar'
const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar" >
      <div className="app__navbar-logo">
       {/* <a href='#'><img src={images.Mylogo} alt="logo" /></a>  */}
      </div>
     
      <ul className="app__navbar-links">
        {['Home', 'Products', 'Contact', 'About'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`/${item}`}>{item}</a>
          </li>
        ))}
        <div className='sidebar'>
        <SearchBar></SearchBar>
        </div>
        
      </ul>
     
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
            
              {['Home', 'Products', 'Contact', 'About'].map((item) => (
                <li key={item}>
                  <a href={`/${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
             
            
          
        
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar