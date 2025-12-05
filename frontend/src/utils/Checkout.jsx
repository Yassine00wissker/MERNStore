import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Api from "../services/Api.jsx";
import { toast } from "react-toastify";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Checkout({ show, handleClose, products }) {
  // Shipping information state
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Payment info state
  const [paymentInfo, setPaymentInfo] = useState({
    method: "creditCard",
  });

  // Order state for PayPal
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isProcessingPayPal, setIsProcessingPayPal] = useState(false);

  // Reset form when modal closes
  const handleModalClose = () => {
    if (!isProcessingPayPal) {
      setShippingInfo({
        address: "",
        city: "",
        postalCode: "",
        country: "",
      });
      setPaymentInfo({
        method: "creditCard",
      });
      setCurrentOrder(null);
      setIsProcessingPayPal(false);
      handleClose();
    }
  };

  // Validate shipping info
  const validateShippingInfo = () => {
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.country) {
      toast.error("Please fill in all shipping information!");
      return false;
    }
    return true;
  };

  // Create order in database first
  const createOrderInDB = async () => {
    if (!products || products.length === 0) {
      toast.error("No products selected!", {
        position: "top-right",
        autoClose: 2000,
      });
      return null;
    }

    if (!validateShippingInfo()) {
      return null;
    }

    // Prepare items for the backend
    const orderItems = products.map((item) => {
      if (!item._id) {
        console.error("Product missing _id:", item);
        return null;
      }
      return {
        product: item._id,
        quantity: item.qty || 1,
        price: item.price,
      };
    }).filter(item => item !== null);

    if (orderItems.length === 0) {
      toast.error("Invalid products in cart!", {
        position: "top-right",
        autoClose: 2000,
      });
      return null;
    }

    // Calculate total
    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    if (totalPrice <= 0) {
      toast.error("Invalid order total!", {
        position: "top-right",
        autoClose: 2000,
      });
      return null;
    }

    const orderData = {
      items: orderItems,
      shippingInfo,
      paymentInfo,
      totalprice: totalPrice,
    };

    try {
      const res = await Api.post("/order", orderData);
      if (res.data && res.data.order) {
        return res.data.order;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.msg || error.message || "Error creating order!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
      return null;
    }
  };

  // Place order (for credit card - non-PayPal)
  const handlePlaceOrder = async () => {
    try {
      const order = await createOrderInDB();
      if (order) {
        toast.success("Order placed successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        handleModalClose();
        // Reload to update cart
        
      }
    } catch (error) {
      console.error("Place order error:", error);
      toast.error("Failed to place order. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // PayPal create order handler
  const createPayPalOrder = async () => {
    setIsProcessingPayPal(true);
    try {
      const order = await createOrderInDB();
      
      if (!order || !order._id) {
        setIsProcessingPayPal(false);
        return null;
      }

      setCurrentOrder(order);

      const res = await Api.post("/paypal/create-order", { orderId: order._id });
      
      if (res.data && res.data.orderId) {
        setIsProcessingPayPal(false);
        return res.data.orderId;
      } else {
        throw new Error("Invalid response from PayPal order creation");
      }
    } catch (error) {
      console.error("PayPal order creation error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create PayPal order!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
      });
      setIsProcessingPayPal(false);
      setCurrentOrder(null);
      return null;
    }
  };

  // PayPal onApprove handler
  const onPayPalApprove = async (data, actions) => {
    try {
      if (!currentOrder || !currentOrder._id) {
        toast.error("Order not found. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
        setIsProcessingPayPal(false);
        return;
      }

      // Capture the payment
      const res = await Api.post("/paypal/capture", {
        orderId: currentOrder._id,
        paypalOrderId: data.orderID,
      });

      if (res.data && res.data.order && res.data.order.isPaid) {
        toast.success("Payment successful! Order confirmed.", {
          position: "top-right",
          autoClose: 2000,
        });
        handleModalClose();
        // Clear cart and reload after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Payment failed. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
        setIsProcessingPayPal(false);
      }
    } catch (error) {
      console.error("PayPal capture error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to process payment!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
      setIsProcessingPayPal(false);
    }
  };

  // PayPal onError handler
  const onPayPalError = (err) => {
    console.error("PayPal error:", err);
    toast.error("PayPal payment error. Please try again.", {
      position: "top-right",
      autoClose: 2000,
    });
    setIsProcessingPayPal(false);
    setCurrentOrder(null);
  };

  // PayPal onCancel handler
  const onPayPalCancel = () => {
    toast.info("Payment cancelled.", {
      position: "top-right",
      autoClose: 1500,
    });
    setIsProcessingPayPal(false);
    setCurrentOrder(null);
  };

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleModalClose} 
        centered
        backdrop={isProcessingPayPal ? 'static' : true}
        keyboard={!isProcessingPayPal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <h4 className="mb-3" style={{ color: 'var(--text-primary)' }}>Order Summary</h4>
          <div className="mb-3" style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: '12px', 
            borderRadius: '8px' 
          }}>
            {products && products.length > 0 ? (
              products.map((item) => (
                <div key={item._id || item.id} className="mb-2 d-flex justify-content-between align-items-center">
                  <span style={{ color: 'var(--text-primary)' }}>
                    {item.name || 'Product'} - ${item.price?.toFixed(2) || '0.00'} x {item.qty || 1}
                  </span>
                  <strong style={{ color: 'var(--primary-color)' }}>
                    ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
                  </strong>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No products in cart</p>
            )}
            <hr style={{ borderColor: 'var(--border-color)' }} />
            <div className="d-flex justify-content-between align-items-center">
              <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Total:</strong>
              <strong style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>
                ${products
                  ? products.reduce(
                      (acc, item) => acc + (item.price || 0) * (item.qty || 1),
                      0
                    ).toFixed(2)
                  : '0.00'}
              </strong>
            </div>
          </div>

          {/* Shipping Info */}
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>Shipping Information</h4>
          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Address *"
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              required
              style={{
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)',
                border: '1px solid var(--input-border)',
              }}
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              placeholder="City *"
              value={shippingInfo.city}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, city: e.target.value })
              }
              required
              style={{
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)',
                border: '1px solid var(--input-border)',
              }}
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Postal Code *"
              value={shippingInfo.postalCode}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
              }
              required
              style={{
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)',
                border: '1px solid var(--input-border)',
              }}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Country *"
              value={shippingInfo.country}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, country: e.target.value })
              }
              required
              style={{
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)',
                border: '1px solid var(--input-border)',
              }}
            />
          </div>

          {/* Payment Info */}
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>Payment Method</h4>
          <select
            className="form-control mb-3"
            value={paymentInfo.method}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, method: e.target.value })
            }
            disabled={isProcessingPayPal}
            style={{
              backgroundColor: 'var(--input-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--input-border)',
            }}
          >
            <option value="creditCard">Credit Card (Manual)</option>
            <option value="paypal">PayPal</option>
          </select>

          {/* PayPal Button */}
          {paymentInfo.method === "paypal" && (
            <div className="mt-3">
              {import.meta.env.VITE_PAYPAL_CLIENT_ID && import.meta.env.VITE_PAYPAL_CLIENT_ID.trim() !== '' ? (
                <PayPalButtons
                  createOrder={createPayPalOrder}
                  onApprove={onPayPalApprove}
                  onError={onPayPalError}
                  onCancel={onPayPalCancel}
                  disabled={isProcessingPayPal}
                  style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "rect",
                    label: "paypal"
                  }}
                />
              ) : (
                <div className="alert alert-warning">
                  PayPal is not configured. Please set VITE_PAYPAL_CLIENT_ID in your .env file.
                </div>
              )}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleModalClose} 
            disabled={isProcessingPayPal}
          >
            Cancel
          </Button>
          {paymentInfo.method === "creditCard" && (
            <Button 
              variant="primary" 
              onClick={handlePlaceOrder}
              disabled={isProcessingPayPal}
            >
              Place Order
            </Button>
          )}
          {isProcessingPayPal && (
            <span className="text-muted ms-2">Processing payment...</span>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Checkout;
