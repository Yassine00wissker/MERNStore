import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CardDisplay from '../../utils/CardDisplay';
import Api from '../../services/Api';
import { AuthContext } from '../../context/AuthContext';

function ListProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if(!user?._id) return

        const fetchProducts = async () => {
            try {
                const res = await Api.get(`/products/${user._id}`);
                setProducts(res.data)
            } catch (error) {
                console.error("Error fetching products:", error.response.data)
            }
        }
        fetchProducts()
    }, [user])
        useEffect(() => {
            if (!user) {
              // User is not logged in, redirect to login page
              navigate("/login");
            }
          }, [user, navigate]);
    return (
        <>
            <button className='btn btn-info text-light rounded-pill'
            onClick={()=>{navigate("addproduct")}}>add product</button>
            <CardDisplay products={products}/>
        </>

    )
}

export default ListProducts