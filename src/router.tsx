import * as React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { App } from './App';
import { Hello } from './components/hello';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route component={App} />
        <Switch>
          <Route exact path="/" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/hello1" render={(props) => <Hello {...props} name="page 1" /> } />
          <Route path="/hello2" render={(props) => <Hello {...props} name="page 2" /> } />
          <Route path="/hello3" render={(props) => <Hello {...props} name="page 3" /> } />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default AppRouter;
