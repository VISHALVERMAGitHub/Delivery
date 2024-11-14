import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const url = 'http://localhost:4000';
    const [token, setToken] = useState("")
    const [cartItems, setCartItems] = useState({})

    const [food_list, setFoodList] = useState([]);
    
    const addToCart = async(itemId) => {
        if (!cartItems[itemId]  ) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post((url+"/api/cart/add") , {itemId} ,{headers:{token}})
        }
    }
    const removeFromCart =async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(url+"/api/cart/remove" , {itemId} , {headers:{token}})
        }
    }

    const fetchCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get" ,{},{headers:{token}})
        setCartItems(response.data.cartData)
    }
    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (let item in cartItems) {
            if (cartItems[item] > 0 ) {
                let iteminfo = food_list.find((product) => (product._id === item));
                totalAmount += iteminfo.price * cartItems[item];
            }

        }
        return totalAmount;
    }

    const totalcount = () => {
        let count = 0;
        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                count += cartItems[item]
            }
        }
        return count;
    }
    const fetchFoodList = async () => {
        const response = await axios.get( url +"/api/food/list");
        // console.log(response.data)
        if (response.data.success) {
            setFoodList(response.data.data)
        }
    }
    
    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {  // on refresh => no change
                setToken(localStorage.getItem("token"))
                fetchCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [food_list])

    

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        totalcount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider