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

const newOrder = {}

export class Order extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
      super(props); 

      let orders: {[key: string]: OrderInterface} = {};
      console.log(orders);
      
    
      for (let order of this.props.orders) {
        orders[order.id] = order;
        console.log(orders[order.id]);
      }

      this.state = {
        orders: orders,
      };

      console.log(orders);
      console.log(this.state);
      console.log(this.state.orders);
  }


    handleClick(): OrderInterface {

        let newOrder: OrderInterface = {id: "4", donuts: "Rainbow Sprinkles", count: 3, status: "Delivered", droneID: "XHF43", battery: "82%"};
        
        this.setState({
             newOrder: {
               ...this.state.newOrder
             }
        });

        return newOrder;
    }

  render() {
    return (
      <div> {this.renderAllOrders()} </div>
      );
  }


  

  // handleClick() {
  //   console.log('boo');
  //   var newOrder = this.state.orders.slice();
  //   // newOrder.push(newOrder: OrderInterface)
  //   console.log(newOrder);
  //   return ( () => {
  //       console.log(newOrder);
  //   }

  //   )
  // }

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

// <button onClick={this.handleClick()} > new Order!</button>
// <button className="menu-item-quantity-picker-increment" onClick={this.appendOrder(id)}> + </button>


  // createAnOrder(anOrder: OrderInterface) {
  //     //create a new order when a button is clicked and store in browser
  //     return () => {
  //         this.setState(prevState => ({
  //             ...prevState,
  //             order: {

  //             }
  //         })

  //         )
  //     }
  // }

  

 

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
    
    <tr key={id}>
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