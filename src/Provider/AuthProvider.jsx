import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('Logged in user', currentUser);
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                axiosPublic.post('/jwt', {email: currentUser?.email})
                .then(res=>console.log('Token', res.data))
            }
            else{
                axiosPublic.post('/logout', {email: currentUser?.email})
                .then(res=>console.log(res.data))
            }
        })
        return()=>{
            unSubscribe();
        }
    }, [axiosPublic])
    const update = (name, photo) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleLogin = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    const facebookLogin = () =>{
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    }
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }
    const authInfo = {user, loading, setLoading, createUser, login, update, logOut, googleLogin, facebookLogin};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node
}
export default AuthProvider;