import * as React from 'react';

import './menu.css';

export interface MenuItemProps {
  id: string;
  name: string;
  priceInCents: number; // in cents (0.01 USD)
  imageUrl?: string;
}

export interface CartItemProps extends MenuItemProps {
  quantity: number;
}

export interface MenuProps {
  items: MenuItemProps[];
}

export interface MenuState {
  cart: {
    [key: string]: CartItemProps
  };
}

export class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);

    let cart: { [key: string]: CartItemProps } = {};
    for (let item of this.props.items) {
      cart[item.id] = {
        ...item,
        quantity: 0
      };
    }

    this.state = {
      cart: cart,
    };
  }

  render() {
    const { items } = this.props;
    const menuItems = items.map(
      (itemProps: MenuItemProps) => (this.renderMenuItem(itemProps))
    );

    return (
      <div className="menu-container">
        <h1 className="menu-title">Menu</h1>
        <table className="menu">
          <tbody>
            {menuItems}
          </tbody>
        </table>
      </div>
    );
  }

  increment(id: string) {
    // Partial application of id for onClick typing
    return () => {
      this.setState(prevState => ({
        ...prevState,
        cart: {
          ...prevState.cart,
          [id]: {
            ...prevState.cart[id],
            quantity: prevState.cart[id].quantity + 1
          }
        }
      }));
    }
  }

  decrement(id: string) {
    // Partial application of id for onClick typing
    if (this.state.cart[id].quantity <= 0) {
      return () => undefined; // don't decrement below 0
    }

    return () => {
      this.setState(prevState => ({
        ...prevState,
        cart: {
          ...prevState.cart,
          [id]: {
            ...prevState.cart[id],
            quantity: prevState.cart[id].quantity - 1
          }
        }
      }));
    }
  }

  renderMenuItem(itemProps: MenuItemProps) {
    const {
      id,
      name,
      priceInCents,
      imageUrl = "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/original_glaze.jpg"
    } = itemProps;

    if (priceInCents <= 0) {
      throw new Error(`Illegal price ${priceInCents}`);
    }

    return (
      <tr className="menu-item" key={id}>
        <td><img src={imageUrl} className="menu-item-photo" /></td>
        <td className="menu-item-name">{name}</td>
        <td className="menu-item-price">{formatPrice(priceInCents)}</td>
        <td className="menu-item-quantity-picker">
          <button className="menu-item-quantity-picker-decrement" onClick={this.decrement(id)}> - </button>
          <span className="menu-item-quantity-picker-quantity">{this.state.cart[id].quantity}</span>
          <button className="menu-item-quantity-picker-increment" onClick={this.increment(id)}> + </button>
        </td>
      </tr>
    );
  }
}

function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export default Menu;
