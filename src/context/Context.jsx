import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

    const AppContext = createContext()

    export const AppProvider = ({children}) => {
        const [user,setUser] = useState(null);
        const [userName,setUserName] = useState(null);
    
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (newUser) => {
                setUser(newUser);
    
            
            });
            return () => {
                unsubscribe();
            };
        },[auth])
    
    return (
      <AppContext.Provider value={{user,setUser,userName,setUserName}}>
        {children}  
      </AppContext.Provider>
    )
    }

export default AppContext