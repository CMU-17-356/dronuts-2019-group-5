import * as React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {
  return (
    <div className="row col-12">
      <nav className="navbar navbar-expand-lg navbar-light bg-white" id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/hello1">Hello 1</Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/inventory">Inventory 2</Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/menu">Menu</Link>
            </li>
          </ul>
      </nav>
    </div>
  );
}

export default Header;
