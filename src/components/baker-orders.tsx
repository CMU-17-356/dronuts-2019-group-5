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
  timestamp: string;
  status: string;
  droneID: string;
  address: string;
}

export interface OrderState {
  orders: {
    [key: string]: OrderInterface
  };
}

export interface OrderProps {
  orders: OrderInterface[]
}

const newOrder = {}

export class Order extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
      super(props); 

      let orders: {[key: string]: OrderInterface} = {}; //I have a let orders here and const orders below - this seems wrong?
      console.log(orders);
      
    
      for (let order of this.props.orders) {
        orders[order.id] = order;
        console.log(orders[order.id]);
      }

      this.state = {
        orders: orders, //should this be this.props.orders? does it matter?
      };

    
      console.log(orders);
      console.log(this.state);
      console.log(this.state.orders);
  }

  // handleClick() {

  //     // let newOrder: OrderInterface = {id: "5", donuts: "Rainbow Sprinkles", count: 3, timestamp: "2019-02-17T15:54:00", status: "Delivered", droneID: "XHF43", batteryLevel: "82%"};

  //     this.setState(prevState => ({
  //       orders: {
  //           ...prevState.orders,
  //           [newOrder.id]: newOrder
  //       }
  //     }));

  //     console.log(this.state);
      
  // }


  async componentDidMount() {
    setTimeout(async () => {
      const time = (new Date).getTime() - 60*60*24*1000; //orders within the last hour
      const orders: {[key: string]: OrderInterface} = await getOrders(time); 
      this.setState((prevState) => ({
          orders: orders, 
        })
      );
      console.log(orders);
    }, 500);
  }

  render() {
    return (
      <div>

        {this.renderAllOrders()}
      </div>
    );
  }


  renderAllOrders() {
   
    const allOrders = Object.keys(this.state.orders).map(
      (anOrderKey: string) => this.renderAnOrder(this.state.orders[anOrderKey])
      );

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
