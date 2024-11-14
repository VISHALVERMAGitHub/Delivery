import React, { Profiler, useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, totalcount, token, setToken } = useContext(StoreContext)

  // useNavigate hook 
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
  return (
    <div className='navbar'>
      <div className='logo'>
        <Link to='/'><i className="fa-solid fa-truck logo_icon"></i></Link>
        <Link to='/'><h2>Delivery</h2></Link>
      </div>

      {/* <img src={assets.logo} alt="" className='logo'/> */}
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : " "}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : " "}>menu</a>
        <a href='#appdownload' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : " "}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : " "}>contact us</a>
      </ul>
      <div className="navbar-right">
        <i className="fa-solid fa-magnifying-glass _icon"></i>
        <div className="navbar-search-icon ">
          <Link to='/Cart' ><i className="fa-solid fa-cart-shopping _icon"></i></Link>
          <div className={getTotalCartAmount() ? "dot" : ""}>{totalcount() > 0 ? totalcount() : ""}</div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}> <span>sign in</span></button>
          : <div className='navbar-profile'>
            <i className="fa-regular fa-user profile" />
            <ul className='navbar-profile-dropDown'>
              <li onClick={()=>navigate("/myOrder")}><i className="fa-solid fa-bag-shopping"></i> <span >Order</span></li>
              <hr /><li onClick={logout}  ><i className="fa-solid fa-arrow-right-from-bracket"></i><span>Logout</span></li>
            </ul>

          </div>}
      </div>
    </div>
  )
}

export default Navbar
