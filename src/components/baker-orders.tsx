//TODO after everything works w/ state, Rui will add notification when state is changed (by concatentation)
//Sources used: https://medium.com/@fay_jai/getting-started-with-reactjs-typescript-and-webpack-95dcaa0ed33c

import * as React from 'react';
import './menu.css';

export interface OrderInterface {
 id: string;
 donuts: string;
 count: number;
 status: string;
 droneID: string;
 battery: string; //TODO battery is actually a percetage
}

export interface OrderState {
  // orderDic: {[key:string]: OrderInterface};
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
      // this.state = {
      //   orderDic = 
      // }
  }


  render() {

    return (
      <div> {this.renderAllOrders()} </div>
      );
  }

  renderAllOrders() {
    const allOrders = this.props.orders.map((anOrder: OrderInterface) => (this.renderAnOrder(anOrder)));
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