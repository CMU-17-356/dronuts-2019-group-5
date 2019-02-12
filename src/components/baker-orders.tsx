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
      console.log("testing")
    return <div>Hi, we are just going to put a basic table in here  </div>;
  }
}

export default BakerOrders;