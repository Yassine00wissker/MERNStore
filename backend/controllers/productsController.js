import product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.send(products)
  } catch (error) {
    res.status(500).send({ msg: "Error fetching products" });
  }

};

const getProductById = async (req, res) => {
  try {
    const productId = await product.findById(req.params.id);
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
    const newProduct = new product(req.body);
    newProduct.owner = req.user._id
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const deleteProduct = async (req,res) => {
  try {
    const deleted = await product.findByIdAndDelete(req.body._id);

    if(!deleted) return res.status(404).json({ msg: "product not found" });
    
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const updateProduct = async (req,res) => {
  try {
    const {_id ,...updates} = req.body
    const update = await product.findByIdAndUpdate(_id,updates,{ new:true , runValidators: true});

    if(!update) return res.status(404).json({ msg: "product not found" });
    
    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
export { getProducts, getProductById, createProduct, deleteProduct, updateProduct};