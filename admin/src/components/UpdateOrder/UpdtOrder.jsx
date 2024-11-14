import React from 'react'
import './UpdtOrder.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UpdtOrder = ({ url, order_Id, setUpdtOrder, orders}) => {
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        pincode: '',
        state: '',
        country: '',
        phone: '',
        status: " ",
        orderId: ""
    })
    
    // const fetchdata = async () => {
    //     const response = await axios.post(url + "/api/order/getorder", { orderId: order_Id })
    //     if (response.data.success) {
    //         setAddress({ ...response.data.data.address, "status": response.data.data.status, "orderId": response.data.data._id })


    //     }
    // }

    useEffect(() => {
        orders.map((order ,index)=>{
            if(order._id == order_Id){
                setAddress({...order.address,"status":order.status,"orderId":order_Id})
            }
        })
        
        
    }, [])
    

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setAddress(() => ({ ...address, [name]: value }))

    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const response = await axios.post(url + "/api/order/update", address);
        if (response.data.success) {
            setUpdtOrder(false)
            // fetchdata();
            setAddress({
                firstName: '',
                lastName: '',
                email: '',
                street: '',
                city: '',
                pincode: '',
                state: '',
                country: '',
                phone: '',
                status: " ",
                orderId: ""
            })
        }
    }




    return (
        <div className='update-order'>

            <form onSubmit={(event) => onSubmitHandler(event)} className="update-popup-container">
                <div className="update-address">
                    <div className="update-title">
                        <p className="title">Update Order</p>
                        <span onClick={() => setUpdtOrder(false)} className='close-update'>X</span>
                    </div>

                    <div className="multi-field">
                        <input name='firstName' onChange={(event) => onchangeHandler(event)} value={address.firstName} type="text" placeholder='First Name' required />
                        <input name='lastName' onChange={(event) => onchangeHandler(event)} value={address.lastName} type="text" placeholder='Last Nmae' required />
                    </div>
                    <div className="multi-field">
                        <input name='email' onChange={(event) => onchangeHandler(event)} value={address.email} type="email" placeholder='Email' required />
                        <input name='phone' onChange={(event) => onchangeHandler(event)} value={address.phone} type="text" placeholder='phone' required />
                    </div>
                    <input name='street' onChange={(event) => onchangeHandler(event)} value={address.street} type="text" placeholder='Street' required />
                    <div className="multi-field">
                        <input name='city' onChange={(event) => onchangeHandler(event)} value={address.city} type="text" placeholder='City' required />
                        <input name='pincode' onChange={(event) => onchangeHandler(event)} value={address.pincode} type="text" placeholder='pincode' required />
                    </div>
                    <div className="multi-field">
                        <input name='state' onChange={(event) => onchangeHandler(event)} value={address.state} type="text" placeholder='State' required />
                        <input name='country' onChange={(event) => onchangeHandler(event)} value={address.country} type="text" placeholder='country' required />
                    </div>
                    <p>Status</p>
                    <select name="status" onChange={(event) => onchangeHandler(event)} value={address.status}>
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>

                <button className='btn-add' type='submit' > Submit Update</button>

            </form>

        </div>
    )
}

export default UpdtOrder