// src/components/Hello.tsx
//TODO
//place an order button
//dronuts logo

import * as React from 'react';
import './hello.css';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

export class Hello extends React.Component<Props, object> {
  handlePageChange() {
     window.location.hash = "#menu";
  }

  render() {
    return (
      <div className="hello">
        <div className="greeting">
          <img
            src="https://cmu-17-356.github.io/Dronuts/assets/Dronut.png"
            width="100%"
            className="d-inline-block align-top"
          />
          Pittsburgh-based donut drone delivery
        </div>
        <button onClick={this.handlePageChange}><h5> Place an order </h5></button>
       <div className="howItWorks">
       <p></p>
        <h5>HOW IT WORKS</h5>
        <div className ="row">
          <div className = "column">
            <h5><b>Step 1</b></h5> <h6> Just like regular food delivery apps, select prefered items from a pre-set menu and place your order with confidence.</h6>
          </div>
          <div className = "column">
            <h5><b>Step 2</b></h5> <h6> Our baker prepares fresh donuts and, <i>unlike regular food delivery apps</i>, loads them on a drone destined for your provided address.</h6>
          </div>
          <div className = "column">
            <h5><b>Step 3</b></h5> <h6> With drone delivery, there is no cumbersome back-and-forth of &#34;I'm here, but where are you?&#34; <i>as the drone comes directly to you!</i> </h6>
          </div>
        </div>
       </div>
      </div>
    );
  }
}



export default Hello;
