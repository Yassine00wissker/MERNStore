import mongoose from "mongoose";
import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products)
  } catch (error) {
    res.status(500).send({ msg: "Error fetching products" });
  }

};

const getProductById = async (req, res) => {
  try {
    const productId = await Product.findById(req.params.id);
    if (productId) {
      res.json(productId);
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error fetching product" });
  }
}

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    newProduct.owner = req.user._id
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ msg: "product not found" });

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { _id, ...updates } = req.body
    const update = await Product.findByIdAndUpdate(_id, updates, { new: true, runValidators: true });

    if (!update) return res.status(404).json({ msg: "product not found" });

    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const getProductByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    } 
    const userid = new mongoose.Types.ObjectId(req.params.userId);
    const productId = await Product.find({ owner: userid });
    if (productId.length > 0) {
      res.json(productId);
    } else {
      res.status(404).json({ msg: "No Products found for you" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error fetching product" });
  }
}
export { getProducts, getProductById, createProduct, deleteProduct, updateProduct, getProductByUserId };