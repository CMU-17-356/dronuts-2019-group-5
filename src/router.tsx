import * as React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Hello, Menu, Header } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route component={Header} />
        <Switch>
          <Route exact path="/" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/hello1" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/hello2" render={(props) => <Hello {...props} name="page 2" /> } />
          <Route path="/hello3" render={(props) => <Hello {...props} name="page 3" /> } />
          <Route path="/bakerOrders" render={(props) => <Hello {...props} name="page 3" /> } />
          <Route path="/menu" render={(props) =>
            <Menu {...props} items={[
              {id: "1", name: "Original Glazed", priceInCents: 100},
              {id: "2", name: "Chocolate Glazed", priceInCents: 150, imageUrl: "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/chocolate_glaze.jpg"},
              {id: "3", name: "Jelly", priceInCents: 200, imageUrl: "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/jelly.jpg"},
            ]} />
          } />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default AppRouter;
