import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <i className="fa-solid fa-truck logo_icon"></i>
        <div>
          <h2>Delivery</h2>
          <p>Admin Panel</p>
        </div>
      </div>
      <i className="fa-regular fa-user profile"></i>
    </div>
  )
}

export default Navbar