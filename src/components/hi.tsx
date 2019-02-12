import * as React from 'react';

export interface HiProps {
  name: string;
}

class Hi extends React.Component<HiProps, {}> {
  render() {
    return <div>Hi, {this.props.name}</div>;
  }
}

export default Hi;