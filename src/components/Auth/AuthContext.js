import React, { useEffect, useContext, useState } from 'react'
import firebase from 'firebase';
import { auth } from '../Firebase/firebase'

const Authenticator = React.createContext()
const addTeacherRole = firebase.functions().httpsCallable('addTeacherRole');

export function useAuthenticator(){
    return useContext(Authenticator)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [working, setWorking] = useState(true)

    async function signup(email, password) {
        var user = await auth.createUserWithEmailAndPassword(email, password);
        console.log("user created")
            var response = await addTeacherRole({ email: email });
            console.log(response);
        return user;
    }
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setWorking(false)
        })
    
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
      }

      return (
        <Authenticator.Provider value={value}>
          {!working && children}
        </Authenticator.Provider>
      )
    }
