import * as React from 'react';
import { createTransactionResponse, getTransactionInfoResponse } from '../models/credit';

import './menu.css';

enum TransactionStatus {
  NotStarted = "not started",
  Pending = "pending",
  Approved = "approved",
  Denied = "denied",
}

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
    [key: string]: CartItemProps;
  };
  transaction: {
    url: string;
    status: TransactionStatus;
    poller?: number;
  }
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
      transaction: {
        url: '',
        status: TransactionStatus.NotStarted,
      },
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

  async checkTransactionStatus() {
    if (this.state.transaction.status == TransactionStatus.NotStarted) {
      return
    }

    const response = await getUrl(this.state.transaction.url);
    const transaction = getTransactionInfoResponse.validate(response);
    console.log(JSON.stringify(transaction));
    if (transaction.error) {
      console.log(transaction.error);
      return;
    }

    if (transaction.value.status != TransactionStatus.Pending) {
      // Status has resolved, stop polling
      window.clearInterval(this.state.transaction.poller)
      this.setState(prevState => ({
        ...prevState,
        transaction: {
          ...prevState.transaction,
          status: transaction.value.status,
          poller: undefined,
        },
      }));
    }
  }

  startTransactionPolling(transactionId: number) {
    const getUrl = `http://credit.17-356.isri.cmu.edu/api/transactions/${transactionId}`;
    this.setState(prevState => ({
      ...prevState,
      transaction: {
        url: getUrl,
        status: TransactionStatus.Pending,
        poller: window.setInterval(this.checkTransactionStatus.bind(this), 1000),
      },
    }));
  }

  payForCart(totalPrice: number) {
    return async () => {
      // create a new transaction
      const response = await createTransaction(totalPrice) as any;
      const newTransaction = createTransactionResponse.validate(response);
      if (newTransaction.error) {
        alert(newTransaction.error);
        return;
      }

      // open a new window for customer to complete the payment
      const transactionId = newTransaction.value.id;
      const getTransactionUrl = `http://credit.17-356.isri.cmu.edu/?transaction_id=${transactionId}`
      var win = window.open(getTransactionUrl, '_blank');
      if (win === null) {
        return;
      }

      // start polling to monitor status
      this.startTransactionPolling(transactionId);

      // switch focus to the new tab
      win.focus();
    }
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
            <tr>
              <td></td><td>Status: </td><td>{this.state.transaction.status}</td>
            </tr>
          </tfoot>
        </table>

        <button className="checkout-button" onClick={this.payForCart(totalPrice)} disabled={this.state.transaction.status !== TransactionStatus.NotStarted}>Check Out</button>
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

async function createTransaction(totalPrice: number) {
  const createTransactionUrl = 'http://credit.17-356.isri.cmu.edu/api/transactions'
  let promise = fetch(createTransactionUrl, {
    method: 'POST',
    body: `companyId=5&amount=${(totalPrice / 100).toFixed(2)}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  let response = await promise;
  let result = await response.json();
  return result;
}

async function getUrl(url: string) {
  let promise = fetch(url);
  let response = await promise;
  let result = await response.json();
  return result;
}

export default Menu;
