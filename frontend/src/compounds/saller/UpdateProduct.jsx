import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Api from '../../services/Api'
import { toast } from "react-toastify";

function UpdateProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    quantity: "",
  })
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Api.get(`/products/${id}`);
        setProduct(res.data)
      } catch (error) {
        console.error("Error fetching product:", error.response?.data || error.message);
      }
    }
    fetchProduct();
  }
    , [id])
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`/products/${id}`, product)
      toast.success(`product ${product.name} updated `, {
                position: "top-right",
                autoClose: 1500, 
            });
      navigate("/myproducts")
    } catch (error) {
      console.error("Error updating product", error.response?.data || error.message)
      toast.error(`Some Error`, {
                position: "top-right",
                autoClose: 1500, 
            });
    }
  }

  return (
    <>
      <div className="container mt-4">
        <h2>Update Product</h2>
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
          >
            Save
          </button>
        </form>
      </div>
    </>
  )
}

export default UpdateProduct