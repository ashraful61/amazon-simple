import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity} = props.product

    const reviewItemStyle ={
       borderBottom: '1px solid gray',
       padding: '15px',
       marginLeft: '10%'
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <br/>
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;