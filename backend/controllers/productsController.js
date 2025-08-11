const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality Bluetooth headphones with noise cancellation.",
    image: "/images/headphones.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149.99,
    description: "Water-resistant smartwatch with fitness tracking.",
    image: "/images/smartwatch.jpg",
    quantity: 20,
  },
  {
    id: 3,
    name: "Gaming Keyboard",
    price: 79.99,
    description: "Mechanical RGB gaming keyboard with blue switches.",
    image: "/images/keyboard.jpg",
    quantity: 5,
  }
]

const getProducts = async (req,res) => {
    res.send(products)
};

const getProductById = async (req,res) => {
    const product = products.find(p => p.id === Number(req.params.id));

    if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}
export { getProducts, getProductById};