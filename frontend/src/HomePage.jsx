import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
    return (    
        <Navbar fixed="top" expand="lg" bg="dark" data-bs-theme="dark" >
                <Navbar.Brand href="#home" style={{ marginLeft: '10px' }}>Pasiklan</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-light">Search</Button>
                </Form>
                    <Nav className="me-auto">
                    <Nav.Link href="#About">About</Nav.Link>
                    <Nav.Link href="#Notifications">Notifications</Nav.Link>
                    <Nav.Link href="#Profile">Profile</Nav.Link>
                    <Nav.Link href="#Settings">Settings</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
);
}

export default HomePage;