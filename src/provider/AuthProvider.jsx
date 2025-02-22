import { useEffect, useState } from 'react';
import { authContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import PropTypes from 'prop-types';


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const GoogleProvider = new GoogleAuthProvider();


    const googleLogin = () => {
        return signInWithPopup(auth, GoogleProvider)
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