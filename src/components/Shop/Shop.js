import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    console.log(fakeData)
    const first10 = fakeData.slice(0,10)
    const [products, setProducts] = useState(first10)
    // console.log(first10)
    const [cart, setCart] = useState([])

    useEffect(() =>{
        const savedCart =  getDatabaseCart()
        console.log(savedCart) 
         const productKeys = Object.keys(savedCart)
         const previousCart = productKeys.map(exsistingkey =>{
             const product = fakeData.find(pd => pd.key === exsistingkey)
             product.quantity = savedCart[exsistingkey]
             return product
         })
         setCart(previousCart) 
        //  console.log(productKeys)
        //  console.log(cartProduct)
     
         },[])


    const handleAddProduct = (product)=>{
        const toBeAdded = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAdded)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity +1
            sameProduct.quantity = sameProduct.quantity + count
            const others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1 
            newCart = [...cart, product] 
        }
         setCart(newCart)
         addToDatabaseCart(product.key, count)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(pd => <Product key={pd.key} showAddToCart={true} product = {pd} handleAddProduct = {handleAddProduct} ></Product>)
                    }
                </ul>
            </div>
           <div className="cart-container">
             <Cart cart={cart}>
             <Link to="review">
            <button className="main-button">Review order</button>
            </Link>
             </Cart>
           </div>
        
        </div>
    );
};

export default Shop;