import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Router() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
    </Switch>
  );
}

export default Router;
