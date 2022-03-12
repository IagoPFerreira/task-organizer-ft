import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../pages/Login';

function Router() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" render={() => <Redirect to="/login" />} />
    </Switch>
  );
}

export default Router;
