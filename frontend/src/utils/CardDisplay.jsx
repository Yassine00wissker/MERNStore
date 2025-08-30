import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AddToCart } from "../compounds/cart/CartSlice.jsx"; // lowercase fix
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast container should be mounted once in App.jsx
import { ToastContainer } from "react-toastify";

function CardDisplay({ products }) {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
    toast.success(`${product.name} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 1500, // disappears after 1.5s
    });
  };

  return (
    <>
      <Container className="mt-4">
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
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
                  <Button
                    variant="warning"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Toast container should be at the root of the app (App.jsx ideally) */}
      <ToastContainer />
    </>
  );
}

export default CardDisplay;
