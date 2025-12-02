import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner } from 'react-bootstrap';
import Api from '../../services/Api';

function Statistics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const res = await Api.get('/admin/statistics');
                setStats(res.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching statistics:", err);
                setError(err.response?.data?.message || "Failed to fetch statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading statistics...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Card className="text-center">
                    <Card.Body>
                        <Card.Text className="text-danger">Error: {error}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    if (!stats) return null;

    return (
        <Container className="mt-4">
            {/* Overview Cards */}
            <Row className="mb-4">
                <Col md={3} className="mb-3">
                    <Card className="text-center h-100 border-primary shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-primary">📦 Total Products</Card.Title>
                            <Card.Text className="display-4 fw-bold text-primary">
                                {stats.overview.totalProducts}
                            </Card.Text>
                            <Badge bg="warning" className="mt-2">
                                {stats.products.lowStock} Low Stock
                            </Badge>
                            {stats.products.totalInventoryValue && (
                                <Card.Text className="text-muted small mt-2">
                                    Inventory Value: ${stats.products.totalInventoryValue}
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="text-center h-100 border-success shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-success">👥 Total Users</Card.Title>
                            <Card.Text className="display-4 fw-bold text-success">
                                {stats.overview.totalUsers}
                            </Card.Text>
                            <div className="mt-2">
                                <Badge bg="primary" className="me-1">{stats.users.buyers} Buyers</Badge>
                                <Badge bg="warning" className="me-1">{stats.users.sellers} Sellers</Badge>
                                <Badge bg="danger">{stats.users.admins} Admins</Badge>
                            </div>
                            {stats.users.newThisMonth !== undefined && (
                                <Card.Text className="text-muted small mt-2">
                                    +{stats.users.newThisMonth} this month
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="text-center h-100 border-info shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-info">🛒 Total Orders</Card.Title>
                            <Card.Text className="display-4 fw-bold text-info">
                                {stats.overview.totalOrders}
                            </Card.Text>
                            <div className="mt-2">
                                <Badge bg="success" className="me-1">{stats.orders.paid} Paid</Badge>
                                <Badge bg="warning">{stats.orders.unpaid} Unpaid</Badge>
                            </div>
                            {stats.orders.today !== undefined && (
                                <Card.Text className="text-muted small mt-2">
                                    {stats.orders.today} orders today
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="text-center h-100 border-warning shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-warning">💰 Total Revenue</Card.Title>
                            <Card.Text className="display-4 fw-bold text-warning">
                                ${stats.overview.totalRevenue}
                            </Card.Text>
                            <Card.Text className="text-muted small">
                                Avg: ${stats.overview.averageOrderValue} per order
                            </Card.Text>
                            {stats.overview.revenueToday && (
                                <Card.Text className="text-success small mt-1 fw-bold">
                                    ${stats.overview.revenueToday} today
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Orders Status */}
            <Row className="mb-4">
                <Col md={12} className="mb-3">
                    <Card>
                        <Card.Header className="bg-info text-white">
                            <h5 className="mb-0">📊 Orders by Status</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table striped hover>
                                <tbody>
                                    <tr>
                                        <td><Badge bg="warning">Pending</Badge></td>
                                        <td className="text-end fw-bold">{stats.orders.pending}</td>
                                    </tr>
                                    <tr>
                                        <td><Badge bg="primary">Shipped</Badge></td>
                                        <td className="text-end fw-bold">{stats.orders.shipped}</td>
                                    </tr>
                                    <tr>
                                        <td><Badge bg="success">Delivered</Badge></td>
                                        <td className="text-end fw-bold">{stats.orders.delivered}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Products Statistics */}
            <Row className="mb-4">
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">📂 Products by Category</h5>
                        </Card.Header>
                        <Card.Body>
                            {stats.products.byCategory && stats.products.byCategory.length > 0 ? (
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th className="text-end">Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.products.byCategory.map((cat, index) => (
                                            <tr key={index}>
                                                <td>{cat._id || 'Uncategorized'}</td>
                                                <td className="text-end fw-bold">{cat.count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p className="text-muted">No categories found</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Header className="bg-warning text-dark">
                            <h5 className="mb-0">⚠️ Low Stock Products</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="text-center">
                                <h2 className="display-3 text-warning">{stats.products.lowStock}</h2>
                                <p className="text-muted">Products with quantity &lt; 10</p>
                            </div>
                            {stats.products.totalQuantity && (
                                <div className="mt-3 pt-3 border-top">
                                    <p className="mb-1"><strong>Total Quantity:</strong> {stats.products.totalQuantity.toLocaleString()}</p>
                                    <p className="mb-0"><strong>Avg Price:</strong> ${stats.products.averagePrice}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">🏆 Top Selling Products</h5>
                        </Card.Header>
                        <Card.Body>
                            {stats.products.topSelling && stats.products.topSelling.length > 0 ? (
                                <Table striped hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th className="text-end">Sold</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.products.topSelling.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <small>{item.productName || 'N/A'}</small>
                                                </td>
                                                <td className="text-end fw-bold">
                                                    {item.totalSold}
                                                    <br />
                                                    <small className="text-success">
                                                        ${parseFloat(item.totalRevenue).toFixed(2)}
                                                    </small>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p className="text-muted text-center">No sales data yet</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Top Sellers */}
            {stats.sellers && stats.sellers.topSellers && stats.sellers.topSellers.length > 0 && (
                <Row className="mb-4">
                    <Col>
                        <Card>
                            <Card.Header className="bg-info text-white">
                                <h5 className="mb-0">👨‍💼 Top Sellers (by Product Count)</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Seller Name</th>
                                            <th>Email</th>
                                            <th className="text-end">Products</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.sellers.topSellers.map((seller, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Badge bg={index === 0 ? 'warning' : index === 1 ? 'secondary' : index === 2 ? 'info' : 'light'} text={index > 2 ? 'dark' : undefined}>
                                                        #{index + 1}
                                                    </Badge>
                                                </td>
                                                <td>{seller.sellerName}</td>
                                                <td><small className="text-muted">{seller.sellerEmail}</small></td>
                                                <td className="text-end fw-bold">{seller.productCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Payment Status Breakdown */}
            {stats.payments && (stats.payments.pending !== undefined || stats.payments.completed !== undefined) && (
                <Row className="mb-4">
                    <Col md={6} className="mb-3">
                        <Card>
                            <Card.Header className="bg-success text-white">
                                <h5 className="mb-0">💳 Payment Methods</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table striped hover>
                                    <tbody>
                                        <tr>
                                            <td>💳 Credit Card</td>
                                            <td className="text-end fw-bold">{stats.payments.creditCard}</td>
                                        </tr>
                                        <tr>
                                            <td>🅿️ PayPal</td>
                                            <td className="text-end fw-bold">{stats.payments.paypal}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Card>
                            <Card.Header className="bg-primary text-white">
                                <h5 className="mb-0">📊 Payment Status</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table striped hover>
                                    <tbody>
                                        <tr>
                                            <td><Badge bg="success">Completed</Badge></td>
                                            <td className="text-end fw-bold">{stats.payments.completed || 0}</td>
                                        </tr>
                                        <tr>
                                            <td><Badge bg="warning">Pending</Badge></td>
                                            <td className="text-end fw-bold">{stats.payments.pending || 0}</td>
                                        </tr>
                                        <tr>
                                            <td><Badge bg="danger">Failed</Badge></td>
                                            <td className="text-end fw-bold">{stats.payments.failed || 0}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Monthly Trends */}
            {stats.trends && (stats.trends.ordersByMonth || stats.trends.revenueByMonth) && (
                <Row className="mb-4">
                    <Col md={6} className="mb-3">
                        <Card>
                            <Card.Header className="bg-info text-white">
                                <h5 className="mb-0">📈 Orders Trend (Last 6 Months)</h5>
                            </Card.Header>
                            <Card.Body>
                                {stats.trends.ordersByMonth && stats.trends.ordersByMonth.length > 0 ? (
                                    <Table striped hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th className="text-end">Orders</th>
                                                <th className="text-end">Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.trends.ordersByMonth.map((month, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {new Date(month._id.year, month._id.month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="text-end fw-bold">{month.count}</td>
                                                    <td className="text-end text-success">
                                                        ${parseFloat(month.revenue || 0).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p className="text-muted text-center">No order data available</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Card>
                            <Card.Header className="bg-warning text-dark">
                                <h5 className="mb-0">💰 Revenue Trend (Last 6 Months)</h5>
                            </Card.Header>
                            <Card.Body>
                                {stats.trends.revenueByMonth && stats.trends.revenueByMonth.length > 0 ? (
                                    <Table striped hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th className="text-end">Revenue</th>
                                                <th className="text-end">Orders</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.trends.revenueByMonth.map((month, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {new Date(month._id.year, month._id.month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="text-end fw-bold text-success">
                                                        ${parseFloat(month.revenue || 0).toFixed(2)}
                                                    </td>
                                                    <td className="text-end">{month.orderCount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p className="text-muted text-center">No revenue data available</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Recent Orders */}
            <Row>
                <Col>
                    <Card>
                        <Card.Header className="bg-dark text-white">
                            <h5 className="mb-0">🕒 Recent Orders</h5>
                        </Card.Header>
                        <Card.Body>
                            {stats.recentOrders && stats.recentOrders.length > 0 ? (
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Payment</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.recentOrders.map((order) => (
                                            <tr key={order._id}>
                                                <td>
                                                    <small className="text-muted">
                                                        {order._id.toString().substring(0, 8)}...
                                                    </small>
                                                </td>
                                                <td>
                                                    {order.user?.name || 'N/A'}
                                                    <br />
                                                    <small className="text-muted">{order.user?.email}</small>
                                                </td>
                                                <td>
                                                    {order.items?.length || 0} item(s)
                                                    <br />
                                                    <small className="text-muted">
                                                        {order.items?.[0]?.product?.name || 'N/A'}
                                                    </small>
                                                </td>
                                                <td className="fw-bold text-success">
                                                    ${order.totalprice?.toFixed(2) || '0.00'}
                                                </td>
                                                <td>
                                                    <Badge 
                                                        bg={
                                                            order.status === 'delivered' ? 'success' :
                                                            order.status === 'shipped' ? 'primary' : 'warning'
                                                        }
                                                    >
                                                        {order.status || 'pending'}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Badge bg={order.isPaid ? 'success' : 'danger'}>
                                                        {order.isPaid ? '✓ Paid' : '⚠ Unpaid'}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <small>
                                                        {order.createdAt 
                                                            ? new Date(order.createdAt).toLocaleDateString()
                                                            : 'N/A'}
                                                    </small>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p className="text-muted text-center">No recent orders</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Statistics;
