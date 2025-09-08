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
export { getProducts, getProductById };