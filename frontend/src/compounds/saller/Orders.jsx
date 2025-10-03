import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../services/Api";
import { IoArrowBackSharp } from "react-icons/io5";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idProduct } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await Api.get(`/order/${idProduct}`);
        setOrders(res.data);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [idProduct]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await Api.put(`/order/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o._id === orderId ? res.data : o))
      );
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <button className='btn btn-lg btn-info text-light' onClick={() => navigate('/myproducts')}><IoArrowBackSharp /></button>
      <h1 className="text-center text-primary mb-4">
        Orders for Product {orders[0]?.items?.[0]?.product?.name || ""}
      </h1>

      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">
          No orders found for this product
        </div>
      ) : (
        <div className="row g-3">
          {orders.map((o) => (
            <div key={o._id} className="col-sm-12 col-md-6 col-lg-4">
              <div className="card order-card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{`Order #${o._id.slice(-6)}`}</h5>

                  <div className="mb-3 d-flex align-items-center flex-wrap">
                    <label className="me-2 mb-0">Status:</label>
                    <select
                      className="form-select form-select-sm w-auto me-2 mb-2"
                      value={o.status}
                      onChange={(e) =>
                        handleStatusChange(o._id, e.target.value)
                      }
                    >
                      <option value="pending" disabled={o.status !== "pending"}>
                        Pending
                      </option>
                      <option value="shipped" disabled={o.status !== "pending"}>
                        Shipped
                      </option>
                      <option
                        value="delivered"
                        disabled={o.status !== "shipped"}
                      >
                        Delivered
                      </option>
                    </select>

                    <span
                      className={`badge status-badge ${
                        o.status === "delivered"
                          ? "bg-success"
                          : o.status === "shipped"
                          ? "bg-info"
                          : "bg-secondary"
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>

                  <ul className="list-group mb-3 flex-grow-1">
                    {o.items.map((item, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center item-hover"
                      >
                        <div>
                          {item.product.name}
                          <br />
                          <small className="text-muted">
                            Qty: {item.quantity}
                          </small>
                        </div>
                        <span className="badge bg-primary rounded-pill">
                          ${item.price}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-end fw-bold fs-6">
                    Total: <span className="text-success">${o.totalprice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inline CSS for animations */}
      <style>{`
        .order-card {
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          padding: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .order-card:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
          background: linear-gradient(145deg, #f0f8ff, #e9f0f5);
        }
        .status-badge {
          transition: background 0.4s ease, transform 0.3s ease;
        }
        .status-badge:hover {
          transform: scale(1.1);
        }
        .item-hover {
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .item-hover:hover {
          background-color: #f1f9ff;
          transform: translateX(5px);
        }
        select {
          transition: all 0.3s ease;
        }
        select:hover {
          border-color: #0d6efd;
        }
      `}</style>
    </div>
  );
}

export default Orders;
