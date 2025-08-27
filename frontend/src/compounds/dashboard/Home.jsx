import React, { useContext } from 'react'
import Api from '../../services/Api'
import { useState } from 'react'
import { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { user, logout } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      // User is not logged in, redirect to login page
      navigate("/login");
    }
  }, [user, navigate]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Api.get("/products");
        setProducts(res.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [])
  if (!user) return null;
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Products</h1>
      <div>
        <h1>Welcome {user.name} 🎉</h1>
        <p>Email: {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="secondary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Home