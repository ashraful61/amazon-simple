import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
    
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        
        <input className="ship-from-input" defaultValue={loggedInUser.name} name="name" placeholder="Your Name" ref={register({ required: true })} />
         {errors.name && <span className="error">Name is required*</span>}
         <input className="ship-from-input" defaultValue={loggedInUser.email} name="email" placeholder="Your Email address" ref={register({ required: true })} />
         {errors.email && <span className="error">Email is required*</span>}
         <input className="ship-from-input" name="address" placeholder="Your Address" ref={register({ required: true })} />
         {errors.address && <span className="error">Address is required*</span>}
         <input className="ship-from-input" name="phone" placeholder="Your Phone" ref={register({ required: true })} />
         {errors.phone && <span className="error">Phone is required*</span>}

        <br/>
        <input type="submit" />
      </form>
    );
};

export default Shipment;