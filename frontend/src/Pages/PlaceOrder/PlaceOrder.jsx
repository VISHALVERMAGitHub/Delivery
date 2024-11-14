import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = ({ setShowLogin, showLogin }) => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  let orderTotalAmount = getTotalCartAmount() + (getTotalCartAmount() >= 50 ? 0 : (getTotalCartAmount() ? 5 : 0))

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: "",
    city: '',
    pincode: '',
    state: "",
    country: '',
    phone: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }))
  }
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItem = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItem.push(itemInfo);
      }

    })
    let orderData = {
      address: data,
      items: orderItem,
      amount: orderTotalAmount
    }

    const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      // console.log(response.data)
      const { session_url } = response.data
      window.location.replace(session_url)
    }
    else {
      alert("error");
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      setShowLogin(true);
      navigate("/cart");
    }
    else if (getTotalCartAmount() === 0) {
      navigate("/");
    }
  }, [token])
  return (
    <>
      {showLogin ? <Loginpopup setShowLogin={setShowLogin} /> : <></>}
      <form className='place-order' onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className='title' >Delivery Information</p>
          <div className="multi-field">
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
            <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Nmae' required />
          </div>
          <div className="multi-field">
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
            <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' required />
          </div>
          <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
          <div className="multi-field">
            <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
            <input name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='pincode' required />
          </div>
          <div className="multi-field">
            <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
            <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='country' required />
          </div>

        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() >= 50 ? 0 : (getTotalCartAmount() ? 5 : 0)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <h3>Total</h3>
              <h4>${getTotalCartAmount() + (getTotalCartAmount() >= 50 ? 0 : (getTotalCartAmount() ? 5 : 0))}</h4>
            </div>
            <button type='submit' >Proceed To Payment</button>
          </div>
        </div>

      </form>

    </>
  )
}

export default PlaceOrder;
