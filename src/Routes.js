import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Login,
  Signup,
  ExerciseLibrary,
  SingleExercise,
  ChildDashboard,
  FamilyDashboard,
  Navbar,
  LandingPage,
  Congrats,
} from './Components';
import { authMe } from './Store';
import { connect } from 'react-redux';

class Routes extends Component {
  async componentDidMount() {
    await this.props.authMe();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/home" /> : <LandingPage />}
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>

        {isLoggedIn && (
          <Switch>
            <Route exact path="/exercises" component={ExerciseLibrary} />
            <Route exact path="/exercises/:id" component={SingleExercise} />
            <Route
              exact
              path="/childdashboard/:id"
              component={ChildDashboard}
            />
            <Route path="/home" component={FamilyDashboard} />
            <Route path="/congrats" component={Congrats} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.firstName,
  };
};

const mapDispatch = dispatch => {
  return {
    authMe: () => dispatch(authMe()),
  };
};

export default connect(mapState, mapDispatch)(Routes);
