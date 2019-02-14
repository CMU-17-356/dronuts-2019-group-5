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

//componenets have props and states
//states will have these props and these states
//props are passed in, states are private ish, they don't get passed in
//if you change state or change props, react will rerender that automattically 
export class Order extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
      super(props); 
      console.log(props.orders);   
  }
  render()

}
//Need to mark the class as `export`...
//Otherwise it will be private and not accessible from outside that file
// export class BakerOrders extends React.Component<BakerOrdersProps, {}> {
//   constructor(props: BakerOrdersProps) {
//       super(props); //always need to call super when defining the constructor of a subclass
//   }
//   render() {
//     const orderItems = this.props.items;
//     const orderItems2 = this.props.items.map();
//     //console.log(this.props.items);
//     //console.log(orderItems);
//     const firstOrder = orderItems[0];
//     const secondOrder = orderItems[1];
//     const thirdOrder = orderItems[2];
//     const fourthOrder = orderItems[3];
//     return ( 
//         <div>
//             <table>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Order Description</th>
//                 <th>Order Status</th>
//               </tr>
//               <tr>
//                 <td>{firstOrder.id}</td>
//                 <td>{firstOrder.name}</td>
//                 <td>{firstOrder.status}</td>
//               </tr>
//               <tr>
//                 <td>{secondOrder.id}</td>
//                 <td>{secondOrder.name}</td>
//                 <td>{secondOrder.status}</td>
//               </tr>
//               <tr>
//                 <td>{thirdOrder.id}</td>
//                 <td>{thirdOrder.name}</td>
//                 <td>{thirdOrder.status}</td>
//               </tr>
//               <tr>
//                 <td>{fourthOrder.id}</td>
//                 <td>{fourthOrder.name}</td>
//                 <td>{fourthOrder.status}</td>
//               </tr>
//             </table>
//         </div>
//         )
//   }
// }
export default Order;