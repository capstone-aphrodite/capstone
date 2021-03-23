import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Signup } from './Components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }
}

export default Routes;
