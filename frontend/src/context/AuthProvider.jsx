import React, { createContext, useContext, useEffect, useState } from 'react'

function AuthProvider({child}) {
    const authContext = createContext(null);

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [token,setToken] = useState(()=> localStorage.getItem("token"));

    useEffect(()=>{
        async function init() {
            if(!token) {
                setLoading(false)
                return;
            }
            const res = await api.getMe("token");//api.getMe to be done in apis helpers
            if(res.ok) setUser(res.user);
            else {
                localStorage.removeItem("token");
                setToken(null)
            }
            setLoading(false);
        }
        init();
    }, [token])

    const login = async (email, password, remember) => {
        const res = await api.login(email, password); //api.login to be change and done in apis helpers 
        setLoading(false);
        if(res.ok){
            setUser(res.user);
            setToken(user.token);
            if(remember) localStorage.setItem("token", res.token);
            else sessionStorage.setItem("token", res.token);
        }
        return res;
    }

    const signup = async (name, email, password, phone) => {
        setLoading(true);
        const res = await api.signup(name, email, password, phone);//api.login to be change and done in apis helpers 
        setLoading(false);
        if(res.ok){
            setUser(res.user)
            setToken(res.token)
            localStorage.setItem("token",res.token)
        }
        return res;
    }

    const logout = () =>{
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token")
    }
  return (
    <>
    <authContext.Provider value={{user, token, login, signup, logout}}>
        {child}
    </authContext.Provider>
    </>
  )
}

export default AuthProvider
export const useAuth = () => useContext(authContext)