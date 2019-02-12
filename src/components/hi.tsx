import * as React from 'react';

export interface HiProps {
  name: string;
}

//Need to mark the class Hi as `export` in `hi.tsx`
//Otherwise it will be private and not accessible from outside that file

export class Hi extends React.Component<HiProps, {}> {
  render() {
    return <div>Hi, {this.props.name}</div>;
  }
}

export default Hi;
