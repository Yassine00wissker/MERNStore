import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast container should be mounted once in App.jsx
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Api from "../../services/Api";



function SCardDisplay({ products, setProducts }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [products]);

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const del = async (product) => {
    try {
      console.log(product._id)
      const res = await Api.delete(`/products/${product._id}`)
      console.log("Deleted:", res.data);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
    }
  }

  return (
    <>
      <Container className="mt-4">
        {/* Search and Filter Section */}
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search your products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Results count */}
        {filteredProducts.length !== products.length && (
          <Row className="mb-3">
            <Col>
              <p className="text-muted">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </Col>
          </Row>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Row>
            <Col>
              <div className="text-center py-5">
                <h4 className="text-muted">No products found</h4>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            {filteredProducts.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm position-relative">
                <Button
                  variant="light"
                  size="lg"
                  className="position-absolute top-0 end-0 m-2 rounded-circle"
                  onClick={() => del(product)}
                >
                  X
                </Button>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title className="text-danger">{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text className="text-success">${product.price}</Card.Text>
                  <Button variant="outline-primary" size="lg" onClick={() => navigate(`updateproduct/${product._id}`)}>Update Now</Button>
                  <Button variant="outline-success" className="mx-5" size="lg" onClick={() => navigate(`/myproducts/orders/${product._id}`)}>Orders</Button>
                </Card.Body>
              </Card>
            </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* 
       container should be at the root of the app (App.jsx ideally) */}
      <ToastContainer />
    </>
  );
}

export default SCardDisplay;
