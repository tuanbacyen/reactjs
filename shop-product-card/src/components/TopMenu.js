import React, { useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { CartContext } from '../components/Cart';

const TopMenu = (props) => {
  const { cartItems } = useContext(CartContext);
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>
          <NavbarText>Shop *** toy :D</NavbarText>
        </NavbarBrand>
        <Collapse navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <Link className="nav-link" to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/products">Product</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" to="/carts">Cart ({ cartItems.reduce((a, b) => a + (b["count"] || 0), 0) })</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default TopMenu;