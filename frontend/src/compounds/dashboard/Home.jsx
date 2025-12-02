import React, { useContext } from 'react'
import Api from '../../services/Api'
import { useState } from 'react'
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardDisplay from '../../utils/CardDisplay';
import NaveBar from './NaveBar.jsx';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useSelector((state) => state.cart);
  
  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

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
        console.error("Error fetching products:", error.response?.data || error.message)
      }
    }
    fetchProducts()
  }, [])
  
  if (!user) return null;
  
  return (
    <>
      <NaveBar user={user} logout={logout} cartCount={cartCount} />
      <CardDisplay products={products} />
    </>
  )
}

export default Home