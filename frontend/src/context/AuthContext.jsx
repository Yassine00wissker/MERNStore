import React, { useEffect } from 'react'
import Api from '../services/Api'
import { createContext } from 'react'
import { useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const restoreUser = async () => {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (token) {
                try {
                    const res = await Api.get("/users/me");
                    setUser(res.data);
                } catch (err) {
                    console.error("Failed to restore user:", err);
                    localStorage.removeItem("token");
                    sessionStorage.removeItem("token");
                    setUser(null);
                }
            }
            setLoading(false);
        };
        restoreUser();
    }, []);
    const login = async (email, password, rememberMe) => {
        try {
            const res = await Api.post('users/login',
                {
                    email, password
                })
            console.log("login successful")
            if (rememberMe) localStorage.setItem('token', res.data.token)
            else sessionStorage.setItem('token', res.data.token)
            setUser(res.data.user);

            return res.data.user;
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage = error.response?.data?.msg || error.response?.data?.message || error.message || "Login failed! Please check your credentials.";
            throw new Error(errorMessage);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        // Note: We keep 'rememberedEmail' and 'rememberMe' so user doesn't have to re-enter email
        // If you want to clear them on logout, uncomment the lines below:
        // localStorage.removeItem('rememberedEmail');
        // localStorage.removeItem('rememberMe');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}