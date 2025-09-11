import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

function AddProduct() {
    const navigate = useNavigate()
    const [product,setProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        quantity: "",
        owner: "",
    })
    const {user} = useContext(AuthContext)
    useEffect(() => {
        if (!user) {
          // User is not logged in, redirect to login page
          navigate("/login");
        }
      }, [user, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        product.owner = user._id;

        try {
            await Api.post("/products", product);
            toast.success(`+ new product`, {
                position: "top-right",
                autoClose: 1500, // disappears after 4s
            });
            navigate("/myproducts");
        } catch (error) {
            toast.error(`product not added`, {
                position: "top-right",
                autoClose: 1500, // disappears after 4s
            });
            console.log(error.data)
        }
}
        const handleChange = (e) => {
            setProduct({
                ...product,
                [e.target.name]:e.target.value
            });
        };

    
    return (
        <>
            <div className="container mt-4">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            value={product.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            className="form-control"
                            value={product.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input
                            type="text"
                            name="category"
                            className="form-control"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={product.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-dark"
                        onClick={handleSubmit}
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddProduct