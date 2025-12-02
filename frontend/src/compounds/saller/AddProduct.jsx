import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import { IoArrowBackSharp } from "react-icons/io5";

function AddProduct() {
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        quantity: "",
        owner: "",
    })
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (!user) {
            // User is not logged in, redirect to login page
            navigate("/login");
        }
    }, [user, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category);
            formData.append("quantity", product.quantity);
            
            // If file is selected, append it; otherwise append image URL
            if (imageFile) {
                formData.append("image", imageFile);
            } else if (product.image) {
                formData.append("image", product.image);
            }
            
            await Api.post("/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(`+ new product`, {
                position: "top-right",
                autoClose: 1500,
            });
            navigate("/myproducts");
        } catch (error) {
            toast.error(`product not added`, {
                position: "top-right",
                autoClose: 1500,
            });
            console.log(error.response?.data || error.message)
        }
    }
    const handleChange = (e) => {
        if (e.target.name === "image" && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProduct({
                ...product,
                [e.target.name]: e.target.value
            });
        }
    };


    return (
        <>
            <button className='btn btn-lg btn-info text-light m-5' onClick={()=> navigate('/myproducts')}><IoArrowBackSharp /></button>
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
                            min="0"
                            step="0.01"

                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Image</label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            accept="image/*"
                            onChange={handleChange}
                        />
                        {imagePreview && (
                            <div className="mt-2">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
                                    className="img-thumbnail"
                                />
                            </div>
                        )}
                        {!imageFile && (
                            <div className="mt-2">
                                <label className="form-label">Or enter Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    className="form-control"
                                    value={product.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        )}
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
                            min="1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-dark"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddProduct