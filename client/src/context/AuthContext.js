import { createContext, useState} from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [authtoken, setAuthToken] = useState('');
    const [loggedIn,setLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value={{authtoken, setAuthToken, loggedIn, setLoggedIn}}>
           {children}
        </AuthContext.Provider>
    );

}