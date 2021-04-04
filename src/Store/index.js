import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

// Action Type
const AUTH_USER = 'AUTH_USER';
const GET_KID = 'GET_KID';
const LOGOUT_USER = 'LOGOUT_USER';
const SELECT_CHILD = 'SELECT_CHILD';
const SET_STATUS = 'SET_STATUS';
const DELETE_CHILD = 'DELETE_CHILD';
const UPDATED_CHILD = 'UPDATED_CHILD';
const VERIFY_PASSWORD = 'VERIFY_PASSWORD';

// Action Creator
const _authUser = (user) => ({
  type: AUTH_USER,
  user,
});

const _getKid = (kid) => ({
  type: GET_KID,
  kid,
});

const _logoutUser = () => ({
  type: LOGOUT_USER,
});

const _selectChild = (child) => ({
  type: SELECT_CHILD,
  child,
});

export const _setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

const _deleteChild = (updatedAdult) => ({
  type: DELETE_CHILD,
  updatedAdult,
});

const _updatedChild = (child) => ({
  type: UPDATED_CHILD,
  child,
});

export const _verifyPassword = (verified) => ({
  type: VERIFY_PASSWORD,
  verified,
});

// Thunk

export const authUser = (user, type, history) => {
  return async (dispatch) => {
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
      dispatch(_setStatus(null));
      history.push('/home');
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(_setStatus('Incorrect password'));
      } else if (error.response.status === 403) {
        dispatch(_setStatus('This is email is not registered'));
      } else if (error.response.status === 435) {
        dispatch(_setStatus('This is email already has an account'));
      } else {
        console.error(error, 'Error setting new user');
        dispatch(_setStatus('Error authorizing user'));
      }
    }
  };
};

export const authMe = () => {
  return async (dispatch) => {
    try {
      const user = await axios.get('/auth/me');
      dispatch(_authUser(user.data || initialState));
    } catch (error) {
      console.log('error in authMe', error);
    }
  };
};

export const addKid = (kidInfo) => {
  return async (dispatch) => {
    try {
      const kid = await axios.put('/api/addChild', kidInfo);
      dispatch(_getKid(kid.data));
    } catch (error) {
      console.log('Error creating child profile', error);
    }
  };
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(_logoutUser());
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const selectChild = (kid) => async (dispatch) => {
  const { data } = await axios.get('/auth/me');
  const { child } = data;
  let selected = child.find((elem) => elem.firstName === kid.firstName);
  if (selected) {
    selected['index'] = child.indexOf(selected);
  }
  dispatch(_selectChild(selected));
};

export const updateChild = (childToUpdate) => async (dispatch) => {
  try {
    const { data } = await axios.put('/api/updateChild', childToUpdate);
    dispatch(_updatedChild(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteChild = (childToDelete) => async (dispatch) => {
  try {
    const { data } = await axios.put('/api/deleteChild', childToDelete);
    dispatch(_deleteChild(data));
  } catch (error) {
    console.error(error);
  }
};

export const verifyPassword = (password) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/verifyPassword', password);
      dispatch(_verifyPassword(data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(_setStatus('Incorrect password'));
      } else if (error.response.status === 500) {
        dispatch(_verifyPassword(false));
        console.log('error in verify password', error);
      }
    }
  };
};

const initialState = {
  firstName: '',
  child: [],
  selectedChild: {},
  updatedChild: {},
  status: null,
  verified: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.user;
    case GET_KID:
      return { ...state, child: [...state.child, action.kid] };
    case LOGOUT_USER:
      return initialState;
    case SELECT_CHILD:
      return { ...state, selectedChild: action.child };
    case UPDATED_CHILD:
      return { ...state, updatedChild: action.child };
    case SET_STATUS:
      return { ...state, status: action.status };
    case DELETE_CHILD:
      return {
        ...state,
        child: action.updatedAdult.child,
      };
    case VERIFY_PASSWORD:
      return {
        ...state,
        verified: action.verified,
      };
    default:
      return state;
  }
};

const middelware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

export default createStore(reducer, middelware);
