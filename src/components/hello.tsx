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
  render() {
    return (
      <div className="hello">
        <div className="greeting">
          <img
            src="https://cmu-17-356.github.io/Dronuts/assets/Dronut.png"
            width="1098"
            height="335"
            className="d-inline-block align-top"
          />
          Pittsburgh-based donut drone delivery
        </div>
        <h4>How it works:</h4>
        <h5>Step 1</h5>
        <h5>Step 2</h5>
        <h5>Step 3</h5>
        <button><h5> Get started </h5></button>
      </div>
    );
  }
}



export default Hello;
