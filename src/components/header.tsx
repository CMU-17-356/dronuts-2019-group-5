import * as React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';


const navStyle = {
  border: '5px solid pink',
  margin: '10px',
  padding: '10px'
};



export const Header: React.StatelessComponent<{}> = () => {
  return (
  <>
  <Navbar bg="primary" variant="dark" style="blue">
      <Navbar.Brand href="#hello1">Dronuts</Navbar.Brand> 
      <Nav className="mr-auto">
        <Nav.Link href="#menu">Menu</Nav.Link>
        <Nav.Link href="#inventory">Inventory</Nav.Link>
      </Nav>
  </Navbar>
  </>
  );
}

export default Header;
