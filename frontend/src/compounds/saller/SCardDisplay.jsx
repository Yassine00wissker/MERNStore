import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast container should be mounted once in App.jsx
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "../../services/Api";



function SCardDisplay({ products, setProducts }) {
  const navigate = useNavigate();
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
        <Row>
          {products.map((product) => (
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
      </Container>

      {/* 
       container should be at the root of the app (App.jsx ideally) */}
      <ToastContainer />
    </>
  );
}

export default SCardDisplay;
