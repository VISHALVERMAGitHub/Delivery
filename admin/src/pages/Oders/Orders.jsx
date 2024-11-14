import React from 'react'
import './Orders.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import {assets} from '../../assets/assets.js'
import UpdtOrder from '../../components/UpdateOrder/UpdtOrder.jsx';
const Orders = ({ url }) => {

  const [orders, setOrders] = useState([])
  const fetchOrder = async () => {
    const response = await axios.get(url+"/api/order/all")
    if (response.data.success) {
      setOrders(response.data.data)
    }
    else {
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    fetchOrder()

  }, [orders])
  
  const statusHandler = async (event ,orderId)=>{
    
    const response = await axios.post(url+'/api/order/status',{orderId:orderId ,status:event.target.value})
    if(response.data.success){
      fetchOrder();
    }
  }
  const [updtOrder ,setUpdtOrder] =useState(false)
  const [order_Id,setorder_Id] =useState("")
  const onclickhandler = (id)=>{
    setorder_Id(id);
    setUpdtOrder(true);
    
  }

  
  return (
    <>
    {updtOrder? < UpdtOrder url={url} orders={orders} order_Id={order_Id} setUpdtOrder={setUpdtOrder}  /> :" "}
    <div className='listOrders'>
      <h2>Orders</h2>
      <div className="container">
        {orders.map((order, index)=>{
          return (
            <div key ={index} className="listOrders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item ,index)=>{
                if(index ===order.items.length-1)
                  return (item.name +"x"+item.quantity)
                else 
                  return (item.name +"x"+item.quantity+",")
              })}</p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.pincode}</p>
                <p>Phone No:{order.address.phone}</p>
              </div>
              <p>Items:{order.items.length}</p>
              {/* <p > <span>&#x25cf;</span> <b> {order.status}</b> </p> */}
              <select name="status" onChange={(event)=>statusHandler(event , order._id)} value={order.status} id="">
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
              <button onClick={()=>(onclickhandler(order._id))} >Update Order</button>
            </div>
          )
        })}
      </div>

    </div>
    </>
  )
}

export default Orders