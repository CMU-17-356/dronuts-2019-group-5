//Sources used: https://medium.com/@fay_jai/getting-started-with-reactjs-typescript-and-webpack-95dcaa0ed33c

import * as React from 'react';
import './menu.css';

//these two interfaces allow us to access the donuts that we've passed in via router
export interface BakerOrdersProps {
  items: BakerOrderItemProps[];
}
export interface BakerOrderItemProps {
  id: string;
  name: string;
  status: string;
}

//Need to mark the class as `export`...
//Otherwise it will be private and not accessible from outside that file
export class BakerOrders extends React.Component<BakerOrdersProps, {}> {
  constructor(props: BakerOrdersProps) {
      super(props); //always need to call super when defining the constructor of a subclass
  }
  render() {
    const orderItems = this.props.items;
    //console.log(this.props.items);
    //console.log(orderItems);
    const firstOrder = orderItems[0];
    const secondOrder = orderItems[1];
    const thirdOrder = orderItems[2];
    const fourthOrder = orderItems[3];
    return ( 
        <div>
            <table>
              <tr>
                <th>Order ID</th>
                <th>Order Description</th>
                <th>Order Status</th>
              </tr>
              <tr>
                <td>{firstOrder.id}</td>
                <td>{firstOrder.name}</td>
                <td>{firstOrder.status}</td>
              </tr>
              <tr>
                <td>{secondOrder.id}</td>
                <td>{secondOrder.name}</td>
                <td>{secondOrder.status}</td>
              </tr>
              <tr>
                <td>{thirdOrder.id}</td>
                <td>{thirdOrder.name}</td>
                <td>{thirdOrder.status}</td>
              </tr>
              <tr>
                <td>{fourthOrder.id}</td>
                <td>{fourthOrder.name}</td>
                <td>{fourthOrder.status}</td>
              </tr>
            </table>
        </div>
        )
  }
}

export default BakerOrders;