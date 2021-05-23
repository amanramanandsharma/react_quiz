import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import GoogleOauth from '../../Authentication/GoogleOauth';

function Header() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">GeekZiuq</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
         <GoogleOauth />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
}

export default Header
