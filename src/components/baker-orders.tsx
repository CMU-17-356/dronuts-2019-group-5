//Sources used: https://medium.com/@fay_jai/getting-started-with-reactjs-typescript-and-webpack-95dcaa0ed33c

import * as React from 'react';
import './menu.css';

// export interface Orders {
//     orders: 
// }

//console.log(order);

//create a list inside a component
//have that list all the aspects of an order
//then have another component that iterates over all order components to generate order table

//these two interfaces allow us to access the donuts that we've passed in via router
//export interface OrdersProps {
//  order: BakerOrderItemProps[];
//}

//defining type here
//telling typescript this is type definition
export interface OrderInterface {
 id: string;
 donuts: string;
 count: number;
 status: string;
}

export interface OrderState {
    // do something w/ state in here!
}

export interface OrderProps {
    orders: OrderInterface[]
}

function test(x: string) {
  return x += 'hello';
}
//componenets have props and states
//states will have these props and these states
//props are passed in, states are private ish, they don't get passed in
//if you change state or change props, react will rerender that automattically 
export class Order extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
      super(props); 
      console.log('props is ', props);
      console.log('props.orders is ', props.orders);  
      //console.log(props.orders.map(x => test(x))); 
      //this.state = copy list of items into the state
      //whenever you want to read from list of orders, you read from this.state vs
      //you can change the state, but you can't change the props

  }


  render() {
    //const displayOrders = this.props.orders.map(orders: );
    //this.props.orders.map((anOrder: OrderInterface) => (console.log(anOrder.donuts)));
    // const allOrders = this.props.orders.map((anOrder: OrderInterface) => (oneAtATime(anOrder)));
    // function oneAtATime(anOrder: OrderInterface) {
    //   const id = anOrder.id;
    //   const donuts = anOrder.donuts;
    //   const count = anOrder.count;
    //   const status = anOrder.status;
    //   console.log(anOrder);
    // }

    return (
      <div> {this.renderAllOrders()} </div>
      );
  }

  renderAllOrders() {
    const allOrders = this.props.orders.map((anOrder: OrderInterface) => (this.renderAnOrder(anOrder)));
    //renderAnOrder()
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