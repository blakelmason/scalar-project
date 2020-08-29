import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function CustomNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom mb-4">
      <div className="container">
        <Navbar.Brand href="/">Scalar Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/movies">
              <Nav.Link>Movies</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}
