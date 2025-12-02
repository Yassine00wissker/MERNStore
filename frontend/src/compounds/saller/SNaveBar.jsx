import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { AiFillProduct} from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";

function SNaveBar({ user, logout, cartCount = 0}) {
    const navigate = useNavigate();

    return (
        <Navbar 
            expand="lg" 
            sticky="top"
            style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderBottom: '2px solid var(--border-color)',
                boxShadow: '0 2px 10px var(--card-shadow)',
            }}
        >
            <Container>
                {/* Brand / Logo */}
                <Navbar.Brand 
                    onClick={() => navigate("/")} 
                    style={{ 
                        cursor: "pointer",
                        color: 'var(--text-primary)',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--primary-color)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    🛍️ MernStore
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">

                        {/* User info */}
                        <span className="me-3" style={{ color: 'var(--text-primary)' }}>
                            Welcome, <strong style={{ color: 'var(--primary-color)' }}>{user?.name}</strong>
                        </span>

                        {/* Theme Toggle */}
                        <div className="me-2">
                            <ThemeToggle inNavbar={true} />
                        </div>

                        {/* products Icon with Badge */}
                        <Nav.Link 
                            onClick={() => navigate("/myproducts")} 
                            className="position-relative"
                            style={{
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: '8px 12px',
                                borderRadius: '8px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                                e.currentTarget.style.color = 'var(--primary-color)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-primary)';
                            }}
                        >
                            <AiFillProduct size={28} style={{ color: 'inherit' }} />
                        </Nav.Link>
                        
                        {/* Cart Icon with Badge */}
                        <Nav.Link 
                            onClick={() => navigate("/cart")} 
                            className="position-relative"
                            style={{
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: '8px 12px',
                                borderRadius: '8px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                                e.currentTarget.style.color = 'var(--primary-color)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-primary)';
                            }}
                        >
                            <TiShoppingCart size={28} style={{ color: 'inherit' }} />
                            {cartCount > 0 && (
                                <Badge 
                                    bg="danger" 
                                    pill 
                                    className="position-absolute top-0 start-100 translate-middle"
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '4px 8px',
                                    }}
                                >
                                    {cartCount}
                                </Badge>
                            )}
                        </Nav.Link>

                        {/* Logout button */}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="ms-3"
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            style={{
                                borderRadius: '8px',
                                borderWidth: '2px',
                                fontWeight: '600',
                            }}
                        >
                            <i className="bi bi-box-arrow-right me-1"></i>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SNaveBar;
