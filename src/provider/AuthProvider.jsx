import { useEffect, useState } from 'react';
import { authContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import PropTypes from 'prop-types';


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const GoogleProvider = new GoogleAuthProvider();


    const googleLogin = () => {
        return signInWithPopup(auth, GoogleProvider)
    }

    const registerUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userProfileInfo = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };


    const loginUser = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    }




    const handleSignOut = () => {

        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                setUser(null)
            }
            setLoading(false)
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const authInfo = {
        googleLogin,
        user,
        setUser,
        handleSignOut,
        registerUser,
        userProfileInfo,
        loginUser,
        loading,
        
    }

    return (
            <authContext.Provider value={authInfo}>
                {children}
            </authContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object,
}

export default AuthProvider;