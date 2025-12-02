import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { AiFillProduct} from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";

function ANaveBar({ user, logout, cartCount = 0}) {
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
                    🛍️ MernStore Admin Panel
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
                        
                        {/* Cart Icon with Badge */}

                        {/* Logout button */}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="ms-3"
                            onClick={logout}
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

export default ANaveBar;
