import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Signup, Posenet, ChildDashboard } from './Components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Posenet} />
        <Route exact path="/childdashboard" component={ChildDashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }
}

export default Routes;
