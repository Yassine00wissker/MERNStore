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
      toast.error("No products selected!");
      return null;
    }

    if (!validateShippingInfo()) {
      return null;
    }

    // Préparer les items pour le backend
    const orderItems = products.map((item) => ({
      product: item._id,
      quantity: item.qty || 1,
      price: item.price,
    }));

    // Calculer le total
    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderData = {
      items: orderItems,
      shippingInfo,
      paymentInfo,
      totalprice: totalPrice,
    };

    try {
      const res = await Api.post("/order", orderData);
      return res.data.order;
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error creating order!", {
        position: "top-right",
        autoClose: 1500,
      });
      return null;
    }
  };

  // Place order (for credit card - non-PayPal)
  const handlePlaceOrder = async () => {
    const order = await createOrderInDB();
    if (order) {
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
      handleClose();
    }
  };

  // PayPal create order handler
  const createPayPalOrder = async () => {
    setIsProcessingPayPal(true);
    const order = await createOrderInDB();
    
    if (!order) {
      setIsProcessingPayPal(false);
      return null;
    }

    setCurrentOrder(order);

    try {
      const res = await Api.post("/paypal/create-order", { orderId: order._id });
      setIsProcessingPayPal(false);
      return res.data.orderId;
    } catch (error) {
      console.error("PayPal order creation error:", error);
      toast.error("Failed to create PayPal order!", {
        position: "top-right",
        autoClose: 1500,
      });
      setIsProcessingPayPal(false);
      return null;
    }
  };

  // PayPal onApprove handler
  const onPayPalApprove = async (data, actions) => {
    try {
      // Capture the payment
      const res = await Api.post("/paypal/capture", {
        orderId: currentOrder._id,
        paypalOrderId: data.orderID,
      });

      if (res.data.order.isPaid) {
        toast.success("Payment successful! Order confirmed.", {
          position: "top-right",
          autoClose: 2000,
        });
        handleClose();
        // Optionally redirect or refresh
        window.location.reload();
      } else {
        toast.error("Payment failed. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("PayPal capture error:", error);
      toast.error("Failed to process payment!", {
        position: "top-right",
        autoClose: 2000,
      });
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
  };

  // PayPal onCancel handler
  const onPayPalCancel = () => {
    toast.info("Payment cancelled.", {
      position: "top-right",
      autoClose: 1500,
    });
    setIsProcessingPayPal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h2>Order Summary</h2>
          {products?.map((item) => (
            <div key={item._id} className="mb-2">
              
              {item.name} - ${item.price} x {item.qty || 1}
            </div>
          ))}
          <p>
            <strong>Total: $</strong>
            {products
              ? products.reduce(
                  (acc, item) => acc + item.price * (item.qty || 1),
                  0
                )
              : 0}
          </p>

          {/* Shipping Info */}
          <h2 className="mt-3">Shipping Information</h2>
          <input
            className="form-control mb-2"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, address: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            placeholder="City"
            value={shippingInfo.city}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, city: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            placeholder="Postal Code"
            value={shippingInfo.postalCode}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            placeholder="Country"
            value={shippingInfo.country}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, country: e.target.value })
            }
          />

          {/* Payment Info */}
          <h2 className="mt-3">Payment Method</h2>
          <select
            className="form-control mb-3"
            value={paymentInfo.method}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, method: e.target.value })
            }
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
          <Button variant="secondary" onClick={handleClose} disabled={isProcessingPayPal}>
            Cancel
          </Button>
          {paymentInfo.method === "creditCard" && (
            <Button variant="primary" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Checkout;
