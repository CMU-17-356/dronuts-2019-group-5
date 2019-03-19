import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { createTransactionResponse, getTransactionInfoResponse } from '../models/credit';
import { getDroneInfoResponse } from '../models/drone';

import { formatPrice, getDonuts, getUrl, createOrder, getValidDroneId, getDrone } from './helpers';
import './menu.css';

// Michael Shillingburg via https://giphy.com/gifs/spinning-donuts-donut-l4KhY0teBwlTWKTra
import spinner from './donutSpinner.gif';
import { IDrone } from '../models/drone';

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
  display?: number;
  available?: number;
}

export interface CartItemProps extends MenuItemProps {
  quantity: number;
}

export interface MenuProps {
  items: MenuItemProps[];
}

export interface OrderStatusProps {
  error?: string;
  id?: number;
  status?: string;
  droneID?: number;
  drone?: IDrone;
  orderPoller?: number;
  dronePoller?: number;
}

export interface MenuState {
  items: MenuItemProps[];
  cart: {
    [key: string]: CartItemProps;
  };
  transaction: {
    url: string;
    status: TransactionStatus;
    poller?: number;
  };
  address: string;
  lat: number;
  lng: number;

  order?: OrderStatusProps;
}

export class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    const cart = this.initCart(this.props.items);
    this.state = {
      items: this.props.items,
      cart: cart,
      transaction: {
        url: '',
        status: TransactionStatus.NotStarted,
      },
      address: '5032 Forbes Avenue, Pittsburgh',
      lat: 40.444205,
      lng: -79.941556,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  initCart(items: MenuItemProps[]) {
    let cart: { [key: string]: CartItemProps } = {};
    for (let item of items) {
      cart[item.id] = {
        ...item,
        quantity: 0
      };
    }
    return cart;
  }

  async componentDidMount() {
    setTimeout(async () => {
      const items: MenuItemProps[] = await getDonuts();
      this.setState((prevState) => ({
        ...prevState,
        items: items,
        cart: this.initCart(items)
      })
      );
    }, 500);
  }

  render() {
    return (
      <div className="menu-cart-container">
        {this.renderMenu()}
        {this.renderCart()}
        {this.renderOrder()}
      </div>
    );
  }

  renderOrder() {
    if (!this.state.order) {
      return <div />;
    }

    if (this.state.order.error) {
      return (
        <div className="order-container">
          <div>Error: {this.state.order.error}</div>
        </div>);
    }

    return (
      <div className="order-container">
        <h1 className="menu-title">Order Status</h1>
        <div>ID: {this.state.order.id}</div>
        <div>Status: {this.state.order.status}</div>
        <div>DroneID: {this.state.order.droneID}</div>
        {this.renderDrone()}
      </div>
    )
  }

  renderDrone() {
    if (!this.state.order || !this.state.order.drone) {
      return ''
    }
    const drone = this.state.order.drone;
    return (
      <div className="drone-container">
        <div>Destination: {drone.current_delivery.destination.lat}, {drone.current_delivery.destination.lng}</div>
        <div>Location: {drone.current_delivery.destination.lat}, {drone.current_delivery.destination.lng}</div>
        <div>Departed at: {drone.current_delivery.route.time_start.toString()}</div>
        {drone.battery && <div>Battery: {drone.battery.charge} / {drone.battery.capacity} </div>}
        <div>Status: {drone.current_delivery.status} </div>
      </div>
    );
  }

  renderMenu() {
    if (this.state.items.length == 0) {
      return <img className="spinner" src={spinner} alt="Donut Spinner" />
    }

    const menuItems = this.state.items.map(
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
      return;
    }

    const response = await getUrl(this.state.transaction.url);
    const transaction = getTransactionInfoResponse.validate(response);
    if (transaction.error) {
      console.log(transaction.error);
      return;
    }

    if (transaction.value.status != TransactionStatus.Pending) {
      // Status has resolved, stop polling the transaction
      window.clearInterval(this.state.transaction.poller)
      this.setState(prevState => ({
        ...prevState,
        transaction: {
          ...prevState.transaction,
          status: transaction.value.status,
          poller: undefined,
        },
      }));

      if (transaction.value.status === TransactionStatus.Approved) {
        // check for a drone to assign
        const droneId = await getValidDroneId();
        if (!droneId) {
          console.log("error");
          this.setState(prevState => ({
            ...prevState,
            order: {
              error: 'No available drone. Please try again later.',
            }
          }));
          return;
        }

        const order = await this.createOrderFromCart(this.state.cart, droneId as any);
        this.setState(prevState => ({
          ...prevState,
          order: {
            ...prevState.order,
            id: order.id,
            droneID: droneId,
          }
        }));

        this.startOrderPolling()
        console.log("Successful order creation for " + order.id);
      }
    }
  }

  startOrderPolling() {
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        orderPoller: window.setInterval(this.checkOrderStatus.bind(this), 3000),
      }
    }));
  }

  startDronePolling() {
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        dronePoller: window.setInterval(this.checkDroneStatus.bind(this), 3000),
      }
    }));
  }

  async checkOrderStatus() {
    console.log("Polling order...");
    if (!this.state.order || this.state.order.error) {
      return;
    }

    const response = await fetch(`/api/orders/${this.state.order.id}`);
    if (!response.ok) {
      console.log(response);
      return;
    }
    const order = await response.json();
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        status: order.status,
      },
    }))

    if (order.status === 'Dispatched') {
      this.stopOrderPolling()
      this.startDronePolling()
    }
  }

  stopOrderPolling() {
    if (!this.state.order) {
      return;
    }

    // No need to poll anymore, since the delivered change comes from here
    window.clearInterval(this.state.order.orderPoller);
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        orderPoller: undefined,
      }
    }))
  }

  async checkDroneStatus() {
    console.log("Polling drone...");
    if (!this.state.order || this.state.order.error || !this.state.order.droneID) {
      return;
    }

    const response = await getDrone(this.state.order.droneID);
    const d = getDroneInfoResponse.validate(response);
    if (d.error) {
      console.log(response);
      console.log(d.error);
    }

    const drone = d.value as IDrone;
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        drone: drone,
      }
    }));

    if (drone.current_delivery.status === 'success') {
      this.stopDronePolling()

      // TODO: update the status of the order in db
    }
  }

  stopDronePolling() {
    if (!this.state.order) {
      return;
    }

    // No need to poll anymore, since the delivered change comes from here
    window.clearInterval(this.state.order.dronePoller);
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        dronePoller: undefined,
      }
    }))
  }

  async createOrderFromCart(cart: { [key: string]: CartItemProps }, droneID: number) {
    const donuts = cartToOrderDonuts(cart);
    return await createOrder({
      donuts: donuts,
      timestamp: (new Date).getTime(),
      status: "Ordered",
      droneID: droneID,
      address: {
        lat: this.state.lat,
        lng: this.state.lng,
      },
    });
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

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;

    this.setState({
      address: target.value
    });
  }

  getLatLong(address: string) {
    return async () => {
      const createUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=UCHKCIWSQr5GIL7PnrXLXuso9d0NXq5Y&location=${address}`;

      let promise = fetch(createUrl);
      let response = await promise;
      let result = await response.json();
      this.setState({
        lat: result.results[0].locations[0].latLng.lat,
        lng: result.results[0].locations[0].latLng.lng
      })
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
        <form>
          Address:
        <input type="text" name="address" value={this.state.address} onChange={this.handleChange}>
          </input>
        </form>
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

        <button className="checkout-button" onClick={(event) => { this.payForCart(totalPrice)(); this.getLatLong(this.state.address)(); }} disabled={this.state.transaction.status === TransactionStatus.Pending}>Check Out</button>
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
      // todo: check how to handle defaults with sqlite nulls/defaults
      // handle here or in the database?
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

function cartToOrderDonuts(cart: { [key: string]: CartItemProps }) {
  let orderDonuts: { [key: string]: number } = {};
  for (let donut of Object.values(cart)) {
    if (donut.quantity > 0) {
      orderDonuts[donut.name] = donut.quantity;
    }
  }
  return orderDonuts;
}



export default Menu;
