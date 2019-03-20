import * as React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';


export const Header: React.StatelessComponent<{}> = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#welcome">
          <img
            src="https://cmu-17-356.github.io/Dronuts/assets/Dronut.png"
            width="108"
            height="35"
            className="d-inline-block align-top"
          />
          {' Pgh '}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#menu">Menu</Nav.Link>
          <Nav.Link href="#inventory">Inventory</Nav.Link>
          <Nav.Link href="#baker-orders">Baker Orders</Nav.Link>
          <Nav.Link href="#drone-controller">Drone Controller (dev only)</Nav.Link>
        </Nav>
        <Navbar.Text>
          Signed in as: <a href="#login">Bill Peduto</a>
        </Navbar.Text>
    </Navbar>
  );
}

export default Header;
