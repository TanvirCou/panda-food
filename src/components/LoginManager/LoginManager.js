/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail, signOut, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    const app = initializeApp(firebaseConfig);
}

const setUserToken = () => {
    getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      localStorage.setItem('token', idToken);
    }).catch(function(error) {
      //console.log(error);
    });
  }

export const createUserWithEmailAndPass = (name, email, password) => {
    const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
                .then(res => {
                    const newUserInfo = res.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    updateUserName(name);
                    verifyEmail();
                    return newUserInfo;
                })
                .catch(err => {
                    const newUserInfo = {};
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    return newUserInfo;
                });
}

export const signInWithEmailAndPass = async(email, password) => {
    const auth = getAuth();
        return await signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    const { displayName, email, emailVerified,  photoURL } = res.user;
                    const user = {
                        name: displayName,
                        email: email,
                        photoURL: photoURL,
                        emailVerified
                    }
                    user.error = '';
                    user.success = true;
                    setUserToken();                  
                    return user;
                })
                .catch((error) => {
                   const user = {};
                    user.error = error.message;
                    user.success = false;
                    return user;
                });
}


const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
    displayName: name
    })
    .then(res => {
        //console.log("Successfully done", res);
    })
    .catch(error => {
        //console.log(error.message);
    });
};

const verifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
    .then(() => {
        // Email verification sent!
        // ...
    });
};

export const resetPassword = (email) => {
        const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then((res) => {
        //console.log(res);
    })
    .catch((error) => {
        //console.log(error);
    });
};

export const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    //console.log(error);
    });
};