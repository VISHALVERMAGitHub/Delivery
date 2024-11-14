import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
const List = ({url}) => {
  const [list, setList] = useState([]);
  

  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error(response.data.message)  
    }
  }
  const deleteitem = async (_id) => {

    const response = await axios.post(`${url}/api/food/delete`, { id: _id })
    await fetchlist()
    if (response.data.success) {
      console.log(response.data);
      
      toast.success(`food is deleted from account : ${response.data.message}`)

    }
    else{
      toast.error("error");
    }
  }
  // console.log(list)
  useEffect(() => {
    fetchlist();
  }, [])

  const navigate =useNavigate()
  const navigateHandler = (id)=>{
    navigate(`/edit/${id}`)
  }
  
  return (
    <div className='list add flex-col'>
      <p>All food</p>
      <div className="list-table">
        <div className="list-table-format title">

          <b>Image</b>
          <b>name</b>
          {/* <b>description</b> */}
          <b>price</b>
          <b>category</b>
          <b>action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/image/` + item.image} alt="" />
              <p>{item.name}</p>
              {/* <p>{item.description}</p> */}
              <p>${item.price}</p>
              <p>{item.category}</p>

              <button  onClick={() => deleteitem(item._id)} className='cursor btn-add'>Delete</button> &nbsp;
              <button  onClick={()=> (navigateHandler(item._id))} className='cursor btn-add'>edit</button> 

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List