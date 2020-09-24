import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramwork = () =>{
if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}
}

 export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

   return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        console.log(res)
        const { displayName, photoURL, email } = res.user
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        return signedInUser
        // console.log(displayName, photoURL, email)
      })
      .catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  export  const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      const user = result.user;
      user.success = true
      return user
    //   console.log('facebook login',user)
    }).catch(function(error) {
      console.log(error)
    });
  }


 export const handleSignOut = () => {
   return firebase.auth().signOut().then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
     return signedOutUser
    //   console.log('Sign-out successful.')
    }).catch(error => {
        console.log(error)
    });
  }

  export const createUserWithEmailAndPassWord = (name, email, password) =>{
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user 
      newUserInfo.error = ''
      newUserInfo.success = true
      // updateUserName(name)
      return newUserInfo

    })
    .catch(error => {
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false
      return newUserInfo
    });
  }

  export const signInWithEmailAndPassword = (email, password) =>{
   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo = res.user
        newUserInfo.error = ''
        newUserInfo.success = true
        console.log('sign ind user',res.user)
        return newUserInfo
    })
    .catch(error => {
      const newUserInfo = { }
      newUserInfo.error = error.message;
      newUserInfo.success = false
      return newUserInfo
    });
  }
