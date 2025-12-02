import { useSelector, useDispatch } from "react-redux";
import { RemoveFromCart, UpdateQty, ClearCart } from "../cart/CartSlice";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Checkout from "../../utils/Checkout.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import NaveBar from "./NaveBar.jsx";

function CartPage() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();
  
  const total = cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  const itemCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <NaveBar user={user} logout={logout} cartCount={itemCount} />
      <Container className="mt-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0" style={{ color: 'var(--text-primary)' }}>
              🛒 Shopping Cart
            </h2>
            {cartItems.length > 0 && (
              <Badge bg="primary" style={{ fontSize: '1rem', padding: '8px 16px' }}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </div>

          {cartItems.length === 0 ? (
            <Card className="text-center py-5" style={{ 
              backgroundColor: 'var(--card-bg)',
              border: '2px dashed var(--border-color)'
            }}>
              <Card.Body>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  Your cart is empty
                </h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Start shopping to add items to your cart
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/")}
                  style={{
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 32px',
                  }}
                >
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              <Col lg={8} className="mb-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className="mb-3 shadow-sm" 
                      style={{ 
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px var(--card-shadow)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px var(--card-shadow)';
                      }}
                    >
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: '100%',
                                  maxWidth: '150px',
                                  height: '150px',
                                  objectFit: 'cover',
                                  borderRadius: '12px',
                                  border: '2px solid var(--border-color)',
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: '100%',
                                  maxWidth: '150px',
                                  height: '150px',
                                  backgroundColor: 'var(--bg-secondary)',
                                  borderRadius: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  margin: '0 auto',
                                  fontSize: '3rem',
                                }}
                              >
                                📦
                              </div>
                            )}
                          </Col>
                          <Col xs={12} md={6} className="mb-3 mb-md-0">
                            <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                              {item.name}
                            </h5>
                            <p 
                              className="mb-2" 
                              style={{ 
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem'
                              }}
                            >
                              {item.description || 'No description available'}
                            </p>
                            <div className="d-flex align-items-center mb-2">
                              <span 
                                style={{ 
                                  color: 'var(--primary-color)',
                                  fontSize: '1.5rem',
                                  fontWeight: 'bold'
                                }}
                              >
                                ${item.price?.toFixed(2) || '0.00'}
                              </span>
                              <span 
                                className="ms-3" 
                                style={{ color: 'var(--text-secondary)' }}
                              >
                                × {item.qty || 1}
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <span style={{ color: 'var(--text-secondary)', marginRight: '10px' }}>
                                Quantity:
                              </span>
                              <div className="input-group" style={{ width: 'auto' }}>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() =>
                                    dispatch(UpdateQty({ _id: item._id, qty: Math.max(1, (item.qty || 1) - 1) }))
                                  }
                                  style={{
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    minWidth: '40px',
                                  }}
                                >
                                  −
                                </Button>
                                <input
                                  type="text"
                                  className="form-control text-center"
                                  value={item.qty || 1}
                                  readOnly
                                  style={{
                                    width: '60px',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    backgroundColor: 'var(--input-bg)',
                                    color: 'var(--text-primary)',
                                  }}
                                />
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() =>
                                    dispatch(UpdateQty({ _id: item._id, qty: (item.qty || 1) + 1 }))
                                  }
                                  style={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    minWidth: '40px',
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} md={3} className="text-center text-md-end">
                            <div className="mb-3">
                              <h6 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Subtotal
                              </h6>
                              <h5 style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                                ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
                              </h5>
                            </div>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                dispatch(RemoveFromCart({ _id: item._id }));
                                toast.success(`${item.name} removed from cart`, {
                                  position: "top-right",
                                  autoClose: 1500,
                                });
                              }}
                              style={{
                                borderRadius: '8px',
                                padding: '8px 20px',
                              }}
                            >
                              <i className="bi bi-trash"></i> Remove
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </motion.div>
                ))}
              </Col>

              <Col lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card 
                    className="sticky-top" 
                    style={{ 
                      top: '20px',
                      backgroundColor: 'var(--card-bg)',
                      border: '2px solid var(--border-color)',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px var(--card-shadow)',
                    }}
                  >
                    <Card.Header 
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        borderBottom: '2px solid var(--border-color)',
                        borderRadius: '16px 16px 0 0',
                      }}
                    >
                      <h5 className="mb-0" style={{ color: 'var(--text-primary)' }}>
                        Order Summary
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-3">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Items ({itemCount}):
                        </span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Shipping:
                        </span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                          Free
                        </span>
                      </div>
                      <hr style={{ borderColor: 'var(--border-color)' }} />
                      <div className="d-flex justify-content-between mb-4">
                        <h5 style={{ color: 'var(--text-primary)' }}>Total:</h5>
                        <h4 
                          style={{ 
                            color: 'var(--primary-color)',
                            fontWeight: 'bold'
                          }}
                        >
                          ${total.toFixed(2)}
                        </h4>
                      </div>
                      <div className="d-grid gap-2">
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => setShowCheckout(true)}
                          style={{
                            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '14px',
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                          }}
                        >
                          <i className="bi bi-credit-card me-2"></i>
                          Proceed to Checkout
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="lg"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to clear your cart?')) {
                              dispatch(ClearCart());
                              toast.info('Cart cleared', {
                                position: "top-right",
                                autoClose: 1500,
                              });
                            }
                          }}
                          style={{
                            borderRadius: '12px',
                            padding: '12px',
                            borderWidth: '2px',
                          }}
                        >
                          <i className="bi bi-trash me-2"></i>
                          Clear Cart
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="lg"
                          onClick={() => navigate("/")}
                          style={{
                            borderRadius: '12px',
                            padding: '12px',
                            borderWidth: '2px',
                          }}
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          Continue Shopping
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          )}

          <Checkout 
            show={showCheckout} 
            handleClose={() => setShowCheckout(false)} 
            products={cartItems} 
          />
        </motion.div>
      </Container>
      <ToastContainer />
    </>
  );
}

export default CartPage;
