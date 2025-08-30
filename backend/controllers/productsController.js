import product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.send(products)
  } catch (error) {
    res.status(500).send({ message: "Error fetching products" });
  }

};

const getProductById = async (req, res) => {
  try {
    const productId = await product.findById(req.params.id);
    if (productId) {
      res.json(productId);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
}
export { getProducts, getProductById };