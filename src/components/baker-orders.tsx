//TODO after everything works w/ state, Rui will add notification when state is changed (by concatentation)
//Sources used: https://medium.com/@fay_jai/getting-started-with-reactjs-typescript-and-webpack-95dcaa0ed33c

//click to create an order
//handleClick funciton
//button onClick --> create an order and call set state, and pop in order object into that array

import * as React from 'react';
import { Component, ChangeEvent, FormEvent } from 'react';
import './baker-orders.css';
import {Button} from 'react-bootstrap';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export interface OrderInterface {
 id: string;
 donuts: string;
 count: number;
 status: string;
 droneID: string;
 battery: string; 
}

export interface OrderState {
  ordersDict: {
    [key:string]: OrderInterface
  };
  notificationDOMRef: any;
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

      let ordersDict: {[key: string]: OrderInterface} = {};
      console.log(ordersDict);
      
    
      for (let order of this.props.orders) {
        ordersDict[order.id] = order;
        console.log(ordersDict[order.id]);

      this.state = {
        ordersDict: ordersDict,
        notificationDOMRef: React.createRef(),
      };


      console.log(ordersDict);
      console.log(this.state);
      console.log(this.state.ordersDict);
      }
  }


    handleClick(){
        console.log("This gets called");
        let newOrder: OrderInterface = {id: "4", donuts: "Rainbow Sprinkles", count: 3, status: "Delivered", droneID: "XHF43", battery: "82%"};
        
        this.setState({
             ordersDict: {
               ...this.state.ordersDict,
                 [newOrder.id]: newOrder}
            
             }
        );
        this.addNotification();
    }
  

  render() {
    return (
      <div> {this.renderAllOrders()} 
            {this.renderNotificationButton()}</div>
        
      );
  }

  addNotification() {
    let messageFull = "3 Rainbow Sprinkles were just ordered";
    return () => this.state.notificationDOMRef.current.addNotification({
      title: "You have a new order!",
      message: messageFull ,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 9000 },
      dismissable: { click: true }
    });

  }

  renderNotificationButton(){
  return (
      <div className="app-content">
        <ReactNotification ref={this.state.notificationDOMRef} />
        <button onClick={(event) => {this.addNotification(); this.handleClick(); }} className="btn btn-primary">

            Go Back
        </button>
      </div>
    );
   }


  renderAllOrders() {
    let nonzero: OrderInterface[] = [];
    for (let key of Object.keys(this.state.ordersDict)) {
      if (this.state.ordersDict[key]) {
        nonzero.push(this.state.ordersDict[key]);
      }
    }

    if (nonzero.length == 0) {
      return <div className="orders-container" />;
    }

    const ordersDictItems = nonzero.map(
      (anOrder: OrderInterface) =>
      (this.renderAnOrder(anOrder))
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
                {ordersDictItems}
              </tbody>
          </table>
            {/*<button className="orderButton" onClick={this.handleClick.bind(this)}>New order</button>*/}
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