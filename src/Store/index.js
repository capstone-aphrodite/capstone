import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//Action Type
const AUTH_USER = 'AUTH_USER';
const AUTH_ME = 'AUTH_ME';
const ADD_KID = 'ADD_KID';
const LOGOUT_USER = 'LOGOUT_USER';

//Action Creator
const _authUser = user => ({
  type: AUTH_USER,
  user,
});

const _authMe = user => ({
  type: AUTH_ME,
  user,
});

const _addKid = kid => ({
  type: ADD_KID,
  kid,
});

const _logoutUser = () => ({type: LOGOUT_USER})
export const authUser = (user, type, history) => {
  return async dispatch => {
    let adult;
    if (type === 'signup') {
      const { firstName, lastName, email, password } = user;
      adult = { firstName, lastName, email, password };
    } else {
      const { email, password } = user;
      adult = { email, password };
    }
    try {
      const newUser = await axios.post(`/auth/${type}`, adult);
      if (newUser.data) dispatch(_authUser(newUser.data));
      history.push('/home');
    } catch (error) {
      console.error(error, 'Error setting new user');
    }
  };
};

export const authMe = () => {
  return async dispatch => {
    try {
      const user = await axios.get('/auth/me');
      dispatch(_authMe(user.data || initialState));
    } catch (error) {
      console.log('error in authMe', error);
    }
  };
};

export const addKid = kidInfo => {
  return async dispatch => {
    try {
      const kid = await axios.put('/api/addChild', kidInfo);
      dispatch(_addKid(kid.data));
    } catch (error) {
      console.log('Error creating child profile', error);
    }
  };
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(_logoutUser());
  } catch(error) {
    console.error(error);
  }
}

const initialState = {
  firstName: '',
  child: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.user;
    case AUTH_ME:
      return action.user;
    case ADD_KID:
      return { ...state, child: [...state.child, action.kid] };
    case LOGOUT_USER:
      return initialState;  
    default:
      return state;
  }
};

const middelware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

export default createStore(reducer, middelware);
