import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//Action Type
const AUTH_USER = 'AUTH_USER';
//const UPDATE_USER = 'UPDATE_USER';

//Action Creator
const _authUser = user => ({
    type: AUTH_USER,
    user
});

// const _updateUser = user => ({
//     type: UPDATE_USER,
//     user
// })

//Thunk
export const authUser = (user, type, history) => {
    return async dispatch => {
        let adult;
        if(type === 'signup'){
            const { firstName, lastName, email, password } = user;
            adult = { firstName, lastName, email, password }
        } else {
            const { email, password } = user;
            adult = { email, password };
        }
        try {
            const newUser = await axios.post(`/auth/${type}`, adult);
            if(newUser.data) dispatch(_authUser(newUser.data));
            history.push('/home');
        } catch(error) {
            console.error(error, 'Error setting new user');
        }
    }
};

const initialState = {
    firstName: "",
    child: []

}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_USER: 
            return action.user
        default:
            return state;
    }
}

const middelware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));

export default createStore(reducer, middelware);

