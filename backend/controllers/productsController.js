import mongoose from "mongoose";
import Product from "../models/Product.js";
import path from "path";
import fs from "fs";

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
    const { name, description, price, category, quantity, image } = req.body;
    
    // If file is uploaded, use the file path; otherwise use the image URL from body
    let imageUrl = image;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }
    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      image: imageUrl,
      owner: req.user._id
    });
    
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    // If file was uploaded but product creation failed, delete the file
    if (req.file) {
      try {
        fs.unlinkSync(path.join(process.cwd(), "uploads", req.file.filename));
      } catch (e) {
        // Ignore unlink errors
      }
    }
    res.status(500).json({ msg: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) return res.status(404).json({ msg: "product not found" });

    // Delete associated image file if it exists and is stored locally
    if (product.image && product.image.includes("/uploads/")) {
      const imagePath = product.image.split("/uploads/")[1];
      const fullImagePath = path.join(process.cwd(), "uploads", imagePath);
      try {
        if (fs.existsSync(fullImagePath)) {
          fs.unlinkSync(fullImagePath);
        }
      } catch (e) {
        // Ignore unlink errors
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category, quantity, image } = req.body;
    
    // Find the existing product to get the old image path
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      // If file was uploaded but product not found, delete the file
      if (req.file) {
        try {
          fs.unlinkSync(path.join(process.cwd(), "uploads", req.file.filename));
        } catch (e) {
          // Ignore unlink errors
        }
      }
      return res.status(404).json({ msg: "product not found" });
    }

    // If a new file is uploaded, use it and delete the old one
    let imageUrl = image || existingProduct.image;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      
      // Delete old image file if it exists and is stored locally
      if (existingProduct.image && existingProduct.image.includes("/uploads/")) {
        const oldImagePath = existingProduct.image.split("/uploads/")[1];
        const fullOldPath = path.join(process.cwd(), "uploads", oldImagePath);
        try {
          if (fs.existsSync(fullOldPath)) {
            fs.unlinkSync(fullOldPath);
          }
        } catch (e) {
          // Ignore unlink errors
        }
      }
    }

    const updates = {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: price || existingProduct.price,
      category: category || existingProduct.category,
      quantity: quantity || existingProduct.quantity,
      image: imageUrl
    };

    const updated = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true });

    res.status(200).json(updated);
  } catch (error) {
    // If file was uploaded but update failed, delete the file
    if (req.file) {
      try {
        fs.unlinkSync(path.join(process.cwd(), "uploads", req.file.filename));
      } catch (e) {
        // Ignore unlink errors
      }
    }
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