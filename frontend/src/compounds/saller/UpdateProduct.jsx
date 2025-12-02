import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Api from '../../services/Api'
import { toast } from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Api.get(`/products/${id}`);
        setProduct(res.data);
        if (res.data.image) {
          setImagePreview(res.data.image);
        }
      } catch (error) {
        console.error("Error fetching product:", error.response?.data || error.message);
      }
    }
    fetchProduct();
  }
    , [id])
    
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
      
      await Api.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      <div className="container mt-4 ">
        <button className='btn btn-lg btn-info text-light' onClick={() => navigate('/myproducts')}><IoArrowBackSharp /></button>

        <h2 className='text-center'>Update Product</h2>

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