import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Signup, Posenet, FamilyDashboard } from './Components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Posenet} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={FamilyDashboard} />
      </Switch>
    );
  }
}

export default Routes;
