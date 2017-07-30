import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import login from './login';
import layout from './layout';
import currentUser from './currentUser';

const rootReducer = combineReducers({
    login,
    layout,
    currentUser,
    routing
});

export default rootReducer;
