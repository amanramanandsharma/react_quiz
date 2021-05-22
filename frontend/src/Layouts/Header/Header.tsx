import React from 'react'

import Navbar from 'react-bootstrap/Navbar'

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          Quiz
        </Navbar.Brand>
      </Navbar>
    )
}

export default Header
