import React from 'react'
import Api from '../services/Api'
import { createContext } from 'react'
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);

    const login = async (email, password, rememberMe) => {
        const res = await Api.post('users/login', {email, password})
        if(rememberMe) localStorage.setItem('token', res.data.token)
        else sessionStorage.setItem('token', res.data.token)
    setUser(res.data.user);
    }

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}