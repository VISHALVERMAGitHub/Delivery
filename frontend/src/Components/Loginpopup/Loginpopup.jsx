import React, { useContext, useEffect, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const Loginpopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(() => ({ ...data, [name]: value }));
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState === "Login") {
      newUrl = `${url}/api/user/login`;

    }
    else {
      newUrl = `${url}/api/user/signin`;

    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);   //6:40
    }
    else {
      alert(response.data.message);
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onSubmitHandler}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />

        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <> </> : <input name='name' onChange={onChangeHandler} type='text' value={data.name} placeholder='Enter Your Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Enter your Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing i agree to the terms of use & privacy policy</p>
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account?<span onClick={() => setCurrState("Login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default Loginpopup
