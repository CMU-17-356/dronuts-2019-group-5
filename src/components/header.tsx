import * as React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';


export const Header: React.StatelessComponent<{}> = () => {
  return (
  
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
      <Nav className="mr-auto">
        <Nav.Link href="#menu">Menu</Nav.Link>
        <Nav.Link href="#inventory">Inventory</Nav.Link>
      </Nav>
      <Navbar.Text>
        Signed in as: <a href="#login">Bill Peduto</a>
      </Navbar.Text>
  </Navbar>
  




    // <div className="row col-12">
    //   <nav className="navbar navbar-expand-lg navbar-light bg-white" id="navbar">
    //       <ul style={navStyle} className="navbar-nav mr-auto">
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/hello1">Hello 1</Link>
    //         </li>
    //         <li className="nav-item ">
    //           <Link className="nav-link" to="/inventory">Inventory</Link>
    //         </li>
    //         <li className="nav-item ">
    //           <Link className="nav-link" to="/menu">Menu</Link>
    //         </li>
    //       </ul>
    //   </nav>
    // </div>
  );
}

export default Header;
