import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Signup, Posenet } from './Components';
import { authMe } from './Store';
import { connect } from 'react-redux';

class Routes extends Component {
  async componentDidMount() {
    await this.props.authMe();
  }
  render() {
    console.log('this.props routes', this.props);
    return (
      <Switch>
        <Route exact path="/" component={Posenet} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }
}

const mapState = state => {
  console.log(state);
  return {
    isLoggedIn: !!state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    authMe: () => dispatch(authMe()),
  };
};

export default connect(mapState, mapDispatch)(Routes);
