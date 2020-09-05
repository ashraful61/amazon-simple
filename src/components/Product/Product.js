import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    console.log('pp',props)
    const { img, name, seller, price, stock } = props.product
    return (
        <div className="product">
             <div>
                <img src={img} alt="" />
            </div>
            <div className="product-title">
                <h4 className="product-name">{name}</h4><br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p>Only {stock} left in stock - order soon </p>
                <button onClick = {()=>props.handleAddProduct(props.product)}  className="addCart-button"><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
        </div>
    );
};

export default Product;