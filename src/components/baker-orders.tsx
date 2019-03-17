//TODO after everything works w/ state, Rui will add notification when state is changed (by concatentation)
//Sources used: https://medium.com/@fay_jai/getting-started-with-reactjs-typescript-and-webpack-95dcaa0ed33c

//click to create an order
//handleClick funciton
//button onClick --> create an order and call set state, and pop in order object into that array

import * as React from 'react';
import './baker-orders.css';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { getOrders, getUrl } from './helpers';
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
    [key: string]: OrderInterface
  };
}

export interface OrderProps {
  orders: OrderInterface[]
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

       //bind sets which object "this" refers to -- the same this that the constructor refers to
      //this.handleClick = this.handleClick.bind(this);

      console.log(orders);
      console.log(this.state);
      console.log(this.state.orders);
  }

  handleClick() {

      let newOrder: OrderInterface = {id: "5", donuts: "Rainbow Sprinkles", count: 3, status: "Delivered", droneID: "XHF43", battery: "82%"};
      
      // this.setState(prevState => {
      //  // this is an entire function body
      //   let updatedOrders = prevState.orders;
      //   updatedOrders[newOrder.id] = newOrder;
      //   return {orders: updatedOrders};
      // })


      this.setState(prevState => ({
        orders: {
            ...prevState.orders,
            [newOrder.id]: newOrder
        }
      }));

      console.log(this.state);
      
  }

  render() {
    return (
      <div>
        {this.renderAllOrders()}
      </div>
    );
  }

  // addNotification() {
  //   let messageFull = "3 Chocolate Glazed were just ordered";
  //   return () => this.state.notificationDOMRef.current.addNotification({
  //     title: "You have a new order!",
  //     message: messageFull,
  //     type: "success",
  //     insert: "top",
  //     container: "top-right",
  //     animationIn: ["animated", "fadeIn"],
  //     animationOut: ["animated", "fadeOut"],
  //     dismiss: { duration: 9000 },
  //     dismissable: { click: true }
  //   });

  // }

  // renderNotificationButton() {
  //   return (
  //     <div className="app-content">
  //       <ReactNotification ref={this.state.notificationDOMRef} />
  //       <button onClick={(event) => { this.addNotification()(); this.handleClick(); }} className="btn btn-primary">
  //         Create things
  //       </button>
  //     </div>
  //   );
  // }


  renderAllOrders() {
    // let nonzero: OrderInterface[] = [];
    // for (let key of Object.keys(this.state.ordersDict)) {
    //   if (this.state.ordersDict[key]) {
    //     nonzero.push(this.state.ordersDict[key]);
    //   }
    // }

    // if (nonzero.length == 0) {
    //   return <div className="orders-container" />;
    // }

    // const ordersDictItems = nonzero.map(
    //   (anOrder: OrderInterface) => (this.renderAnOrder(anOrder))
    // );

    const allOrders = Object.keys(this.state.orders).map(
      (anOrderKey: string) => this.renderAnOrder(this.state.orders[anOrderKey])
      );


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
      <button onClick={this.handleClick.bind(this)}>New order</button>
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
