import React, { useEffect, useState } from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Edit.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const Edit = ({url}) => {
  const navigate = useNavigate()
  const [image, setImage] = useState(false);
    const {id} = useParams()
    const [item ,setItem] = useState({
        _id:"",
        name: "",
        description: "",
        price: "",
        category: "",
        rating:""
        
    })
    
    const getitem = async ()=>{
      const response = await axios.post(url+"/api/food/get",{id:id})
      
      if(response.data.success){
        setItem(response.data.data);
      }
      else{
        toast.error(response.data.message)
      }
    }
    
    useEffect(()=>{
      getitem()
      
    },[])
    
    
    const onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setItem(() => ({ ...item, [name]: value }))
        

    }
    const onSubmitHandler = async (event) => {
      event.preventDefault();
      const formitem =new FormData();
      formitem.append("_id",item._id);
      formitem.append("name",item.name);
      formitem.append("description",item.description);
      formitem.append("price",item.price);
      formitem.append("category",item.category);
      formitem.append("image",image);
      formitem.append("rating" ,item.rating)
      // console.log(image)
      const response = await axios.post(`${url}/api/food/edit` ,formitem)
      if(response.data.success){
          setItem({
              _id:'',
              name:"",
              description:"",
              price:"",
              category:"",
              rating:"",
          })
          setImage(false);
          toast.success(response.data.message);
          navigate("/list");
      }
      else{
          toast.error(response.data.message)
      }
    //   console.log(image);
  }
  return (

    <div className='add'>
        <h1>Edit Food Information</h1>
            <form className='flex-col'onSubmit={onSubmitHandler}>
                <div className="flex-col add-img-upload">
                    <p>Upload Image*</p>
                    <label htmlFor="Image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area } alt="" required />   
                    
                    </label>
                    <input onChange={(event) => setImage(event.target.files[0])} type="file" id="Image" hidden  required />
                </div>
                <label htmlFor="">Image Name</label>
                <p className='img-p'>{item.image}</p>
                <div className="flex-col add-prduct-name">
                    <p>Product Name*</p>
                    <input type="text" name='name' value={item.name} onChange={onChangeHandler} placeholder='Enter Product Name' required />
                </div>
                <div className="flex-col add-prduct-description">
                    <p>Product Description*</p>
                    <textarea type="text" name='description' value={item.description} onChange={onChangeHandler} rows="6" placeholder='Product Description' required ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category">
                        <p>Category*</p>
                        <select name="category" value={item.category} onChange={onChangeHandler} id="" required>
                            <option value="">Select</option>
                            <option value="Salad">Salad</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Pure Veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Cake">Cake</option>
                        </select>
                    </div>
                    <div className="add-price">
                        <p>Product Price*</p>
                        <input type="number" placeholder='$20' name='price' value={item.price} onChange={onChangeHandler} required />
                    </div>
                    <div className="add-price">
                        <p>Product Rating*</p>
                        <input type="rate"  name='rating' placeholder='Enter:0-5' value={item.rating} onChange={onChangeHandler} required min="0" max="5" />
                    </div>
                </div>
                <button  className='btn-add' type='submit' >Edit</button>

            </form>
            
        </div>
  )
  }


export default Edit