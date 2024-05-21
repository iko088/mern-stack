import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [services, setServices] = useState("");
    const authorizationToken = `Bearer ${token}`;


    const storetokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    // JWT Authorization - to get the currently loggedIN User data 
    const userAuthorization = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/user',{
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setUser(data)
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fetching user data")
        }
    }

    // Get data of services from databse 
   // Get data of services from database
const getServices = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/data/services', {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.msg);

            // Assuming your data is an array, set it in the state
            setServices(data.msg);
        }
    } catch (error) {
        console.log("Error fetching services data", error);
    }
}


    useEffect(()=> {
        getServices();
        userAuthorization();
    },[])

return (
    <AuthContext.Provider value={{storetokenInLS, LogoutUser, isLoggedIn, user, services, authorizationToken, isLoading}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext)
    if(!AuthContextValue){
        throw new Error("useAuth use outside of the provider")
    }
    return AuthContextValue;
}