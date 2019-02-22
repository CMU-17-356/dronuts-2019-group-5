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
    const { name, enthusiasmLevel = 1 } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
      </div>
    );
  }
}

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}


export default Hello;
