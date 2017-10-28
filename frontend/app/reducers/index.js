import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import login from './login';
import layout from './layout';
import currentUser from './currentUser';
import trips from './trips';

const rootReducer = combineReducers({
    login,
    layout,
    currentUser,
    trips,
    routing
});

export default rootReducer;
