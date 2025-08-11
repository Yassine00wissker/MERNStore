import React from 'react'
import Api from '../../services/Api'
import { useState } from 'react'
import { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await Api.get("/products");
            setProducts(res.data)
        } catch (error) {
            console.error("Error fetching products:", error.message)
        }
    }
    fetchProducts()
    }, [])

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Products</h1>
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