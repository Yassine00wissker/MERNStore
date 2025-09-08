import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import Api from "../services/Api.jsx";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
/*import { q } from 'framer-motion/client';*/

function Checkout({ show, handleClose, product }) {
  // Shipping information state
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });
  // Payment info state
  const [paymentInfo, setPaymentInfo] = useState({
    method: "creditCard",
  });

  // Handle form submission
  const handlePlaceOrder = async () => {
    if (!product) {
      toast.error("No product selected!");
      return;
    }
    const orderData = {
      items: [
        {
          product: product._id,
          quantity: 1,
          price: product.price,
        },
      ],
      shippingInfo,
      paymentInfo,
      totalprice: product.price,

    };
    console.log("Order placed:", orderData);
    try {
      // TODO: Send this orderData to your backend API
      const res = await Api.post("/order", orderData);
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 2000, // disappears after 2s
      });
      console.log("Response from server:", res.data);
    } catch (error) {
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      toast.error("Error placing order:", {
        position: "top-right",
        autoClose: 2000, // disappears after 2s
      });
    }
    handleClose(); // Close modal after placing order
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Order Summary */}
        <h2>Order Summary</h2>
        {product ? (
          <div>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ) : (
          <p>Loading product information...</p>
        )}

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
          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="postalCode"
          value={shippingInfo.postalCode}
          onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Country"
          value={shippingInfo.country}
          onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
        />

        {/* Payment Info */}
        <h2 className="mt-3">Payment Method</h2>
        <select
          className="form-control mb-2"
          value={paymentInfo.method}
          onChange={(e) =>
            setPaymentInfo({ ...paymentInfo, method: e.target.value })
          }
        >
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Checkout;
