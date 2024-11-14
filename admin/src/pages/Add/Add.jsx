import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets.js';
import axios from 'axios'
import { toast } from 'react-toastify';
const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [Data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "select",
        rating:""
    });
    const onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setData(() => ({ ...Data, [name]: value }))

    }
    // console.log(Data.price)
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData =new FormData();
        formData.append("name",Data.name);
        formData.append("description",Data.description);
        formData.append("price",Data.price);
        formData.append("category",Data.category);
        formData.append("image",image);
        formData.append("rating",Data.rating)
        console.log(image)
        const response = await axios.post(`${url}/api/food/add` ,formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"select",
                rating:""
            })
            setImage(false);
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message)
        }
  
    }
    const onClickHandler = async()=>{

    }
        
    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="flex-col add-img-upload">
                    <p>Upload Image</p>
                    <label htmlFor="Image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />

                    </label>
                    <input onChange={(event) => setImage(event.target.files[0])} type="file" id="Image" hidden required />
                </div>
                <div className="flex-col add-prduct-name">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} type="text" name='name' value={Data.name} placeholder='Enter Product Name' required />
                </div>
                <div className="flex-col add-prduct-description">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} type="text" name='description' value={Data.description} rows="6" placeholder='Product Description' required ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category">
                        <p>Category</p>
                        <select onChange={onChangeHandler} name="category" value={Data.category} id="" required>
                            <option value="">select</option>
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
                        <p>Product Price</p>
                        <input onInput={onChangeHandler} type="number" placeholder='$20' name='price' value={Data.price} required />
                    </div>
                    <div className="add-price">
                        <p>Product Rating</p>
                        <input onInput={onChangeHandler} type="number" placeholder='0-5' name='rating'  value={Data.rating} required  max={5} min={0}/>
                    </div>
                </div>
                <button className='btn-add' type='submit' >ADD</button>

            </form>
        </div>
    )
}

export default Add