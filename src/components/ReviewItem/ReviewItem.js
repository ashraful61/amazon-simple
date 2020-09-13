import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity,key,price} = props.product
    const handleRemoveProduct = props.handleRemoveProduct

    const reviewItemStyle ={
       borderBottom: '1px solid gray',
       padding: '15px',
       marginLeft: '10%'
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>{price}</small></p>
            <br/>
            <button onClick={()=>handleRemoveProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;