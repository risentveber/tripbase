import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import login from './login';
import layout from './layout';

const rootReducer = combineReducers({
    login,
    layout,
    routing
});

export default rootReducer;
