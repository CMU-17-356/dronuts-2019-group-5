import React from 'react';
import ReactDOM from 'react-dom';
// import HashRouter from 'react-router';
import AppRouter from '../router';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppRouter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
