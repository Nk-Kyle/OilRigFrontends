import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export const NavbarComponent = () => {
    const logout = () => {
        localStorage.removeItem("token");
        // Rerender the page to update the navbar
        window.location.reload();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
            <Navbar.Brand as={Link} to="/">
                Oil Rig Admin
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} exact="true" to="/map">
                        Map
                    </Nav.Link>
                    <Nav.Link as={NavLink} exact="true" to="/assignment">
                        Assignment
                    </Nav.Link>
                    <Nav.Link as={NavLink} exact="true" to="/employee">
                        Employee
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>{localStorage.getItem("username")}</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
