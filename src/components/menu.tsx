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
    return (
      <div className="menu-cart-container">
        {this.renderMenu()}
        {this.renderCart()}
      </div>
    );
  }

  renderMenu() {
    const menuItems = this.props.items.map(
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
    )
  }

  renderCart() {
    let nonzero: CartItemProps[] = [];
    for (let key of Object.keys(this.state.cart)) {
      if (this.state.cart[key].quantity > 0) {
        nonzero.push(this.state.cart[key]);
      }
    }

    if (nonzero.length == 0) {
      return <div className="cart-container" />
    }

    const cartItems = nonzero.map(
      (item: CartItemProps) => (this.renderCartItem(item))
    );

    const totalPrice = nonzero.reduce(
      (total: number, item: CartItemProps) => (total + item.quantity * item.priceInCents),
      0 // starting value
    )

    return (
      <div className="cart-container">
        <h1 className="cart-title">Cart</h1>
        <table className="cart">
          <tbody>
            {cartItems}
          </tbody>
          <tfoot className="cart-summary">
            <tr>
              <td></td><td>Total: </td><td>{formatPrice(totalPrice)}</td>
            </tr>
          </tfoot>
        </table>
        <button className="checkout-button" onClick={() => alert("I'll implement this later")}>Check Out</button>
      </div>
    )
  }

  renderCartItem(itemProps: CartItemProps) {
    const {
      id,
      name,
      priceInCents,
      quantity
    } = itemProps;

    const totalPrice = quantity * priceInCents;
    return (
      <tr className="cart-item" key={id}>
        <td className="cart-item-name">{name}</td>
        <td className="cart-item-quantity-price">{quantity} @ {formatPrice(priceInCents)}</td>
        <td className="cart-item-total-price price">{formatPrice(totalPrice)}</td>
      </tr>
    )
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
        <td className="menu-item-price price">{formatPrice(priceInCents)}</td>
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
