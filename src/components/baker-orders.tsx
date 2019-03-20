//TODO after everything works w/ state, Rui will add notification when state is changed (by concatentation)
//Sources used: https://medium.com/@fay_jai/getting-started-with-reactjs-typescript-and-webpack-95dcaa0ed33c

//click to create an order
//handleClick funciton
//button onClick --> create an order and call set state, and pop in order object into that array

import * as React from 'react';
import './baker-orders.css';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { getOrders, getUrl } from './helpers';
import {Button} from 'react-bootstrap';


export interface OrderInterface {
  id: string;
  donuts: string;
  timestamp: number;
  status: string;
  droneID: string;
  address: string;
}

export interface OrderState {
  orders: OrderInterface[];
  lastTime: number;
  poller?: number;
  notificationDOMRef: any;
}

export interface OrderProps {
  orders: OrderInterface[];
}

export class Order extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
      super(props);
      this.state = {
        orders: [], //should this be this.props.orders? does it matter?
        lastTime: 0,
        poller: undefined,
        notificationDOMRef: React.createRef(),
      };
  }

  async componentDidMount() {
    const time = (new Date).getTime() - 60*60*24*1000; //orders within the last hour
    const orders: OrderInterface[] = await getOrders(time);
    const lastTime = this.getLastTime(orders);
    this.setState((prevState) => ({
        ...prevState,
        orders: orders,
        lastTime: lastTime,
      })
    );
    if (!this.state.poller) {
      this.setState((prevState) => ({
        ...prevState,
        poller: window.setInterval(this.checkOrders.bind(this), 3000),
      }));
    }
  }

  componentWillUnmount() {
    if (this.state.poller) {
      window.clearInterval(this.state.poller)
    }
  }

  getLastTime(orders: OrderInterface[]) {
    let lastTime = this.state.lastTime;
    for (let o of orders) {
      if (o.timestamp > lastTime) {
        lastTime = o.timestamp;
      }
    }
    return lastTime;
  }

  async checkOrders() {
    console.log("Checking for orders since " + this.state.lastTime);
    const orders: any = await getOrders(this.state.lastTime + 1);
    if (orders.length > 0) { // non-empty
      const lastTime = this.getLastTime(orders);

      this.setState((prevState) => ({
        ...prevState,
        orders: orders.concat(prevState.orders),
        lastTime: lastTime,
      }));

      this.addNotification()();
    }
  }

  addNotification() {
    let messageFull = "3 Chocolate Glazed were just ordered";
    return () => this.state.notificationDOMRef.current.addNotification({
      title: "You have a new order!",
      message: messageFull,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 9000 },
      dismissable: { click: true }
    });
  }

  render() {
    return (
      <div>
        {this.renderAllOrders()}
        <ReactNotification ref={this.state.notificationDOMRef} />
      </div>
    );
  }

  renderAllOrders() {
    const allOrders = this.state.orders.map(this.renderAnOrder);

    //if status equals incoming, then call renderAnOrder

    return (
      <div className="menu-cart-container">
          <h1 className="menu-title">Orders within the last hour</h1>
          <table className="menu">
              <tbody>
              <tr>
                <th>Order ID</th>
                <th>Donuts</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Drone ID</th>
                <th>Address</th>
              </tr>
                {allOrders}
              </tbody>
          </table>
      {/*<button onClick={/*this.handleClick.bind(this)}>New order</button> */}
      </div>
    )
  }


  renderAnOrder(anOrder: OrderInterface) {
    const {
      id,
      donuts,
      timestamp,
      status,
      droneID,
      address
    } = anOrder;

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{donuts}</td>
        <td>{timestamp}</td>
        <td>{status}</td>
        <td>{droneID}</td>
        <td>{address}</td>
        <td><button>Update Order Status</button></td>
      </tr>
    );
  }
}


export default Order;
