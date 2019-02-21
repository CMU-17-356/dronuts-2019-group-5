import * as React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';


export const Header: React.StatelessComponent<{}> = () => {
  return (
  <>
<<<<<<< HEAD
  <Navbar bg="primary" variant="dark" style="blue">
      <Navbar.Brand href="#hello1">Dronuts</Navbar.Brand> 
=======
  <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#hello1">
        <img
          src="https://cmu-17-356.github.io/Dronuts/assets/Dronut.png"
          width="108"
          height="35"
          className="d-inline-block align-top"
        />
        {' Pgh '}
      </Navbar.Brand> 
>>>>>>> a13fc568bc5990fe3aeab40b366b95c89d6df0a8
      <Nav className="mr-auto">
        <Nav.Link href="#menu">Menu</Nav.Link>
        <Nav.Link href="#inventory">Inventory</Nav.Link>
      </Nav>
      <Navbar.Text>
        Signed in as: <a href="#login">Bill Peduto</a>
      </Navbar.Text>
      
  </Navbar>
  </>
  );
}

export default Header;
