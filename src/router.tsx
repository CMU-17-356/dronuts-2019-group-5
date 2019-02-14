import * as React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Hello, Menu, Header, Order } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route component={Header} />
        <Switch> //switch is the parent component, which comes from React router
          <Route exact path="/" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/hello1" render={(props) => <Hello {...props} name="page 1" /> } />
          // route props passes in history, 
          <Route path="/baker-orders" render={(props) => 
            // at this point, Order etc is defined, but the constructor will be called after this line
            <Order orders={[
              {id: "1", donuts: "Original Glazed", count: 1, status: "Incoming"},
              {id: "2", donuts: "Chocolate Glazed", count: 2, status: "On Drone"},
              {id: "3", donuts: "Jelly", count: 2, status: "In Progress"},
              {id: "4", donuts: "Rainbow Sprinkles", count: 3, status: "Delivered"},
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
