import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { AiFillProduct} from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
 import { useNavigate } from "react-router-dom";

function SNaveBar({ user, logout, cartCount = 0}) {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                {/* Brand / Logo */}
                <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    🛍️ MernStore
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">

                        {/* User info */}
                        <span className="me-3 text-light">
                            Welcome, <strong>{user?.name}</strong>
                        </span>

                        {/* Cart Icon with Badge */}
                        <Nav.Link onClick={() => navigate("/myproducts")} className="position-relative">
                            <AiFillProduct size={28} color="white" />
                        </Nav.Link>
                        
                        {/* Cart Icon with Badge */}
                        <Nav.Link onClick={() => navigate("/cart")} className="position-relative">
                                      <TiShoppingCart size={28} color="white" />
                                      {cartCount > 0 && (
                                        <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                          {cartCount}
                                        </Badge>
                                      )}
                                    </Nav.Link>

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

export default SNaveBar;
