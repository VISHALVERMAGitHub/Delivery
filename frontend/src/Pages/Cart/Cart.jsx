import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart ,getTotalCartAmount , url} = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          {/* <p>Remove</p> */}
        </div>
      </div>
      <br />
      <hr />
      {
        food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div key={index} className="cart-items-title cart-items-item" >
                  <img src={url+"/image/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p><span onClick={() => removeFromCart(item._id)} className='cross'>-</span>{cartItems[item._id]}<span onClick={() => addToCart(item._id)} className='cross'>+</span></p>
                  <p>${item.price * cartItems[item._id]} </p>
                  {/* <p onClick={()=>removeFromCart(item._id)} className='cross' >X</p> */}
                </div>
                <hr />
              </>

            )
          }
        })
      }
      
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()>=50 ? 0 : (getTotalCartAmount() ? 5: 0)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <h3>Total</h3>
            <h4>${getTotalCartAmount()+( getTotalCartAmount()>=50 ? 0 : (getTotalCartAmount() ? 5: 0))}</h4>
          </div>
          <button onClick={()=>navigate("/order")} >Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>if you have promecode, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Enter promocode' /> &nbsp;
              <button>apply</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
