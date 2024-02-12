import React, { useState } from 'react';
 import './SearchBar.css'; // Import your CSS file
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';




const AnimatedSearchBox = (history) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
    );

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
     navigate(`/products/${searchValue}`);
    } else {
      navigate("/products");
    }
  };
  const handleSearchClick = (e) => {
    setIsActive(true);
    if (searchValue !== '') {
      searchSubmitHandler(e);
      setIsActive(false);
      setSearchValue('');
    } else {
      setSearchData('');
    }
  };

  const handleCancelClick = () => {
    setIsActive(false);
    setSearchData('');
    setSearchValue('');
  };

  const [searchData, setSearchData] = useState('');
 

  const buttonHoverStyle = {
    backgroundColor: 'black', /* Lighter green on hover */
  };
  return (
    <div className='sidebar'>
    <div className={`login ${isActive ? 'active' : ''}`}>
    <a href={`${isAuthenticated? '' : '/login'}`} >
      Login
    </a>
    </div>
    <div className={`search-box ${isActive ? 'active' : ''}`}>
      
      <input
        type="text"
        placeholder="Type to search.."
        className={isActive ? 'active' : ''}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className={`search-icon ${isActive ? 'active' : ''}`} onClick={handleSearchClick}>
      <CiSearch />
      </div>
      <div className={`cancel-icon ${isActive ? 'active' : ''}`} onClick={handleCancelClick}>
      <RxCross2 />

      </div>
      <div className={`search-data ${isActive ? 'active' : ''}`}  />
    </div>
    </div>
  );

};

export default AnimatedSearchBox;
