import * as React from 'react';
import './baker-orders.css';

export interface BakerOrdersProps {
  items: BakerOrderItemProps[];
}

export interface BakerOrderItemProps {
  id: string;
  name: string;
}

//Need to mark the class as `export`...
//Otherwise it will be private and not accessible from outside that file
export class BakerOrders extends React.Component<BakerOrdersProps, {}> {
  constructor(props: BakerOrdersProps) {
      super(props);
  }
  render() {
    const orderItems = this.props.items;
    console.log(this.props.items);
    console.log(orderItems);
    const orderIds = orderItems[0];
    console.log(orderIds);
   

    return ( 
        <div>Hi, we are just going to put a basic table in here 
            <table>
            <tr>
            <td>boo</td>
            <td>boo</td>
            <td>boo</td>
            </tr>
            <tr>
            <td>boo</td>
            <td>boo</td>
            <td>boo</td>
            </tr>
            </table>
        </div>
        )
  }
}

export default BakerOrders;