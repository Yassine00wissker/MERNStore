import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Form, InputGroup, Spinner } from "react-bootstrap";
import Api from "../../services/Api";
import { toast } from "react-toastify";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/order/all");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await Api.put(`/order/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o._id === orderId ? res.data : o))
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      toast.error("Failed to update order status");
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const orderIdStr = order._id?.toString() || "";
    
    const matchesSearch =
      !searchTerm ||
      orderIdStr.toLowerCase().includes(searchLower) ||
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order.user?.email?.toLowerCase().includes(searchLower) ||
      order.items?.some((item) =>
        item.product?.name?.toLowerCase().includes(searchLower)
      );

    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesPayment =
      !paymentFilter ||
      (paymentFilter === "paid" && order.isPaid) ||
      (paymentFilter === "unpaid" && !order.isPaid);

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Statistics
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    paid: orders.filter((o) => o.isPaid).length,
    unpaid: orders.filter((o) => !o.isPaid).length,
    totalRevenue: orders
      .filter((o) => o.isPaid)
      .reduce((sum, o) => sum + (o.totalprice || 0), 0),
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading orders...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="text-center border-primary shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary">Total Orders</Card.Title>
              <Card.Text className="display-5 fw-bold text-primary">
                {stats.total}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-success shadow-sm">
            <Card.Body>
              <Card.Title className="text-success">Paid Orders</Card.Title>
              <Card.Text className="display-5 fw-bold text-success">
                {stats.paid}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-warning shadow-sm">
            <Card.Body>
              <Card.Title className="text-warning">Pending</Card.Title>
              <Card.Text className="display-5 fw-bold text-warning">
                {stats.pending}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-info shadow-sm">
            <Card.Body>
              <Card.Title className="text-info">Total Revenue</Card.Title>
              <Card.Text className="display-5 fw-bold text-info">
                ${stats.totalRevenue.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by order ID, customer name, email, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </Form.Select>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Results count */}
      {filteredOrders.length !== orders.length && (
        <Row className="mb-3">
          <Col>
            <p className="text-muted">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          </Col>
        </Row>
      )}

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <h4 className="text-muted">No orders found</h4>
            <p className="text-muted">Try adjusting your filters</p>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Header className="bg-dark text-white">
            <h5 className="mb-0">📦 All Orders</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Payment Method</th>
                    <th>Shipping</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <small className="text-muted font-monospace">
                          {order._id.toString().substring(0, 8)}...
                        </small>
                      </td>
                      <td>
                        <div>
                          <strong>{order.user?.name || "N/A"}</strong>
                          <br />
                          <small className="text-muted">
                            {order.user?.email || "N/A"}
                          </small>
                        </div>
                      </td>
                      <td>
                        <div>
                          {order.items?.length || 0} item(s)
                          <br />
                          <small className="text-muted">
                            {order.items?.[0]?.product?.name || "N/A"}
                            {order.items?.length > 1 &&
                              ` +${order.items.length - 1} more`}
                          </small>
                        </div>
                      </td>
                      <td className="fw-bold text-success">
                        ${order.totalprice?.toFixed(2) || "0.00"}
                      </td>
                      <td>
                        <Badge
                          bg={
                            order.status === "delivered"
                              ? "success"
                              : order.status === "shipped"
                              ? "primary"
                              : "warning"
                          }
                        >
                          {order.status || "pending"}
                        </Badge>
                      </td>
                      <td>
                        <div>
                          <Badge bg={order.isPaid ? "success" : "danger"}>
                            {order.isPaid ? "✓ Paid" : "⚠ Unpaid"}
                          </Badge>
                          {order.isPaid && order.paidAt && (
                            <>
                              <br />
                              <small className="text-muted">
                                {new Date(order.paidAt).toLocaleDateString()}
                              </small>
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <Badge bg="info">
                          {order.paymentInfo?.method === "paypal"
                            ? "🅿️ PayPal"
                            : "💳 Credit Card"}
                        </Badge>
                        <br />
                        <small className="text-muted">
                          {order.paymentInfo?.status || "pending"}
                        </small>
                      </td>
                      <td>
                        <small>
                          {order.shippingInfo?.city || "N/A"},{" "}
                          {order.shippingInfo?.country || "N/A"}
                        </small>
                      </td>
                      <td>
                        <small>
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "N/A"}
                          <br />
                          <span className="text-muted">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleTimeString()
                              : ""}
                          </span>
                        </small>
                      </td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          style={{ minWidth: "120px" }}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default AdminOrders;
