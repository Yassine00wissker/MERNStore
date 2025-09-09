import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Api from "../services/Api.jsx";
import { toast, ToastContainer } from "react-toastify";

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

  // Place order
  const handlePlaceOrder = async () => {
    if (!products || products.length === 0) {
      toast.error("No products selected!");
      return;
    }

    // Préparer les items pour le backend
    const orderItems = products.map((item) => ({
      product: item._id,
      quantity: item.qty || 1, // si qty absent, on prend 1
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
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
      console.log("Response from server:", res.data);
      handleClose(); // Fermer le modal après commande
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Error placing order!", {
        position: "top-right",
        autoClose: 1500,
      });
    }
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
    </>
  );
}

export default Checkout;
