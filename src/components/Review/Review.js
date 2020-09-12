import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'

const Review = () => {
    const [cart, setCart] = useState([])
    
    useEffect(() =>{
   const saveCart =  getDatabaseCart();
   console.log(saveCart) 
    const productKeys = Object.keys(saveCart)
    const cartProduct = productKeys.map(key =>{
        const product = fakeData.find(pd => pd.key === key)
        product.quantity = saveCart[key]
        return product
    })
    setCart(cartProduct) 
    console.log(productKeys)
    console.log(cartProduct)

    },[])

    return (
        <div>
            Cart Items: {cart.length}
            {
                 cart.map(pd => <ReviewItem key={pd.key} product={pd}></ReviewItem>)
             }
        </div>
    );
};

export default Review;