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

  }
  render() {
    //const displayOrders = this.props.orders.map(orders: );
    //this.props.orders.map((anOrder: OrderInterface) => (console.log(anOrder.donuts)));
    const allOrders = this.props.orders.map((anOrder: OrderInterface) => (oneAtATime(anOrder)));
    
    function oneAtATime(anOrder: OrderInterface) {
      const id = anOrder.id;
      const donuts = anOrder.donuts;
      const count = anOrder.count;
      const status = anOrder.status;


    }

    return <h1>hello,   </h1>;
  }

  renderAllOrders() {
    const allOrders = this.props.orders.map((anOrder: OrderInterface) => (console.log(anOrder.donuts)));
  }

  renderAnOrder() {

  }

}


export default Order;