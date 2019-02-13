import * as React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Hello, Menu, Header, BakerOrders } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route component={Header} />
        <Switch> //switch is the parent component, which comes from React router
          <Route exact path="/" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/hello1" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/baker-orders" render={(props) => 
            <BakerOrders {...props} items={[
              {id: "1", name: "Original Glazed", status: "Incoming"},
              {id: "2", name: "Chocolate Glazed", status: "In progress"},
              {id: "3", name: "Jelly", status: "On drone"},
              {id: "4", name: "Original Glazed", status: "Delivered"},
            ]} /> 
          } />
          <Route path="/menu" render={(props) =>
            <Menu {...props} items={[ //I want to take the properties that the parent component has
              {id: "1", name: "Original Glazed", priceInCents: 100},
              {id: "2", name: "Chocolate Glazed", priceInCents: 150, imageUrl: "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/chocolate_glaze.jpg"},
              {id: "3", name: "Jelly", priceInCents: 200, imageUrl: "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/jelly.jpg"},
            ]} /> //property called items which contains list of objects (donuts)
          } />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default AppRouter;
