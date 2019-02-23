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
 battery: string; //TODO battery is actually a percetage
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
    console.log(this.state.orders);
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
    const allOrders = this.state.orders.map((anOrder: OrderInterface) => (this.renderAnOrder(anOrder)));
    return (
      <table className="menu">
          <tbody>
            {allOrders}
          </tbody>
      </table>
    )
  }

  renderAnOrder(anOrder: OrderInterface) {
    const {
      id,
      donuts,
      count,
      status
    } = anOrder;

    return (
    
    <tr>
        <td>{id}</td>
        <td>{donuts}</td>
        <td>{count}</td>
        <td>{status}</td>
    </tr>
    );

  }

}


export default Order;