import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassWord, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramwork, signInWithEmailAndPassword } from './loginManager';


function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLoginFramwork()

  const  [loggedInUser, setLoggedInUser ] =  useContext(UserContext) 
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  
  const googleSignIn = () =>{
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }

  const fbSignIn = ()=>{
      handleFbSignIn()
      .then(res =>{
        handleResponse(res, true)
      })
  }

  const signOut = ()=>{
      handleSignOut()
      .then(res => {
        handleResponse(res, false)  
      })
  }

  const handleResponse = (res, redirect) =>{
    setUser(res)
    setLoggedInUser(res)
    if(redirect){
      history.replace(from);
    }
  }

 

  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value)
    let isFormValid = true
    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
      // const isEmailValid =  /\S+@\S+\.\S+/.test(event.target.value)
      // console.log(isEmailValid)
    }
    if (event.target.name === 'password') {
      const isPassValid = event.target.value.length > 5
      const isHasNumber = /\d{1}/.test(event.target.value)
      // console.log(isPassValid && isHasNumber)
      isFormValid = isPassValid && isHasNumber
    }

    if (isFormValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value
      setUser(newUserInfo)
    }

  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassWord(user.name,user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
   
    }
    if(!newUser && user.email && user.password){
       signInWithEmailAndPassword(user.email, user.password)
       .then(res => {
        handleResponse(res, true)
      })
    }
    e.preventDefault()
  }

//   const updateUserName = (name)=>{
//     const user =     .auth().currentUser;

//     user.updateProfile({
//       displayName: name
//     }).then(function() {
//       console.log('UserName Updated successful')
//     }).catch(function(error) {
//       // An error happened.
//       console.log(error)
//     });
//   }


  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign In</button>
      }<br/>
      <button onClick={fbSignIn}>Sign In Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      }


      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() =>{setNewUser(!newUser)}} name="newUser" id="" />
      <label htmlFor="newuser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
       { newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Name" />}<br />
          <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your email" required />
          <br />
          <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
          <br />
          <input type="submit" value={newUser? 'SignUp':'SignIn'} />
       
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      { user.success && <p style={{ color: 'green' }}>Users {newUser ? 'created': 'logged in'} successfully</p>}

    </div>
  );
}

export default Login;
