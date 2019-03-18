import * as React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Hello, Menu, Header, Order, Inventory } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route component={Header} />
        <Switch> //switch is the parent component, which comes from React router
          <Route exact path="/" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/welcome" render={(props) => <Hello {...props} name="page 1" /> } />
          // route props passes in history,
          <Route path="/baker-orders" render={(props) =>
            <Order orders={[]} /> 
          } />
          <Route path="/inventory" render={(props) => <Inventory {...props} items={[
              {id: "1", name: "Original Glazed", ingredients: "wheat_flour, sugar", priceInCents: 100, inStock: true},
              {id: "2", name: "Chocolate Glazed", ingredients: "white_flour, chocolate, butter", priceInCents: 150, inStock: true,}]} /> } />
          <Route path="/menu" render={(props) =>
            <Menu {...props} items={[]} />
          } />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default AppRouter;
