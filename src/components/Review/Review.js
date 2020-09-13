import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const handlePlaceOrder = () => {
        // console.log('placed order')
        setCart([])
        setOrderPlaced(true)
        processOrder()
    }
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }

    const handleRemoveProduct = (productKey)=>{
        console.log('removed',productKey)
        const newCart = cart.filter(product => product.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    
    useEffect(() =>{
   const savedCart =  getDatabaseCart();
//    console.log(savedCart) 
    const productKeys = Object.keys(savedCart)
    const cartProduct = productKeys.map(key =>{
        const product = fakeData.find(pd => pd.key === key)
        product.quantity = savedCart[key]
        return product
    })
    setCart(cartProduct) 
    console.log(productKeys)
    console.log(cartProduct)

    },[])

    return (
        <div className="twin-container"> 
           <div className="product-container">
           {
                 cart.map(pd => <ReviewItem key={pd.key} product={pd} handleRemoveProduct={handleRemoveProduct}></ReviewItem>)
             }
             {
                 thankYou
             }
          </div>
         <div className="cart-container">
             <Cart cart={cart}>
                 <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
             </Cart>
         </div>
            
        </div>
    );
};

export default Review;