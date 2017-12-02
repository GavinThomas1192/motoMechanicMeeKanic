import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import nav from './nav';

export default combineReducers({
    user,
    auth,
    nav,
})