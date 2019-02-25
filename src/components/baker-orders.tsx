//TODO after everything works w/ state, Rui will add notification when state is changed (by concatentation)
//Sources used: https://medium.com/@fay_jai/getting-started-with-reactjs-typescript-and-webpack-95dcaa0ed33c

//click to create an order
//handleClick funciton
//button onClick --> create an order and call set state, and pop in order object into that array

import * as React from 'react';
import './menu.css';
import {Button} from 'react-bootstrap';

export interface OrderInterface {
 id: string;
 donuts: string;
 count: number;
 status: string;
 droneID: string;
 battery: string; 
}

export interface OrderState {
  orders: {
    [key:string]: OrderInterface
  };
  //newOrder: OrderProps;
}

export interface OrderProps {
    orders: OrderInterface[]
}

function test(x: string) {
  return x += 'hello';
}


export class Order extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
      super(props); 

      let orders: {[key: string]: OrderInterface} = {};
    
      for (let order of this.props.orders) {
        orders[order.id] = order;
      }

      this.state = {
        orders: orders,
      };
  }

  render() {
    return (
      <div> {this.renderAllOrders()} 
      </div>
      );
  }
  
  // <Button variant="primary" onClick="handleClick()">Order!</Button>

  handleClick() {
    console.log('book');
  }

  renderAllOrders() {
    const allOrders = this.props.orders.map((anOrder: OrderInterface) => (this.renderAnOrder(anOrder)));
    return (

      <div className="menu-cart-container">
          <h1 className="menu-title">Orders</h1>
          <table className="menu">
              <tbody>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Quantity</th> 
                <th>Status</th>
                <th>Drone ID</th>
                <th>Battery</th>
               </tr>
                {allOrders}
              </tbody>
          </table>
      </div>
    )
  }

  renderAnOrder(anOrder: OrderInterface) {
    const {
      id,
      donuts,
      count,
      status,
      droneID,
      battery
    } = anOrder;

    return (
    
    <tr>
        <td>{id}</td>
        <td>{donuts}</td>
        <td>{count}</td>
        <td>{status}</td>
        <td>{droneID}</td>
        <td>{battery}</td>
    </tr>
    );

  }

}


export default Order;