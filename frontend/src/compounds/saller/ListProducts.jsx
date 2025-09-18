import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SCardDisplay from './SCardDisplay';
import Api from '../../services/Api';
import { AuthContext } from '../../context/AuthContext';
import { IoArrowBackSharp } from "react-icons/io5";

function ListProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { user, loading } = useContext(AuthContext)
    useEffect(() => {
        if (loading) return; // wait until AuthContext finishes loading
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchProducts = async () => {
            try {
                const res = await Api.get(`/products/user/${user.id}`);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err.response?.data || err.message);
            }
        };

        fetchProducts();
    }, [user, loading, navigate]);
    return (
        <>
            <div className='d-flex justify-content-between align-items-center m-5' ><button className='btn btn-lg btn-info text-light' onClick={() => navigate('/myproducts')}><IoArrowBackSharp /></button>
            <button className='btn btn-success btn-lg text-light rounded-pill ms-5  mx-5'
                onClick={() => { navigate("addproduct") }}>add product</button></div>
            <SCardDisplay products={products} setProducts={setProducts} />
        </>

    )
}

export default ListProducts