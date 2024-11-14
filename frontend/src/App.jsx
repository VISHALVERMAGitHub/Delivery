import React, { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart/Cart'
import Home from './Pages/Home/Home'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import Loginpopup from './Components/Loginpopup/Loginpopup'
import Verify from './Pages/Verify/Verify'
import MyOrder from './Pages/MyOrder/MyOrder'
const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin ?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder setShowLogin={setShowLogin} showLogin={showLogin}/>}/>
        <Route path='/verify' element={<Verify />}/>
        <Route path='/myOrder' element={<MyOrder />}/>
        


      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
