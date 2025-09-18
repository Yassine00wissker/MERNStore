import SNaveBar from "../saller/SNaveBar.jsx" ;
import CardDisplay from '../../utils/CardDisplay.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import Api from '../../services/Api'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const { user, logout } = useContext(AuthContext);
    useEffect(() => {
        if (!user) {
            // User is not logged in, redirect to login page
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await Api.get("/products");
                setProducts(res.data)
            } catch (error) {
                console.error("Error fetching products:", error.response.data)
            }
        }
        fetchProducts()
    }, [])
    if (!user) return null;

    return (
        <>
        <SNaveBar user={user} logout={logout} />
        <CardDisplay  products={products}/>
        </>
    )
}

export default Dashboard