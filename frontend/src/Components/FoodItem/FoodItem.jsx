import React, { useContext } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
const FoodItem = ({ item }) => {
  // const [itenCount,setItemCount]=useState(0)
  const { cartItems, addToCart, removeFromCart , url} = useContext(StoreContext)

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img className='food-item-image' src={url+"/image/"+item.image} alt="" />
        {
          !cartItems[item._id]
            ? <img className='add' onClick={() => addToCart(item._id)} src={assets.add_icon_white} alt='' />
            : <div className='food-item-counter'>
              
              {/* <img onClick={()=>removeFromCart(item._id)} src={assets.remove_icon_red} alt="" /> */}
              <span onClick={() => removeFromCart(item._id)} alt="">-</span>
             
             {/* no of product  */}
             <p>{cartItems[item._id]}</p> 
              
              {/* <img onClick={()=>addToCart(item._id)} src={assets.add_icon_green} alt="" /> */}
              <span onClick={() => addToCart(item._id)} alt="" >+</span>
            </div>
        }

      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{item.name}</p>
          {/* <img src={assets.rating_starts} alt="" /> */}
          <div>
            <span>{item.rating}</span>
            <i className="fa-solid fa-star star-i"></i>
          </div>
        </div>
        <p className="food-item-description">{item.description}</p>
        <p className="food-item-price">${item.price}</p>

      </div>
    </div>
  )
}

export default FoodItem


