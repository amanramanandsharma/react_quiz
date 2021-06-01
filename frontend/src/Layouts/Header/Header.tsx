import React from 'react';

// Bootstap Imports
import Navbar from 'react-bootstrap/Navbar'

import GoogleOauth from '../../Authentication/GoogleOauth';

function Header() {

    return (
      <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
      <img
        src="/favicon.ico"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="GeekZiuq logo"
      />
      GeekZiuq</Navbar.Brand>
      <GoogleOauth />
    </Navbar>
    )
}

export default Header
