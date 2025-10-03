import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { AiFillProduct} from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
 import { useNavigate } from "react-router-dom";

function ANaveBar({ user, logout, cartCount = 0}) {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                {/* Brand / Logo */}
                <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    🛍️ MernStore Admin Pannel
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">

                        {/* User info */}
                        <span className="me-3 text-light">
                            Welcome, <strong>{user?.name}</strong>
                        </span>

                        {/* products Icon with Badge */}
                        
                        {/* Cart Icon with Badge */}

                        {/* Logout button */}
                        <Button
                            variant="outline-light"
                            size="sm"
                            className="ms-3"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ANaveBar;
