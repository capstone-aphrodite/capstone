import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {
  Login,
  Signup,
  Posenet,
  ExerciseLibrary,
  SingleExercise,
  ChildDashboard,
  Navbar,
} from "./Components";

class Routes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Posenet} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/exercises" component={ExerciseLibrary} />
          <Route exact path="/exercises/:id" component={SingleExercise} />
          <Route exact path="/childdashboard" component={ChildDashboard} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
