import * as React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Hello, Menu, Header, Inventory } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route component={Header} />
        <Switch>
          <Route exact path="/" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/hello1" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/inventory" render={(props) => <Inventory {...props} items={[
              {id: "1", name: "Original Glazed", ingredients: "wheat_flour, sugar", priceInCents: 100, inStock: true},
              {id: "2", name: "Chocolate Glazed", ingredients: "white_flour, chocolate, butter", priceInCents: 150, inStock: true,}]} /> } />
          <Route path="/hello3" render={(props) => <Hello {...props} name="page 3" /> } />
          <Route path="/menu" render={(props) =>
            <Menu {...props} items={[]} />
          } />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default AppRouter;
