import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SCardDisplay from './SCardDisplay';
import Api from '../../services/Api';
import { AuthContext } from '../../context/AuthContext';
function ListProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { user, loading } = useContext(AuthContext)
    useEffect(() => {
        if (loading) return ; // wait until AuthContext finishes loading
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
            <button className='btn btn-info text-light rounded-pill'
                onClick={() => { navigate("addproduct") }}>add product</button>
            <SCardDisplay products={products} setProducts={setProducts} />
        </>

    )
}

export default ListProducts