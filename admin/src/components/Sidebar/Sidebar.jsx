import React from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <i className="fa-solid fa-plus"></i>
          <p>add item</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <i className="fa-regular fa-rectangle-list"></i>
          <p>list items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <i className="fa-solid fa-bag-shopping"></i>
          <p>order</p>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Sidebar