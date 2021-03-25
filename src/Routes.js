import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Signup, Posenet, ChildDashboard, Navbar } from './Components';

class Routes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Posenet} />
          <Route exact path="/childdashboard" component={ChildDashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
